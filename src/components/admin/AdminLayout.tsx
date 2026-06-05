import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  UserCircle,
  LogOut,
  
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { cn } from "@/lib/utils";
import { BrandShield } from "@/components/brand/Logo";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  end?: boolean;
  countKey?: "new_leads" | "open_orders";
}

const NAV: NavItem[] = [
  { to: "/admin", label: "Yleiskatsaus", icon: LayoutDashboard, end: true },
  { to: "/admin/leads", label: "Liidit", icon: Users, countKey: "new_leads" },
  { to: "/admin/orders", label: "Tilaukset", icon: ShoppingCart, countKey: "open_orders" },
  { to: "/admin/customers", label: "Asiakkaat", icon: UserCircle },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, isAdmin, loading, user } = useAdminAuth();
  const [drawer, setDrawer] = useState(false);
  const [counts, setCounts] = useState({ new_leads: 0, open_orders: 0 });

  useEffect(() => {
    if (loading) return;
    if (!session || !isAdmin) navigate("/admin/login", { replace: true });
  }, [session, isAdmin, loading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      const [leads, orders] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("orders").select("id", { count: "exact", head: true }).in("status", ["pending", "active"]),
      ]);
      setCounts({ new_leads: leads.count ?? 0, open_orders: orders.count ?? 0 });
    })();
  }, [isAdmin, location.pathname]);

  useEffect(() => { setDrawer(false); }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (loading || !session || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Ladataan…</div>
      </div>
    );
  }

  const SidebarNav = (
    <nav className="flex flex-col h-full">
      <Link
        to="/"
        className="flex items-center gap-2 px-4 pt-4 pb-3 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Etusivulle
      </Link>

      <div className="flex items-center gap-3 px-4 pb-4 border-b border-border/40">
        <BrandShield size={34} />
        <div className="flex flex-col min-w-0 leading-none">
          <span className="font-black text-sm tracking-[0.04em] uppercase text-foreground">JATKOTURVA</span>
          <span className="text-[10px] uppercase tracking-[0.18em] font-bold mt-1 text-brand-gradient">Admin</span>
        </div>
      </div>

      <div className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gradient">
        Operatiivinen
      </div>

      <div className="flex flex-col gap-1 px-3 flex-1">
        {NAV.map((item) => {
          const active = item.end
            ? location.pathname === item.to
            : location.pathname === item.to || location.pathname.startsWith(item.to + "/");
          const count = item.countKey ? counts[item.countKey] : 0;
          return (
            <NavLink key={item.to} to={item.to} end={item.end} className="admin-nav-link" data-active={active}>
              <span className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4" />
                {item.label}
              </span>
              {count > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold">
                  {count}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="border-t border-border/40 p-3">
        <div className="text-xs text-muted-foreground truncate mb-2 px-1">{user?.email}</div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
          <LogOut className="w-4 h-4 mr-2" /> Kirjaudu ulos
        </Button>
      </div>
    </nav>
  );

  const currentTitle = NAV.find((n) =>
    n.end ? location.pathname === n.to : location.pathname.startsWith(n.to),
  )?.label ?? "Hallintapaneeli";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setDrawer((v) => !v)}
            aria-label="Avaa valikko"
          >
            {drawer ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div className="flex-1 flex items-center gap-3 min-w-0">
            <BrandShield size={26} />
            <span className="font-black text-xs tracking-[0.06em] uppercase text-foreground">JATKOTURVA</span>
            <span className="text-base font-semibold truncate text-muted-foreground">/ {currentTitle}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs">
            {counts.new_leads > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/40 font-semibold">
                {counts.new_leads} uutta liidiä
              </span>
            )}
            {counts.open_orders > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/40 font-semibold">
                {counts.open_orders} avointa tilausta
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-64 shrink-0 border-r border-border/60 bg-[hsl(224_40%_8%)] min-h-[calc(100vh-3.5rem)]">
          {SidebarNav}
        </aside>

        {drawer && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setDrawer(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[hsl(224_40%_8%)] border-r border-border/60 overflow-y-auto">
              {SidebarNav}
            </aside>
          </div>
        )}

        <main className={cn("flex-1 min-w-0 p-4 sm:p-6 overflow-auto")}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
