import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowUpRight, BedDouble, Building2, Car, Check, ChevronLeft,
  ChevronRight, MapPin, Maximize2, Ruler, Search, X
} from 'lucide-react';
import AccordionGallery from './react-bits/AccordionGallery.jsx';
import AnimatedContent from './react-bits/AnimatedContent.jsx';
import GradientText from './react-bits/GradientText.jsx';
import { Contato, Especialidades } from './Atendimento.jsx';
import { destaques, faixaQuartos, fases, imoveis, linkImovel, normalizarBusca, opcoesQuartos, quantidadeVagas, regioes } from './catalogo.js';
import { depoimentos, fotoLucas, mensagemImovel } from './contato.js';
import { CartaoImovel, Chips, LinkSeta, TituloSecao, WhatsApp, rotas, useMedia } from './ui.jsx';
import { useMovimentoImagem } from './useMovimentoImagem.js';

const slides = [
  [imoveis[3], 1],
  [imoveis[0], 2],
  [imoveis[1], 0]
].map(([imovel, indice]) => ({ ...imovel.fotos[indice], id: imovel.id, nome: imovel.nome }));

function Hero() {
  const [indice, setIndice] = useState(0);
  const [solicitada, setSolicitada] = useState(0);
  const [carregadas, setCarregadas] = useState([0]);
  const moldura = useRef(null);
  const imagem = useRef(null);
  const foto = slides[indice];
  const mudar = passo => setSolicitada(atual => (atual + passo + slides.length) % slides.length);

  useMovimentoImagem(moldura, imagem);

  useEffect(() => {
    if (solicitada === indice) return;
    let ativa = true;
    const proxima = new Image();
    proxima.src = slides[solicitada].image;
    proxima.decode().then(() => {
      if (!ativa) return;
      setCarregadas(anteriores => anteriores.includes(solicitada) ? anteriores : [...anteriores, solicitada]);
      setIndice(solicitada);
    }, () => {
      if (ativa) setSolicitada(indice);
    });
    return () => { ativa = false; };
  }, [solicitada, indice]);

  return (
    <section className="hero" aria-labelledby="titulo-inicio">
      <div className="moldura hero-moldura">
        <AnimatedContent className="hero-copy" trigger="load" distance={18} duration={0.72} stagger={0.09}>
          <span className="etiqueta"><span />Consultoria imobiliária no DF</span>
          <h1 id="titulo-inicio">O lugar certo <span className="hero-segunda-linha">para a sua <em><GradientText
            colors={['#e5bc79', '#fff0c9', '#d3a962']} animationSpeed={15} variant="flow">história.</GradientText></em></span></h1>
          <p>Encontre seu próximo imóvel em Brasília e no Distrito Federal com a orientação de Lucas Carvalho.</p>
          <div className="hero-botoes">
            <a href={rotas.imoveis} className="botao botao--champagne">Explorar imóveis <ArrowUpRight size={17} aria-hidden="true" /></a>
            <WhatsApp className="botao--hero" principal />
          </div>
        </AnimatedContent>

        <div className="hero-visual">
          <div className="hero-imagem" ref={moldura} aria-hidden="true">
            <div className="hero-cenas" ref={imagem}>
              {carregadas.map(posicao => (
                <img key={posicao} src={slides[posicao].image} alt="" data-ativa={posicao === indice}
                  fetchPriority={posicao === 0 ? 'high' : 'auto'} decoding={posicao === 0 ? 'auto' : 'async'} />
              ))}
            </div>
          </div>
          <div className="hero-galeria">
            <a href={linkImovel(foto.id)} className="hero-legenda" aria-live="polite">
              <span>{foto.tipo}</span>
              <strong>{foto.nome}<ArrowUpRight size={14} aria-hidden="true" /></strong>
            </a>
            <div className="hero-controles">
              <button type="button" onClick={() => mudar(-1)} aria-label="Imagem anterior"><ChevronLeft size={19} /></button>
              <button type="button" onClick={() => mudar(1)} aria-label="Próxima imagem"><ChevronRight size={19} /></button>
            </div>
          </div>
        </div>
        <a href="#destaques" className="descer"><ArrowDown size={15} aria-hidden="true" /> Ver destaques</a>
      </div>
    </section>
  );
}

