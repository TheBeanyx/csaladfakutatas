import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/rolam")({
  head: () => ({ meta: [{ title: "Rólam — Csányi Levéltár" }, { name: "description", content: "Rólam oldal." }] }),
  component: Page,
});
function Page() {
  return (
    <section className="container-prose py-16">
      <h1 className="font-serif text-4xl text-primary">Rólam</h1>
      <div className="gold-rule my-6 max-w-xs" />
      <div className="prose max-w-3xl text-foreground/85 space-y-4"><p>Csányi Péter genealógus, a Magyar Genealógiai és Heraldikai Társaság tagja. 1998 óta foglalkozom családfakutatással, eddig több mint 2400 család történetét tártam fel.</p><p>Munkám alapja a tudományos pontosság: minden megállapítást levéltári jelzettel dokumentálok, az ügyfél a kutatás végén teljes forrásjegyzéket kap.</p></div>
    </section>
  );
}
