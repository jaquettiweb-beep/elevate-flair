import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const DAYS = [
  { key: "mon", label: "Segunda" },
  { key: "tue", label: "Terça" },
  { key: "wed", label: "Quarta" },
  { key: "thu", label: "Quinta" },
  { key: "fri", label: "Sexta" },
  { key: "sat", label: "Sábado" },
] as const;

export default function AdminSchedule() {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [newDay, setNewDay] = useState("mon");
  const [newClass, setNewClass] = useState("");
  const [newInstructor, setNewInstructor] = useState("");

  const { data: classes, isLoading } = useQuery({
    queryKey: ["admin-schedule"],
    queryFn: async () => {
      const { data, error } = await supabase.from("schedule_classes").select("*").order("time_slot").order("day_of_week");
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("schedule_classes").insert({
        time_slot: newTime,
        day_of_week: newDay,
        class_name: newClass,
        instructor: newInstructor || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Aula adicionada!");
      queryClient.invalidateQueries({ queryKey: ["admin-schedule"] });
      setAdding(false);
      setNewTime("");
      setNewClass("");
      setNewInstructor("");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("schedule_classes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removida!");
      queryClient.invalidateQueries({ queryKey: ["admin-schedule"] });
    },
  });

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">Grade de Horários</h1>
          <button onClick={() => setAdding(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus size={16} /> Nova Aula
          </button>
        </div>

        {adding && (
          <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input value={newTime} onChange={(e) => setNewTime(e.target.value)} placeholder="Horário (ex: 06:00)" className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
              <select value={newDay} onChange={(e) => setNewDay(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                {DAYS.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}
              </select>
              <input value={newClass} onChange={(e) => setNewClass(e.target.value)} placeholder="Nome da aula" className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
              <input value={newInstructor} onChange={(e) => setNewInstructor(e.target.value)} placeholder="Instrutor (opcional)" className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => addMutation.mutate()} disabled={!newTime || !newClass} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">Salvar</button>
              <button onClick={() => setAdding(false)} className="text-muted-foreground px-4 py-2 text-sm">Cancelar</button>
            </div>
          </div>
        )}

        {isLoading ? (
          <Loader2 className="animate-spin text-primary mx-auto" />
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 text-left font-medium text-foreground">Horário</th>
                  <th className="px-4 py-2 text-left font-medium text-foreground">Dia</th>
                  <th className="px-4 py-2 text-left font-medium text-foreground">Aula</th>
                  <th className="px-4 py-2 text-left font-medium text-foreground">Instrutor</th>
                  <th className="px-4 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {classes?.map((c) => (
                  <tr key={c.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-2 font-mono">{c.time_slot}</td>
                    <td className="px-4 py-2">{DAYS.find((d) => d.key === c.day_of_week)?.label}</td>
                    <td className="px-4 py-2 font-medium">{c.class_name}</td>
                    <td className="px-4 py-2 text-muted-foreground">{c.instructor || "—"}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => deleteMutation.mutate(c.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!classes?.length && <p className="text-center py-8 text-muted-foreground">Nenhuma aula cadastrada.</p>}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
