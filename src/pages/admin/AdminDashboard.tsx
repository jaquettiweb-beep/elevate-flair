import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Image, Bell, Calendar, Star, Layers, Search } from "lucide-react";
import { Link } from "react-router-dom";

const CARDS = [
  { label: "Páginas SEO", icon: Search, path: "/admin/seo", table: "page_seo" },
  { label: "Galeria", icon: Image, path: "/admin/galeria", table: "gallery_images" },
  { label: "Notificações", icon: Bell, path: "/admin/notificacoes", table: "notifications" },
  { label: "Horários", icon: Calendar, path: "/admin/horarios", table: "schedule_classes" },
  { label: "Depoimentos", icon: Star, path: "/admin/depoimentos", table: "testimonials" },
  { label: "Modalidades", icon: Layers, path: "/admin/modalidades", table: "modalities" },
] as const;

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((card) => (
            <DashCard key={card.table} {...card} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function DashCard({ label, icon: Icon, path, table }: (typeof CARDS)[number]) {
  const { data: count } = useQuery({
    queryKey: ["admin-count", table],
    queryFn: async () => {
      const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  return (
    <Link
      to={path}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all group"
    >
      <Icon size={24} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
      <h3 className="font-semibold text-foreground">{label}</h3>
      <p className="text-2xl font-display font-bold gradient-text mt-1">{count ?? "—"}</p>
    </Link>
  );
}
