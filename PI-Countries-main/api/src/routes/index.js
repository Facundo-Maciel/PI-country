const router  = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const CountryRouter = require("./Country")
const ActivityRouter = require("./Activity")
//const ActivityRouter = require("./Activity")

router.use("/", CountryRouter)
router.use("/", ActivityRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