function ImagemImovel({ imovel }) {
  const moldura = useRef(null);
  const imagem = useRef(null);
  const capa = imovel.fotos[0];
  useMovimentoImagem(moldura, imagem);

  return (
    <figure className={`detalhe-capa detalhe-capa--${imovel.id}`}>
      <div className="detalhe-capa-imagem" ref={moldura}>
        <img src={capa.image} alt={`${capa.label} de ${imovel.nome}`} fetchPriority="high" ref={imagem} />
      </div>
      <figcaption>{capa.tipo}</figcaption>
    </figure>
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

const filtrosVazios = { busca: '', regiao: '', quartos: '', fase: '' };
const chipsRegiao = [{ valor: '', rotulo: 'Todas' }, ...regioes.map(regiao => ({ valor: regiao, rotulo: regiao }))];
const chipsQuartos = [{ valor: '', rotulo: 'Todos' }, ...opcoesQuartos.map(quartos => ({
  valor: quartos,
  rotulo: quartos === '1' ? '1 quarto' : `${quartos} quartos`
}))];
const chipsFase = [{ valor: '', rotulo: 'Todas' }, ...fases.map(fase => ({ valor: fase, rotulo: fase }))];

function lerFiltros(parametros) {
  const regiao = parametros.get('regiao');
  const quartos = parametros.get('quartos');
  const fase = parametros.get('fase');
  return {
    busca: parametros.get('busca') ?? '',
    regiao: regioes.includes(regiao) ? regiao : '',
    quartos: opcoesQuartos.includes(quartos) ? quartos : '',
    fase: fases.includes(fase) ? fase : ''
  };
}

function consultaFiltros(filtros) {
  return new URLSearchParams(Object.entries(filtros).filter(([, valor]) => valor));
}

export function Catalogo() {
  const [filtros, setFiltros] = useState(() => lerFiltros(new URLSearchParams(window.location.search)));
  const { busca, regiao, quartos, fase } = filtros;
  const campoBusca = useRef(null);
  const consulta = consultaFiltros(filtros);
  const alterar = campo => valor => setFiltros(atuais => ({ ...atuais, [campo]: valor }));
  function limpar() {
    setFiltros(filtrosVazios);
    campoBusca.current?.focus();
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    Object.entries(filtros).forEach(([campo, valor]) => {
      if (valor) url.searchParams.set(campo, valor);
      else url.searchParams.delete(campo);
    });
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
  }, [filtros]);

  const palavras = normalizarBusca(busca).split(/\s+/);
  const resultados = imoveis.filter(imovel => {
    const texto = normalizarBusca(`${imovel.nome} ${imovel.regiao} Brasília DF`);
    return (!regiao || imovel.regiao === regiao) && (!quartos || imovel.quartos.includes(Number(quartos))) &&
      (!fase || imovel.fase === fase) && palavras.every(palavra => texto.includes(palavra));
  });

  return (
    <>
      <section className="pagina-intro">
        <div className="moldura">
          <span className="etiqueta"><span />Distrito Federal</span>
          <h1>Encontre seu imóvel.</h1>
          <p>Compare os empreendimentos e fale com o Lucas sobre valores e disponibilidade.</p>
        </div>
      </section>
      <section className="moldura catalogo" aria-label="Catálogo de imóveis">
        <aside className="filtros" aria-label="Filtros do catálogo">
          <label className="campo" htmlFor="busca">Buscar imóvel</label>
          <div className="busca"><Search size={17} aria-hidden="true" /><input id="busca" ref={campoBusca} type="search" value={busca}
            onChange={evento => alterar('busca')(evento.target.value)} placeholder="Nome ou região" /></div>
          <Chips titulo="Região" opcoes={chipsRegiao} valor={regiao} onChange={alterar('regiao')} />
          <Chips titulo="Quartos" opcoes={chipsQuartos} valor={quartos} onChange={alterar('quartos')} />
          {fases.length > 0 && <Chips titulo="Fase" opcoes={chipsFase} valor={fase} onChange={alterar('fase')} />}
          {consulta.size > 0 && <button type="button" className="limpar" onClick={limpar}><X size={15} aria-hidden="true" /> Limpar filtros</button>}
        </aside>
        <div className="resultados">
          <div className="resultados-topo">
            <h2>Empreendimentos</h2>
            <p role="status">{resultados.length} {resultados.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}</p>
          </div>
          {resultados.length ? <div className="grade-imoveis">
            {resultados.map(imovel => <CartaoImovel key={imovel.id} imovel={imovel} consulta={consulta} />)}
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
        <button type="button" className="link-seta galeria-expandir" onClick={abrir}><Maximize2 size={17} aria-hidden="true" /> Tela cheia</button>
      </div>
      <AccordionGallery key={String(mobile)} items={imovel.fotos} defaultIndex={ativa} activeIndex={ativa}
        onActiveChange={setAtiva} orientation={mobile ? 'vertical' : 'horizontal'} height={mobile ? 245 : 386}
        expandRatio={0.66} gap={8} radius={12} grayscale={false} parallax={0.12} tilt={0}
        overlayColor="#0a192f" trigger="click" />
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

function Relacionados({ imovel, consulta }) {
  const proximos = imoveis.filter(item => item.id !== imovel.id)
    .sort((a, b) => Number(b.regiao === imovel.regiao) - Number(a.regiao === imovel.regiao))
    .slice(0, 3);
  return (
    <section className="relacionados" aria-labelledby="titulo-relacionados">
      <TituloSecao etiqueta="Explore o catálogo" id="titulo-relacionados">Outros imóveis</TituloSecao>
      <div className="grade-imoveis">
        {proximos.map(item => <CartaoImovel key={item.id} imovel={item} consulta={consulta} />)}
      </div>
    </section>
  );
}

export function Detalhe() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get('imovel');
  const consulta = consultaFiltros(lerFiltros(parametros));
  const linkCatalogo = consulta.size ? `${rotas.imoveis}?${consulta}` : rotas.imoveis;
  const imovel = id === null ? destaques[0] : imoveis.find(item => item.id === id);
  useEffect(() => {
    document.title = imovel ? `${imovel.nome} | Lucas Carvalho` : 'Imóvel não encontrado | Lucas Carvalho';
  }, [imovel]);

  if (!imovel) return (
    <section className="moldura pagina-vazia">
      <h1>Imóvel não encontrado.</h1>
      <p>Veja outros empreendimentos no catálogo.</p>
      <LinkSeta href={linkCatalogo}>Voltar aos imóveis</LinkSeta>
    </section>
  );

  return (
    <div className="moldura detalhe">
      <a className="voltar" href={linkCatalogo}><ArrowLeft size={16} aria-hidden="true" /> Voltar aos imóveis</a>
      <div className="detalhe-topo">
        <div className="detalhe-titulo">
          <span className="etiqueta"><span />Apartamento</span>
          <h1>{imovel.nome}</h1>
          <div className="detalhe-fatos">
            <span><MapPin size={17} aria-hidden="true" />{imovel.regiao}, DF</span>
            <span><BedDouble size={18} aria-hidden="true" />{faixaQuartos(imovel)}</span>
            {imovel.metragem && <span><Ruler size={17} aria-hidden="true" />{imovel.metragem}</span>}
            {imovel.vagas != null && <span><Car size={17} aria-hidden="true" />{quantidadeVagas(imovel.vagas)}</span>}
            {imovel.fase && <span className="detalhe-fase">{imovel.fase}</span>}
            {imovel.aPartirDe && <span className="preco-imovel">A partir de <strong>{imovel.aPartirDe}</strong></span>}
          </div>
        </div>
        <ImagemImovel imovel={imovel} />
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
          <WhatsApp className="botao--marinho" mensagem={mensagemImovel(imovel.nome)} principal />
        </aside>
      </div>
      <Relacionados imovel={imovel} consulta={consulta} />
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
          <WhatsApp className="botao--marinho" principal />
          <LinkSeta href={rotas.imoveis} className="sobre-link">Conhecer os imóveis</LinkSeta>
        </AnimatedContent>
        {fotoLucas
          ? <figure className="sobre-retrato"><img src={fotoLucas} alt="Lucas Carvalho" /></figure>
          : <figure><img src="./media/aurora-4.webp" alt="Perspectiva das torres do Alto da Aurora" />
              <figcaption><Building2 size={16} aria-hidden="true" /> Alto da Aurora, Sobradinho · Perspectiva ilustrativa</figcaption>
            </figure>}
      </section>
      <Especialidades naPaginaSobre />
      {depoimentos.length > 0 && <section className="moldura secao depoimentos" aria-labelledby="titulo-depoimentos">
        <TituloSecao etiqueta="Atendimento" id="titulo-depoimentos">Depoimentos</TituloSecao>
        <div className="grade-imoveis">
          {depoimentos.map(({ autor, texto }) => (
            <figure key={`${autor}-${texto}`}>
              <blockquote><p>{texto}</p></blockquote>
              {autor && <figcaption>{autor}</figcaption>}
            </figure>
          ))}
        </div>
      </section>}
      <Contato />
    </>
  );
}
