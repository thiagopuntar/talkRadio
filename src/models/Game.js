const { WORLD } = require("../utils/Contants");

class Game {
  constructor() {
    this._totalKills = 0;
    this._kills = {};
    Object.seal(this);
  }

  get kills() {
    return { ...this._kills };
  }

  addKill(killer, deadOne) {
    this._totalKills++;
    [killer, deadOne].forEach((player) => this._addPlayer(player));

    if (killer === WORLD) {
      this._kills[deadOne]--;
      return;
    }

    this._kills[killer]++;
  }

  _addPlayer(player) {
    if (player === WORLD) return;

    if (!Object.keys(this._kills).includes(player)) {
      this._kills[player] = 0;
    }
  }

  get players() {
    return Object.keys(this._kills);
  }

  toJSON() {
    const { _totalKills, _kills } = this;

    return {
      total_kills: _totalKills,
      kills: _kills,
      players: this.players,
    };
  }
}

module.exports = Game;
