# Ergo Gestionale React

Prima migrazione ufficiale dell'app HTML esistente verso React + Vite.

Questa fase **non riscrive l'app**: mantiene markup, CSS e JavaScript legacy già funzionanti, ma li avvia dentro una struttura React compilabile e pronta per Vercel. La separazione graduale in componenti React verrà fatta nei passaggi successivi.

## Avvio locale

```bash
npm install
npm run dev
```

Build di produzione:

```bash
npm run build
```

## Supabase

Copia `.env.example` in `.env.local` e inserisci URL e anon key del **secondo progetto Supabase**. Non inserire mai la service-role key nel frontend.

```bash
cp .env.example .env.local
```

Lo schema iniziale è in `supabase-schema.sql`.

## Vercel

Impostazioni progetto:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

Environment Variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Piano di migrazione

1. Stabilizzare la versione React mantenendo il comportamento esistente.
2. Verificare login, dashboard, inventario, eventi, noleggi, PDF e allegati.
3. Portare definitivamente Supabase e Storage nei servizi React.
4. Separare progressivamente Dashboard, Inventario, Eventi, Noleggi e Assistente in componenti React.
5. Ottimizzare ulteriormente paginazione, ricerca server-side e lazy-loading.
