export const numeroWhatsApp = '5561995623957';
export const telefone = '(61) 99562-3957';
export const mensagemPadrao = 'Olá, Lucas! Vim pelo seu site e gostaria de saber mais sobre os imóveis.';

export function whatsapp(mensagem = mensagemPadrao) {
  return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
}

export function mensagemImovel(nome) {
  return `Olá, Lucas! Vim pelo seu site e gostaria de saber mais sobre o empreendimento ${nome}.`;
}
