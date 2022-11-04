const randomData = require("../../faker/faker");
const {logger} = require("../../middlewares/logger/logger.pino")
const express = require("express");
const { Router } = express;

const router = Router();

router.get("/", (req, res) => {
  const { url, method } = req;
  logger.info("Ruta %s  Metodo: %s", url, method);

  const data = randomData();
  res.render("test", { layouts: "index", data });
});

module.exports = router;
