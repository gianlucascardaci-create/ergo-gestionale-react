# Quote ufficiali verificate il 15 ottobre 2026

- Supabase pricing: https://supabase.com/pricing
  - Free: 500 MB database per progetto, 1 GB file storage, 5 GB egress, 50.000 MAU, 2 progetti attivi.
- Supabase database size: https://supabase.com/docs/guides/platform/database-size
  - Il progetto Free entra in read-only quando il database reale supera 500 MB; la dimensione database include dati, indici e viste; la metrica si aggiorna giornalmente.
- Vercel Hobby: https://vercel.com/docs/plans/hobby
  - 100 GB Fast Data Transfer, 1.000.000 CDN requests, 1.000.000 function invocations, 4 CPU-hours, 360 GB-hours memory, 100 deployment/giorno.
  - Hobby è destinato a progetti personali/non commerciali secondo la pagina ufficiale.

Misure reali progetto Supabase al 2026-10-15:
- prodotti: 1
- eventi: 0
- noleggi: 0
- database_size da pg_database_size: 11 MB
- Storage immagini_prodotti: 3 oggetti, 33.000 byte
- Storage allegati_noleggi: nessun oggetto restituito

Misure locali Vercel al 2026-10-15:
- asset statici + bundle + assistenti/brand: circa 1,6 MB
- bundle JS: circa 628 KB
