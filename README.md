# Sistema de Biblioteca - UTFPR

Este projeto foi desenvolvido como exercício da disciplina de **Interação Humano-Computador** do curso de **Análise e Desenvolvimento de Sistemas** da **Universidade Tecnológica Federal do Paraná (UTFPR) - Campus Ponta Grossa**, sob orientação do **Prof. Geraldo Ranthum**.

## 📋 Sobre o Projeto

O Sistema de Biblioteca é uma aplicação web completa que permite o gerenciamento de acervo, empréstimos e usuários de uma biblioteca universitária. O sistema atende dois tipos de usuários:

- **Associados**: Estudantes e professores que podem consultar o acervo, solicitar empréstimos e acompanhar seu histórico
- **Bibliotecários**: Responsáveis pelo cadastro de itens, gerenciamento de empréstimos e administração do sistema

## 🚀 Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework React para desenvolvimento web
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes de UI reutilizáveis
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[Geist Font](https://vercel.com/font)** - Tipografia moderna da Vercel

## ✨ Funcionalidades

### Para Associados
- 🔍 **Consulta de Acervo**: Busca por livros e revistas usando título, autor, ISBN, palavras-chave ou data
- 📚 **Meus Empréstimos**: Visualização de empréstimos ativos com datas de devolução e status
- 📊 **Histórico**: Acompanhamento completo de empréstimos anteriores com estatísticas
- ⚠️ **Alertas de Multa**: Notificações sobre atrasos e valores a pagar
- 📋 **Lista de Espera**: Solicitação de itens indisponíveis

### Para Bibliotecários
- 👥 **Cadastro de Associados**: Registro de novos usuários com dados completos
- 📖 **Cadastro de Itens**: Adição de livros e revistas ao acervo
- 🔄 **Gerenciamento de Empréstimos**: Controle de devoluções, multas e renovações
- 📈 **Dashboard Administrativo**: Visão geral com estatísticas do sistema
- 🎯 **Lista de Espera**: Gerenciamento de solicitações pendentes

## 🎨 Design e UX/UI

O projeto segue princípios modernos de design com:

- **Design System Consistente**: Baseado no Geist Design System
- **Interface Responsiva**: Adaptável a diferentes tamanhos de tela
- **Acessibilidade**: Componentes com suporte a leitores de tela
- **Experiência Intuitiva**: Navegação clara e feedback visual adequado
- **Paleta de Cores Profissional**: Tons escuros e elegantes apropriados para ambiente acadêmico

## 🚀 Como Executar

1. **Clone o repositório**
\`\`\`bash
git clone [url-do-repositorio]
cd sistema-biblioteca
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
\`\`\`

3. **Execute o projeto**
\`\`\`bash
npm run dev
\`\`\`

4. **Acesse no navegador**
\`\`\`
http://localhost:3000
\`\`\`

## 👤 Credenciais de Teste

### Associado
- **Usuário**: `12345` ou `joao@email.com`
- **Senha**: `senha123`

### Bibliotecário
- **Usuário**: `admin` ou `admin@biblioteca.com`
- **Senha**: `admin123`

## 📚 Funcionalidades Implementadas

- ✅ Sistema de login com perfis diferenciados
- ✅ Dashboard personalizado para cada tipo de usuário
- ✅ Consulta de acervo com busca avançada
- ✅ Gerenciamento de empréstimos e devoluções
- ✅ Histórico completo de transações
- ✅ Sistema de multas e alertas
- ✅ Cadastro de associados e itens do acervo
- ✅ Lista de espera para itens indisponíveis
- ✅ Interface responsiva e acessível

## 🎯 Objetivos Acadêmicos Alcançados

Este projeto demonstra a aplicação prática de conceitos de:

- **Interação Humano-Computador**: Interface intuitiva e centrada no usuário
- **Usabilidade**: Navegação clara e feedback adequado
- **Acessibilidade**: Componentes compatíveis com tecnologias assistivas
- **Design Responsivo**: Adaptação a diferentes dispositivos
- **Arquitetura de Software**: Organização modular e reutilizável

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos como parte do exercício da disciplina de Interação Humano-Computador da UTFPR.

---

**Desenvolvido com auxílio da IA v0 da Vercel para otimização do desenvolvimento e implementação das melhores práticas de UX/UI.**
