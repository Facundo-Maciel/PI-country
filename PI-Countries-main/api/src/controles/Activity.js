const {Country , Activity } = require("../db")
const {GetActivityInfo , GetInfoApiCountries} = require("./Utils")


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

const getActivity = async(req , res) =>{

    try{
        
        //await GetInfoApiCountries();
        
        let Diets = await GetActivityInfo((d) =>{

            return{
                id: d.id,
                name: d.name,
                difficulty: d.difficulty,
                duration: d.duration, 
                season: d.season, 
                country: d.country
            }

        });
        res.send(Diets);
    }catch(error){
        res.send(error);
    }

} 

module.exports = {

    createActivity,
    getActivity

}