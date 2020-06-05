const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("./storage/games.log"),
  terminal: false,
});

const games = {};

let gameId = "";
const pattern = /\d+\: (.+) killed (.+) by/;

rl.on("line", (line) => {
  if (line.includes("InitGame: ")) {
    gameId = `game_${Object.keys(games).length + 1}`;
    games[gameId] = {
      total_kills: 0,
      kills: {},
    };

    return;
  }

  const currentGame = games[gameId];

  if (line.includes("Kill: ")) {
    const [, killer, deadOne] = pattern.exec(line);
    const { [killer]: playerOne, [deadOne]: playerTwo } = currentGame.kills;

    currentGame.total_kills++;

    !playerOne ? (currentGame.kills[killer] = 0) : "";
    !playerTwo ? (currentGame.kills[deadOne] = 0) : "";

    if (killer === "<world>") {
      currentGame.kills[deadOne]--;
    }

    currentGame.kills[killer]++;
  }
});

rl.on("close", () => {
  const formatedGames = Object.keys(games).map((id) => {
    const game = games[id];
    const { "<world>": world, ...playerKills } = game.kills;
    game.kills = playerKills;
    game.players = Object.keys(playerKills);
    return game;
  });
  console.log(formatedGames);
});
