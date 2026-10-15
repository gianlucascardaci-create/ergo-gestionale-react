import { useEffect, useRef } from 'react';
import markup from './legacy/markup.html?raw';
import legacyScript from './legacy/scripts/01.js?raw';

export default function App() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    window.ERGO_SUPABASE_CONFIG = {
      url: import.meta.env.VITE_SUPABASE_URL || '',
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    };

    const root = document.getElementById('legacy-root');
    if (!root) return;
    root.innerHTML = markup;

    // L’HTML originale contiene un unico blocco JavaScript inline molto grande.
    // Lo eseguiamo dopo il mount React, mantenendo intatta la logica esistente.
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = legacyScript;
    document.body.appendChild(script);

    return () => {};
  }, []);

  return <main id="legacy-root" aria-label="Ergo Gestionale" />;
}
