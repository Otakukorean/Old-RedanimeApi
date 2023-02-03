const express = require('express');
const {history_list,Episodes} = require('../models');
const {
    validateToken ,

  } = require("../middlewares/validateAuth.js");
const route = express.Router()

route.get('/',validateToken , async (req,res) => {
     const {offnumber,limnumber} = req.query
    const UserId = req.user.id;
    const watchlist = await history_list.findAll(
        {where : {UserId: UserId} ,
         order: [ [ 'createdAt', 'DESC' ]] ,
          offset:parseInt(offnumber * limnumber ),
          limit :parseInt(limnumber) 
        });
    res.status(200).json(watchlist);
})
route.get('/check' ,validateToken, async (req, res) => {
    const UserId = req.user.id;
    const foundEpisdode = await history_list.findAll({where : {UserId: UserId}});
    if(foundEpisdode) {
        res.status(200).json(foundEpisdode);
    } else {
        res.status(200).json({status : "not found"});
    }
})


route.post('/',validateToken , async (req,res) => {
    const {EpisodeId , name,title ,Poster,related_name,anime_id} = req.body
    const UserId = req.user.id;
    const found = await history_list.findOne({
    where : {EpisodeId: EpisodeId} 
    
    })
    if(!found) {
        const addtohistory = await history_list.create({EpisodeId : EpisodeId , name: name, UserId : UserId , title : title , Poster : Poster,related_name:related_name,anime_id:anime_id})
        res.status(201).json(addtohistory) 
    }
    else {
        res.status(301).json({message : "SEEN"})
    }
 

   

    
})







module.exports =route