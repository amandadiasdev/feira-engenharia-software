# Site do curso de Engenharia de Software (Unipampa, campus Alegrete)

Página única feita para a feira de ciências e profissões do campus. Usa apenas HTML, CSS e
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
um minuto. Se a mudança não aparecer, atualize a página segurando Shift ou abra em uma aba
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

O site segue o BrandKit da Feira das Profissões (rota A, azuis oficiais mais âmbar). As cores
estão no topo de `css/estilos.css` e não devem ser trocadas uma a uma:

| Cor                                     | Onde entra                                            |
| --------------------------------------- | ----------------------------------------------------- |
| `#0B1117` tinta                         | fundo escuro principal                                |
| `#051A66` marinho DAES                  | rodapé e faixas institucionais                        |
| `#136795` azul do curso                 | títulos, links e botões sobre fundo claro             |
| `#4FB3E8` azul claro                    | detalhes e rótulos sobre fundo escuro                 |
| `#FFB703` âmbar                         | botão principal, item de menu ativo, barra de leitura |
| `#FB8500` laranja                       | barras e blocos de apoio                              |
| `#FFFFFF` `#F1F5F9` `#CFD9E3` `#16202B` | papel, fundo alternado, bordas e texto                |

Regras que vêm do kit: o âmbar ocupa no máximo 10% da página, nada de degradê ou brilho, e as
logos não aparecem no topo, só pequenas no rodapé. A fonte é Inter.

## Origem das informações

- Disciplinas, duração, turno, vagas, áreas de atuação e projetos de extensão: Projeto
  Pedagógico do Curso de Bacharelado em Engenharia de Software, versão 18.4.4, abril de 2025.
- Cores, tipografia e regras de uso: BrandKit da Feira das Profissões, no Figma.
- Logos: arquivos oficiais do curso, do DAES e da Unipampa.
