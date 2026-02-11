import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { validateFile } from "@/lib/admin-validation";

export default function AdminGallery() {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: images, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery_images").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Imagem removida!");
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    // Validate all files first
    const validFiles: File[] = [];
    for (const file of Array.from(files)) {
      const error = validateFile(file);
      if (error) {
        toast.error(error);
      } else {
        validFiles.push(file);
      }
    }
    if (!validFiles.length) return;

    setUploading(true);

    for (const file of validFiles) {
      const ext = file.name.split(".").pop();
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
      if (uploadError) {
        toast.error(`Erro ao enviar ${file.name}: ${uploadError.message}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);

      const { error: insertError } = await supabase.from("gallery_images").insert({
        image_url: publicUrl,
        alt_text: file.name.replace(/\.[^.]+$/, "").slice(0, 200),
        category: "Todas",
        sort_order: (images?.length ?? 0),
      });
      if (insertError) toast.error(insertError.message);
    }

    setUploading(false);
    toast.success("Imagens enviadas!");
    queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
    e.target.value = "";
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">Galeria</h1>
          <label className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 cursor-pointer">
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? "Enviando..." : "Upload"}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images?.map((img) => (
              <div key={img.id} className="bg-card border border-border rounded-xl overflow-hidden group relative">
                <img src={img.image_url} alt={img.alt_text} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                <div className="p-3">
                  <p className="text-xs text-muted-foreground truncate">{img.alt_text}</p>
                  <p className="text-xs text-primary">{img.category}</p>
                </div>
                <button
                  onClick={() => deleteMutation.mutate(img.id)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remover imagem"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {!images?.length && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>Nenhuma imagem na galeria. Faça upload para começar!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
