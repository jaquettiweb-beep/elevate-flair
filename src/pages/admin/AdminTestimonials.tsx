import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Loader2, Star, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

export default function AdminTestimonials() {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [modality, setModality] = useState("");
  const [rating, setRating] = useState(5);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("testimonials").insert({ name, text, modality, rating });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Depoimento adicionado!");
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      setAdding(false);
      setName("");
      setText("");
      setModality("");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("testimonials").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removido!");
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
    },
  });

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">Depoimentos</h1>
          <button onClick={() => setAdding(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus size={16} /> Novo
          </button>
        </div>

        {adding && (
          <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do aluno" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Depoimento" rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
            <div className="grid grid-cols-2 gap-3">
              <input value={modality} onChange={(e) => setModality(e.target.value)} placeholder="Modalidade" className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} estrela{r > 1 ? "s" : ""}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => addMutation.mutate()} disabled={!name || !text} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">Salvar</button>
              <button onClick={() => setAdding(false)} className="text-muted-foreground px-4 py-2 text-sm">Cancelar</button>
            </div>
          </div>
        )}

        {isLoading ? <Loader2 className="animate-spin text-primary mx-auto" /> : (
          <div className="space-y-3">
            {testimonials?.map((t) => (
              <div key={t.id} className="bg-card border border-border rounded-xl p-4 flex items-start gap-4">
                <button onClick={() => toggleMutation.mutate({ id: t.id, is_active: !t.is_active })} className="mt-1 shrink-0">
                  {t.is_active ? <ToggleRight size={24} className="text-primary" /> : <ToggleLeft size={24} className="text-muted-foreground" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground text-sm">{t.name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} className="fill-secondary text-secondary" />)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{t.text}</p>
                  <p className="text-xs text-primary mt-1">{t.modality}</p>
                </div>
                <button onClick={() => deleteMutation.mutate(t.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
