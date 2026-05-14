import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/_admin/csaladfa")({ component: Page });

function Page() {
  const [nodes, setNodes] = useState<any[]>([]);
  const load = useCallback(async () => {
    const { data } = await supabase.from("family_tree_nodes").select("*").order("status").order("birth_year");
    setNodes(data ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);

  async function approve(id: string) { await supabase.from("family_tree_nodes").update({ status: "approved" }).eq("id", id); toast.success("Jóváhagyva"); load(); }
  async function del(id: string) { await supabase.from("family_tree_nodes").delete().eq("id", id); toast.success("Törölve"); load(); }

  async function addRoot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("family_tree_nodes").insert({
      name: String(fd.get("name") || "").slice(0, 200),
      birth_year: fd.get("by") ? Number(fd.get("by")) : null,
      death_year: fd.get("dy") ? Number(fd.get("dy")) : null,
      birth_place: String(fd.get("bp") || "").slice(0, 200) || null,
      status: "approved",
    });
    if (error) { toast.error(error.message); return; }
    (e.currentTarget as HTMLFormElement).reset();
    load();
  }

  const suggested = nodes.filter((n) => n.status === "suggested");
  const approved = nodes.filter((n) => n.status === "approved");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-primary">Családfa kezelés</h1>
      </div>

      <div className="ornate-card p-4">
        <h2 className="font-serif text-xl text-primary mb-3">Új gyökér csomópont</h2>
        <form onSubmit={addRoot} className="grid sm:grid-cols-5 gap-2 items-end">
          <div className="sm:col-span-2"><Label>Név</Label><Input name="name" required maxLength={200} /></div>
          <div><Label>Szül.</Label><Input name="by" type="number" /></div>
          <div><Label>Hal.</Label><Input name="dy" type="number" /></div>
          <div><Label>Hely</Label><Input name="bp" /></div>
          <Button type="submit" className="sm:col-span-5">Hozzáadás</Button>
        </form>
      </div>

      <div>
        <h2 className="font-serif text-xl text-primary mb-3">Várakozó javaslatok ({suggested.length})</h2>
        <div className="space-y-2">
          {suggested.map((n) => (
            <div key={n.id} className="ornate-card p-3 flex justify-between items-center gap-3">
              <div>
                <div className="font-medium">{n.name} <span className="text-xs text-muted-foreground">({n.birth_year ?? "?"}{n.death_year ? `–${n.death_year}` : ""})</span></div>
                {n.notes && <p className="text-xs text-muted-foreground mt-1">{n.notes}</p>}
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => approve(n.id)}>Jóváhagy</Button>
                <Button size="sm" variant="outline" onClick={() => del(n.id)}>Elutasít</Button>
              </div>
            </div>
          ))}
          {suggested.length === 0 && <p className="text-sm text-muted-foreground">Nincs várakozó javaslat.</p>}
        </div>
      </div>

      <div>
        <h2 className="font-serif text-xl text-primary mb-3">Jóváhagyott csomópontok ({approved.length})</h2>
        <div className="space-y-2">
          {approved.map((n) => (
            <div key={n.id} className="ornate-card p-3 flex justify-between items-center">
              <div>
                <div className="font-medium">{n.name}</div>
                <div className="text-xs text-muted-foreground">{n.birth_year ?? "?"}{n.death_year ? `–${n.death_year}` : ""} {n.birth_place ? `· ${n.birth_place}` : ""}</div>
              </div>
              <Button size="sm" variant="outline" onClick={() => del(n.id)}>Törlés</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
