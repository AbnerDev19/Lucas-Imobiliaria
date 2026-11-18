export const numeroWhatsApp = '5561995623957';
export const telefone = '(61) 99562-3957';
export const creci = ''; // Exemplo de formato: 'CRECI-DF 00000'
export const fotoLucas = ''; // Use o caminho local em ./media/ quando a foto estiver disponível.
export const depoimentos = []; // Formato de cada item: { texto, autor }.

export const mensagemPadrao = 'Olá, Lucas! Vim pelo seu site e gostaria de saber mais sobre os imóveis.';

export function whatsapp(mensagem = mensagemPadrao) {
  return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
}

export function mensagemImovel(nome) {
  return `Olá, Lucas! Vim pelo seu site e gostaria de saber mais sobre o empreendimento ${nome}.`;
}
