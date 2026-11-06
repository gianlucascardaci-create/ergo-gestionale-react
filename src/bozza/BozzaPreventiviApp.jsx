import { useMemo, useState } from 'react';
import './bozza.css';

const catalogoDemo = [
  { codice: 'SED-001', nome: 'Sedia Tiffany bianca', categoria: 'SEDUTE', prezzo: 3.5, qta: 120 },
  { codice: 'TAV-014', nome: 'Tavolo imperiale 3 metri', categoria: 'TAVOLI', prezzo: 48, qta: 18 },
  { codice: 'TOV-022', nome: 'Tovagliato bianco premium', categoria: 'TOVAGLIATO', prezzo: 8.5, qta: 80 },
  { codice: 'LUC-008', nome: 'Catena luminosa calda', categoria: 'ILLUMINAZIONE', prezzo: 12, qta: 35 },
  { codice: 'CAL-003', nome: 'Calice vino lavorato', categoria: 'CALICI', prezzo: 1.9, qta: 240 },
  { codice: 'BAR-006', nome: 'Banco bar modulare', categoria: 'BAR', prezzo: 65, qta: 8 },
];

const steps = ['Cliente e condizioni', 'Materiali e preventivo', 'Allegati e riepilogo'];

export default function BozzaPreventiviApp() {
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState('Tutte');
  const [righe, setRighe] = useState([{ ...catalogoDemo[0], quantita: 20 }]);
  const [saved, setSaved] = useState(false);
  const [cliente, setCliente] = useState('');

  const categorie = ['Tutte', ...new Set(catalogoDemo.map((item) => item.categoria))];
  const risultati = useMemo(() => catalogoDemo.filter((item) => {
    const matchesQuery = `${item.nome} ${item.codice}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoria === 'Tutte' || item.categoria === categoria;
    return matchesQuery && matchesCategory;
  }), [categoria, query]);
  const totale = righe.reduce((sum, item) => sum + item.prezzo * item.quantita, 0);

  const addItem = (item) => {
    setRighe((current) => current.some((row) => row.codice === item.codice)
      ? current.map((row) => row.codice === item.codice ? { ...row, quantita: row.quantita + 1 } : row)
      : [...current, { ...item, quantita: 1 }]);
  };

  return (
    <div className="bozza-shell">
      <aside className="bozza-sidebar">
        <div className="bozza-brand">
          <img src="/brand/logo-noleggio.jpeg" alt="Ergo e Scardaci" />
          <span>GESTIONALE</span>
        </div>
        <p className="bozza-sidebar-label">WORKSPACE DEMO</p>
        <button className="bozza-nav active">✦ <span>Bozza Preventivi</span></button>
        <button className="bozza-nav">◈ <span>Panoramica</span></button>
        <button className="bozza-nav">▦ <span>Calendario</span></button>
        <button className="bozza-nav">◆ <span>Inventario</span></button>
        <div className="bozza-sidebar-note">
          <strong>Area separata</strong>
          <span>Preview grafica senza collegamento a Supabase.</span>
        </div>
      </aside>

      <main className="bozza-main">
        <header className="bozza-topbar">
          <div><span className="breadcrumb">Gestionale /</span><strong> Bozza Preventivi</strong></div>
          <div className="bozza-demo-pill">● DEMO LOCALE</div>
        </header>

        <div className="bozza-content">
          <div className="bozza-heading">
            <div>
              <p className="bozza-eyebrow">PREVENTIVI · AREA RISERVATA</p>
              <h1>Nuovo preventivo</h1>
              <p className="bozza-lede">Prepara l’offerta, verifica il materiale e genera il documento per il cliente.</p>
            </div>
            <div className="bozza-number"><span>BOZZA LOCALE</span><strong>Preventivo DEMO-001</strong></div>
          </div>

          <div className="bozza-safe-note">Questa è una preview grafica autonoma. I dati sono demo e restano nel browser: nessuna modifica a inventario, calendario o Supabase.</div>

          <nav className="bozza-steps" aria-label="Fasi del preventivo">
            {steps.map((label, index) => <button key={label} className={index === step ? 'selected' : index < step ? 'done' : ''} onClick={() => setStep(index)}><b>{index + 1}</b><span>{label}</span></button>)}
          </nav>

          {step === 0 && <section className="bozza-card">
            <div className="bozza-card-title blue"><b>01</b><div><strong>Cliente e condizioni</strong><span>Prima completi i dati economici, poi scegli il materiale.</span></div></div>
            <div className="bozza-form-grid">
              <label>Cliente / azienda<input value={cliente} onChange={(event) => setCliente(event.target.value)} placeholder="Es. Villa Paradiso" /></label>
              <label>Telefono<input placeholder="333 1234567" /></label>
              <label>Email<input placeholder="cliente@email.it" /></label>
              <label>Codice fiscale / P. IVA<input placeholder="Codice fiscale o partita IVA" /></label>
              <label>CAP<input placeholder="95030" /></label>
              <label>Città<input placeholder="Compilata dal CAP" readOnly /></label>
              <label>Data inizio<input type="date" defaultValue="2026-11-06" /></label>
              <label>Data fine<input type="date" defaultValue="2026-11-07" /></label>
            </div>
            <div className="bozza-subcard"><div className="bozza-subtitle">Condizioni economiche</div><div className="bozza-economic-grid"><label>Sconto cliente<input type="number" placeholder="%" /></label><label>Facchinaggio e posizionamento<input type="number" placeholder="Prezzo €" /></label></div><small>Lo sconto è applicato solo ai prodotti e non al trasporto o ai servizi.</small></div>
            <div className="bozza-transport"><div><strong>Trasporto</strong><span>Scegli chi sostiene il costo.</span></div><div className="bozza-choice"><button className="selected">A carico del cliente<small>Nessun costo nel preventivo</small></button><button>A carico nostro<small>Calcolo in base a zona, giorni e km</small></button></div></div>
          </section>}

          {step === 1 && <section className="bozza-card">
            <div className="bozza-card-title violet"><b>02</b><div><strong>Materiale da quotare</strong><span>Trova un prodotto, indica la quantità e aggiungilo al preventivo.</span></div></div>
            <div className="bozza-catalog-head"><div><h2>Catalogo inventario</h2><small>Disponibilità demo verificata sulle date del preventivo</small></div><strong>{catalogoDemo.length} prodotti</strong></div>
            <div className="bozza-search"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cerca prodotto per nome o codice…" /><select value={categoria} onChange={(event) => setCategoria(event.target.value)}>{categorie.map((item) => <option key={item}>{item}</option>)}</select><button onClick={() => { setQuery(''); setCategoria('Tutte'); }}>Pulisci</button></div>
            <div className="bozza-catalog-grid">{risultati.map((item) => <article className="bozza-product" key={item.codice}><div className="bozza-product-icon">{item.categoria === 'SEDUTE' ? '⌂' : item.categoria === 'ILLUMINAZIONE' ? '✦' : '▱'}</div><div><strong>{item.nome}</strong><small>{item.categoria} · {item.codice}</small><span>€ {item.prezzo.toFixed(2)} · {item.qta} disponibili</span></div><button onClick={() => addItem(item)}>+ Aggiungi</button></article>)}</div>
            <div className="bozza-selected"><div className="bozza-catalog-head"><div><h2>Materiale nel preventivo</h2><small>Qui modifichi le quantità per ogni prodotto</small></div><strong>{righe.length} articoli</strong></div>{righe.map((item) => <div className="bozza-line" key={item.codice}><div><strong>{item.nome}</strong><small>{item.categoria} · € {item.prezzo.toFixed(2)}</small></div><input type="number" min="1" value={item.quantita} onChange={(event) => setRighe((rows) => rows.map((row) => row.codice === item.codice ? { ...row, quantita: Number(event.target.value) || 1 } : row))} /><b>€ {(item.prezzo * item.quantita).toFixed(2)}</b></div>)}<div className="bozza-total">Totale materiali <strong>€ {totale.toFixed(2)}</strong></div></div>
          </section>}

          {step === 2 && <section className="bozza-card">
            <div className="bozza-card-title amber"><b>03</b><div><strong>Allegati e riepilogo</strong><span>Inserisci i documenti prima di creare il PDF.</span></div></div>
            <div className="bozza-upload"><strong>＋ Aggiungi allegati al preventivo</strong><small>Restano nella bozza locale e vengono elencati nel PDF demo.</small></div>
            <div className="bozza-summary"><div><span>Cliente</span><strong>{cliente || 'Da compilare'}</strong></div><div><span>Materiali</span><strong>{righe.length} articoli</strong></div><div><span>Trasporto</span><strong>A carico del cliente</strong></div><div className="grand"><span>Totale preventivo</span><strong>€ {totale.toFixed(2)}</strong></div></div>
            <div className="bozza-actions"><button className="secondary" onClick={() => setSaved(true)}>Salva bozza locale</button><button className="primary" onClick={() => setSaved(true)}>Scarica preventivo demo</button></div>{saved && <div className="bozza-success">✓ Operazione demo completata. Nessun dato è stato inviato a Supabase.</div>}
          </section>}

          <div className="bozza-footer-nav"><button disabled={step === 0} onClick={() => setStep((value) => value - 1)}>← Indietro</button><span>Pagina {step + 1} di 3 · {steps[step]}</span><button className="primary" disabled={step === 2} onClick={() => setStep((value) => value + 1)}>Avanti →</button></div>
        </div>
      </main>
    </div>
  );
}
