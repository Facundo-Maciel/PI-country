const {Country , Activity } = require("../db")


const createActivity = async(req , res) =>{

    try{
        const{id, name, difficulty, duration, season , country} = req.body

        let newActivity = await Activity.create({
            id,
            name,
            difficulty,
            duration,
            season
        })

        let activityDb  = await Country.findAll({where: {name: country}})
        newActivity.addCountry(activityDb)
        res.status(200).send("activity creada")

    }catch(error){
        console.log(error)
    }

}

module.exports = {

    createActivity,

}