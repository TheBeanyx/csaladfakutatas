import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/uzenetek")({ component: Page });

type Msg = { id: string; sender_role: "user" | "admin"; body: string; created_at: string };

function Page() {
  const [convId, setConvId] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      let { data: c } = await supabase.from("conversations").select("id").eq("user_id", user.id).maybeSingle();
      if (!c) {
        const { data: nc } = await supabase.from("conversations").insert({ user_id: user.id }).select("id").single();
        c = nc;
      }
      if (!c) return;
      setConvId(c.id);
      const { data: m } = await supabase.from("messages").select("*").eq("conversation_id", c.id).order("created_at");
      setMsgs((m ?? []) as Msg[]);
      const ch = supabase.channel("msgs-" + c.id)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${c.id}` },
          (payload) => setMsgs((prev) => [...prev, payload.new as Msg]))
        .subscribe();
      return () => { supabase.removeChannel(ch); };
    })();
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!convId || !text.trim()) return;
    await supabase.from("messages").insert({ conversation_id: convId, sender_role: "user", body: text.trim().slice(0, 4000) });
    await supabase.from("conversations").update({ last_message_at: new Date().toISOString() }).eq("id", convId);
    setText("");
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-primary">Üzenetek</h1>
      <p className="text-sm text-muted-foreground mt-1">Beszélgetés a kutatóval. A válaszadó kiléte titkos — minden válaszunkat „Admin" név alatt küldjük.</p>
      <div className="ornate-card mt-6 flex flex-col h-[60vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msgs.map((m) => (
            <div key={m.id} className={`flex ${m.sender_role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${m.sender_role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                <div className="text-[10px] opacity-70 mb-0.5">{m.sender_role === "user" ? "Ön" : "Admin"}</div>
                {m.body}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <form onSubmit={send} className="border-t border-border p-3 flex gap-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Üzenet…" maxLength={4000} />
          <Button type="submit">Küldés</Button>
        </form>
      </div>
    </div>
  );
}
