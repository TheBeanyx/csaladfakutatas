import { createFileRoute, Outlet, redirect, Link, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });
  },
  component: Layout,
});

function Layout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { to: "/fiok", label: "Fiókom" },
    { to: "/uzenetek", label: "Üzenetek" },
  ] as const;
  return (
    <div className="container-prose py-10">
      <nav className="flex gap-1 border-b border-border mb-6">
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
