import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BedDouble, Building2, Car, MapPin, Menu, MessageCircle, Ruler, X } from 'lucide-react';
import { faixaQuartos, linkImovel, quantidadeVagas } from './catalogo.js';
import { creci, telefone, whatsapp } from './contato.js';

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
      <span className="marca-texto"><strong>Lucas Carvalho</strong>{' '}<small>Consultoria Imobiliária</small></span>
    </span>
  );
}

export function WhatsApp({ children = 'Falar no WhatsApp', mensagem, className = '', principal = false }) {
  return (
    <a className={`botao ${className}`} href={whatsapp(mensagem)} target="_blank" rel="noopener noreferrer"
      data-whatsapp-principal={principal || undefined}>
      <MessageCircle size={17} aria-hidden="true" />{children}
    </a>
  );
}

const linksMenu = [
  ['Início', rotas.inicio, ['inicio']],
  ['Imóveis', rotas.imoveis, ['imoveis', 'detalhe']],
  ['Sobre', rotas.sobre, ['sobre']],
  ['Contato', rotas.contato, []]
];

export function Cabecalho({ pagina }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const botaoMenu = useRef(null);

  return (
    <header className="cabecalho"
      onBlur={evento => {
        if (menuAberto && !evento.currentTarget.contains(evento.relatedTarget)) setMenuAberto(false);
      }}
      onKeyDown={evento => {
        if (evento.key !== 'Escape' || !menuAberto) return;
        evento.preventDefault();
        setMenuAberto(false);
        botaoMenu.current.focus();
      }}>
      <a href="#conteudo" className="pular">Pular para o conteúdo</a>
      <div className="cabecalho-barra moldura">
        <a href={rotas.inicio} aria-label="Lucas Carvalho Consultoria Imobiliária – página inicial"><Marca /></a>
        <button type="button" className="botao-menu" ref={botaoMenu} aria-controls="menu-principal"
          aria-expanded={menuAberto} aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuAberto(aberto => !aberto)}>
          {menuAberto ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <nav id="menu-principal" className="cabecalho-nav" aria-label="Menu principal" data-aberto={menuAberto}>
          {linksMenu.map(([titulo, href, paginas]) => (
            <a key={titulo} href={href} aria-current={paginas.includes(pagina) ? 'page' : undefined}
              onClick={() => setMenuAberto(false)}>{titulo}</a>
          ))}
          <WhatsApp className="botao--marinho cabecalho-whatsapp-mobile" />
        </nav>
        <WhatsApp className="botao--marinho cabecalho-whatsapp">WhatsApp</WhatsApp>
      </div>
    </header>
  );
}

export function Chips({ titulo, opcoes, valor, onChange }) {
  return (
    <fieldset className="grupo-chips">
      <legend>{titulo}</legend>
      <div className="lista-chips">
        {opcoes.map(({ valor: opcao, rotulo }) => (
          <button key={opcao} type="button" className="chip" aria-pressed={valor === opcao}
            onClick={() => onChange(opcao)}>{rotulo}</button>
        ))}
      </div>
    </fieldset>
  );
}

export function TituloSecao({ etiqueta, children, id }) {
  return <div className="titulo-secao"><span className="etiqueta"><span />{etiqueta}</span><h2 id={id}>{children}</h2></div>;
}

export function CartaoImovel({ imovel, consulta }) {
  const capa = imovel.fotos[0];
  return (
    <article className="cartao">
      <a href={linkImovel(imovel.id, consulta)} className="cartao-link">
        <div className={`cartao-foto cartao-foto--${imovel.id}`}>
          <img src={capa.image.replace('.webp', '-card.webp')} alt="" loading="lazy" decoding="async" />
          <div className="cartao-selos">
            {imovel.fase && <span className="cartao-tipo cartao-fase">{imovel.fase}</span>}
            <span className="cartao-tipo">{capa.tipo}</span>
          </div>
        </div>
        <div className="cartao-dados">
          <div className="local"><MapPin size={14} aria-hidden="true" />{imovel.regiao}, DF</div>
          <h3>{imovel.nome}</h3>
          <div className="cartao-rodape">
            <div className="cartao-fatos">
              <span><BedDouble size={17} aria-hidden="true" />{faixaQuartos(imovel)}</span>
              {imovel.metragem && <span><Ruler size={17} aria-hidden="true" />{imovel.metragem}</span>}
              {imovel.vagas != null && <span><Car size={17} aria-hidden="true" />{quantidadeVagas(imovel.vagas)}</span>}
            </div>
            {imovel.aPartirDe && <span className="preco-imovel">A partir de <strong>{imovel.aPartirDe}</strong></span>}
            <span className="cartao-seta">Ver imóvel <ArrowUpRight size={15} aria-hidden="true" /></span>
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
        <div className="rodape-base"><span>© {new Date().getFullYear()} Lucas Carvalho</span><span>Brasília · Distrito Federal</span>{creci && <span>{creci}</span>}</div>
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
