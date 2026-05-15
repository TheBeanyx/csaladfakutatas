import { Link } from "@tanstack/react-router";
export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-prose py-12 grid md:grid-cols-2 gap-8 text-sm">
        <div>
          <div className="font-serif text-2xl text-gold">Családfakutatás</div>
          <p className="mt-2 text-primary-foreground/70 max-w-xs">
            Hiteles családfakutatás levéltári forrásokból, 25 év tapasztalattal.
          </p>
        </div>
        <div>
          <div className="text-gold uppercase tracking-wider text-xs mb-3">Navigáció</div>
          <ul className="space-y-1.5">
            <li><Link to="/szolgaltatasok">Szolgáltatások</Link></li>
            <li><Link to="/csaladfa">Élő családfa</Link></li>
            <li><Link to="/rolam">Rólam</Link></li>
            <li><Link to="/idopont">Időpont kérése</Link></li>
            <li><Link to="/kapcsolat">Kapcsolat</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-4 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Családfakutatás — Minden jog fenntartva.
      </div>
    </footer>
  );
}
