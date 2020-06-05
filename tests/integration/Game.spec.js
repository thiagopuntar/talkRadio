const app = require("../../src/server");
const request = require("supertest")(app);

const url = "/api/v1/game";

describe("Game Controller", () => {
  describe("getGameInfo", () => {
    it("should return info about a valid game", async () => {
      const { body, status } = await request.get(`${url}/1`);
      expect(status).toBe(200);
      expect(body).toMatchObject({
        total_kills: 11,
        kills: { Isgalamido: -5, Mocinha: 0 },
        players: ["Isgalamido", "Mocinha"],
      });
    });

    it("should return 404 if no game is found", async () => {
      const { status } = await request.get(`${url}/5`);
      expect(status).toBe(404);
    });
  });

  describe("report", () => {
    it("should return games ranking", async () => {
      const { body } = await request.get(`${url}/report`);
      expect(body).toMatchObject({
        Isgalamido: -4,
        Mocinha: 0,
        Zeh: -2,
        "Dono da Bola": -1,
      });
    });
  });
});
