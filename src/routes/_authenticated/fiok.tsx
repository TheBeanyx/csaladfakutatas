import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/fiok")({ component: Page });

function Page() {
  const [appts, setAppts] = useState<any[]>([]);
  useEffect(() => { supabase.from("appointments").select("*").order("requested_at", { ascending: true }).then(({ data }) => setAppts(data ?? [])); }, []);
  return (
    <div>
      <h1 className="font-serif text-3xl text-primary">Saját foglalásaim</h1>
      <div className="mt-6 space-y-3">
        {appts.length === 0 && <p className="text-muted-foreground text-sm">Még nincsenek foglalásai.</p>}
        {appts.map((a) => (
          <div key={a.id} className="ornate-card p-4 flex justify-between items-start">
            <div>
              <div className="font-medium text-primary">{a.service_type}</div>
              <div className="text-xs text-muted-foreground">{new Date(a.requested_at).toLocaleString("hu-HU")}</div>
              {a.notes && <p className="text-sm mt-2">{a.notes}</p>}
            </div>
            <span className="badge-seal">{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
