# Talk Radio

Projeto para processo seletivo na TalkRadio

## SETUP

- Clone this project to your machine;
- Copy .env.sample to ".env" and ".env.test" and fill with your own values;
- Run npm install;
- Run npm start for production or "npm run dev" for development;
- To run tests, npm test;

## ROUTES

Every route has the following pattern:

**localhost:[PORT_YOU_DEFINED_ON_DOTENV_FILE]/api/v1**

**game/:id**: Find a game by ID and return it's data;

**game/report**: Get a ranking between all log's games;

## LÓGICA DA ABORDAGEM

Criei um parser para ler linha a linha do arquivo de log.
Em cada linha, analiso se ela possui as palavras que indicam abertura de um novo jogo (InitGame: ) ou uma kill (Kill: ).

Não utilizei a nomenclatura de encerramento de um jogo pois não identifiquei esta informação no log para todos os games,
então, na abertura de um novo jogo, encerro o anterior.

Encapsulei as lógicas da coleção de jogos (GameCollection) e do jogo propriamente dito (Game) em classes ES6 para facilitar a leitura
do código.

Utilizei uma regex para extrair quem matou e quem morreu, visto que o padrão é sempre o mesmo da construção das linhas do log.
De posse dessas duas informações, o método Game.addKill() fica responsável por toda a lógica mencionada de adicionar uma kill para aquele jogador, aumentar o número de kills totais do jogo e ignorar o <world> como um player.

Como uma das tarefas era construir uma API, aproveitei a mesma para fazer a impressão descrita na tarefa 2 pela rota report, conforme a sessão **ROUTES**.

Tenho o costume de escrever as variáveis em inglês e mesmo fazer comentários o máximo que eu consigo. Esta sessão preferi escrever em português para me expressar de forma mais clara e precisa possível.

Finalizando, gostaria de deixar minha opinião de que foi um excelente teste, bem criativo e divertido de trabalhar.
