# Bozza Preventivi — lavoro separato

Questo branch è il workspace dedicato esclusivamente alla Bozza Preventivi.

## Regola operativa

Quando si lavora sull’app ufficiale si usa il branch `main` e si possono modificare l’app principale e il suo Supabase.

Quando si lavora sulla Bozza Preventivi si usa il branch `bozza-preventivi`. Le modifiche restano qui e non vengono applicate alla `main` né al Supabase ufficiale.

La bozza mantiene lo stesso linguaggio grafico dell’app principale per rendere semplice l’integrazione futura, ma il lavoro resta separato fino a un merge esplicito.

## Integrazione futura

Non si fanno merge automatici. Quando la bozza sarà pronta, si potrà integrare selettivamente il codice della bozza nella `main`, verificando prima componenti, dati e collegamenti Supabase.
