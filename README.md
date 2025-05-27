# API CEPOL

![CI Pipeline](https://github.com/zanoni/api-cepol/workflows/CI%20Pipeline/badge.svg)

Um backend desenvolvido para atender às necessidades de um site acadêmico, focado na persistência e gestão de informações relevantes para a comunidade.

## Integrantes

- Lucas de Castro Zanoni
- Oziel Silveira

## Descrição

O projeto API CEPOL consiste em um backend desenvolvido para atender às necessidades de um site acadêmico, focado na persistência e gestão de informações relevantes para a comunidade. Seu principal objetivo é fornecer uma base sólida para armazenar, consultar e editar dados relacionados a artigos, documentos, equipamentos, profissionais e pesquisas acadêmicas, garantindo segurança, integridade e facilidade de acesso às informações.

## Funcionalidades

A API CEPOL oferece um conjunto de funcionalidades essenciais para a administração do conteúdo do site acadêmico, incluindo:

- Persistência de dados:
  - Artigos: possibilita o cadastro, consulta e atualização de artigos científicos e acadêmicos.
  - Equipamentos: permite registrar e gerenciar informações sobre equipamentos disponíveis para uso ou pesquisa.
  - Profissionais: armazena dados de profissionais vinculados à instituição, facilitando o contato e a colaboração.
  - Pesquisa: oferece suporte ao registro e acompanhamento de projetos e linhas de pesquisa desenvolvidas.

- Edição de conteúdo institucional:
  - About Us: permite a atualização e personalização da seção "Sobre Nós", garantindo que as informações institucionais estejam sempre atualizadas e alinhadas com a missão do site.

## Tecnologias

- REST API com documentação OpenAPI
- Hono.js e TypeScript
- Supabase para persistência de dados
- Rate limiting
- Security headers

## CI/CD Pipeline

O projeto utiliza GitHub Actions para automação de CI/CD:

### 🔄 Continuous Integration (`ci.yml`)

- **Execução automática**: em push para `main`/`develop` e pull requests
- **Matriz de testes**: Node.js 18.x e 20.x
- **Verificações incluídas**:
  - ✅ Formatação de código (Prettier)
  - 🔍 Linting (ESLint)
  - 🏗️ Compilação TypeScript
  - 🧪 Execução de testes (Jest)
  - 📊 Cobertura de código
  - 🔒 Auditoria de segurança
  - 📦 Build da aplicação

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia em modo desenvolvimento
npm run build        # Compila TypeScript
npm start            # Inicia em modo produção

# Qualidade de código
npm run lint         # Verifica linting
npm run lint:fix     # Corrige problemas de linting
npm run format       # Formata código
npm run format:check # Verifica formatação

# Testes
npm test             # Executa testes
```

## Documentação Técnica

- [Análise de Problemas e Estratégia de Refatoração](./problems-detected.md)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create a .env file with the following content
PORT=3000
NODE_ENV=development
```

4. The database is automatically initialized when starting the application.

### Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## API Documentation

The API documentation is available at the root endpoint (`/`) when the server is running.

## Project Structure

```
src/
├── application/     # Application services and use cases
├── domain/          # Domain models and interfaces
├── infrastructure/  # External services, database, web server
│   ├── database/    # Database implementation
│   │   └── sqlite/  # SQLite configuration
│   ├── middleware/  # API middleware
│   └── web/         # Web server configuration
├── presentation/    # API controllers and DTOs
└── config/          # Application configuration
```

## Endpoints

The API provides the following endpoints:

- `/public/about` - About information (public)
- `/about` - Manage about information (authenticated)
- `/public/article` - Articles (public)
- `/article` - Manage articles (authenticated)
- `/public/equipment` - Equipment (public)
- `/equipment` - Manage equipment (authenticated)
- `/public/research` - Research (public)
- `/research` - Manage research (authenticated)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
