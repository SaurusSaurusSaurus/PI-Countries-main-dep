const { Router } = require('express');
const {Op} = require('sequelize');
const axios = require('axios')
const {Countries, Activities} = require('../db');


const router = Router();

const getInfoAPI = async ()=>{
    try {
        const API = await axios.get('https://restcountries.com/v3/all');
        const data = await API.data.map((country)=>{
            return {
                id: country.cca3,
                name: country.name.common,
                flags: country.flags[1],
                continent: country.continents[0],
                capital: country.capital !=null ? country.capital[0]:"No data",
                subregion: country.subregion,
                area: country.area,
                population: country.population
            };
        });
        console.log(data.length)
        const DB = await Countries.findAll();
        if(!DB.length){
            await Countries.bulkCreate(data)
            .then(()=> console.log("Saved"))      
        }
        //const pop = await Countries.findAll();
        //pop.map(p =>console.log(p.toJSON()))
        // const pop = await Countries.findByPk("AGO");
        //return pop;
        return DB;

    } catch (error) {
        console.log(error)
    }
}
getInfoAPI();

router.get("/",async(req,res,next)=>{
    const name = req.query.name;
    try { 
        if(name){
            const countryPromiseDb = await Countries.findAll({
                include: Activities,
                where:{
                    name: {
                        [Op.iLike]: "%"+name+"%",
                    }
                }
                ,
                order:[
                    ["name","ASC"]
                ],
            })
            if(countryPromiseDb.length) return res.status(200).json(countryPromiseDb)
            else return res.status(404).send("País no encontrado")

        } else if(name === ""){
            return await Countries.findAll({
                include: Activities
            })
            .then((countries)=>{
                res.status(200).send(countries)
            })
        } else {
            return await Countries.findAll({
                include: Activities
            })
            .then((countries)=>{
                res.status(200).send(countries)
            })
        }
    } catch (error) {
        next(error, "GET/ countries")
    }    
})
router.get("/all",(req,res)=>{
    return Countries.findAll({
        include: Activities
    })
    .then((countries)=>{
        res.send(countries)
    })
})
router.get("/:id",async(req,res)=>{
    const id = req.params.id.toUpperCase();
    try {
        const countryId = await Countries.findByPk(id,{
            include: Activities,
        })
        if(countryId) return res.status(200).json(countryId)
        else return res.status(404).send("País no encontrado")
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;