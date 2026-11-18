# Lucas Carvalho | Consultoria Imobiliária

Site de imóveis no Distrito Federal com catálogo, detalhes de cada empreendimento e contato pelo WhatsApp.

## Desenvolvimento

Com Node.js 22.12+ ou 24 e npm instalados:

```sh
npm ci
npm run dev
```

A configuração atual do GitHub Pages serve os arquivos da raiz da branch `main`. Rode `npm run build` depois de editar o código em `src/` e inclua o resultado em `assets/` no mesmo commit. As quatro páginas HTML mantêm seus endereços originais.

- Edite o catálogo em `src/catalogo.js` e as fotos correspondentes em `media/`. As galerias indicam se a imagem é uma perspectiva ou um registro de obra. O catálogo não informa estoque ou valores em tempo real.
- Para atualizar o telefone, edite `src/contato.js` e o link de contato dentro de `<noscript>` nas páginas HTML.
- Os componentes em `src/react-bits/` foram adaptados de [React Bits](https://reactbits.dev/). Os avisos de licença estão em [licencas/](licencas/).
