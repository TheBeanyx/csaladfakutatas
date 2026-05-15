import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/kapcsolat")({
  head: () => ({ meta: [{ title: "Kapcsolat — Családfakutatás" }, { name: "description", content: "Kapcsolat oldal." }] }),
  component: Page,
});
function Page() {
  return (
    <section className="container-prose py-16">
      <h1 className="font-serif text-4xl text-primary">Kapcsolat</h1>
      <div className="gold-rule my-6 max-w-xs" />
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl"><div className="ornate-card p-6"><h3 className="font-serif text-xl text-primary">Iroda</h3><p className="mt-2 text-sm text-muted-foreground">1051 Budapest, Levéltár u. 12.<br/>H–P 9:00–17:00</p></div><div className="ornate-card p-6"><h3 className="font-serif text-xl text-primary">Elérhetőség</h3><p className="mt-2 text-sm text-muted-foreground">admin@csaladfakutatas.hu<br/>+36 1 234 5678</p></div></div>
    </section>
  );
}
