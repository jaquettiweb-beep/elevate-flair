import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Loader2, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import { modalitySchema, getValidationError } from "@/lib/admin-validation";

export default function AdminModalities() {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data: modalities, isLoading } = useQuery({
    queryKey: ["admin-modalities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("modalities").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const error = getValidationError(modalitySchema, { name, description });
      if (error) throw new Error(error);
      const { error: dbError } = await supabase.from("modalities").insert({ name: name.trim(), description: description.trim() });
      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast.success("Modalidade adicionada!");
      queryClient.invalidateQueries({ queryKey: ["admin-modalities"] });
      setAdding(false);
      setName("");
      setDescription("");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("modalities").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-modalities"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("modalities").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removida!");
      queryClient.invalidateQueries({ queryKey: ["admin-modalities"] });
    },
  });

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">Modalidades</h1>
          <button onClick={() => setAdding(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus size={16} /> Nova
          </button>
        </div>

        {adding && (
          <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder="Nome da modalidade" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} placeholder="Descrição" rows={2} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
            <div className="flex gap-2">
              <button onClick={() => addMutation.mutate()} disabled={!name.trim() || name.trim().length < 2} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">Salvar</button>
              <button onClick={() => setAdding(false)} className="text-muted-foreground px-4 py-2 text-sm">Cancelar</button>
            </div>
          </div>
        )}

        {isLoading ? <Loader2 className="animate-spin text-primary mx-auto" /> : (
          <div className="space-y-3">
            {modalities?.map((m) => (
              <div key={m.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                <button onClick={() => toggleMutation.mutate({ id: m.id, is_active: !m.is_active })} className="shrink-0">
                  {m.is_active ? <ToggleRight size={24} className="text-primary" /> : <ToggleLeft size={24} className="text-muted-foreground" />}
                </button>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm">{m.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{m.description}</p>
                </div>
                <button onClick={() => deleteMutation.mutate(m.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {!modalities?.length && <p className="text-center py-8 text-muted-foreground">Nenhuma modalidade cadastrada.</p>}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
