const express = require("express");
const CommentsRouter = express.Router();
const db = require("../models");

CommentsRouter.route('/')
.post((request, response)=>{
    const userId = request.body.userId;
    const photoId = request.body.photoId;
    const content = request.body.content
    db.comment.create({userId: userId, photoId:photoId, content:content}).then((comment)=>{
      response.send(comment)
    }).catch(err=>{
        response.send(err)
    })
})

CommentsRouter.route('/:photoId')
.get((request, response)=>{
    const photoId = request.params.photoId
    db.comment.findAll({where:{photoId: photoId}}).then(comment=>{
        response.send(comment)
    }).catch(err=>{
        response.send(err)
    })
})

module.exports = CommentsRouter;