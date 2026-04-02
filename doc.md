# 📰 The Pulse News — Documentação Técnica Completa

---

## 📋 Índice

1. [Nome e Descrição do Projeto](#-nome-e-descrição-do-projeto)
2. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
3. [Estrutura do Projeto](#-estrutura-do-projeto)
4. [Explicação Detalhada de Cada Arquivo](#-explicação-detalhada-de-cada-arquivo)
   - [Arquivos de Configuração](#️-arquivos-de-configuração)
   - [Tipos e Interfaces](#-tipos-e-interfaces)
   - [Bibliotecas Utilitárias](#-bibliotecas-utilitárias)
   - [Páginas (App Router)](#-páginas-app-router)
   - [API Routes](#-api-routes)
   - [Componentes](#-componentes)
   - [Estilos Globais](#-estilos-globais)
5. [Como Instalar Dependências](#-como-instalar-dependências)
6. [Como Rodar o Projeto Localmente](#-como-rodar-o-projeto-localmente)
7. [Como Clonar o Projeto](#-como-clonar-o-projeto)

---

## 📝 Nome e Descrição do Projeto

**The Pulse News** (também referenciado como *The Daily Broadsheet*) é um portal de notícias moderno desenvolvido com **Next.js 16** e **React 19**, com design inspirado em jornais impressos clássicos. O projeto consome dados da **NewsAPI** para exibir notícias reais em tempo real, categorizadas por seções como tecnologia, negócios, ciência, saúde, esportes e entretenimento.

O sistema também conta com integração ao **Supabase** para gerenciar inscrições de newsletter via e-mail, além de possuir dados mock (simulados) para garantir que o site funcione mesmo quando a API externa não estiver disponível.

### 🎯 Principais Funcionalidades

- Exibição de notícias em tempo real via NewsAPI
- Layout estilo jornal impresso com tipografia editorial
- 7 categorias de notícias (General, Business, Technology, Science, Health, Sports, Entertainment)
- Sistema de busca de notícias
- Página de artigo individual com leitura detalhada
- Formulário de inscrição para newsletter (integrado ao Supabase)
- Dados mock automáticos como fallback
- Design responsivo para mobile, tablet e desktop
- Animações suaves (fade-in, stagger)
- Revalidação automática dos dados a cada 10 minutos (ISR)

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|---|---|---|
| **Next.js** | ^16.2.1 | Framework React com App Router, SSR e ISR |
| **React** | ^19.2.4 | Biblioteca de interfaces de usuário |
| **React DOM** | ^19.2.4 | Renderização do React no DOM |
| **TypeScript** | ^6.0.2 | Tipagem estática para JavaScript |
| **Tailwind CSS** | ^4.2.2 | Framework CSS utilitário |
| **@tailwindcss/postcss** | ^4.2.2 | Plugin PostCSS para Tailwind v4 |
| **PostCSS** | ^8.5.8 | Processador de CSS |
| **Supabase JS** | ^2.100.0 | Cliente JavaScript para Supabase (banco de dados + auth) |
| **date-fns** | ^4.1.0 | Biblioteca de manipulação de datas |
| **Google Fonts** | — | Playfair Display, Lora, Libre Baskerville, JetBrains Mono |

---

## 📂 Estrutura do Projeto

```
the-pulse-news/
├── .gitignore                          # Arquivos ignorados pelo Git
├── next.config.ts                      # Configuração do Next.js
├── package.json                        # Dependências e scripts
├── package-lock.json                   # Lockfile de dependências
├── postcss.config.mjs                  # Configuração do PostCSS
├── tsconfig.json                       # Configuração do TypeScript
│
└── src/
    ├── app/
    │   ├── globals.css                 # Estilos globais (tema + componentes CSS)
    │   ├── layout.tsx                  # Layout raiz da aplicação
    │   ├── page.tsx                    # Página inicial (Home)
    │   │
    │   ├── article/
    │   │   └── [id]/
    │   │       └── page.tsx            # Página de artigo individual
    │   │
    │   ├── category/
    │   │   └── [slug]/
    │   │       └── page.tsx            # Página de categoria
    │   │
    │   ├── search/
    │   │   └── page.tsx                # Página de resultados de busca
    │   │
    │   └── api/
    │       └── subscribe/
    │           └── route.ts            # API Route para inscrição na newsletter
    │
    ├── components/
    │   ├── ArticleCard.tsx             # Card de artigo (3 variantes)
    │   ├── ArticleImage.tsx            # Componente de imagem com fallback
    │   ├── BreakingNewsTicker.tsx       # Ticker de notícias (desabilitado)
    │   ├── CategoryPill.tsx            # Botão/pill de categoria
    │   ├── Footer.tsx                  # Rodapé do site
    │   ├── HeroArticle.tsx             # Seção hero da página inicial
    │   ├── LoadingGrid.tsx             # Skeleton de carregamento
    │   ├── Navbar.tsx                  # Barra de navegação
    │   ├── SearchBar.tsx               # Barra de busca
    │   ├── SectionHeader.tsx           # Cabeçalho de seção
    │   └── SubscribeForm.tsx           # Formulário de newsletter
    │
    ├── lib/
    │   ├── api.ts                      # Funções de consumo da NewsAPI + dados mock
    │   ├── supabase.ts                 # Cliente Supabase
    │   └── utils.ts                    # Funções utilitárias (datas, cores, etc.)
    │
    └── types/
        └── news.ts                     # Tipos e interfaces TypeScript
```

---

## 🔍 Explicação Detalhada de Cada Arquivo

### ⚙️ Arquivos de Configuração

#### `package.json`
Define o projeto com nome interno `newsapi`. Scripts disponíveis:
- `dev` — inicia o servidor de desenvolvimento (`next dev`)
- `build` — gera a build de produção (`next build`)
- `start` — inicia o servidor de produção (`next start`)
- `lint` — executa o linter (`next lint`)

#### `tsconfig.json`
Configuração do TypeScript com:
- Target ES2017
- Module resolution `bundler` (compatível com Next.js)
- Path alias `@/*` mapeado para `./src/*`
- Plugin do Next.js habilitado
- Strict mode ativado

#### `next.config.ts`
Configuração mínima do Next.js que permite carregar imagens de qualquer domínio externo (`hostname: "**"`), necessário para exibir imagens vindas da NewsAPI e do Picsum Photos.

#### `postcss.config.mjs`
Configuração do PostCSS com o plugin `@tailwindcss/postcss` para Tailwind CSS v4.

#### `.gitignore`
Ignora `node_modules`, `.next`, `.env`, `.vercel`, `.claude/` e outros arquivos temporários.

---

### 📦 Tipos e Interfaces

#### `src/types/news.ts`

Define as interfaces e tipos centrais do projeto:

- **`Article`** — Interface principal de um artigo com campos: `source`, `author`, `title`, `description`, `url`, `urlToImage`, `publishedAt`, `content`
- **`NewsResponse`** — Interface da resposta da NewsAPI com `status`, `totalResults` e `articles`
- **`Category`** — Union type com as 7 categorias: `general`, `business`, `technology`, `science`, `health`, `sports`, `entertainment`
- **`CATEGORIES`** — Array constante com slug, label e ícone de cada categoria

---

### 📚 Bibliotecas Utilitárias

#### `src/lib/api.ts`

Módulo central de dados do projeto. Contém:

- **`fetchNews(endpoint, params)`** — Função interna que faz requisições à NewsAPI com `revalidate: 600` (ISR de 10 min)
- **`getTopHeadlines(category, pageSize, country)`** — Busca notícias de destaque por categoria e país. Filtra artigos com título "[Removed]"
- **`searchNews(query, pageSize)`** — Busca notícias por termo usando o endpoint `everything` da NewsAPI. Ordena por data e filtra em inglês
- **`generateArticleId(article)`** — Gera um ID único a partir da URL do artigo codificada em base64url
- **`decodeArticleId(id)`** — Decodifica o ID de volta para a URL original
- **`getMockArticles(count, category)`** — Gera artigos simulados por categoria com títulos, descrições, autores e fontes realistas. Usa imagens do Picsum Photos
- **`MOCK_BY_CATEGORY`** — Objeto com dados mock específicos para cada uma das 7 categorias (18 títulos e descrições únicos por categoria)

#### `src/lib/supabase.ts`

Inicializa o cliente Supabase usando variáveis de ambiente:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### `src/lib/utils.ts`

Funções utilitárias:
- **`timeAgo(date)`** — Retorna tempo relativo (ex: "2 hours ago") usando `date-fns`
- **`formatDate(date)`** — Formata data como "Jan 15, 2025"
- **`formatDateLong(date)`** — Formata data longa como "January 15, 2025 at 14:30"
- **`getReadingTime(content)`** — Calcula tempo estimado de leitura (200 palavras/min)
- **`getCategoryColor(category)`** — Retorna classe Tailwind de cor baseada na categoria

---

### 📄 Páginas (App Router)

#### `src/app/layout.tsx` — Layout Raiz

Layout principal que envolve todas as páginas. Responsável por:
- Carregar 4 fontes do Google Fonts (Playfair Display, Lora, Libre Baskerville, JetBrains Mono)
- Definir variáveis CSS para cada fonte (`--font-heading`, `--font-body`, `--font-serif`, `--font-mono`)
- Renderizar `<Navbar />` no topo e `<Footer />` na base
- Configurar metadata com título "The Daily Broadsheet"

#### `src/app/page.tsx` — Página Inicial

Página principal com layout de jornal. Estrutura:
1. **Hero** — Artigo principal com artigos secundários em layout de 3 colunas
2. **Barra de categorias** — Pills de navegação para cada seção
3. **Featured** — Grid de 3 colunas com 6 artigos em destaque
4. **Trending + Bulletin** — Layout de 2 colunas (8/4) com artigos compactos e sidebar
5. **Newsletter** — Formulário de inscrição estilo classificado de jornal

Usa `revalidate = 600` (ISR). Possui fallback automático para dados mock em caso de erro na API.

#### `src/app/article/[id]/page.tsx` — Página de Artigo

Rota dinâmica que exibe um artigo individual. Funcionalidades:
- Decodifica o ID base64url para encontrar o artigo
- Exibe breadcrumb de navegação
- Mostra título com tipografia editorial grande
- Imagem do artigo com créditos da fonte
- Conteúdo com drop cap (letra capitular)
- Link para fonte original quando o conteúdo está truncado
- Botões de compartilhamento (Twitter, LinkedIn, Email)
- Seção de artigos relacionados

#### `src/app/category/[slug]/page.tsx` — Página de Categoria

Rota dinâmica para exibir notícias de uma categoria específica:
- Cabeçalho com nome da categoria e contagem de artigos
- Barra de categorias com pill ativo destacado
- Grid responsivo de 3 colunas com artigos
- Fallback para dados mock por categoria

#### `src/app/search/page.tsx` — Página de Busca

Página de resultados de busca:
- Recebe o parâmetro `q` via query string
- Exibe a query pesquisada entre aspas no cabeçalho
- Grid de resultados em 3 colunas
- Estado vazio quando não há resultados com botão "Back to Front Page"
- Fallback para mock em caso de erro na API

---

### 🔌 API Routes

#### `src/app/api/subscribe/route.ts`

Endpoint `POST /api/subscribe` para inscrição na newsletter:
- Recebe `{ email }` no corpo da requisição
- Valida presença e formato básico do email
- Insere na tabela `news-emails` do Supabase
- Trata erro de duplicata (código 23505) retornando 409
- Retorna mensagens de sucesso ou erro apropriadas

---

### 🧩 Componentes

#### `ArticleCard.tsx`
Componente reutilizável com **3 variantes**:
- **`default`** — Card completo com imagem, fonte, título, descrição e byline. Usado no grid de Featured
- **`compact`** — Lista numerada com thumbnail lateral. Usado na seção Trending
- **`horizontal`** — Item compacto numerado sem imagem. Usado na sidebar Bulletin

Possui animações fade-in com stagger delay baseado no `index`.

#### `ArticleImage.tsx`
Componente client-side wrapper do `next/image`:
- Usa `fill` com `object-cover` para imagens responsivas
- Trata erros de carregamento com estado `error` — retorna `null` se falhar
- Suporta `priority` para LCP (Largest Contentful Paint)

#### `BreakingNewsTicker.tsx`
Componente placeholder desabilitado. Retorna `null`. Mantido para referência futura.

#### `CategoryPill.tsx`
Botão/pill de navegação para categorias:
- Aceita `label`, `slug` e `active`
- Estado ativo: fundo escuro com texto claro
- Estado padrão: transparente com borda, hover muda para escuro

#### `Footer.tsx`
Rodapé com fundo escuro (bg-ink):
- Logo "The Daily Broadsheet" com descrição
- Links para todas as categorias
- Links de About, Contact, Terms, Privacy
- Copyright dinâmico com ano atual
- Crédito "Powered by NewsAPI"

#### `HeroArticle.tsx`
Componente hero da página inicial com layout de 3 colunas (5/4/3):
- **Coluna esquerda (5 cols)** — Artigo principal com imagem grande, título editorial, descrição e metadados
- **Coluna central (4 cols)** — 3 artigos secundários empilhados com separadores. Primeiro artigo com imagem
- **Coluna direita (3 cols)** — "Latest Headlines" com 4 artigos compactos só com título

#### `LoadingGrid.tsx`
Dois componentes de skeleton loading:
- **`LoadingGrid`** — Grid de cards pulsantes (animação `animate-pulse`)
- **`LoadingHero`** — Skeleton do hero com layout 3/5 + 2/5

#### `Navbar.tsx`
Barra de navegação sticky com:
- Barra superior com data atual e "Today's Edition"
- Masthead central com título "The Daily Broadsheet" em fonte editorial grande
- Menu de categorias desktop com separadores `|`
- Menu mobile hamburger com animação de transformação
- Barra de busca integrada (desktop na barra superior, mobile no menu)

#### `SearchBar.tsx`
Componente client-side de busca:
- Input com estilo editorial (borda inferior)
- Ícone SVG de lupa
- Redireciona para `/search?q=...` no submit

#### `SectionHeader.tsx`
Cabeçalho reutilizável de seção:
- Título em caixa alta com fonte editorial
- Subtítulo opcional
- Linha grossa de acento opcional (`rule-thick`)
- Linha fina inferior (`rule-thin`)

#### `SubscribeForm.tsx`
Formulário client-side de newsletter com estados:
- **idle** — Formulário com input de email e botão "Subscribe"
- **loading** — Botão desabilitado com texto "Sending..."
- **success** — Mensagem de confirmação em verde
- **error** — Mensagem de erro em vermelho
- Reset automático após 4 segundos

---

### 🎨 Estilos Globais

#### `src/app/globals.css`

Sistema de design completo com Tailwind CSS v4:

**Tema personalizado (@theme):**
- 4 famílias de fontes: heading, body, serif, mono
- Paleta de cores editorial: `ink`, `paper`, `cream`, `warm-gray`, `muted`, `accent` (vermelho escuro), `gold`, `navy`, `rule`, `rule-light`

**Componentes CSS (@layer components):**
- `rule-thick` — Linha grossa (4px) para separações fortes
- `rule-double` — Linha dupla (3px double) para o masthead
- `rule-thin` — Linha fina (1px) para separações suaves
- `rule-hairline` — Linha ultrafina (0.5px)
- `col-divider` — Divisor vertical de coluna via pseudo-elemento
- `drop-cap` — Letra capitular editorial (4.5em, float left)
- `newspaper-columns` — Layout de 2 colunas CSS com column-rule
- `line-clamp-2/3/4` — Truncamento de texto em 2, 3 ou 4 linhas
- `paper-texture` — Textura sutil de papel envelhecido com gradientes radiais

**Animações:**
- `fadeInUp` — Entrada com deslocamento vertical
- `fadeIn` — Entrada com opacidade
- Classes stagger (1-6) para delays sequenciais

---

## 📦 Como Instalar Dependências

### Pré-requisitos
- **Node.js** versão 18 ou superior
- **npm**, **yarn** ou **pnpm**

### Instalação

```bash
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# NewsAPI - obtenha em https://newsapi.org
NEXT_PUBLIC_NEWS_API_KEY=sua_chave_aqui

# Supabase - obtenha em https://supabase.com
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

> **Nota:** O projeto funciona sem as variáveis de ambiente graças ao sistema de dados mock. As notícias serão simuladas, mas todas as funcionalidades de UI estarão disponíveis.

### Tabela no Supabase (opcional)

Para a funcionalidade de newsletter, crie a tabela `news-emails` no Supabase:

```sql
CREATE TABLE "news-emails" (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🚀 Como Rodar o Projeto Localmente

### Modo Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3000`.

### Build de Produção

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## 📥 Como Clonar o Projeto

```bash
git clone https://github.com/dev-erickydias/the-pulse-news.git
cd the-pulse-news
npm install
npm run dev
```

---

## 📊 Arquitetura e Fluxo de Dados

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   NewsAPI    │────▶│   lib/api.ts │────▶│    Páginas    │
│  (externo)   │     │              │     │  (SSR/ISR)   │
└─────────────┘     │  fallback:   │     └──────┬───────┘
                    │  mock data   │            │
                    └──────────────┘            ▼
                                        ┌──────────────┐
┌─────────────┐     ┌──────────────┐    │  Componentes  │
│   Supabase   │◀───│ api/subscribe│◀───│  (React)     │
│  (externo)   │    │   route.ts   │    └──────────────┘
└─────────────┘     └──────────────┘
```

- **SSR/ISR**: Páginas são renderizadas no servidor com revalidação a cada 10 minutos
- **Fallback**: Se a NewsAPI falhar, dados mock realistas são usados automaticamente
- **Client Components**: Navbar, SearchBar, ArticleImage e SubscribeForm são componentes client-side (`"use client"`)
- **Server Components**: Todas as páginas e a maioria dos componentes são Server Components

---

*Documentação gerada em Abril de 2026 — Projeto desenvolvido por Ericky Dias*
