import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ScrollText, Menu } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/szolgaltatasok", label: "Szolgáltatások" },
    { to: "/csaladfa", label: "Élő családfa" },
    { to: "/rolam", label: "Rólam" },
    { to: "/kapcsolat", label: "Kapcsolat" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/85 border-b border-border">
      <div className="container-prose flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gold/60 text-gold bg-primary">
            <ScrollText className="w-4 h-4" />
          </span>
          <div className="leading-tight">
            <div className="font-serif text-xl text-primary">Csányi Levéltár</div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">Családfakutatás · 1998</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Button variant="ghost" asChild size="sm">
                  <Link to="/admin">Admin</Link>
                </Button>
              )}
              <Button variant="ghost" asChild size="sm">
                <Link to="/fiok">Fiókom</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>Kilépés</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Bejelentkezés</Link>
              </Button>
              <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/idopont">Időpont kérése</Link>
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menü">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-prose py-3 flex flex-col gap-2">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-sm">
                {n.label}
              </Link>
            ))}
            <Link to="/idopont" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-primary">
              Időpont kérése
            </Link>
            {user ? (
              <>
                {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="py-2 text-sm">Admin</Link>}
                <Link to="/fiok" onClick={() => setOpen(false)} className="py-2 text-sm">Fiókom</Link>
                <button onClick={() => { setOpen(false); signOut(); }} className="py-2 text-sm text-left">Kilépés</button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="py-2 text-sm">Bejelentkezés</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
