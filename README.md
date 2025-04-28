# 🤖 Bot FURIA - Telegram Bot

Um bot do Telegram que fornece informações sobre as equipes da FURIA Esports nas modalidades CS, VALORANT, League of Legends e Rainbow Six Siege.

## 📋 Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Instalar](#como-instalar)
- [Como Usar](#como-usar)
- [Demonstração](#demonstração)
- [Desafios e Soluções](#desafios-e-soluções)
- [Futuras Implementações](#futuras-implementações)
- [Contato](#contato)

## 🎮 Sobre o Projeto

Este bot foi desenvolvido como um projeto para demonstrar minhas habilidades de desenvolvimento com Node.js, APIs e gerenciamento de banco de dados. O Bot FURIA permite aos usuários do Telegram acessar informações sobre todos os times da FURIA Esports, incluindo dados sobre jogadores, estatísticas das equipes, próximos jogos e resultados recentes.

## ⚡ Funcionalidades

- **Menu Principal**: Navegação intuitiva entre os diferentes times e funcionalidades
- **Perfis de Jogadores**: Informações detalhadas sobre cada jogador da FURIA
- **Próximos Jogos**: Calendário de partidas agendadas para cada time
- **Resultados Recentes**: Histórico de partidas recentes e seus resultados
- **Estatísticas**: Dados de desempenho dos times e jogadores

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **MongoDB**: Banco de dados para armazenar informações de usuários e preferências
- **Telegram Bot API**: Interface para integração com o Telegram
- **Mongoose**: ODM para modelagem de objetos no MongoDB
- **dotenv**: Gerenciamento de variáveis de ambiente
- **Express**: (Opcional) Para possíveis extensões web futuras

## 📁 Estrutura do Projeto

```
BOT_FURIA/
├── src/
│   ├── config/
│   │   └── database.js        # Configuração de conexão com MongoDB
│   ├── data/
│   │   ├── csData.js          # Dados mockados do time de CS
│   │   ├── valorantData.js    # Dados mockados do time de VALORANT
│   │   ├── lolData.js         # Dados mockados do time de LoL
│   │   └── r6Data.js          # Dados mockados do time de R6
│   ├── handlers/
│   │   ├── commands.js        # Handlers para comandos do bot
│   │   └── callbacks.js       # Handlers para callbacks dos botões
│   ├── menus/
│   │   └── menus.js           # Definição dos menus interativos
│   ├── models/
│   │   ├── User.js            # Schema de usuários
│   │   └── Preferences.js     # Schema de preferências do usuário
│   ├── utils/
│   │   └── helpers.js         # Funções auxiliares
│   └── index.js               # Ponto de entrada da aplicação
├── .env.example               # Exemplo de variáveis de ambiente necessárias
├── .gitignore                 # Arquivos e diretórios ignorados pelo git
├── package.json               # Dependências e scripts
└── README.md                  # Documentação do projeto
```

## 🚀 Como Instalar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/BOT_FURIA.git
   cd BOT_FURIA
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` baseado no `.env.example`
   - Adicione seu token do bot do Telegram (obtenha com @BotFather no Telegram)
   - Configure a URI do MongoDB

   ```
   # Exemplo de .env
   TELEGRAM_BOT_TOKEN=seu_token_aqui
   MONGODB_URI=mongodb://localhost:27017/furia-bot
   ```

4. Inicie o MongoDB (se estiver usando localmente):
   ```bash
   mongod
   ```

5. Execute o bot:
   ```bash
   node src/index.js
   ```

## 🎯 Como Usar

1. No Telegram, busque pelo seu bot (@FuricoDaFuriaBot ou o nome que você configurou)
2. Inicie uma conversa com o comando `/start`
3. Use o menu principal para navegar entre as opções:
   - Selecione um time (CS, VALORANT, LoL, R6)
   - Veja informações sobre jogadores
   - Consulte calendário de jogos
   - Veja resultados recentes
   - Acesse estatísticas
4. Você pode voltar ao menu principal a qualquer momento usando botões de navegação ou o comando `/menu`

## 📱 Demonstração

[Link para vídeo de demonstração ou imagens do bot em funcionamento]

Para testar o bot diretamente no Telegram: [@FuriaBot](https://t.me/FuricoDaFuria_Bot)

## 🧩 Desafios e Soluções

Durante o desenvolvimento deste projeto, enfrentei e superei diversos desafios:

1. **Arquitetura Modular**: Implementei uma estrutura organizada que separa claramente as responsabilidades, facilitando a manutenção e expansão do código.

2. **Gerenciamento de Estados**: Criei um sistema eficiente para gerenciar o estado da conversa com cada usuário através do MongoDB, permitindo uma experiência personalizada.

3. **Interface Intuitiva**: Desenvolvi um sistema de menus interativos usando os recursos de inline keyboard do Telegram, tornando a navegação simples e agradável.

4. **Manipulação de Paths**: Implementei os caminhos de importação de módulos de forma relativa, garantindo a correta referência entre os diferentes arquivos do projeto.

5. **Persistência de Dados**: Configurei a conexão com o MongoDB para armazenar dados de usuários e suas preferências, permitindo uma experiência personalizada.

## 🔮 Futuras Implementações

- **Integrações com APIs Reais**: Substituir os dados mockados por informações obtidas de APIs de esports em tempo real
- **Notificações**: Sistema de alertas para jogos próximos ou resultados recentes
- **Análises Estatísticas Avançadas**: Visualizações e comparações de desempenho mais detalhadas
- **Multilinguagem**: Suporte para diferentes idiomas
- **Dashboard Web**: Interface web para administração e visualização de estatísticas de uso

## 📬 Contato

[Seu Nome] - [Seu Email] - [Seu LinkedIn]

Link do Projeto: [https://github.com/seu-usuario/BOT_FURIA](https://github.com/seu-usuario/BOT_FURIA)

---

Desenvolvido com ❤️ como demonstração de habilidades para processos seletivos.
