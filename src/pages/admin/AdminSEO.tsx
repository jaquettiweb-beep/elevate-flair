import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminSEO() {
  const queryClient = useQueryClient();

  const { data: pages, isLoading } = useQuery({
    queryKey: ["admin-seo"],
    queryFn: async () => {
      const { data, error } = await supabase.from("page_seo").select("*").order("page_slug");
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <AdminLayout><div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">SEO por Página</h1>

        <div className="space-y-6">
          {pages?.map((page) => (
            <SEOCard key={page.id} page={page} queryClient={queryClient} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function SEOCard({ page, queryClient }: { page: any; queryClient: any }) {
  const [title, setTitle] = useState(page.title);
  const [description, setDescription] = useState(page.description);
  const [keywords, setKeywords] = useState(page.keywords);

  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("page_seo")
        .update({ title, description, keywords })
        .eq("id", page.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(`SEO de /${page.page_slug} atualizado!`);
      queryClient.invalidateQueries({ queryKey: ["admin-seo"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold text-foreground mb-4 capitalize">/{page.page_slug}</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Title ({title.length}/60)</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Description ({description.length}/160)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Keywords</label>
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Google preview */}
        <div className="bg-muted rounded-lg p-3 mt-2">
          <p className="text-xs text-muted-foreground mb-1">Preview no Google:</p>
          <p className="text-sm text-primary truncate">{title || "Sem título"}</p>
          <p className="text-xs text-[hsl(142,70%,40%)]">academiaflipper.com.br/{page.page_slug}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{description || "Sem descrição"}</p>
        </div>

        <button
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
        >
          {mutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Salvar
        </button>
      </div>
    </div>
  );
}
