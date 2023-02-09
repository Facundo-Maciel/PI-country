const  router  = require('express').Router();


const{createActivity, getActivity} = require("../controles/Activity")

router.post("/activity", createActivity);

router.get("/activity", getActivity);















module.exports = router;