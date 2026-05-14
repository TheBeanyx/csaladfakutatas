import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Bejelentkezés — Csányi Levéltár" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    const full_name = String(fd.get("full_name") || "").trim();
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin, data: { full_name } },
        });
        if (error) throw error;
        toast.success("Sikeres regisztráció! Ellenőrizze az e-mailjét.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav({ to: "/fiok" });
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Hiba történt");
    } finally { setLoading(false); }
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast.error("Google bejelentkezés sikertelen");
  }

  return (
    <section className="container-prose py-16 max-w-md">
      <h1 className="font-serif text-4xl text-primary text-center">{mode === "signin" ? "Bejelentkezés" : "Regisztráció"}</h1>
      <div className="gold-rule my-6 max-w-xs mx-auto" />
      <div className="ornate-card p-6 space-y-4">
        <Button type="button" variant="outline" className="w-full" onClick={google}>Folytatás Google-lel</Button>
        <div className="text-center text-xs text-muted-foreground">vagy</div>
        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "signup" && (
            <div><Label htmlFor="full_name">Teljes név</Label><Input id="full_name" name="full_name" required /></div>
          )}
          <div><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" required /></div>
          <div><Label htmlFor="password">Jelszó</Label><Input id="password" name="password" type="password" minLength={6} required /></div>
          <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {loading ? "…" : mode === "signin" ? "Belépés" : "Regisztráció"}
          </Button>
        </form>
        <button type="button" className="w-full text-center text-sm text-muted-foreground hover:text-primary"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
          {mode === "signin" ? "Még nincs fiókja? Regisztráció" : "Van már fiókja? Bejelentkezés"}
        </button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4"><Link to="/">← Vissza a kezdőlapra</Link></p>
    </section>
  );
}
