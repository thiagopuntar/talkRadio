const LogParserService = require("../services/LogParser.service");
const { LOG_PATH } = process.env;

class GameController {
  async getGameInfo(req, res) {
    const { id } = req.params;
    const { path = LOG_PATH } = req.query;

    const GameCollection = await LogParserService.parse(path);
    const game = GameCollection.getGameById(id);

    if (!game) {
      return res.status(404).send("Game not found.");
    }

    res.send(game);
  }

  async report(req, res) {
    const { path = LOG_PATH } = req.query;
    const GameCollection = await LogParserService.parse(path);
    res.send(GameCollection.ranking);
  }
}

module.exports = new GameController();
