const express = require('express');
const {PageView} = require('../models');
const {
    validateToken ,
verifyTokenAndAdmin
  } = require("../middlewares/validateAuth.js");
const route = express.Router()
const requestIp = require('request-ip');

route.post('/' , async (req,res) => {
     try {
       
      
               const AddView = await PageView.create({
                    ip : requestIp.getClientIp(req),
                    value : 1
               })
               res.status(201).json(AddView)
       
          
     } catch (error) {
          return res.status(500).json({error : error.message})
     }
})


route.get('/',verifyTokenAndAdmin,async (req,res) => {
     try {
          const getViews = await PageView.findAll()
          res.status(200).json(getViews)
     } catch (error) {
          return res.status(404).json({error:error.message})
     }
})



module.exports =route