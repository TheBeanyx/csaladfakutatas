import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/idopont")({
  head: () => ({ meta: [{ title: "Időpontfoglalás — Családfakutatás" }, { name: "description", content: "Foglaljon időpontot családfakutatás konzultációra." }] }),
  component: Page,
});

const Schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  service_type: z.string().min(2).max(100),
  requested_at: z.string().min(1),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

function Page() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const obj = Object.fromEntries(fd) as Record<string, string>;
    const parsed = Schema.safeParse(obj);
    if (!parsed.success) { toast.error("Kérjük ellenőrizze az adatokat"); return; }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("appointments").insert({
      ...parsed.data,
      requested_at: new Date(parsed.data.requested_at).toISOString(),
      user_id: user?.id ?? null,
      phone: parsed.data.phone || null,
      notes: parsed.data.notes || null,
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setDone(true);
  }

  if (done) return (
    <section className="container-prose py-20 text-center max-w-xl">
      <h1 className="font-serif text-4xl text-primary">Köszönjük!</h1>
      <p className="mt-4 text-muted-foreground">Foglalási kérelmét rögzítettük. 24 órán belül e-mailben visszaigazoljuk.</p>
    </section>
  );

  return (
    <section className="container-prose py-16 max-w-2xl">
      <h1 className="font-serif text-4xl text-primary">Időpontfoglalás</h1>
      <p className="mt-2 text-muted-foreground">Az első 30 perces konzultáció ingyenes.</p>
      <div className="gold-rule my-6 max-w-xs" />
      <form onSubmit={onSubmit} className="ornate-card p-6 space-y-4">
        <div><Label htmlFor="name">Név</Label><Input id="name" name="name" required maxLength={100} /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" required maxLength={255} /></div>
          <div><Label htmlFor="phone">Telefon</Label><Input id="phone" name="phone" maxLength={50} /></div>
        </div>
        <div><Label htmlFor="service_type">Szolgáltatás</Label>
          <select id="service_type" name="service_type" required className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="Konzultáció">Konzultáció (ingyenes)</option>
            <option value="Anyakönyvi kutatás">Anyakönyvi kutatás</option>
            <option value="Levéltári kutatás">Levéltári kutatás</option>
            <option value="DNS-értelmezés">DNS-eredmények értelmezése</option>
            <option value="Címerkutatás">Címer- és nemességkutatás</option>
          </select>
        </div>
        <div><Label htmlFor="requested_at">Kért időpont</Label><Input id="requested_at" name="requested_at" type="datetime-local" required /></div>
        <div><Label htmlFor="notes">Megjegyzés</Label><Textarea id="notes" name="notes" rows={4} maxLength={2000} /></div>
        <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          {loading ? "Küldés…" : "Időpont kérése"}
        </Button>
      </form>
    </section>
  );
}
