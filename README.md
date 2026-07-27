# Tempero Baiano — Site

Site institucional do restaurante **Tempero Baiano** (La Plata, Argentina), com cardápio, história, avaliações e botão de contato direto via WhatsApp. Bilíngue: **Espanhol** (padrão) / **Português** (botão de alternância no topo).

Site 100% estático (HTML + CSS + JS puro) — não precisa de servidor, banco de dados ou backend. Funciona em qualquer hospedagem de arquivos estáticos.

---

## 📁 Estrutura de arquivos

```
tempero-baiano-site/
├── index.html          → página única do site
├── css/style.css        → todo o estilo visual
├── js/
│   ├── content.js        → TODOS os textos (ES/PT) e itens do cardápio — edite aqui para mudar textos/preços/pratos
│   └── script.js         → lógica (tradução, filtros do menu, animações)
└── assets/
    ├── img/logo.png       → logo com fundo transparente
    ├── img/menu/          → fotos dos pratos
    ├── img/hero/          → imagem de capa (fallback do vídeo)
    └── video/              → vídeo do banner (MP4 + WebM)
```

---

## ✏️ Como editar o conteúdo

Quase **tudo** que aparece no site (nomes de pratos, descrições, textos institucionais, horários) está centralizado em **`js/content.js`**. Não precisa mexer no HTML para:

- Mudar a descrição ou nome de um prato
- Adicionar ou remover um prato do cardápio (copie um bloco `{ id:..., categoria:..., img:..., nombre:{...}, desc:{...} }` dentro do array `MENU`)
- Adicionar uma nova avaliação (array `RESENAS`)
- Mudar horários de funcionamento (array `HORARIOS`)
- Trocar o e-mail, WhatsApp, Instagram (dentro do `index.html`, seção `#contacto`, e nos links `wa.me` no cabeçalho/hero/botão flutuante)

> ⚠️ Os **preços não aparecem no site** — a pedido, o cliente é direcionado ao catálogo do WhatsApp (link configurado em "Ver catálogo con precios"). Se um dia vocês quiserem voltar a exibir preços no site, me avisem.

---

## 🌐 Como publicar (sem domínio próprio ainda)

### Opção A — GitHub Pages (recomendado, gratuito, simples)

1. Crie uma conta no [github.com](https://github.com) (se ainda não tiver).
2. Crie um novo repositório público, por exemplo `tempero-baiano`.
3. Faça upload de **todos os arquivos desta pasta** (mantendo a estrutura de subpastas) para o repositório:
   - Pelo site do GitHub: botão "Add file" → "Upload files" → arraste tudo.
   - Ou pelo terminal:
     ```
     git init
     git add .
     git commit -m "Site Tempero Baiano"
     git branch -M main
     git remote add origin https://github.com/SEU-USUARIO/tempero-baiano.git
     git push -u origin main
     ```
4. No repositório, vá em **Settings → Pages**.
5. Em "Source", selecione a branch `main` e a pasta `/ (root)`. Clique em **Save**.
6. Em alguns minutos, o site estará no ar em:
   `https://SEU-USUARIO.github.io/tempero-baiano/`

Quando comprarem um domínio próprio, é só configurar o "Custom domain" nessa mesma tela de Settings → Pages.

### Opção B — Render (também gratuito)

1. Crie uma conta em [render.com](https://render.com).
2. Suba os arquivos para um repositório do GitHub (passos 1–3 acima).
3. No Render, clique em **New → Static Site**.
4. Conecte o repositório do GitHub.
5. Configuração de build: deixe **Build Command** vazio e **Publish Directory** como `.` (ponto, raiz do repositório).
6. Clique em **Create Static Site**. Em poucos minutos o Render gera uma URL tipo `https://tempero-baiano.onrender.com`.

---

## ✅ Checklist antes de publicar

- [ ] Conferir se o número de WhatsApp e e-mail estão corretos
- [ ] Confirmar textos da história e do cardápio com o Flavio
- [ ] Testar os botões de WhatsApp em um celular (abrem o app corretamente)
- [ ] Testar a troca de idioma ES/PT
- [ ] Testar em celular (o site é responsivo, mas vale conferir)

---

## 📋 Observações sobre o cardápio (para revisar com o Flavio)

Durante a organização do material recebido, alguns pratos vieram com fotos/descrições duplicadas ou com pequenas diferenças de preço. Tomei decisões editoriais para deixar o cardápio do site limpo e sem repetição — vale confirmar com o Flavio:

- **Milanesas** (carne/pollo): havia até 6 variações quase idênticas (com papas, com ensalada, combo). Consolidei em 3 itens principais, com nota no site avisando que o acompanhamento é "a elección" (papas fritas ou ensalada).
- **Carne de Ternera Guisada**: veio com dois preços diferentes (ARS 15.000 e 16.000) em fotos separadas. Usei a descrição mais completa e o preço menor — mas isso só importa se um dia decidirem reativar a exibição de preços no site.
- **Picaña con poroto negro** e **Picaña Acebolada**: tratei como o mesmo prato (fica só "Picaña Acebolada" no site).
- **Bife Acebolado** e **Pasta en Salsa Bolognesa**: apareceram tanto nos combos/econômico quanto soltos depois — usei só uma versão de cada.

Nenhuma dessas decisões afeta o site hoje (já que os preços não aparecem publicamente), mas é bom alinhar com o Flavio para quando ele for atualizar o catálogo do WhatsApp.
