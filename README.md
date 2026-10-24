# Taty Soares · Link da bio

Mini site estático em português para Taty Soares Nail Designer em Rio das Pedras. React + TypeScript + Vite, uma página com avatar real, WhatsApp, três categorias de serviços e tabela de valores acessível.

## Rodar localmente

Use Node.js 22.12 ou superior e npm.

```sh
npm ci
npm run dev
```

Abra a URL exibida pelo Vite, incluindo `/tatysoaresnails-linkbio/`. Para verificar a versão de produção: `npm run build` e `npm run preview`.

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

## Conteúdo e manutenção

- `src/data/services.ts`: três categorias e onze serviços. Os títulos alimentam as mensagens individuais.
- `src/data/prices.ts`: dez linhas de valores regulares, com decoração por par. Confirme os valores no atendimento; a promoção de R$ 99 não faz parte da tabela.
- `src/config/links.ts`: telefone, mensagens e URLs opcionais. WhatsApp: **5521989358048**. Configure `instagramUrl` e `locationUrl` com URLs reais quando disponíveis. Sem esses dados, Instagram fica oculto e a localidade aparece como texto.
- `src/config/assets.ts` e `assets-manifest.json`: caminhos de imagens. `assetUrl()` considera a base do Vite para funcionar no subdiretório do GitHub Pages.
- `src/styles.css`: cores, tipografia, espaçamento e comportamento responsivo; movimento reduzido respeitado.
- `src/components`: `HeaderProfile`, `WhatsAppCTA`, `CategoryAccordion`, `ServiceRow`, `PriceSheet` e `FooterActions`.

A tabela utiliza HTML e dados tipados, não OCR ou imagens geradas. O modal usa o elemento nativo `dialog`, com Escape, foco e bloqueio de fundo. Todas as mensagens abrem o WhatsApp em nova aba, sem enviar mensagem automaticamente.

## Assets e origem

Consulte [docs/ASSETS.md](docs/ASSETS.md). Os arquivos de produção do ZIP foram preservados em `public/assets`. As referências com retratos de IA não foram incluídas. O recorte Molde F1 e a tabela original estão preservados apenas como referência; não representam fotografias brutas de portfólio nem a interface de preços.

## GitHub Pages

A publicação atual utiliza a branch `gh-pages` (pasta raiz), com o build validado localmente. A credencial OAuth disponível permite push de código, mas não criar workflows; por isso o workflow completo foi preservado em `docs/github-actions/deploy.yml` como modelo.

Para publicar uma atualização após editar e commitar o código na `main`:

```sh
npm run deploy
```

Esse comando executa lint, TypeScript, testes e build, prepara uma cópia temporária e faz push normal na `gh-pages`, preservando o histórico. A configuração em **Settings → Pages** deve usar **Deploy from a branch → gh-pages → / (root)**. O script não muda suas configurações de conta.

Para ativar CI/CD futuramente, use uma credencial Git com permissão `workflow`, copie `docs/github-actions/deploy.yml` para `.github/workflows/deploy.yml` e altere **Settings → Pages → Source** para **GitHub Actions**. Esse workflow valida pull requests e publica pushes na `main`. Não adicione tokens ao código.

A base de produção está definida como `/tatysoaresnails-linkbio/` em `vite.config.ts`. Para domínio próprio ou outra hospedagem, ajuste a base e publique a pasta `dist`. Nenhum segredo ou token pessoal deve entrar no repositório.

## Pendências de conteúdo

Confirmar Instagram, endereço/link específico do estúdio e validade dos preços regulares, incluindo a linha compartilhada Molde F1 / Acrigel. O pack de imagens necessário à implementação já foi fornecido.
