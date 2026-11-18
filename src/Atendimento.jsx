import { useRef, useState } from 'react';
import { ArrowUpRight, CalendarDays, ClipboardCheck, MapPin, MessageCircle, Search } from 'lucide-react';
import AnimatedContent from './react-bits/AnimatedContent.jsx';
import CallChip from './react-bits/CallChip.jsx';
import Stepper, { Step } from './react-bits/Stepper.jsx';
import TechText from './react-bits/TechText.jsx';
import VariableProximity from './react-bits/VariableProximity.jsx';
import { regioes } from './catalogo.js';
import { whatsapp } from './contato.js';
import { LinkSeta, TituloSecao, WhatsApp, rotas, useMedia } from './ui.jsx';

const etapas = [
  [MessageCircle, 'Primeira conversa', 'Conte o que você procura, sua região de interesse e o que precisa no seu próximo imóvel.'],
  [Search, 'Seleção de imóveis', 'Compare plantas, localizações e condições com a ajuda do Lucas.'],
  [CalendarDays, 'Visita ao empreendimento', 'Escolha o que quer conhecer de perto e combine uma visita pelo WhatsApp.']
];

export function Especialidades() {
  const ref = useRef(null);
  const pointer = useMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
  return (
    <section className="especialidades" id="expertise">
      <div className="moldura especialidades-grid">
        <AnimatedContent className="especialidades-intro" distance={18} duration={0.45}>
          <span className="etiqueta"><span />Consultoria imobiliária</span>
          <div ref={ref} className="especialidades-titulo">
            <h2>{pointer ? <VariableProximity label="Conte com o Lucas." containerRef={ref}
              fromFontVariationSettings="'wght' 400" toFontVariationSettings="'wght' 565" radius={135}
              className="enfase-proximidade" /> : 'Conte com o Lucas.'}</h2>
          </div>
          <p>Acompanhamento para escolher um imóvel no Distrito Federal, da busca à visita.</p>
          <LinkSeta href={rotas.sobre}>Conheça o atendimento</LinkSeta>
        </AnimatedContent>
        <div className="especialidades-lista">
          {etapas.map(([Icone, titulo, descricao]) => (
            <div key={titulo} className="especialidade">
              <Icone size={24} strokeWidth={1.5} aria-hidden="true" />
              <div><h3>{titulo}</h3><p>{descricao}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AssistenteContato() {
  const [objetivo, setObjetivo] = useState('');
  const [regiao, setRegiao] = useState('');
  const [nome, setNome] = useState('');
  const [passo, setPasso] = useState(1);
  const resumo = `Olá, Lucas! Vim pelo seu site.${nome.trim() ? ` Meu nome é ${nome.trim()}.` : ''} Quero ${objetivo.toLowerCase()}. Região de interesse: ${regiao}.`;

  return (
    <Stepper step={passo} onStepChange={setPasso} linear disableStepIndicators
      width="100%" theme="light" accentColor="#914a33" radius={14} className="assistente"
      backButtonText="Voltar" nextButtonText="Continuar" transition="slide" showFooter={passo < 3}
      nextButtonProps={{ disabled: passo === 1 ? !objetivo : !regiao }}>
      <Step title="Objetivo">
        <fieldset><legend>O que você procura?</legend>
          {['Comprar para morar', 'Comprar para investir', 'Agendar uma visita'].map(opcao => (
            <label className="opcao" key={opcao}>
              <input type="radio" name="objetivo" value={opcao} checked={objetivo === opcao} onChange={() => setObjetivo(opcao)} />
              {opcao}
            </label>
          ))}
        </fieldset>
      </Step>
      <Step title="Região">
        <label className="campo"><strong>Em qual região?</strong>
          <select value={regiao} onChange={evento => setRegiao(evento.target.value)}>
            <option value="">Selecione uma região</option>
            {regioes.map(opcao => <option key={opcao}>{opcao}</option>)}
            <option>Ainda estou escolhendo</option>
          </select>
        </label>
        <label className="campo"><span>Seu nome (opcional)</span>
          <input value={nome} onChange={evento => setNome(evento.target.value)} autoComplete="given-name" maxLength={80} placeholder="Como podemos chamar você?" />
        </label>
      </Step>
      <Step title="Mensagem">
        <div className="resumo-contato">
          <CallChip icon={<ClipboardCheck aria-hidden="true" />} name="Mensagem pronta" argument="" status="done"
            size={30} color="#61402f" surfaceColor="#f3e8dd" doneColor="#517451" />
          <p>{resumo}</p>
          <div className="resumo-botoes">
            <button type="button" className="botao botao--contorno" onClick={() => setPasso(2)}>Voltar</button>
            <WhatsApp className="botao--terracota" mensagem={resumo}>Abrir WhatsApp</WhatsApp>
          </div>
        </div>
      </Step>
    </Stepper>
  );
}

export function Contato() {
  const largo = useMedia('(min-width: 680px)');
  return (
    <section id="contato" className="contato">
      <div className="moldura contato-grid">
        <div>
          <TituloSecao etiqueta="Atendimento direto" id="titulo-contato">Vamos conversar?</TituloSecao>
          <p className="contato-texto">Fale com Lucas Carvalho para tirar dúvidas, consultar disponibilidade ou combinar uma visita.</p>
          <a className="contato-direto" href={whatsapp()} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={19} aria-hidden="true" /> Falar direto no WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <div className="contato-local"><MapPin size={16} aria-hidden="true" /> Brasília e Distrito Federal</div>
        </div>
        <AssistenteContato />
      </div>
      {largo && <div className="marca-animada moldura" aria-hidden="true">
        <TechText text="Lucas Carvalho" fontFamily="Fraunces Variable" fontWeight={400} fontSize={112}
          align="center" color="#a88c77" accentColor="#ead5bf" intro="none" specks={6} labels={false}
          sweep={false} selection={false} draggable={false} clickKick={false} />
      </div>}
    </section>
  );
}
