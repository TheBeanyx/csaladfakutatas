import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { TreeDeciduous } from "lucide-react";

export const Route = createFileRoute("/csaladfa")({
  head: () => ({ meta: [{ title: "Élő családfa — Csányi Levéltár" }, { name: "description", content: "Interaktív, közösségileg bővülő családfa. Ön is javasolhat új ágat." }] }),
  component: Page,
});

type Node = { id: string; parent_id: string | null; name: string; birth_year: number | null; death_year: number | null; birth_place: string | null; notes: string | null; status: string };

function Page() {
  const { user } = useAuth();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase.from("family_tree_nodes").select("*").eq("status", "approved").order("birth_year", { ascending: true });
    setNodes((data ?? []) as Node[]);
    setLoading(false);
  }
  useEffect(() => {
    load();
    const ch = supabase.channel("ftn").on("postgres_changes", { event: "*", schema: "public", table: "family_tree_nodes" }, load).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const roots = nodes.filter((n) => !n.parent_id);

  return (
    <section className="container-prose py-16">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="badge-seal"><TreeDeciduous className="w-3 h-3" /> Közösségi családfa</span>
          <h1 className="mt-3 font-serif text-4xl text-primary">Élő családfa</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">Ön is hozzájárulhat a fa bővítéséhez — javaslatait egy szakértő ellenőrzi és hagyja jóvá.</p>
        </div>
        <SuggestDialog parentId={null} disabled={!user} />
      </div>
      <div className="gold-rule my-8" />
      {loading ? <p className="text-muted-foreground">Betöltés…</p> :
        roots.length === 0 ? (
          <div className="ornate-card p-10 text-center">
            <p className="text-muted-foreground">Még nincs jóváhagyott bejegyzés. Legyen Ön az első, aki javasol egyet!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {roots.map((r) => <NodeView key={r.id} node={r} all={nodes} canSuggest={!!user} depth={0} />)}
          </div>
        )
      }
      {!user && (
        <p className="mt-6 text-sm text-muted-foreground">Javaslattételhez <a href="/auth" className="underline text-primary">jelentkezzen be</a>.</p>
      )}
    </section>
  );
}

function NodeView({ node, all, canSuggest, depth }: { node: Node; all: Node[]; canSuggest: boolean; depth: number }) {
  const children = all.filter((c) => c.parent_id === node.id);
  return (
    <div style={{ marginLeft: depth * 24 }}>
      <div className="ornate-card p-4 flex items-start justify-between gap-3">
        <div>
          <div className="font-serif text-xl text-primary">{node.name}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {node.birth_year ?? "?"}{node.death_year ? `–${node.death_year}` : ""}
            {node.birth_place ? ` · ${node.birth_place}` : ""}
          </div>
          {node.notes && <p className="text-sm mt-2 text-foreground/80">{node.notes}</p>}
        </div>
        <SuggestDialog parentId={node.id} disabled={!canSuggest} compact />
      </div>
      {children.length > 0 && (
        <div className="mt-3 border-l-2 border-gold/40 pl-4 space-y-3">
          {children.map((c) => <NodeView key={c.id} node={c} all={all} canSuggest={canSuggest} depth={depth + 1} />)}
        </div>
      )}
    </div>
  );
}

function SuggestDialog({ parentId, disabled, compact }: { parentId: string | null; disabled?: boolean; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error("Bejelentkezés szükséges"); setLoading(false); return; }
    const { error } = await supabase.from("family_tree_nodes").insert({
      parent_id: parentId,
      name: String(fd.get("name") || "").trim().slice(0, 200),
      birth_year: fd.get("birth_year") ? Number(fd.get("birth_year")) : null,
      death_year: fd.get("death_year") ? Number(fd.get("death_year")) : null,
      birth_place: String(fd.get("birth_place") || "").slice(0, 200) || null,
      notes: String(fd.get("notes") || "").slice(0, 2000) || null,
      status: "suggested",
      suggested_by: user.id,
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Köszönjük! Javaslatát az admin ellenőrizni fogja.");
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={compact ? "sm" : "default"} variant="outline" disabled={disabled} className="border-gold/60">
          {compact ? "+ Javaslat" : "Új ág javaslása"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Javaslat új családtagra</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div><Label htmlFor="s-name">Név</Label><Input id="s-name" name="name" required maxLength={200} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label htmlFor="s-by">Születés éve</Label><Input id="s-by" name="birth_year" type="number" min={1000} max={2100} /></div>
            <div><Label htmlFor="s-dy">Halálozás éve</Label><Input id="s-dy" name="death_year" type="number" min={1000} max={2100} /></div>
          </div>
          <div><Label htmlFor="s-bp">Születési hely</Label><Input id="s-bp" name="birth_place" maxLength={200} /></div>
          <div><Label htmlFor="s-n">Megjegyzés / forrás</Label><Textarea id="s-n" name="notes" rows={3} maxLength={2000} /></div>
          <Button type="submit" disabled={loading} className="w-full">{loading ? "Küldés…" : "Javaslat beküldése"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
