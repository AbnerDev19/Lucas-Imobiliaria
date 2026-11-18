const foto = (projeto, indice, label, tipo) => ({
  image: `./media/${projeto}-${indice}.webp`,
  label,
  alt: label,
  tipo
});

const empreendimento = ({ id, fotos, ...dados }) => ({
  id,
  ...dados,
  fotos: fotos.map(([label, tipo], index) => foto(id, index + 1, label, tipo))
});
const perspectiva = 'Perspectiva ilustrativa';
const obra = 'Foto de acompanhamento da obra';

const fasesPossiveis = ['Lançamento', 'Em obras', 'Pronto para morar'];

// Campos opcionais. Inclua apenas informações confirmadas pelo corretor.
// Exemplo de formato: fase: 'Em obras', metragem: '45 a 62 m²', vagas: 1, aPartirDe: 'R$ 289 mil'.
export const imoveis = [
  empreendimento({
    id: 'singulare', nome: 'Singulare Home Riva', regiao: 'Samambaia', quartos: [2],
    atributos: ['Piscinas adulto e infantil', 'Espaço gourmet'],
    descricao: 'Apartamentos de dois quartos no Centro Urbano de Samambaia, com espaços de lazer para aproveitar a rotina dentro do condomínio.',
    fotos: [['Fachada', perspectiva], ['Piscina adulto', perspectiva], ['Espaço gourmet', perspectiva], ['Vista aérea', obra]]
  }),
  empreendimento({
    id: 'lumi', nome: 'Lumi Tower Residences', regiao: 'Águas Claras', quartos: [2, 3],
    atributos: ['Varanda', 'Piscina'],
    descricao: 'Empreendimento em Águas Claras com opções de dois e três quartos. A galeria reúne a perspectiva da fachada e fotos da piscina, da sala e da varanda.',
    fotos: [['Fachada', perspectiva], ['Piscina', obra], ['Sala', obra], ['Varanda', obra]]
  }),
  empreendimento({
    id: 'alvorada', nome: 'Alto da Alvorada', regiao: 'Sobradinho', quartos: [2, 3],
    atributos: ['Piscina', 'Quadra'],
    descricao: 'Segundo condomínio do complexo Alto Sobradinho, no Setor Habitacional Boa Vista, com opções de dois e três quartos e espaços de lazer compartilhados.',
    fotos: [['Fachada', perspectiva], ['Fachada do bloco A', obra], ['Sala e cozinha', obra], ['Piscina', obra]]
  }),
  empreendimento({
    id: 'aurora', nome: 'Alto da Aurora', regiao: 'Sobradinho', quartos: [2, 3],
    atributos: ['Piscina', 'Churrasqueira'],
    descricao: 'Empreendimento do complexo Alto Sobradinho no Setor Habitacional Boa Vista. As perspectivas mostram as torres e áreas de lazer planejadas.',
    fotos: [['Fachada', perspectiva], ['Piscina', perspectiva], ['Churrasqueira', perspectiva], ['Vista das torres', perspectiva]]
  }),
  empreendimento({
    id: 'colibris', nome: 'Recanto dos Colibris', regiao: 'Recanto das Emas', quartos: [2],
    atributos: ['Piscina', 'Salão de festas'],
    descricao: 'Parte do complexo Recanto dos Pássaros, no Recanto das Emas. A galeria mostra áreas de lazer e uma planta de dois quartos em acompanhamento de obra.',
    fotos: [['Fachada', perspectiva], ['Área de lazer', obra], ['Sala e cozinha', obra], ['Piscina', perspectiva]]
  }),
  empreendimento({
    id: 'reserva', nome: 'Reserva Parque Clube – Torre 06', regiao: 'Águas Claras', quartos: [2, 3],
    atributos: ['Salão de festas'],
    descricao: 'Torre do Reserva Parque Clube em Águas Claras. As fotos registram áreas comuns e uma cobertura do empreendimento em diferentes momentos da obra.',
    fotos: [['Fachadas', obra], ['Sala da cobertura', obra], ['Terraço da cobertura', obra], ['Salão de festas', obra]]
  }),
  empreendimento({
    id: 'riacho', nome: 'Essencial Riacho', regiao: 'Riacho Fundo II', quartos: [2],
    atributos: ['Playground', 'Áreas de convivência'],
    descricao: 'Empreendimento residencial no Riacho Fundo II. Veja registros de obra da fachada, do playground e de ambientes de um apartamento de dois quartos.',
    fotos: [['Fachada do bloco 7', obra], ['Playground', obra], ['Sala e cozinha', obra], ['Quarto', obra]]
  }),
  empreendimento({
    id: 'gaivotas', nome: 'Recanto das Gaivotas', regiao: 'Recanto das Emas', quartos: [2],
    atributos: ['Piscina', 'Playground'],
    descricao: 'Empreendimento do complexo Recanto dos Pássaros, no Recanto das Emas. A galeria mostra as perspectivas da fachada e dos espaços de lazer.',
    fotos: [['Fachada', perspectiva], ['Piscina', perspectiva], ['Playground', perspectiva], ['Salão de festas', perspectiva]]
  }),
  empreendimento({
    id: 'horizonte', nome: 'Alto do Horizonte', regiao: 'Sobradinho', quartos: [2, 3],
    atributos: ['Piscina', 'Quadra poliesportiva'],
    descricao: 'Primeiro condomínio do complexo Alto Sobradinho, no Setor Habitacional Boa Vista. O empreendimento tem piscina, salão de jogos e quadra poliesportiva.',
    fotos: [['Fachada', perspectiva], ['Piscina', perspectiva], ['Salão de jogos', perspectiva], ['Quadra poliesportiva', perspectiva]]
  })
];

export const destaques = imoveis.slice(0, 3);
export const regioes = [...new Set(imoveis.map(imovel => imovel.regiao))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
export const fases = fasesPossiveis.filter(fase => imoveis.some(imovel => imovel.fase === fase));
export const opcoesQuartos = [...new Set(imoveis.flatMap(imovel => imovel.quartos))].sort((a, b) => a - b).map(String);

export function linkImovel(id, consulta) {
  const parametros = new URLSearchParams({ imovel: id });
  for (const [campo, valor] of consulta ?? []) parametros.set(campo, valor);
  return `./detalhe.html?${parametros}`;
}
export const faixaQuartos = imovel => `${imovel.quartos.join(' e ')} quartos`;

export function quantidadeVagas(vagas) {
  return vagas === 0 ? 'Sem vaga de garagem' : `${vagas} ${vagas === 1 ? 'vaga' : 'vagas'}`;
}

export function normalizarBusca(texto) {
  return texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
}
