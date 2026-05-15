import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/idopontok")({ component: Page });

function Page() {
  const [items, setItems] = useState<any[]>([]);
  const load = useCallback(async () => {
    const { data } = await supabase.from("appointments").select("*").order("requested_at", { ascending: true });
    setItems(data ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);
  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Frissítve");
    load();
  }
  return (
    <div>
      <h1 className="font-serif text-3xl text-primary">Időpontok</h1>
      <div className="mt-6 space-y-3">
        {items.map((a) => (
          <div key={a.id} className="ornate-card p-4 flex justify-between items-start gap-4 flex-wrap">
            <div>
              <div className="font-medium text-primary">{a.name} · {a.service_type}</div>
              <div className="text-xs text-muted-foreground">{a.email} {a.phone ? `· ${a.phone}` : ""}</div>
              <div className="text-sm mt-1">{new Date(a.requested_at).toLocaleString("hu-HU")}</div>
              {a.notes && <p className="text-sm mt-2 text-foreground/80">{a.notes}</p>}
            </div>
            <div className="flex gap-2 items-center">
              <span className="badge-seal">{a.status}</span>
              <Button size="sm" variant="outline" onClick={() => setStatus(a.id, "confirmed")}>Megerősít</Button>
              <Button size="sm" variant="outline" onClick={() => setStatus(a.id, "done")}>Lezár</Button>
              <Button size="sm" variant="outline" onClick={() => setStatus(a.id, "cancelled")}>Töröl</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
