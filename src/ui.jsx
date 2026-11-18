import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BedDouble, Building2, MapPin, MessageCircle } from 'lucide-react';
import CardNav from './react-bits/CardNav.jsx';
import { faixaQuartos, linkImovel } from './catalogo.js';
import { telefone, whatsapp } from './contato.js';

export const rotas = {
  inicio: './index.html',
  imoveis: './imoveis.html',
  sobre: './sobre.html',
  contato: './index.html#contato'
};

export function Marca() {
  return (
    <span className="marca">
      <span className="marca-icone"><Building2 aria-hidden="true" strokeWidth={1.4} /></span>
      <span className="marca-texto"><strong>Lucas Carvalho</strong><small>Consultoria Imobiliária</small></span>
    </span>
  );
}

export function WhatsApp({ children = 'Falar no WhatsApp', mensagem, className = '' }) {
  return (
    <a className={`botao ${className}`} href={whatsapp(mensagem)} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={17} aria-hidden="true" />{children}
    </a>
  );
}

const navItems = [
  { label: 'Imóveis', links: [{ label: 'Início', href: rotas.inicio }, { label: 'Ver empreendimentos', href: rotas.imoveis }] },
  { label: 'Atendimento', links: [{ label: 'Sobre o Lucas', href: rotas.sobre }, { label: 'Entrar em contato', href: rotas.contato }] }
];

export function Cabecalho({ pagina }) {
  const [menuAberto, setMenuAberto] = useState(false);
  return (
    <header className="cabecalho">
      <a href="#conteudo" className="pular">Pular para o conteúdo</a>
      <div className="cabecalho-desktop moldura">
        <a href={rotas.inicio} aria-label="Lucas Carvalho – página inicial"><Marca /></a>
        <nav aria-label="Menu principal">
          <a href={rotas.inicio} aria-current={pagina === 'inicio' ? 'page' : undefined}>Início</a>
          <a href={rotas.imoveis} aria-current={['imoveis', 'detalhe'].includes(pagina) ? 'page' : undefined}>Imóveis</a>
          <a href={rotas.sobre} aria-current={pagina === 'sobre' ? 'page' : undefined}>Sobre</a>
          <a href={rotas.contato}>Contato</a>
        </nav>
        <WhatsApp className="botao--terracota">WhatsApp</WhatsApp>
      </div>
      <div className="cabecalho-mobile">
        <CardNav logo={<Marca />} logoHref={rotas.inicio} logoAlt="Lucas Carvalho – página inicial"
          items={navItems} theme="light" surface="solid" cardHeight={106} maxWidth={720}
          cardEffect="rise" open={menuAberto} onOpenChange={setMenuAberto} intro={false}
          menuLabel={false} ariaLabel="Menu principal" accentColor="#9e533a"
          cta={{ label: 'Falar no WhatsApp', href: whatsapp(), target: '_blank' }} />
      </div>
    </header>
  );
}

export function TituloSecao({ etiqueta, children, id }) {
  return <div className="titulo-secao"><span className="etiqueta"><span />{etiqueta}</span><h2 id={id}>{children}</h2></div>;
}

export function CartaoImovel({ imovel }) {
  const capa = imovel.fotos[0];
  return (
    <article className="cartao">
      <a href={linkImovel(imovel.id)} className="cartao-link" aria-label={`Ver detalhes: ${imovel.nome}`}>
        <div className={`cartao-foto cartao-foto--${imovel.id}`}>
          <img src={capa.image.replace('.webp', '-card.webp')} alt={`${capa.label} de ${imovel.nome}`} loading="lazy" decoding="async" />
          <span className="cartao-tipo">Apartamento</span>
        </div>
        <div className="cartao-dados">
          <div className="local"><MapPin size={14} aria-hidden="true" />{imovel.regiao}, DF</div>
          <h3>{imovel.nome}</h3>
          <div className="cartao-rodape">
            <span><BedDouble size={17} aria-hidden="true" />{faixaQuartos(imovel)}</span>
            <span className="cartao-seta"><ArrowUpRight size={17} aria-hidden="true" /></span>
          </div>
        </div>
      </a>
    </article>
  );
}

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="moldura">
        <div className="rodape-principal">
          <div><a href={rotas.inicio}><Marca /></a><p>Empreendimentos no Distrito Federal.</p></div>
          <nav aria-label="Links do rodapé">
            <a href={rotas.imoveis}>Imóveis</a><a href={rotas.sobre}>Sobre o Lucas</a><a href={rotas.contato}>Contato</a>
          </nav>
          <a className="rodape-whatsapp" href={whatsapp()} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" size={17} />{telefone}<ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </div>
        <div className="rodape-base"><span>© {new Date().getFullYear()} Lucas Carvalho</span><span>Brasília · Distrito Federal</span></div>
      </div>
    </footer>
  );
}

export function LinkSeta({ href, children, className = '' }) {
  return <a href={href} className={`link-seta ${className}`}>{children}<ArrowRight size={17} aria-hidden="true" /></a>;
}

export function useMedia(query) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const media = matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}
