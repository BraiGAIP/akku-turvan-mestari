import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ShoppingCart, TrendingUp, Activity } from "lucide-react";

const AdminOverview = () => {
  const [stats, setStats] = useState({ newLeads: 0, openOrders: 0, monthRevenue: 0, totalLeads: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      const [leadsToday, openOrders, monthOrders, totalLeads, lastLeads, lastOrders] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", today.toISOString()),
        supabase.from("orders").select("id", { count: "exact", head: true }).in("status", ["pending", "active"]),
        supabase.from("orders").select("total_price").gte("created_at", monthStart.toISOString()).eq("status", "paid"),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      const revenue = (monthOrders.data ?? []).reduce((s, o: any) => s + Number(o.total_price ?? 0), 0);
      setStats({
        newLeads: leadsToday.count ?? 0,
        openOrders: openOrders.count ?? 0,
        monthRevenue: revenue,
        totalLeads: totalLeads.count ?? 0,
      });
      setRecentLeads(lastLeads.data ?? []);
      setRecentOrders(lastOrders.data ?? []);
    })();
  }, []);

  const kpis = [
    { label: "Uudet liidit tänään", value: stats.newLeads, icon: Users, color: "text-cyan-400" },
    { label: "Avoimet tilaukset", value: stats.openOrders, icon: ShoppingCart, color: "text-amber-400" },
    { label: "Liikevaihto / kk", value: `${stats.monthRevenue.toFixed(0)} €`, icon: TrendingUp, color: "text-emerald-400" },
    { label: "Liidejä yhteensä", value: stats.totalLeads, icon: Activity, color: "text-violet-400" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Yleiskatsaus</h1>
        <p className="text-sm text-muted-foreground">Liiketoiminnan tilannekuva tänään</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="admin-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</span>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <div className="text-2xl font-bold">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card p-5">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-secondary">Uusimmat liidit</h3>
          <div className="space-y-3">
            {recentLeads.length === 0 && <p className="text-sm text-muted-foreground">Ei vielä liidejä</p>}
            {recentLeads.map((l) => (
              <div key={l.id} className="flex items-center justify-between text-sm py-2 border-b border-border/30 last:border-0">
                <div className="min-w-0">
                  <div className="font-medium truncate">{l.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{l.email || l.phone || "—"}</div>
                </div>
                <Badge variant="outline">{l.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card p-5">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-secondary">Uusimmat tilaukset</h3>
          <div className="space-y-3">
            {recentOrders.length === 0 && <p className="text-sm text-muted-foreground">Ei vielä tilauksia</p>}
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between text-sm py-2 border-b border-border/30 last:border-0">
                <div className="min-w-0">
                  <div className="font-medium truncate">{o.customer_name}</div>
                  <div className="text-xs text-muted-foreground truncate">{o.product_name}</div>
                </div>
                <Badge variant="outline">{o.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
