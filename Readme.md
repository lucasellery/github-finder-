# &lt;githubExplorer /&gt;

Aplicação React para pesquisar usuários do GitHub e explorar seus repositórios públicos.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Redux](https://img.shields.io/badge/Redux-4-764ABC?style=flat-square&logo=redux)
![Redux Saga](https://img.shields.io/badge/Redux--Saga-1-86D46B?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)

---

## Funcionalidades

- Busca de usuário pelo username do GitHub
- Exibição de avatar, nome, login, seguidores e número de repositórios
- Listagem de repositórios com nome, descrição, linguagem, estrelas e data de atualização
- Filtro de repositórios por nome
- Ordenação por data de atualização ou número de estrelas
- Paginação da lista de repositórios
- Persistência da última busca no `localStorage`
- Tratamento de erros (usuário não encontrado, erro de rede)
- Estados de loading, sucesso e erro controlados via Redux

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 | Interface |
| TypeScript | Tipagem estática |
| Redux + Redux Toolkit | Gerenciamento de estado global |
| Redux-Saga | Side effects assíncronos (chamadas à API) |
| TailwindCSS | Estilização |
| ShadcnUI | Componentes prontos e customizáveis |
| Lucide | Biblioteca de ícones |
| Axios | Requisições HTTP |
| Vite | Build tool |
| Vitest | Testes unitários |

---

## Arquitetura

O fluxo de dados segue o padrão exigido:

```
UI → Action → Saga → API → Reducer → UI
```

```
src/
├── components/
│   ├── SearchBar/        # Input + botão de busca, dispara a action
│   ├── UserProfile/      # Exibe dados do usuário
│   └── RepoList/         # Lista paginada com filtro e ordenação
├── hooks/
│   └── useDebounce.ts    # Hook utilitário de debounce
├── store/
│   ├── index.ts          # Configuração do store + saga middleware
│   ├── rootReducer.ts    # Combina os reducers + exporta RootState
│   ├── rootSaga.ts       # Combina as sagas
│   └── github/
│       ├── types.ts      # Interfaces TypeScript + ActionTypes enum
│       ├── actions.ts    # Action creators tipados
│       ├── reducer.ts    # Reducer puro com imutabilidade
│       ├── sagas.ts      # Worker + Watcher saga
│       └── selectors.ts  # Selectors para leitura do estado
├── tests/
│   ├── setup.ts
│   ├── reducer.test.ts
│   ├── selectors.test.ts
│   └── actions.test.ts
└── utils/
    └── localStorage.ts   # Persistência da última busca
```

### Estados do Redux

| Estado | Descrição |
|---|---|
| `loading` | Requisição em andamento |
| `user` | Dados do usuário retornados pela API |
| `repos` | Lista de repositórios públicos |
| `error` | Mensagem de erro (404, falha de rede etc.) |

---

## Instalação e execução

### Pré-requisitos

- Node.js 18+
- npm 9+

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/lucasellery/github-finder-.git
cd github-finder

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

---

## Scripts disponíveis

```bash
npm run dev        # Inicia o servidor de desenvolvimento
npm run build      # Gera o build de produção
npm run preview    # Visualiza o build de produção localmente
npm test           # Executa os testes unitários
npm run test:ui    # Executa os testes com interface visual
```

---

## Testes

Os testes cobrem as camadas mais críticas do Redux:

```bash
npm test
```

```
✓ reducer.test.ts    — estado inicial, REQUEST, SUCCESS, FAILURE, imutabilidade
✓ selectors.test.ts  — leitura correta de cada campo do estado
✓ actions.test.ts    — formato e payload de cada action creator
```

---

## API utilizada

[GitHub REST API](https://docs.github.com/en/rest) — pública, sem autenticação necessária.

| Endpoint | Uso |
|---|---|
| `GET /users/{username}` | Dados do usuário |
| `GET /users/{username}/repos?per_page=100&sort=updated` | Repositórios públicos |

> A API pública do GitHub tem limite de 60 requisições por hora por IP sem autenticação.