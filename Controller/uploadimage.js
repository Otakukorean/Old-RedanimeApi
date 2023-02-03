// const fs = require("fs");
// const {validateToken} = require('../middlewares/validateAuth')
// const {image} = require("../models");
// const uploadFiles = async (req, res) => {
//   try {
//     console.log(req.file);

//     if (req.file == undefined) {
//       return res.send(`You must select a file.`);
//     }
//     const UserId = req.user.id
//     image.create({
//       type: req.file.mimetype,
//       name: Date.now() + req.file.originalname,
//       data: req.file.path.replace(/\\/g, "").replace(/Uploads/g , "").replace(/C/g , "").replace(/:/g , "").replace(/Users/g , "").replace(/User/g , "").replace(/Downloads/g , "").replace(/asianjet/g , "").replace(/client/g , "").replace(/src/g , "").replace(/assets/g , "").replace(/\\/g , ""),
//       UserId : UserId
//     }).then((image) => {
    
//           return res.json(image);
//     });
//   } catch (error) {
//     console.log(error);
//     return res.send(`Error when trying upload images: ${error}`);
//   }
// };

// const update = async (req,res) => {
//   try {
//     console.log(req.file);

//     if (req.file == undefined) {
//       return res.send(`You must select a file.`);
//     }
//     const UserId = req.user.id
//    await image.update({
//       data: req.file.path.replace(/\\/g, "").replace(/Uploads/g , "").replace(/C/g , "").replace(/:/g , "").replace(/Users/g , "").replace(/User/g , "").replace(/Downloads/g , "").replace(/asianjet/g , "").replace(/client/g , "").replace(/src/g , "").replace(/assets/g , "").replace(/\\/g , ""),
//     } , {
//       where : {UserId : UserId}
//     }).then((image) => {
    
//           return res.json(image);
//     });
//   } catch (error) {
//     console.log(error);
//     return res.send(`Error when trying upload images: ${error}`);
//   }
// }

// module.exports = {
//   uploadFiles,
//   update
// };