const { Router } = require("express");
const game = require("./game.routes");

const router = new Router();
router.use("/game", game);

module.exports = router;
