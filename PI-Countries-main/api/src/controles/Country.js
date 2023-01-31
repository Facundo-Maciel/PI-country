const { GetInfoApiCountries , GetIdCountry } = require("../controles/Utils")

const GetCountry = async(req , res) =>{

        try{

            const name = req.query.name
            let CountryTotal = await GetInfoApiCountries()

            if(name){
                let CountryName = await CountryTotal.filter(t => t.name.toLowerCase().includes(name.toLowerCase()))
                CountryName.length
                ? res.status(200).send(CountryName) 
                : res.status(400).send("Pais no encontrado :C")
            }else{
                res.status(200).send(CountryTotal)
            }

        }catch(error){
            res.status(400).send({errorMsg: error})
        }

}


const GetSingleId = async(req , res) =>{

    try{
        const {id} = req.params
        let countryId = await GetIdCountry(id)
        res.json(countryId)
    }catch(error){
        res.stauts(400).send(error.message);
    }

}

module.exports = {
    GetCountry,
    GetSingleId
}