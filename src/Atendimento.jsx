import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, CalendarDays, ClipboardCheck, MapPin, MessageCircle, Search } from 'lucide-react';
import AnimatedContent from './react-bits/AnimatedContent.jsx';
import CallChip from './react-bits/CallChip.jsx';
import Stepper, { Step } from './react-bits/Stepper.jsx';
import { regioes } from './catalogo.js';
import { whatsapp } from './contato.js';
import { Chips, LinkSeta, TituloSecao, WhatsApp, rotas } from './ui.jsx';

const etapas = [
  [MessageCircle, 'Primeira conversa', 'Conte o que você procura, sua região de interesse e o que precisa no seu próximo imóvel.'],
  [Search, 'Seleção de imóveis', 'Compare plantas, localizações e condições com o Lucas.'],
  [CalendarDays, 'Visita ao empreendimento', 'Escolha o que quer conhecer de perto e combine uma visita pelo WhatsApp.']
];

export function Especialidades({ naPaginaSobre = false }) {
  return (
    <section className="especialidades" id="expertise">
      <div className="moldura especialidades-grid">
        <AnimatedContent className="especialidades-intro" distance={18} duration={0.45}>
          <span className="etiqueta"><span />Consultoria imobiliária</span>
          <h2>Conte com o Lucas.</h2>
          <p>Acompanhamento para escolher um imóvel no Distrito Federal, da busca à visita.</p>
          {naPaginaSobre
            ? <LinkSeta href="#contato">Agende uma visita</LinkSeta>
            : <LinkSeta href={rotas.sobre}>Conheça o atendimento</LinkSeta>}
        </AnimatedContent>
        <div className="especialidades-lista">
          {etapas.map(([Icone, titulo, descricao]) => (
            <div key={titulo} className="especialidade">
              <span className="especialidade-icone"><Icone size={22} strokeWidth={1.5} aria-hidden="true" /></span>
              <div><h3>{titulo}</h3><p>{descricao}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const objetivos = ['Comprar para morar', 'Comprar para investir', 'Conhecer pessoalmente']
  .map(rotulo => ({ valor: rotulo, rotulo }));
const escolhendo = 'Ainda estou escolhendo';
const regioesContato = [...regioes, escolhendo].map(rotulo => ({ valor: rotulo, rotulo }));

function ajudaContato(objetivo, regiao) {
  if (!objetivo && !regiao) return 'Escolha um objetivo e uma região para continuar.';
  if (!objetivo) return 'Escolha um objetivo para continuar.';
  if (!regiao) return 'Escolha uma região ou selecione “Ainda estou escolhendo”.';
  return 'Na próxima etapa, você pode editar a mensagem antes de abrir o WhatsApp.';
}

export function AssistenteContato() {
  const [objetivo, setObjetivo] = useState('');
  const [regiao, setRegiao] = useState('');
  const [nome, setNome] = useState('');
  const [passo, setPasso] = useState(1);
  const [edicao, setEdicao] = useState(null);
  const ajudaId = useId();
  const etapaOpcoes = useRef(null);
  const etapaMensagem = useRef(null);
  const navegou = useRef(false);
  const podeContinuar = Boolean(objetivo && regiao);
  const interesse = objetivo === 'Conhecer pessoalmente' ? 'conhecer pessoalmente os imóveis' : objetivo.toLowerCase();
  const local = regiao === escolhendo ? 'Ainda estou escolhendo a região.' : `Região de interesse: ${regiao}.`;
  const resumo = `Olá, Lucas! Vim pelo seu site.${nome.trim() ? ` Meu nome é ${nome.trim()}.` : ''} Quero ${interesse}. ${local}`;
  const mensagem = edicao?.resumo === resumo ? edicao.mensagem : resumo;

  useEffect(() => {
    if (navegou.current) (passo === 1 ? etapaOpcoes : etapaMensagem).current?.focus();
  }, [passo]);

  function mudarEtapa(proximoPasso) {
    navegou.current = true;
    setPasso(proximoPasso);
  }

  return (
    <Stepper step={passo} onStepChange={mudarEtapa} linear disableStepIndicators
      width="100%" theme="light" accentColor="#132b45" radius={23} className="assistente"
      style={{ '--stepper-muted': '#4d6075' }}
      backButtonText="Voltar" nextButtonText="Continuar" transition="slide" showFooter={passo === 1}
      nextButtonProps={{
        'aria-describedby': ajudaId,
        'aria-disabled': !podeContinuar || undefined,
        onClick: evento => { if (!podeContinuar) evento.preventDefault(); }
      }}>
      <Step title="Preferências">
        <div className="assistente-preferencias">
          <h3 tabIndex={-1} ref={etapaOpcoes}>O que você procura?</h3>
          <Chips titulo="Objetivo" opcoes={objetivos} valor={objetivo} onChange={setObjetivo} />
          <Chips titulo="Região" opcoes={regioesContato} valor={regiao} onChange={setRegiao} />
          <label className="campo"><span>Seu nome (opcional)</span>
            <input value={nome} onChange={evento => setNome(evento.target.value)} autoComplete="given-name" maxLength={80} />
          </label>
          <p className="assistente-ajuda" id={ajudaId}>{ajudaContato(objetivo, regiao)}</p>
        </div>
      </Step>
      <Step title="Mensagem">
        <div className="resumo-contato">
          <CallChip icon={<ClipboardCheck aria-hidden="true" />} name="Mensagem pronta" argument="" status="done"
            size={30} color="#233851" surfaceColor="#e8eff7" doneColor="#2d6955" showTimer={false} />
          <label className="campo">
            <span tabIndex={-1} ref={etapaMensagem}>Sua mensagem</span>
            <textarea rows={5} value={mensagem} onChange={evento => setEdicao({ resumo, mensagem: evento.target.value })} />
          </label>
          <div className="resumo-botoes">
            <button type="button" className="botao botao--contorno" onClick={() => mudarEtapa(1)}>Voltar</button>
            <WhatsApp className="botao--marinho" mensagem={mensagem}>Abrir WhatsApp</WhatsApp>
          </div>
        </div>
      </Step>
    </Stepper>
  );
}

export function Contato() {
  return (
    <section id="contato" className="contato">
      <div className="moldura contato-grid">
        <div>
          <TituloSecao etiqueta="Atendimento direto" id="titulo-contato">Vamos conversar?</TituloSecao>
          <p className="contato-texto">Fale com o Lucas para tirar dúvidas, consultar disponibilidade ou combinar uma visita.</p>
          <a className="contato-direto" href={whatsapp()} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={19} aria-hidden="true" /> Falar direto no WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <div className="contato-local"><MapPin size={16} aria-hidden="true" /> Brasília e Distrito Federal</div>
        </div>
        <AssistenteContato />
      </div>
    </section>
  );
}
