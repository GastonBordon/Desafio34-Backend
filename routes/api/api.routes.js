const express = require("express");
const { Router } = express;

const routerFaker = require("../faker/productsFaker.routes");
const routerProducts = require("../products/products.routes");

const router = Router();

router.use("/productos", routerProducts);
router.use("/products-test", routerFaker);

module.exports = router;
