const { Router } = require('express');
const { Op } = require('sequelize');
const {Activities, Countries} = require("../db")

const router = Router();

router.get("/",async(req,res,next)=>{
    try {
        const activity = await Activities.findAll({
        });
        if(activity.length) return res.status(200).json(activity);
        else return res.status(404).json({error: "No activities"});
        //res.send(activity)  
    } catch (error) {
        next(error)
    }
})
router.post("/",async(req,res,next)=>{
    try {
        const {name,dificulty,duration,season,countries} = req.body;
        if(name && dificulty && duration && season && countries){
            const [newActivity,created]= await Activities.findOrCreate({
                where: {name,dificulty,duration,season}
            })
            countries.forEach(async (c)=>{
                const country = await Countries.findOne({where: {name:c},include: Activities})
                if(country) return await country.addActivities(newActivity);
            }) 
            console.log("Activity created successfully");
            return res.status(201).send(newActivity)
        }else {
            return res.status(400).json({
            error: "Please fill all the fields"
        }
        )}
    } catch (error) {
        next(error)
    }
})

module.exports = router;