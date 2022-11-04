const express = require("express");
const authMiddleware = require("../../middlewares/auth/auth.middleware");
const { logger } = require("../../middlewares/logger/logger.pino");
const { Router } = express;
const passport = require("../../middlewares/passport/passport.middleware");

const router = Router();

router.get("/login", authMiddleware, async (req, res) => {
  const { url, method } = req;
  logger.info("Ruta %s  Metodo: %s", url, method);

  return res.status(200).redirect("/api/productos");
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/autherror" }),
  (req, res) => {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);

    req.session.username = req.body.username;
    req.session.admin = true;
    res.status(200).redirect("/api/productos");
  }
);

router.get("/signup", async (req, res) => {
  const { url, method } = req;
  logger.info("Ruta %s  Metodo: %s", url, method);

  res.render("signup", { layouts: "index" });
});

router.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/signuperror",
  }),
  (req, res) => {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);

    req.session.username = req.body.username;
    req.session.admin = true;
    res.status(200).redirect("/api/productos");
  }
);

router.get("/logout", authMiddleware, async (req, res) => {
  try {
    const { url, method } = req;
    logger.info("Ruta %s  Metodo: %s", url, method);

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`);
      }
    });
    return res.status(200).redirect("/api/productos");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/autherror", (req, res) => {
  const { url, method } = req;
  logger.info("Ruta %s  Metodo: %s", url, method);
  
  res.render("error", { layouts: "index", login: true });
});

router.get("/signuperror", (req, res) => {
  const { url, method } = req;
  logger.info("Ruta %s  Metodo: %s", url, method);
  
  res.render("error", { layouts: "index", signup: true });
});

module.exports = router;
