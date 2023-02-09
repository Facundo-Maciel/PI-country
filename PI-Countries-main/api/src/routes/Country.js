const router = require("express").Router();
const{

    GetCountry,
    GetSingleId,
    GetNameCountry,

} = require("../controles/Country");

router.get("/", GetCountry);

router.get("/country/:id",GetSingleId);

router.get("/countryNames",GetNameCountry)


module.exports = router;