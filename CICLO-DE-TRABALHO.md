# Como trabalhar no site sem perder alterações

O site vive em dois sítios ao mesmo tempo: **no seu computador** e **no GitHub**.
Editar num sem trazer o outro é a única forma de estragar alguma coisa.

## Endereços

- Site publicado: <https://be-esparedes.github.io/be.esp/>
- Painel de edição: <https://be-esparedes.github.io/be.esp/admin/>
- Repositório: <https://github.com/BE-ESParedes/be.esp>
- Pasta no computador: `Biblioteca/Digital/Site_BE-ESParedes/site`

## Editar conteúdo — o caminho normal

Use o **painel de edição**, no cadeado do cabeçalho ou em `/admin`.
As alterações vão diretas para o GitHub e o site atualiza-se em um ou dois minutos.
Não é preciso Terminal para nada.

É assim que se muda uma notícia, se acrescenta uma atividade ao calendário,
se carrega a capa de um livro ou a fotografia de uma exposição.

## Antes de mexer nos ficheiros do computador

Se editou pelo painel, essas alterações **não descem sozinhas**. Antes de mexer
na pasta local, abra o Terminal e corra:

```bash
cd ~/Claude/Projects/Codigo-Web/Site_BE-ESParedes/site
git pull
```

Se saltar este passo, fica com duas versões diferentes e o envio seguinte é
recusado — foi o que aconteceu a 28 de julho de 2026.

## Depois de mexer nos ficheiros do computador

```bash
cd ~/Claude/Projects/Codigo-Web/Site_BE-ESParedes/site
git add -A
git commit -m "descrever em poucas palavras o que mudou"
git push
```

## Ver o site antes de publicar

Duplo clique em `VER-O-SITE.command`, dentro desta pasta.
Abrir o `index.html` diretamente não funciona: o navegador bloqueia a leitura
dos ficheiros de conteúdo.

## Se alguma coisa correr mal

A versão anterior do site está guardada no ramo `backup-github`, no GitHub.
Nada do que lá estava se perdeu.

## Regra única

**Editar num sítio de cada vez.** Painel *ou* computador, nunca os dois entre
sincronizações.

---
28 de julho de 2026
