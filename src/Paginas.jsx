import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowUpRight, BedDouble, Building2, Check, ChevronLeft,
  ChevronRight, MapPin, Maximize2, Search, X
} from 'lucide-react';
import AccordionGallery from './react-bits/AccordionGallery.jsx';
import AnimatedContent from './react-bits/AnimatedContent.jsx';
import AnimatedList from './react-bits/AnimatedList.jsx';
import BranchedMenu from './react-bits/BranchedMenu.jsx';
import ClickSpark from './react-bits/ClickSpark.jsx';
import GradientText from './react-bits/GradientText.jsx';
import { Contato, Especialidades } from './Atendimento.jsx';
import { destaques, faixaQuartos, imoveis, linkImovel, normalizarBusca, regioes } from './catalogo.js';
import { mensagemImovel } from './contato.js';
import { CartaoImovel, LinkSeta, TituloSecao, WhatsApp, rotas, useMedia } from './ui.jsx';

const slides = [
  [imoveis[0], 2],
  [imoveis[3], 1],
  [imoveis[1], 0]
].map(([imovel, indice]) => ({ ...imovel.fotos[indice], id: imovel.id, nome: imovel.nome }));

function Hero() {
  const [indice, setIndice] = useState(0);
  const foto = slides[indice];
  const mudar = passo => setIndice(atual => (atual + passo + slides.length) % slides.length);

  return (
    <section className="hero" aria-labelledby="titulo-inicio">
      <div className="hero-imagem" aria-hidden="true">
        <img key={foto.image} src={foto.image} alt="" fetchPriority="high" />
      </div>
      <div className="moldura hero-moldura">
        <AnimatedContent className="hero-copy" trigger="load" distance={15} duration={0.55} stagger={0.08}>
          <span className="etiqueta"><span />Imóveis em Brasília e no DF</span>
          <h1 id="titulo-inicio">O lugar certo<br />para a sua <em><GradientText colors={['#f1c9a7', '#fff1de', '#dcb395']}
            animationSpeed={10} variant="flow">história.</GradientText></em></h1>
          <p>Encontre seu próximo imóvel no Distrito Federal com a orientação de Lucas Carvalho.</p>
          <div className="hero-botoes">
            <a href={rotas.imoveis} className="botao botao--creme">Explorar imóveis <ArrowUpRight size={17} aria-hidden="true" /></a>
            <WhatsApp className="botao--hero" />
          </div>
        </AnimatedContent>
        <div className="hero-rodape">
          <a href="#destaques" className="descer"><ArrowDown size={15} aria-hidden="true" /> Ver destaques</a>
          <div className="hero-galeria">
            <a href={linkImovel(foto.id)} className="hero-legenda" aria-live="polite">
              <span>{foto.tipo}</span>{foto.nome}
            </a>
            <ClickSpark sparkColor="#e8c29b" sparkCount={6} sparkSize={10} sparkRadius={22} duration={330}
              className="hero-controles" style={{ width: 'auto', height: 'auto' }}>
              <button type="button" onClick={() => mudar(-1)} aria-label="Imagem anterior"><ChevronLeft size={19} /></button>
              <button type="button" onClick={() => mudar(1)} aria-label="Próxima imagem"><ChevronRight size={19} /></button>
            </ClickSpark>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Inicio() {
  return (
    <>
      <Hero />
      <section className="moldura secao destaques" id="destaques" aria-labelledby="titulo-destaques">
        <div className="secao-topo">
          <TituloSecao etiqueta="Empreendimentos" id="titulo-destaques">Imóveis em destaque</TituloSecao>
          <LinkSeta href={rotas.imoveis}>Ver todos os imóveis</LinkSeta>
        </div>
        <AnimatedContent className="grade-imoveis" distance={15} duration={0.5} stagger={0.07}>
          {destaques.map(imovel => <CartaoImovel key={imovel.id} imovel={imovel} />)}
        </AnimatedContent>
      </section>
      <Especialidades />
      <Contato />
    </>
  );
}

const menuRegioes = [{
  label: 'Regiões do DF',
  children: [{ value: '', label: 'Todas as regiões' }, ...regioes.map(regiao => ({ value: regiao, label: regiao }))]
}];

export function Catalogo() {
  const [busca, setBusca] = useState('');
  const [regiao, setRegiao] = useState('');
  const [quartos, setQuartos] = useState('');
  const [menuKey, setMenuKey] = useState(0);

  const termo = normalizarBusca(busca);
  const resultados = imoveis.filter(imovel => {
    const texto = normalizarBusca(`${imovel.nome} ${imovel.regiao} Brasília DF`);
    return (!regiao || imovel.regiao === regiao) && (!quartos || imovel.quartos.includes(Number(quartos))) &&
      termo.split(/\s+/).every(palavra => texto.includes(palavra));
  });
  const limpar = () => { setBusca(''); setQuartos(''); setRegiao(''); setMenuKey(atual => atual + 1); };

  return (
    <>
      <section className="pagina-intro">
        <div className="moldura">
          <span className="etiqueta"><span />Distrito Federal</span>
          <h1>Encontre seu imóvel.</h1>
          <p>Compare empreendimentos por região e número de quartos. Consulte Lucas para saber valores e disponibilidade.</p>
        </div>
      </section>
      <section className="moldura catalogo" aria-label="Catálogo de imóveis">
        <aside className="filtros">
          <label className="campo" htmlFor="busca">Buscar imóvel</label>
          <div className="busca"><Search size={17} aria-hidden="true" /><input id="busca" type="search" value={busca}
            onChange={evento => setBusca(evento.target.value)} placeholder="Nome ou região" /></div>
          <div className="menu-regiao">
            <BranchedMenu key={menuKey} items={menuRegioes} onSelect={setRegiao} width={236}
              color="#4d4037" accentColor="#904931" lineColor="#c9b7a5" rowHeight={38} fontSize={14} />
          </div>
          <label className="campo" htmlFor="quartos">Quartos</label>
          <select id="quartos" value={quartos} onChange={evento => setQuartos(evento.target.value)}>
            <option value="">Qualquer quantidade</option><option value="2">2 quartos</option><option value="3">3 quartos</option>
          </select>
          {(busca || quartos || regiao) && <button type="button" className="limpar" onClick={limpar}><X size={15} /> Limpar filtros</button>}
        </aside>
        <div className="resultados">
          <div className="resultados-topo">
            <h2>Empreendimentos</h2>
            <p role="status">{resultados.length} {resultados.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}</p>
          </div>
          {resultados.length ? <div className="grade-imoveis">
            {resultados.map(imovel => <CartaoImovel key={imovel.id} imovel={imovel} />)}
          </div> : <div className="resultado-vazio"><Search size={26} aria-hidden="true" />
            <h3>Nenhum imóvel encontrado</h3><p>Tente outro nome ou altere os filtros.</p>
            <button className="botao botao--contorno" type="button" onClick={limpar}>Limpar filtros</button>
          </div>}
        </div>
      </section>
    </>
  );
}

function Galeria({ imovel }) {
  const mobile = useMedia('(max-width: 620px)');
  const [ativa, setAtiva] = useState(0);
  const dialogo = useRef(null);
  const focoAnterior = useRef(null);
  const total = imovel.fotos.length;
  const foto = imovel.fotos[ativa];
  const mudar = passo => setAtiva(atual => (atual + passo + total) % total);
  const abrir = evento => {
    focoAnterior.current = evento.currentTarget;
    dialogo.current.showModal();
  };
  return (
    <section className="galeria-imovel" aria-labelledby="titulo-galeria">
      <div className="secao-topo">
        <TituloSecao etiqueta="Fotos e perspectivas" id="titulo-galeria">Galeria do imóvel</TituloSecao>
        <button type="button" className="link-seta" onClick={abrir}><Maximize2 size={17} aria-hidden="true" /> Tela cheia</button>
      </div>
      <AccordionGallery key={String(mobile)} items={imovel.fotos} defaultIndex={ativa} activeIndex={ativa}
        onActiveChange={setAtiva} orientation={mobile ? 'vertical' : 'horizontal'} height={mobile ? 245 : 386}
        expandRatio={0.66} gap={6} radius={6} grayscale={false} parallax={0.12} tilt={0}
        overlayColor="#271a14" trigger="click" />
      <div className="galeria-legenda" aria-live="polite"><strong>{foto.label}</strong><span>{foto.tipo}</span></div>
      <dialog ref={dialogo} className="dialogo-galeria" aria-label={`Galeria de ${imovel.nome}`}
        onClose={() => focoAnterior.current?.focus()}
        onKeyDown={evento => {
          if (evento.key === 'ArrowLeft' || evento.key === 'ArrowRight') {
            evento.preventDefault();
            mudar(evento.key === 'ArrowLeft' ? -1 : 1);
          }
        }}>
        <button className="dialogo-fechar" type="button" aria-label="Fechar galeria" onClick={() => dialogo.current.close()}><X /></button>
        <figure><img src={foto.image} alt={`${foto.label} de ${imovel.nome}`} /><figcaption>{foto.label} · {foto.tipo}</figcaption></figure>
        <div className="dialogo-controles">
          <button type="button" aria-label="Foto anterior" onClick={() => mudar(-1)}><ChevronLeft /></button>
          <span aria-live="polite">{ativa + 1} de {total}</span>
          <button type="button" aria-label="Próxima foto" onClick={() => mudar(1)}><ChevronRight /></button>
        </div>
      </dialog>
    </section>
  );
}

function Relacionados({ imovel }) {
  const proximos = imoveis.filter(item => item.id !== imovel.id)
    .sort((a, b) => Number(b.regiao === imovel.regiao) - Number(a.regiao === imovel.regiao))
    .slice(0, 3).map(item => ({
      id: item.id, image: item.fotos[0].image.replace('.webp', '-card.webp'),
      title: item.nome, description: item.regiao, meta: faixaQuartos(item)
    }));
  return (
    <section className="relacionados">
      <TituloSecao etiqueta="Explore o catálogo">Outros imóveis</TituloSecao>
      <AnimatedList items={proximos} width="100%" maxHeight={400} theme="light" frame={false}
        accentColor="#914a33" showGradients={false} selectOnHover={false} ariaLabel="Outros imóveis"
        onItemSelect={item => window.location.assign(linkImovel(item.id))} />
    </section>
  );
}

export function Detalhe() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get('imovel');
  const imovel = id === null ? destaques[0] : imoveis.find(item => item.id === id);
  useEffect(() => {
    document.title = imovel ? `${imovel.nome} | Lucas Carvalho` : 'Imóvel não encontrado | Lucas Carvalho';
  }, [imovel]);

  if (!imovel) return (
    <section className="moldura pagina-vazia">
      <h1>Imóvel não encontrado.</h1>
      <p>Veja outros empreendimentos no catálogo.</p>
      <LinkSeta href={rotas.imoveis}>Voltar aos imóveis</LinkSeta>
    </section>
  );

  const capa = imovel.fotos[0];
  return (
    <div className="moldura detalhe">
      <a className="voltar" href={rotas.imoveis}><ArrowLeft size={16} /> Voltar aos imóveis</a>
      <div className="detalhe-topo">
        <div className="detalhe-titulo">
          <span className="etiqueta"><span />Apartamento</span>
          <h1>{imovel.nome}</h1>
          <div className="detalhe-fatos"><span><MapPin size={17} />{imovel.regiao}, DF</span><span><BedDouble size={18} />{faixaQuartos(imovel)}</span></div>
        </div>
        <figure className={`detalhe-capa detalhe-capa--${imovel.id}`}>
          <img src={capa.image} alt={`${capa.label} de ${imovel.nome}`} fetchPriority="high" />
          <figcaption>{capa.tipo}</figcaption>
        </figure>
      </div>
      <div className="detalhe-grade">
        <div className="detalhe-corpo">
          <h2>Sobre o empreendimento</h2><p>{imovel.descricao}</p>
          <ul className="atributos">{imovel.atributos.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul>
          <Galeria imovel={imovel} />
        </div>
        <aside className="detalhe-contato">
          <span className="etiqueta"><span />Lucas Carvalho</span>
          <h2>Gostou deste imóvel?</h2>
          <p>Consulte valores e unidades disponíveis ou combine uma visita.</p>
          <WhatsApp className="botao--terracota" mensagem={mensagemImovel(imovel.nome)} />
        </aside>
      </div>
      <Relacionados imovel={imovel} />
    </div>
  );
}

export function Sobre() {
  return (
    <>
      <section className="moldura sobre">
        <AnimatedContent distance={18} duration={0.55} trigger="load">
          <span className="etiqueta"><span />Consultoria imobiliária</span>
          <h1>Lucas Carvalho.</h1>
          <p>Corretor de imóveis com atendimento voltado a quem busca comprar, investir ou conhecer empreendimentos no Distrito Federal.</p>
          <WhatsApp className="botao--terracota" />
          <LinkSeta href={rotas.imoveis} className="sobre-link">Conhecer os imóveis</LinkSeta>
        </AnimatedContent>
        <figure><img src="./media/aurora-4.webp" alt="Perspectiva das torres do Alto da Aurora" />
          <figcaption><Building2 size={16} /> Alto da Aurora, Sobradinho · Perspectiva ilustrativa</figcaption>
        </figure>
      </section>
      <Especialidades />
      <Contato />
    </>
  );
}
