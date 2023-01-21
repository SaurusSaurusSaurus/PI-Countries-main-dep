const { Router } = require('express');
const countriesRoute = require("./countries");
const activitiesRoute = require("./activities");
const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use(express.json())
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countriesRoute);
router.use("/activities", activitiesRoute);

module.exports = router;
