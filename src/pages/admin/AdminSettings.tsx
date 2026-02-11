import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { settingsFieldSchema } from "@/lib/admin-validation";

export default function AdminSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, any> = {};
      data.forEach((s) => {
        map[s.key] = { id: s.id, value: s.value };
      });
      return map;
    },
  });

  if (isLoading) return <AdminLayout><div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Configurações</h1>

        <div className="space-y-6">
          {settings?.contact && <SettingCard title="Contato" settingKey="contact" data={settings.contact} queryClient={queryClient} fields={[
            { key: "phone", label: "Telefone" },
            { key: "email", label: "Email" },
            { key: "address", label: "Endereço" },
            { key: "whatsapp", label: "WhatsApp (número)" },
          ]} />}

          {settings?.social && <SettingCard title="Redes Sociais" settingKey="social" data={settings.social} queryClient={queryClient} fields={[
            { key: "instagram", label: "Instagram URL" },
            { key: "facebook", label: "Facebook URL" },
            { key: "youtube", label: "YouTube URL" },
            { key: "linkedin", label: "LinkedIn URL" },
          ]} />}

          {settings?.hours && <SettingCard title="Horários de Funcionamento" settingKey="hours" data={settings.hours} queryClient={queryClient} fields={[
            { key: "weekdays", label: "Seg–Sex" },
            { key: "saturday", label: "Sábado" },
            { key: "sunday", label: "Domingo" },
          ]} />}
        </div>
      </div>
    </AdminLayout>
  );
}

function SettingCard({ title, settingKey, data, queryClient, fields }: {
  title: string;
  settingKey: string;
  data: { id: string; value: any };
  queryClient: any;
  fields: { key: string; label: string }[];
}) {
  const [values, setValues] = useState<Record<string, string>>(data.value);

  const mutation = useMutation({
    mutationFn: async () => {
      // Validate all fields
      for (const f of fields) {
        const result = settingsFieldSchema.safeParse(values[f.key] || "");
        if (!result.success) {
          throw new Error(`${f.label}: ${result.error.errors[0]?.message}`);
        }
      }
      // Trim values before saving
      const trimmed: Record<string, string> = {};
      for (const [k, v] of Object.entries(values)) {
        trimmed[k] = (v || "").trim();
      }
      const { error } = await supabase.from("site_settings").update({ value: trimmed }).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(`${title} atualizadas!`);
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-3">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs font-medium text-muted-foreground mb-1">{f.label}</label>
            <input
              value={values[f.key] || ""}
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              maxLength={500}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        ))}
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
