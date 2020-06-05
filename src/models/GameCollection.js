const Game = require("./Game");

class GameCollection {
  constructor() {
    this._games = {};
    Object.freeze(this);
  }

  get games() {
    return { ...this._games };
  }

  getGameById(id) {
    return this._games[`game_${id}`];
  }

  get ranking() {
    return Object.keys(this._games).reduce((total, gameId) => {
      const { kills } = this._games[gameId];
      Object.keys(kills).forEach((player) => {
        if (!Object.keys(total).includes(player)) {
          total[player] = kills[player];
          return;
        }

        total[player] += kills[player];
      });

      return total;
    }, {});
  }

  get currentGame() {
    return this._games[`game_${Object.keys(this._games).length}`];
  }

  addGame() {
    const gameId = `game_${Object.keys(this._games).length + 1}`;
    this._games[gameId] = new Game();
  }
}

module.exports = GameCollection;
