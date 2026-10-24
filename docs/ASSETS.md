# Assets de Taty Soares

Todos os caminhos abaixo são relativos a `public/assets`. Os arquivos do pacote estão integrados; nenhum asset obrigatório está pendente. Substitua um arquivo no mesmo caminho para atualizar a imagem, ou altere o manifest e `src/config/assets.ts`. Preserve o rosto, uniforme, cores e desenhos das fotografias reais. Use WebP e mantenha as dimensões declaradas nos componentes para evitar saltos de layout.

| Arquivo | Uso | Tamanho sugerido | Fundo | Origem | Status |
| --- | --- | --- | --- | --- | --- |
| `profile/taty-avatar-approved.webp` | Avatar circular atual | 512 × 512 | Foto | Nova imagem fornecida e aprovada pelo usuário | Integrado |
| `profile/taty-profile-approved.webp` | Nova imagem em maior resolução | 1024 × 1024 | Foto | Nova imagem fornecida e aprovada pelo usuário | Disponível |
| `profile/taty-avatar-real.webp` | Avatar anterior (referência) | 256 × 256 | Foto | Fotografia real fornecida | Integrado |
| `profile/taty-original-real.webp` | Referência do retrato | 800px no lado maior | Foto | Fotografia real fornecida | Disponível |
| `brand/logo-gold.webp` | Assinatura otimizada, derivada do PNG | 400px de largura | Transparente | Conversão do asset fornecido | Integrado |
| `brand/logo-gold.png` | Original da assinatura | 400px de largura | Transparente | Marca fornecida no pack | Integrado |
| `brand/monogram-gold.png` | Fallback do avatar | 256px de largura | Transparente | Marca fornecida no pack | Disponível |
| `brand/logo-white.png` | Variante clara | 400px de largura | Transparente | Marca fornecida no pack | Disponível |
| `backgrounds/floral-champagne-mobile.webp` | Fundo floral | 900 × 1600 | Opaco | Textura fornecida no pack | Integrado |
| `backgrounds/ivory-subtle.webp` | Fundo auxiliar | 900px de largura | Opaco | Textura fornecida no pack | Disponível |
| `decor/ornament-gold.png` | Ornamento opcional | 480px de largura | Transparente | Pack fornecido | Disponível |
| `services/acrigel-real.webp` | Thumbnail Acrigel | 320px de largura | Foto | Trabalho real fornecido | Disponível |
| `services/fibra-de-vidro-real.webp` | Thumbnail Fibra | 320px de largura | Foto | Trabalho real fornecido | Disponível |
| `services/acrigel-vermelho-real.webp` | Trabalho adicional | 600px de largura | Foto | Trabalho real fornecido | Disponível |
| `services/collage-trabalhos-reais.webp` | Referência de trabalhos | 800px de largura | Foto | Colagem de trabalhos reais | Disponível |
| `services/molde-f1-referencia-real.webp` | Referência visual apenas | Manter original | Arte recortada | Arte fornecida, não foto bruta | Fora da interface |
| `pricing/tabela-original-referencia.webp` | Conferência editorial | Manter original | Arte | Tabela original fornecida | Fora da interface |

Os arquivos `reference/generated_10` do ZIP não são publicados no projeto. Os dois retratos gerados por IA não foram aprovados e não são usados. A tabela e a colagem geradas também não são fontes de preços ou portfólio.

Os itens de serviço usam somente ícones Lucide, sem fotografias. Para atualizar o retrato do cabeçalho, forneça uma imagem aprovada e altere os caminhos de `profile` em `assets-manifest.json` e `src/config/assets.ts`. A nova imagem foi apenas redimensionada e comprimida, preservando o conteúdo enviado. Não associe automaticamente o recorte de arte Molde F1 a um trabalho realizado. Os preços são mantidos exclusivamente em `src/data/prices.ts`.
