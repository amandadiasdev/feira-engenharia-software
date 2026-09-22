# Site do curso de Engenharia de Software (Unipampa, campus Alegrete)

Página única feita para a feira de profissões do campus. Usa apenas HTML, CSS e
JavaScript, então roda direto no GitHub Pages, sem servidor e sem instalação.

## Arquivos

```
index.html      todo o texto do site
css/estilos.css cores, tamanhos e layout
js/principal.js menu, acordeão e animações
assets/         logos, ícones e fotos
```

## Como publicar no GitHub Pages

1. Entre em <https://github.com> com a conta que vai hospedar o site e clique em **New** para
   criar um repositório novo. Deixe-o **público**.
2. Na página do repositório vazio, clique em **uploading an existing file**.
3. Arraste para lá o arquivo `index.html`, o `README.md` e as pastas `css`, `js` e `assets`
   inteiras.
4. Desça a página, escreva uma mensagem como `primeira versão do site` e clique em
   **Commit changes**. Os arquivos ficam na branch `main`.
5. No repositório, abra **Settings** (engrenagem no topo) e, no menu da esquerda, **Pages**.
6. Em _Source_, escolha **Deploy from a branch**. Em _Branch_, escolha **main** e a pasta
   **/ (root)**. Clique em **Save**.
7. Espere de um a dois minutos e recarregue a página de Settings > Pages. O endereço do site
   aparece no topo, no formato `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Cada vez que você alterar um arquivo no GitHub, o site é publicado de novo sozinho em cerca de
um minuto.

Se você mexer em `css/estilos.css` ou em `js/principal.js`, abra o `index.html` e aumente o
número em `estilos.css?v=2` e `principal.js?v=2` (vira `v=3`, depois `v=4`). Sem isso, quem já
visitou o site continua vendo a versão antiga guardada no navegador por uns 10 minutos. Se a mudança não aparecer, atualize a página segurando Shift ou abra em uma aba
anônima.

## Como trocar textos sem saber programar

1. No GitHub, clique em `index.html`.
2. Clique no lápis (**Edit this file**).
3. Procure o texto que quer trocar. Ele fica entre marcas como `<p>` e `</p>` ou `<h2>` e
   `</h2>`. **Troque apenas o texto, nunca as marcas com `<` e `>`.**
4. Clique em **Commit changes**.

Todo o texto que está no site veio do projeto pedagógico do curso. Ao acrescentar informação
nova, confira a fonte antes de publicar.

## Como trocar imagens

1. Abra a pasta `assets` no GitHub e clique em **Add file > Upload files** para enviar a foto
   nova.
2. Em `index.html`, procure a linha da imagem que quer trocar. Ela se parece com
   `<img src="assets/icone-alvo.png" alt="...">`.
3. Troque o nome do arquivo dentro de `src="assets/..."` pelo nome da foto nova.
4. Atualize também o texto do `alt="..."`. Ele descreve a imagem para quem não enxerga e para
   quando a foto não carrega.

Use fotos de até 1600 pixels de largura para o site abrir rápido no celular.

Atenção com as logos: nos blocos de fundo escuro (topo, Carreiras e rodapé) o site usa
`assets/simbolo-engenharia-software.svg`, que é a versão vazada, desenhada em branco e azul.
Uma logo com traços pretos desaparece nesses fundos. As versões coloridas ficam no rodapé,
sobre o painel branco.

## Como trocar o vídeo

No `index.html`, procure `youtube.com/embed/`. Depois da barra vem o código do vídeo. No
endereço `https://www.youtube.com/watch?v=OEqte4sNRGA`, o código é `OEqte4sNRGA`. Troque só
esse código.

## Como ver o site no seu computador antes de publicar

Abra a pasta e dê dois cliques em `index.html`. O navegador mostra o site. O vídeo do YouTube
só aparece com internet.

## Identidade visual

O site segue o BrandKit da Feira das Profissões (rota A, fluxograma). A identidade é um
diagrama de escolha: a feira é o ponto de partida e o curso é o nó para onde o caminho leva.
As cores estão no topo de `css/estilos.css` e não devem ser trocadas uma a uma:

| Cor                                     | Onde entra                                            |
| --------------------------------------- | ----------------------------------------------------- |
| `#0B1117` tinta                         | fundo escuro principal                                |
| `#051A66` marinho DAES                  | rodapé e faixas institucionais                        |
| `#136795` azul do curso                 | títulos, links e botões sobre fundo claro             |
| `#4FB3E8` azul claro                    | rótulos, contorno dos nós e linhas do diagrama        |
| `#FFB703` âmbar                         | botão principal, item de menu ativo, barra de leitura |
| `#FB8500` laranja                       | só como forma, nunca como texto                       |
| `#FFFFFF` `#EAF2F8` `#C9D8E3` `#16202B` | papel, fundo alternado, bordas e texto                |

Regras que vêm do kit e que o CSS já respeita:

- **Fontes:** Geist Mono no display, nos títulos, nos rótulos e nos nós; Inter só no texto
  corrido. As duas vêm do Google Fonts.
- **Desenho do diagrama:** a linha desce, dobra em 90 graus e termina em seta cheia. Nunca
  curva e nunca diagonal.
- **Nó:** contorno de 1px e canto de no máximo 4px. Por isso `--raio` vale `4px`.
- **Fundo:** papel quadriculado de 1px a cada 48px, desenhado em CSS e nunca uma imagem.
- **Proibido:** degradê, brilho, vidro fosco e sombra. Só cor chapada e linha de 1px.
- **Âmbar:** um destaque por seção. Sobre fundo claro o âmbar dá 1.70:1 e o laranja 2.48:1,
  então nesses fundos os dois são só forma e o destaque passa para o azul do curso.
- **Logos:** as logos institucionais ficam pequenas no rodapé. No topo aparece apenas o
  símbolo do próprio curso.

## Origem das informações

- Disciplinas, duração, turno, vagas, áreas de atuação e projetos de extensão: Projeto
  Pedagógico do Curso de Bacharelado em Engenharia de Software, versão 18.4.4, abril de 2025.
- Cores, tipografia e regras de uso: BrandKit da Feira das Profissões, no Figma.
- Logos: arquivos oficiais do curso, do DAES e da Unipampa.
