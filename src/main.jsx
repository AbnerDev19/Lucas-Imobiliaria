import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MessageCircle } from 'lucide-react';
import '@fontsource-variable/manrope';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/fraunces/wght-italic.css';
import { Catalogo, Detalhe, Inicio, Sobre } from './Paginas.jsx';
import { whatsapp } from './contato.js';
import { Cabecalho, Rodape } from './ui.jsx';
import './site.css';

const paginas = { inicio: Inicio, imoveis: Catalogo, detalhe: Detalhe, sobre: Sobre };
const pagina = document.body.dataset.pagina || 'inicio';
const Pagina = paginas[pagina];

function Site() {
  useEffect(() => {
    if (window.location.hash) {
      const frame = requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView());
      return () => cancelAnimationFrame(frame);
    }
  }, []);
  return (
    <>
      <Cabecalho pagina={pagina} />
      <main id="conteudo" tabIndex={-1}><Pagina /></main>
      <Rodape />
      <a className="whatsapp-flutuante" href={whatsapp()} target="_blank" rel="noopener noreferrer"
        aria-label="Falar com Lucas Carvalho no WhatsApp"><MessageCircle aria-hidden="true" size={25} /></a>
    </>
  );
}

createRoot(document.getElementById('app')).render(<Site />);
