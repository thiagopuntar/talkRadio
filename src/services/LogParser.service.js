const fs = require("fs");
const readline = require("readline");
const GameCollection = require("../models/GameCollection");

class LogParserService {
  /**
   *
   * @param {string} logFilePath - Path where log file it is.
   */
  parse(logFilePath) {
    return new Promise((resolve, reject) => {
      const input = fs.createReadStream(logFilePath);

      input.on("error", (err) => {
        return reject(err);
      });

      const rl = readline.createInterface({
        input,
        terminal: false,
      });

      const games = new GameCollection();
      const pattern = /\d+\: (.+) killed (.+) by/;

      rl.on("line", (line) => {
        if (line.includes("InitGame: ")) {
          games.addGame();
          return;
        }

        if (line.includes("Kill: ")) {
          const [, killer, deadOne] = pattern.exec(line);
          games.currentGame.addKill(killer, deadOne);
        }
      });

      rl.on("close", () => {
        resolve(games);
      });
    });
  }
}

module.exports = new LogParserService();
