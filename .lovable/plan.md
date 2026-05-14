# Családfakutató weboldal — v1 terv

## Design rendszer
- **Paletta**: navy `#0c2340`, mély kék `#1a4a6e`, arany akcens `#c9a84c`, világos `#e8edf3`
- **Tipográfia**: `Instrument Serif` címekhez (intézményi/tudományos), `Work Sans` szöveghez
- **Stílus**: hiteles, levéltári, dokumentumszerű részletek (családi címer ikonok, pergamenszerű kártyák)

## Publikus oldalak (külön route-ok, SSR + SEO)
- `/` — hero, bemutatkozás, szolgáltatások előzetes, vélemények, CTA
- `/szolgaltatasok` — családfakutatás, levéltári kutatás, DNS-elemzés értelmezés, dokumentumfordítás
- `/rolam` — kutatói bemutatkozás, módszertan, hitelesítő pecsétek
- `/csaladfa` — interaktív élő családfa (publikusan böngészhető, javaslattételi lehetőség)
- `/idopont` — időpontfoglalási űrlap (vendég vagy bejelentkezett ügyfél)
- `/kapcsolat` — kontakt + üzenetküldés
- `/auth` — bejelentkezés / regisztráció

## Bejelentkezett ügyfél (`/_authenticated/...`)
- `/fiok` — saját foglalások, üzenetek admin-nal, beadott családfa-javaslatok státusza
- `/uzenetek` — chat admin-nal (admin neve sosem látszik, csak "Admin")
- `/hivas/$id` — voice hívás szoba (WebRTC + Web Audio pitch shift voice changer)

## Admin panel (`/_authenticated/_admin/...`)
- `/admin` — dashboard (új foglalások, olvasatlan üzenetek, javaslat-várólista)
- `/admin/idopontok` — foglalások kezelése (jóváhagyás, törlés, státusz)
- `/admin/ugyfelek` — ügyfél lista
- `/admin/uzenetek` — összes beszélgetés, válaszadás (kifelé "Admin" név)
- `/admin/csaladfa` — családfa node-ok szerkesztése, ügyfél-javaslatok jóváhagyása
- `/admin/hivasok` — bejövő hívás indítás ügyféllel

## Adatbázis (Lovable Cloud / Supabase)
- `profiles` — id (FK auth.users), full_name, email, created_at
- `user_roles` — id, user_id, role (`admin`|`user`) — külön tábla, has_role() biztonsági függvénnyel
- `appointments` — id, user_id (nullable vendég), name, email, phone, service_type, requested_at, status (`pending`|`confirmed`|`cancelled`|`done`), notes
- `conversations` — id, user_id, last_message_at
- `messages` — id, conversation_id, sender_role (`user`|`admin`), body, created_at (admin neve **soha** nem szerepel)
- `family_tree_nodes` — id, parent_id, name, birth_year, death_year, birth_place, notes, status (`approved`|`suggested`), suggested_by (user_id, nullable)
- `call_sessions` — id, caller_id, callee_id, status, started_at, ended_at — WebRTC signaling Supabase Realtime-on keresztül

RLS minden táblán; `has_role(uid, 'admin')` security definer függvény.

## Voice hívás + voice changer
- WebRTC peer connection, signaling Supabase Realtime broadcast channel-en
- Web Audio API: `AudioContext` → `MediaStreamSource` → custom pitch-shift `AudioWorkletNode` (egyszerű granular pitch shift) → `MediaStreamDestination` → RTCPeerConnection track
- Beépített pitch slider (-12 … +12 semitone), enable/disable kapcsoló
- Admin oldalon a saját mikrofon stream a voice changeren megy át mielőtt az ügyfélhez kerül

## Élő családfa
- Vizualizáció: SVG-alapú fa (`d3-hierarchy` layout, kézi SVG render, függőség-mentes alternatíva ha szükséges)
- Ügyfél: node-ra kattint → "Javaslat hozzáadása" form (új gyermek/szülő/megjegyzés) → `status: suggested`
- Admin: jóváhagyja vagy elutasítja, szerkeszt, töröl
- Csak `approved` node-ok látszanak a publikus nézetben; admin nézetben javaslatok is

## Auth
- Email/jelszó + Google (broker-en keresztül)
- Első admin: az `admin@csaladfakutatas.hu` email regisztrációkor automatikus admin szerep (DB trigger)
- Üzenetekben az admin küldéskor a `sender_role='admin'`, és sosem jelenik meg a valódi név

## Tech stack
- TanStack Start + React 19 + Tailwind v4 + shadcn/ui
- Lovable Cloud (Supabase) — auth, DB, realtime, RLS
- Server functions a védett műveletekhez (`createServerFn` + `requireSupabaseAuth`)
- WebRTC + Supabase Realtime signaling

## Megvalósítás sorrendje
1. Lovable Cloud bekapcsolása + DB séma + RLS + admin trigger
2. Design system (`styles.css`) + fontok + base layout (header/footer)
3. Publikus oldalak (home, szolgáltatások, rólam, kapcsolat) + SEO
4. Auth flow + `/auth` oldal
5. Időpontfoglalás (publikus űrlap + admin kezelés)
6. Üzenetek (ügyfél ↔ admin, anonim admin)
7. Élő családfa (publikus nézet + ügyfél javaslat + admin jóváhagyás)
8. Voice hívás voice changerrel
9. Admin dashboard összerakása

## Megjegyzés
Ez egy nagyon nagy első verzió. A voice hívás WebRTC része böngészőben fut, és teljes két irányú TURN szerver hiányában szigorú NAT mögött nem mindig működik — ehhez később esetleg külső TURN szolgáltató (pl. Twilio NTS) kell. A voice changer Web Audio alapú, valós idejű, de nem stúdió-minőségű.
