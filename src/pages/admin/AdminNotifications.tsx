import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Loader2, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import { notificationSchema, getValidationError } from "@/lib/admin-validation";

export default function AdminNotifications() {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newType, setNewType] = useState<"info" | "success" | "warning" | "error">("info");

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["admin-notifications"],
    queryFn: async () => {
      const { data, error } = await supabase.from("notifications").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const error = getValidationError(notificationSchema, { title: newTitle, message: newMessage, type: newType });
      if (error) throw new Error(error);
      const { error: dbError } = await supabase.from("notifications").insert({
        title: newTitle.trim(),
        message: newMessage.trim(),
        type: newType,
      });
      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast.success("Notificação criada!");
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
      setAdding(false);
      setNewTitle("");
      setNewMessage("");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("notifications").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-notifications"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("notifications").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removida!");
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
    },
  });

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">Notificações</h1>
          <button
            onClick={() => setAdding(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} /> Nova
          </button>
        </div>

        {adding && (
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-3">Nova Notificação</h3>
            <div className="space-y-3">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                maxLength={150}
                placeholder="Título"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                maxLength={500}
                placeholder="Mensagem"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none"
              />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
              >
                <option value="info">Info</option>
                <option value="success">Sucesso</option>
                <option value="warning">Alerta</option>
                <option value="error">Erro</option>
              </select>
              <div className="flex gap-2">
                <button onClick={() => addMutation.mutate()} disabled={!newTitle.trim() || newTitle.trim().length < 2 || !newMessage.trim() || newMessage.trim().length < 5} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
                  Salvar
                </button>
                <button onClick={() => setAdding(false)} className="text-muted-foreground px-4 py-2 text-sm">Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <Loader2 className="animate-spin text-primary mx-auto" />
        ) : (
          <div className="space-y-3">
            {notifications?.map((n) => (
              <div key={n.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                <button onClick={() => toggleMutation.mutate({ id: n.id, is_active: !n.is_active })}>
                  {n.is_active ? <ToggleRight size={24} className="text-primary" /> : <ToggleLeft size={24} className="text-muted-foreground" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      n.type === "info" ? "bg-accent text-accent-foreground" :
                      n.type === "success" ? "bg-[hsl(142,60%,90%)] text-[hsl(142,60%,30%)]" :
                      n.type === "warning" ? "bg-[hsl(40,80%,90%)] text-[hsl(40,80%,30%)]" :
                      "bg-destructive/10 text-destructive"
                    }`}>{n.type}</span>
                    <h4 className="font-medium text-foreground text-sm truncate">{n.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{n.message}</p>
                </div>
                <button onClick={() => deleteMutation.mutate(n.id)} className="text-muted-foreground hover:text-destructive shrink-0">
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
