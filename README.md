<div align="center">

# 📰 The Pulse News

### 🗞️ Portal de Notícias com Design Editorial Clássico

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

<br />

*Um portal de notícias moderno inspirado nos grandes jornais impressos, construído com as tecnologias mais recentes do ecossistema React.*

---

</div>

## 📖 Sobre o Projeto

**The Pulse News** é um portal de notícias fullstack que combina a elegância dos jornais impressos tradicionais com a tecnologia web moderna. O projeto consome a **NewsAPI** para exibir notícias reais e utiliza **Supabase** para gerenciar inscrições de newsletter.

O design editorial é inspirado em jornais clássicos como *The New York Times* e *The Guardian*, com tipografia sofisticada, layouts em colunas, linhas divisórias (rules) e letra capitular (drop cap).

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 📰 **Notícias em Tempo Real** | Consome dados da NewsAPI com atualização automática a cada 10 minutos |
| 🏷️ **7 Categorias** | General, Business, Technology, Science, Health, Sports, Entertainment |
| 🔍 **Sistema de Busca** | Pesquise notícias por palavras-chave com resultados instantâneos |
| 📄 **Página de Artigo** | Leitura detalhada com tipografia editorial e artigos relacionados |
| 📧 **Newsletter** | Formulário de inscrição integrado ao Supabase |
| 🎭 **Dados Mock** | Fallback automático com dados realistas quando a API está indisponível |
| 📱 **Design Responsivo** | Layout adaptável para mobile, tablet e desktop |
| ⚡ **ISR (Incremental Static Regeneration)** | Páginas pré-renderizadas com revalidação automática |
| 🎨 **Design Editorial** | Tipografia clássica, drop caps, linhas divisórias, textura de papel |
| ✨ **Animações Suaves** | Fade-in com efeito stagger para carregamento progressivo |

---

## 🛠️ Tecnologias Utilizadas

<div align="center">

| Tecnologia | Uso |
|---|---|
| ![Next.js](https://img.shields.io/badge/Next.js-000?style=flat-square&logo=next.js) | Framework React com App Router e SSR |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | Biblioteca de interfaces |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Tipagem estática |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Estilização utilitária |
| ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white) | Banco de dados (newsletter) |
| ![date-fns](https://img.shields.io/badge/date--fns-770C56?style=flat-square) | Manipulação de datas |

</div>

**Fontes tipográficas:**
- 🅰️ **Playfair Display** — Títulos e manchetes
- 📝 **Lora** — Texto do corpo
- 📖 **Libre Baskerville** — Metadados e labels
- 💻 **JetBrains Mono** — Elementos monoespaçados

---

## 📂 Estrutura do Projeto

```
📦 the-pulse-news/
├── 📄 next.config.ts          # Configuração do Next.js
├── 📄 package.json             # Dependências e scripts
├── 📄 tsconfig.json            # Configuração TypeScript
│
└── 📁 src/
    ├── 📁 app/
    │   ├── 🎨 globals.css      # Tema e estilos globais
    │   ├── 📄 layout.tsx       # Layout raiz
    │   ├── 📄 page.tsx         # Página inicial
    │   ├── 📁 article/[id]/    # Página de artigo
    │   ├── 📁 category/[slug]/ # Página de categoria
    │   ├── 📁 search/          # Página de busca
    │   └── 📁 api/subscribe/   # API de newsletter
    │
    ├── 📁 components/          # 11 componentes React
    ├── 📁 lib/                 # API, Supabase e utilitários
    └── 📁 types/               # Tipos TypeScript
```

---

## 🚀 Como Usar

### 📋 Pré-requisitos

- **Node.js** 18+
- **npm**, **yarn** ou **pnpm**
- Chave da [NewsAPI](https://newsapi.org) *(opcional — funciona com dados mock)*
- Projeto no [Supabase](https://supabase.com) *(opcional — apenas para newsletter)*

### 📥 Clonando o Repositório

```bash
git clone https://github.com/dev-erickydias/the-pulse-news.git
```

### 📦 Instalando Dependências

```bash
cd the-pulse-news
npm install
```

### ⚙️ Configurando Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# NewsAPI (https://newsapi.org)
NEXT_PUBLIC_NEWS_API_KEY=sua_chave_aqui

# Supabase (https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

> 💡 **Dica:** O projeto funciona perfeitamente sem as variáveis de ambiente! O sistema de dados mock garante que todas as funcionalidades de UI estejam disponíveis.

### ▶️ Rodando o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Build de produção
npm run build && npm start
```

Acesse **http://localhost:3000** no navegador 🌐

---

## 📱 Páginas Disponíveis

| Rota | Descrição |
|---|---|
| `/` | 🏠 Página inicial com hero, destaques e trending |
| `/category/[slug]` | 🏷️ Notícias filtradas por categoria |
| `/article/[id]` | 📄 Leitura completa de um artigo |
| `/search?q=...` | 🔍 Resultados de busca |

---

## 🎨 Design System

O projeto utiliza um sistema de design editorial customizado:

- **Cores:** Paleta inspirada em papel envelhecido (`paper`, `cream`, `ink`, `accent`)
- **Tipografia:** 4 famílias de fontes com hierarquia clara
- **Rules:** Linhas divisórias em 4 espessuras (thick, double, thin, hairline)
- **Animações:** Fade-in com stagger para carregamento progressivo
- **Textura:** Gradientes sutis simulando papel de jornal

---

## 👨‍💻 Autor

<div align="center">

**Ericky Dias**

[![GitHub](https://img.shields.io/badge/GitHub-dev--erickydias-181717?style=for-the-badge&logo=github)](https://github.com/dev-erickydias)

</div>

---

<div align="center">

Feito com ❤️ e ☕ por **Ericky Dias**

</div>
