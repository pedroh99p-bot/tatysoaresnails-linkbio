# Validação — 24/10/2026

## Implementação

Uma página React/Vite com avatar real, marca fornecida, fundo floral, CTA de agendamento, três acordeões e tabela de preços HTML em dialog nativo. Os onze serviços e o CTA geral usam `5521989358048`, com mensagem codificada por `encodeURIComponent`. Instagram e mapa específico permanecem sem URLs inventadas.

## Gates executados

- ESLint: aprovado.
- TypeScript strict (`tsc -b`): aprovado.
- Vitest / React Testing Library: 24 testes aprovados em dois arquivos.
- Build Vite: aprovado; JS ~232 kB / ~73 kB gzip, CSS ~9 kB / ~3 kB gzip.
- O script `npm run deploy` executou os quatro gates e enviou o build à branch `gh-pages` sem force push.

## Navegador

Prévia local verificada via navegador Chromium integrado. Sem overflow horizontal nas larguras **320, 375, 390, 430, 768 e 1280 px**. CTA com altura de 61 px e botões de categoria com pelo menos 80 px. Imagens carregadas sem erros no console.

Interações verificadas no navegador: abrir categoria, trocar categoria fechando a anterior, fechar a categoria atual, abrir tabela, foco inicial no botão de fechar, Escape e restauração do foco. Na largura de 320 px, a tabela também não apresentou overflow horizontal. Links wa.me inspecionados no DOM e comparados com mensagens e telefone esperados.

Não foram executados testes em aparelhos físicos, Safari iOS ou Chrome Android. Não foi enviada mensagem à cliente; os links abrem a conversa preenchida para confirmação pelo visitante.

## Publicação

Código enviado à `main`. A credencial OAuth permitiu push de código, mas bloqueou a criação de `.github/workflows/deploy.yml` por ausência do escopo `workflow`. O modelo foi preservado em `docs/github-actions/deploy.yml`; a publicação utiliza o build na branch `gh-pages` e o fluxo padrão do GitHub Pages. Consulte o README para atualizar ou migrar futuramente para Actions.

## Correção de tela branca no mobile e na Vercel

- Falha reproduzida na Vercel: HTML HTTP 200 apontando para `/tatysoaresnails-linkbio/assets/index-dAigSrtO.js`, que retorna HTTP 404 na hospedagem em raiz. A base foi alterada para `./`, compatível com ambas as hospedagens.
- Também foram constatados bundles antigos removidos no GitHub Pages; a publicação restaura e preserva arquivos JS/CSS anteriores para visitantes com HTML em cache.
- O build entrega o conteúdo inicial renderizado em HTML; o React hidrata os controles. Teste de navegador com JavaScript intencionalmente indisponível confirmou que identidade e link WhatsApp continuam visíveis.
- Fontes externas passaram a carregar sem bloquear a primeira renderização.
- Testes de regressão cobrem recuperação de bundles e hidratação sem erros, além da suíte funcional existente.
