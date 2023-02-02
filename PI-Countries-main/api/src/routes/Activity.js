const  router  = require('express').Router();


const{createActivity} = require("../controles/Activity")

router.post("/activity", createActivity);
















module.exports = router;