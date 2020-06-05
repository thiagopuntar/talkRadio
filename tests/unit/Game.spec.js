const Game = require("../../src/models/Game");
const { WORLD } = require("../../src/utils/Contants");

describe("Game model", () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  describe("_addPlayer", () => {
    it("should add a player to kills object if it's not already present", () => {
      game._addPlayer("Teste");

      expect(game.kills).toHaveProperty("Teste", 0);
    });

    it("should do nothing if WORLD is passed as a player", () => {
      game._addPlayer(WORLD);
      expect(game.kills).toMatchObject({});
    });

    it("should do nothing if an existent player is passed", () => {
      game._addPlayer("Teste");
      game._addPlayer("Teste");

      expect(game.kills).toHaveProperty("Teste", 0);
    });
  });

  describe("kills", () => {
    it("should return an immutable object containing all kills", () => {
      game.addKill("fulano", "beltrano");
      game.kills.beltrano = 1;

      expect(game.kills).not.toHaveProperty("beltrano", 1);
    });
  });

  describe("addKill", () => {
    it("should add a kill to totalKills", () => {
      game.addKill("player1", "player2");
      game.addKill(WORLD, "player2");
      expect(game._totalKills).toBe(2);
    });

    it("should increase kills of the killer player", () => {
      game.addKill("player1", "player2");
      game.addKill("player1", "player2");
      expect(game.kills["player1"]).toBe(2);
    });

    it("should not add WORLD to kills object", () => {
      game.addKill(WORLD, "player2");
      expect(game.kills).not.toHaveProperty(WORLD);
    });

    it("should decrease player's kills when killed by WORLD", () => {
      game.addKill(WORLD, "player2");
      expect(game.kills["player2"]).toBe(-1);
    });
  });

  describe("players", () => {
    it("should return all players", () => {
      game.addKill("player1", "player2");
      expect(game.players).toEqual(
        expect.arrayContaining(["player1", "player2"])
      );
    });

    it("should not have WORLD as a player", () => {
      game.addKill(WORLD, "player2");
      expect(game.players).toEqual(expect.arrayContaining(["player2"]));
    });
  });

  describe("toJSON", () => {
    it("should return formated game", () => {
      expect(game.toJSON()).toHaveProperty("kills");
      expect(game.toJSON()).toHaveProperty("players");
      expect(game.toJSON()).toHaveProperty("total_kills");
    });
  });
});
