import { createFileRoute, Outlet, redirect, Link, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw redirect({ to: "/auth" });
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!data) throw redirect({ to: "/fiok" });
  },
  component: Layout,
});

function Layout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { to: "/admin", label: "Áttekintés" },
    { to: "/admin/idopontok", label: "Időpontok" },
    { to: "/admin/uzenetek", label: "Üzenetek" },
    { to: "/admin/csaladfa", label: "Családfa" },
  ] as const;
  return (
    <div className="container-prose py-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="badge-seal">Admin felület</span>
      </div>
      <nav className="flex gap-1 border-b border-border mb-6 flex-wrap">
        {tabs.map((t) => (
          <Link key={t.to} to={t.to}
            className={`px-4 py-2 text-sm border-b-2 -mb-px ${path === t.to ? "border-gold text-primary font-medium" : "border-transparent text-muted-foreground hover:text-primary"}`}>
            {t.label}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
