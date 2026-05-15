import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({ component: Page });

function Page() {
  const [stats, setStats] = useState({ pending: 0, suggestions: 0, conversations: 0 });
  useEffect(() => {
    (async () => {
      const [a, f, c] = await Promise.all([
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("family_tree_nodes").select("id", { count: "exact", head: true }).eq("status", "suggested"),
        supabase.from("conversations").select("id", { count: "exact", head: true }),
      ]);
      setStats({ pending: a.count ?? 0, suggestions: f.count ?? 0, conversations: c.count ?? 0 });
    })();
  }, []);
  const cards = [
    { label: "Függő foglalások", n: stats.pending },
    { label: "Várakozó családfa-javaslatok", n: stats.suggestions },
    { label: "Aktív beszélgetések", n: stats.conversations },
  ];
  return (
    <div>
      <h1 className="font-serif text-3xl text-primary">Áttekintés</h1>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="ornate-card p-6">
            <div className="font-serif text-4xl text-primary">{c.n}</div>
            <div className="text-sm text-muted-foreground mt-1">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
