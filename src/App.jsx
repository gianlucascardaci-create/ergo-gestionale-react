import { useEffect, useRef } from 'react';
import markup from './legacy/markup.html?raw';
import legacyScript from './legacy/scripts/01.js?raw';

const prodottiDemo = [
  { id: 'demo-sed-001', codice: 'SED-001', nome: 'Sedia Tiffany bianca', categoria: 'SEDIE', quantita: 120, prezzo: 3.5, quantitaIniziale: 120 },
  { id: 'demo-tav-014', codice: 'TAV-014', nome: 'Tavolo imperiale 3 metri', categoria: 'TAVOLI', quantita: 18, prezzo: 48, quantitaIniziale: 18 },
  { id: 'demo-tov-022', codice: 'TOV-022', nome: 'Tovagliato bianco premium', categoria: 'TOVAGLIATO', quantita: 80, prezzo: 8.5, quantitaIniziale: 80 },
  { id: 'demo-luc-008', codice: 'LUC-008', nome: 'Catena luminosa calda', categoria: 'LUCI E CANDELABRI', quantita: 35, prezzo: 12, quantitaIniziale: 35 },
  { id: 'demo-cal-003', codice: 'CAL-003', nome: 'Calice vino lavorato', categoria: 'BICCHIERI', quantita: 240, prezzo: 1.9, quantitaIniziale: 240 },
  { id: 'demo-bar-006', codice: 'BAR-006', nome: 'Banco bar modulare', categoria: 'ARREDO', quantita: 8, prezzo: 65, quantitaIniziale: 8 },
];

export default function App() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    window.ERGO_BOZZA_DEMO = true;
    window.ERGO_SUPABASE_CONFIG = null;
    localStorage.setItem('ergo_prodotti', JSON.stringify(prodottiDemo));
    localStorage.removeItem('ergo_sessione_persistente');

    const root = document.getElementById('legacy-root');
    if (!root) return;
    root.innerHTML = markup;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = `${legacyScript}\nif(window.ERGO_BOZZA_DEMO){user={username:'bozza-demo',ruolo:'Amministratore',nome:'Bozza Preventivi',email:'',iniziali:'BP'};view='preventivi';app();}`;
    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  return <main id="legacy-root" aria-label="Bozza Preventivi" />;
}
