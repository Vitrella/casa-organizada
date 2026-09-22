# Playbook — Site de Afiliados "Casa Organizada" (nicho: organização doméstica, mercado EUA)

## O que é
Site estático em inglês, nicho de organização doméstica (cozinha, closet, garagem, banheiro,
quarto de criança, home office). Monetizado via Amazon Associates. Tráfego 100% orgânico
(SEO), sem anúncio pago. Meta: renda passiva recorrente que exige cada vez menos intervenção
manual conforme o pipeline de publicação é automatizado.

## Por que esse nicho
- Alta intenção de compra (quem busca "best drawer organizer" já quer comprar).
- Catálogo gigante de produtos elegíveis na Amazon — nunca falta o que recomendar.
- Evergreen: não depende de moda, estação ou notícia.
- Não exige conhecimento técnico/legal sensível pra escrever com segurança (ao contrário de,
  por exemplo, saúde ou finanças, onde erro de conteúdo é mais grave).

## Custo: R$ 0,00 pra começar
- Hospedagem: Cloudflare Pages (ou GitHub Pages) — grátis.
- Domínio inicial: subdomínio grátis (`*.pages.dev`). Domínio próprio (~US$10-12/ano) é
  opcional e só compensa pagar depois que o site já validar tração — pode sair do lucro.
- Cadastro Amazon Associates: grátis.
- Conteúdo: gerado dentro da sua sessão/plano Claude, sem custo de API separado.
- Tráfego: orgânico, sem anúncio pago.

## Stack técnica (decisão já tomada, não precisa validar comigo)
- Site estático em HTML puro (sem framework pesado) — mais simples de gerar
  programaticamente e mais rápido de carregar (bom pra SEO).
- Deploy via Cloudflare Pages conectado a um repositório GitHub: todo push na branch principal
  publica automaticamente.
- Cada artigo é um arquivo `.html` autocontido, seguindo o template em `templates/article-template.html`.

## Pipeline de conteúdo
1. `content-calendar/calendario-30-artigos.md` tem as primeiras 30 keywords priorizadas.
2. Cada artigo segue o template: intro, tabela de resposta rápida, 8-11 recomendações de
   produto, guia de compra, FAQ, disclosure de afiliado (obrigatório).
3. **Regra inegociável**: nunca publicar preço, nota, nome de produto específico ou estatística
   inventada. Todo artigo sai com placeholders `[PRODUTO X / ASIN / PREÇO]` até alguém (você,
   ou eu com acesso a dados reais da Amazon) confirmar o produto real. Conteúdo com dado falso
   é o jeito mais rápido de tomar ban do Amazon Associates e perder a confiança do leitor.
4. Artigo de exemplo já pronto: `content/best-over-door-organizers-small-closets.html`.

## Compliance (não negociável, é regra da Amazon e da FTC)
- Todo artigo precisa do disclosure: "As an Amazon Associate, [site] earns from qualifying
  purchases."
- Links de afiliado usam `rel="nofollow sponsored"`.
- Proibido: incentivar clique com promessa de desconto falso, usar linkshortener que esconda o
  destino do link de afiliado, comprar o próprio produto pelo próprio link pra gerar comissão.
- Amazon audita o conteúdo — precisa ser original, não pode ser cópia de descrição de produto
  da própria Amazon.

## Caminho até a primeira comissão
1. Publicar o site (Cloudflare Pages) com 8-10 artigos "Alta prioridade" já completos com dados reais.
2. Aplicar pro Amazon Associates (exige site já no ar com conteúdo real, não em construção).
3. Amazon dá 180 dias e exige 3 vendas qualificadas pra manter a conta ativa — por isso os
   primeiros artigos precisam ser os de maior intenção de compra (já priorizados no calendário).
4. Depois de aprovado, trocar os placeholders pelos links de afiliado reais e ativar o resto
   do calendário.

## Roadmap de automação (o que ainda falta decidir com você)
Hoje eu consigo gerar o conteúdo e a estrutura do site inteira dentro desta sessão. O que falta
pra isso rodar "sozinho" de verdade, sem você precisar me pedir artigo por artigo:

- **Opção A — leve, você aciona**: uma vez por semana você me chama nesta sessão (ou numa tarefa
  agendada) e eu gero e publico o próximo lote de artigos do calendário. Exige 1 ação sua por
  semana (aprovar o push) — mas sem custo e sem risco de erro.
- **Opção B — hands-off de verdade**: configuro uma tarefa agendada que gera e publica os
  artigos sozinha, direto no GitHub, sem você precisar entrar. Pra isso funcionar preciso que
  você crie (uma vez só): (1) um repositório no GitHub pro site, (2) um token de acesso do
  GitHub, (3) a conta no Cloudflare Pages conectada a esse repositório. Depois disso o resto é
  automático.

Nenhuma dessas duas exige gasto de dinheiro — a diferença é só quanto de toque manual seu.

## Próximo passo concreto
Assim que você confirmar a Opção A ou B, eu:
1. Escrevo os 8 primeiros artigos completos (com placeholders de produto).
2. Monto a homepage e a estrutura de navegação do site.
3. Deixo tudo pronto pra você (ou eu, na Opção B) só dar o `git push` inicial.
