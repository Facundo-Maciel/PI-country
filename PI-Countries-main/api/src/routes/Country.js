const  router  = require('express').Router();
const{

    GetCountry,
    GetSingleId,

} = require("../controles/Country")

router.get("/", GetCountry);

router.get("/country/:id",GetSingleId);




module.exports = router;