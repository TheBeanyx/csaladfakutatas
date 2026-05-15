import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/admin/uzenetek")({ component: Page });

function Page() {
  const [convs, setConvs] = useState<any[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    supabase.from("conversations").select("id, user_id, last_message_at, profiles:profiles!conversations_user_id_fkey(full_name,email)")
      .order("last_message_at", { ascending: false }).then(({ data }) => setConvs(data ?? []));
  }, []);

  useEffect(() => {
    if (!active) return;
    supabase.from("messages").select("*").eq("conversation_id", active).order("created_at").then(({ data }) => setMsgs(data ?? []));
    const ch = supabase.channel("a-msgs-" + active)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${active}` },
        (p) => setMsgs((prev) => [...prev, p.new])).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [active]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!active || !text.trim()) return;
    await supabase.from("messages").insert({ conversation_id: active, sender_role: "admin", body: text.trim().slice(0, 4000) });
    await supabase.from("conversations").update({ last_message_at: new Date().toISOString() }).eq("id", active);
    setText("");
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-primary">Üzenetek</h1>
      <p className="text-xs text-muted-foreground mt-1">Az ügyfél felé minden üzenet „Admin" névvel jelenik meg.</p>
      <div className="mt-6 grid md:grid-cols-[280px_1fr] gap-4 h-[65vh]">
        <div className="ornate-card overflow-y-auto">
          {convs.map((c: any) => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className={`w-full text-left p-3 border-b border-border hover:bg-muted/50 ${active === c.id ? "bg-muted" : ""}`}>
              <div className="text-sm font-medium text-primary truncate">{c.profiles?.full_name || c.profiles?.email || "Ügyfél"}</div>
              <div className="text-xs text-muted-foreground">{new Date(c.last_message_at).toLocaleString("hu-HU")}</div>
            </button>
          ))}
          {convs.length === 0 && <p className="p-4 text-sm text-muted-foreground">Nincs beszélgetés.</p>}
        </div>
        <div className="ornate-card flex flex-col">
          {!active ? <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Válasszon beszélgetést</div> : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {msgs.map((m: any) => (
                  <div key={m.id} className={`flex ${m.sender_role === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${m.sender_role === "admin" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <div className="text-[10px] opacity-70 mb-0.5">{m.sender_role === "admin" ? "Admin (Ön)" : "Ügyfél"}</div>
                      {m.body}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={send} className="border-t border-border p-3 flex gap-2">
                <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Válasz…" maxLength={4000} />
                <Button type="submit">Küldés</Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
