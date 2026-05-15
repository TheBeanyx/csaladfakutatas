import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ScrollText, Shield, Search, Users, BookOpen, Award } from "lucide-react";
import heroImg from "@/assets/hero-archive.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Családfakutatás — Találja meg elveszett rokonait" },
      { name: "description", content: "Tudományos igényű családfakutatás levéltári forrásokból. Időpontfoglalás, online konzultáció, interaktív családfa." },
      { property: "og:title", content: "Csaladáfakutatás — Fény derül az igazságra" },
      { property: "og:description", content: "Levéltári kutatás, anyakönyvi források, DNS-eredmények értelmezése." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-prose pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge-seal"><Award className="w-3 h-3" /> Privát és Hiteles adatok</span>
            <h1 className="mt-5 font-serif text-5xl md:text-6xl leading-[1.05] text-primary">
              Találja meg <em className="text-secondary">elveszett</em>rokonait!
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Nem is meri rokonait, kapcsolatot szeretne termeteni az elveszett családtagait, szeretne egy vizuális csaladfát?
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/idopont">Időpont kérése</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gold/60 text-primary">
                <Link to="/csaladfa">Vizuális családfa megtekintése</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div><span className="font-serif text-2xl text-primary">2400+</span><div>kutatott család</div></div>
              <div className="w-px h-8 bg-border" />
              <div><span className="font-serif text-2xl text-primary">25</span><div>év tapasztalat</div></div>
              <div className="w-px h-8 bg-border" />
              <div><span className="font-serif text-2xl text-primary">17</span><div>levéltári partner</div></div>
            </div>
          </div>

          <div className="relative">
            <div className="ornate-card overflow-hidden p-0">
              <img src={heroImg} alt="Levéltári családfa-kutatás" width={1536} height={1024} className="w-full h-64 object-cover" />
              <div className="p-8">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <ScrollText className="w-5 h-5 text-gold" />
                <div className="font-serif text-xl text-primary">Példa: Kovács család</div>
              </div>
              <ol className="mt-5 space-y-3 text-sm">
                {[
                  ["1782", "Kovács István — Eger, római katolikus anyakönyv"],
                  ["1814", "Kovács Mihály születési bejegyzése — Heves vm."],
                  ["1857", "Birtokösszeírás, urbárium — Egri Káptalan"],
                  ["1895", "Polgári anyakönyvezés indulása"],
                  ["1947", "Kivándorlási iratok — Hamburg, II. osztály"],
                ].map(([y, t]) => (
                  <li key={y} className="flex gap-4">
                    <span className="font-serif text-gold w-12 shrink-0">{y}</span>
                    <span className="text-foreground/85">{t}</span>
                  </li>
                ))}
              </ol>
              <div className="gold-rule my-6" />
              <p className="text-xs text-muted-foreground italic">
                Minden bejegyzés dokumentált: jelzet, levéltár, oldalszám.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="badge-seal">Szolgáltatások</span>
          <h2 className="mt-4 font-serif text-4xl text-primary">Amit elvégzünk Önnek</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: Search, title: "Anyakönyvi kutatás", t: "Római katolikus, református, evangélikus, izraelita anyakönyvek 1700-tól." },
            { icon: BookOpen, title: "Levéltári források", t: "Urbáriumok, összeírások, telekkönyvek, vármegyei iratok." },
            { icon: Users, title: "DNS-eredmények értelmezése", t: "MyHeritage / Ancestry / FamilyTreeDNA szakértői összevetés." },
            { icon: Shield, title: "Hitelesített dokumentumok", t: "Hivatalos másolatok beszerzése, anyakönyvi kivonatok." },
            { icon: ScrollText, title: "Családfa-kötet készítése", t: "Nyomtatott, illusztrált családtörténeti kiadvány." },
            { icon: Award, title: "Címer- és nemességkutatás", t: "Heraldikai elemzés, nemesi származás bizonyítása." },
          ].map((s) => (
            <div key={s.title} className="ornate-card p-6">
              <s.icon className="w-6 h-6 text-gold" />
              <h3 className="mt-4 font-serif text-xl text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-20">
        <div className="container-prose grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-gold uppercase tracking-[0.2em] text-xs">Konzultáció</span>
            <h2 className="mt-3 font-serif text-4xl">Beszéljük át személyesen</h2>
            <p className="mt-4 text-primary-foreground/80">
              Foglaljon időpontot online, telefonos vagy személyes konzultációra.
              Az első 30 perces beszélgetés ingyenes.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/idopont">Időpontot kérek</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
