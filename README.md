# Portal Fapespa

Portal institucional com acesso rápido aos produtos digitais da Fapespa.

## Estrutura

- index.html: página principal do portal
- assets/style.css: estilos da interface

## Produtos em destaque

- Anuário Estatístico
- Radar

## Publicação com Cloudflare Pages

### 1) Conectar repositório

- Acessar Cloudflare Dashboard
- Ir em Workers & Pages
- Criar projeto Pages e conectar este repositório GitHub

### 2) Configurar build

- Framework preset: None
- Build command: (vazio)
- Build output directory: .
- Production branch: main

### 3) Deploy

- Salvar configurações e iniciar deploy
- Validar URL gerada pelo Pages

## Deploy automático

Cada push na branch main publica automaticamente uma nova versão.

## Próximos passos recomendados

- Criar seção de notícias com destaque para o novo sistema de mapas do Anuário
- Adicionar domínio customizado institucional
- Definir rotina de atualização de conteúdo
