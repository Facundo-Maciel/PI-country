const  router  = require('express').Router();
const{

    GetCountry,
    GetSingleId,

} = require("../controles/Country")

const{getCountry} = require("../controles/Utils")


router.get("/country", GetCountry);

router.get("/country/:id",GetSingleId);




module.exports = router;