import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/szolgaltatasok")({
  head: () => ({ meta: [{ title: "Szolgáltatások — Csányi Levéltár" }, { name: "description", content: "Szolgáltatások oldal." }] }),
  component: Page,
});
function Page() {
  return (
    <section className="container-prose py-16">
      <h1 className="font-serif text-4xl text-primary">Szolgáltatások</h1>
      <div className="gold-rule my-6 max-w-xs" />
      <div className="prose max-w-3xl text-foreground/85 space-y-4"><p>Teljes körű családfakutatás levéltári forrásokból. A részletes árajánlatért kérjen időpontot.</p><ul className="list-disc pl-6 space-y-2"><li>Anyakönyvi kutatás (1700-tól)</li><li>Vármegyei levéltári források</li><li>DNS-eredmények értelmezése</li><li>Hitelesített dokumentumok beszerzése</li><li>Nyomtatott családfa-kötet</li><li>Címer- és nemességkutatás</li></ul></div>
    </section>
  );
}
