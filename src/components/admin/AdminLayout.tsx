import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, ShoppingCart, UserCircle, LogOut, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useEffect } from "react";

const items = [
  { title: "Yleiskatsaus", url: "/admin", icon: LayoutDashboard, end: true },
  { title: "Liidit", url: "/admin/leads", icon: Users, end: false },
  { title: "Tilaukset", url: "/admin/orders", icon: ShoppingCart, end: false },
  { title: "Asiakkaat", url: "/admin/customers", icon: UserCircle, end: false },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading, user } = useAdminAuth();

  useEffect(() => {
    if (loading) return;
    if (!session) navigate("/admin/login", { replace: true });
    else if (!isAdmin) navigate("/admin/login", { replace: true });
  }, [session, isAdmin, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (loading || !session || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Ladataan...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon">
          <SidebarHeader className="border-b border-border/50 p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm">AkkuTurva</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end={item.end}
                          className={({ isActive }) =>
                            `flex items-center gap-2 ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : ""}`
                          }
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border/50 p-3">
            <div className="text-xs text-muted-foreground truncate mb-2">{user?.email}</div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
              <LogOut className="w-4 h-4 mr-2" /> Kirjaudu ulos
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-border/50 flex items-center gap-3 px-4 sticky top-0 bg-background/80 backdrop-blur z-10">
            <SidebarTrigger />
            <h2 className="font-semibold">Hallintapaneeli</h2>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
