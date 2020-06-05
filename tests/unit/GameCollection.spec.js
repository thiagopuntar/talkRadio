const GameCollection = require("../../src/models/GameCollection");

describe("Game model", () => {
  let gameCollection;

  beforeEach(() => {
    gameCollection = new GameCollection();
  });

  describe("games", () => {
    it("should return an immutable object", () => {
      gameCollection.games.test = "test";
      expect(gameCollection.games).not.toHaveProperty("test", "test");
    });
  });

  describe("getGameById", () => {
    it("should return a game by id number", () => {
      gameCollection.addGame();
      gameCollection.currentGame.addKill("player1", "player2");
      gameCollection.addGame();

      const result = gameCollection.getGameById(1);

      expect(result.kills).toHaveProperty("player1");
    });

    it("should return undefined if a game is not found", () => {
      const result = gameCollection.getGameById(1);
      expect(result).toBe(undefined);
    });
  });

  describe("ranking", () => {
    it("should return an object with the sum of kills from all games", () => {
      gameCollection.addGame();
      gameCollection.currentGame.addKill("player1", "player2");
      gameCollection.addGame();
      gameCollection.currentGame.addKill("player1", "player2");

      const result = gameCollection.ranking;
      expect(result).toHaveProperty("player1", 2);
      expect(result).toHaveProperty("player2", 0);
    });
  });

  describe("currentGame", () => {
    it("should return last game", () => {
      gameCollection.addGame();
      gameCollection.currentGame.addKill("player1", "player2");
      gameCollection.addGame();
      expect(gameCollection.currentGame).toHaveProperty("kills", {});
    });
  });

  describe("addGame", () => {
    it("should add a new game", () => {
      gameCollection.addGame();
      expect(Object.keys(gameCollection.games).length).toBe(1);
    });

    it("should create a new key like 'game_[number]' pattern", () => {
      gameCollection.addGame();
      expect(gameCollection.games).toHaveProperty("game_1");
    });
  });
});
