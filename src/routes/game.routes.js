const { Router } = require("express");
const controller = require("../controllers/game.controller");

const router = new Router();

router.get("/ranking", controller.report);
router.get("/:id", controller.getGameInfo);

module.exports = router;
