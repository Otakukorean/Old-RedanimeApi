const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const {
    validateToken ,

  } = require("../middlewares/validateAuth.js");

router.get("/:Showid", async (req, res) => {
  const Showid = req.params.Showid;
  const comments = await Comments.findAll({ where: { ShowId: Showid } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {

  await Comments.create({
      commentBody : req.body.commentBody ,
      username : req.user.username ,
      ShowId : req.body.ShowId,
      userimage : req.user.image
  });
  res.json(comment);
});
router.put("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    await Comments.update(
        {
        commentBody : req.body.commentBody,
        
    },

    
    {where : {id : commentId,username : req.user.username}
    
});
    res.json(comment);
  });


router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;