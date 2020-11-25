const express = require('express')
const Like = require('../../model/Like')
const Dislike = require('../../model/Dislike')

const router = express.Router()

router.post('/getLikes', (req, res) => {
    let variable = {
        postId: req.body.postId
    }

    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({
                success: true,
                likes
            })
        })
})


router.post('/getDislikes', (req, res) => {
    let variable = {
        postId: req.body.postId
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({
                success: true,
                dislikes
            })
        })
})

router.post('/upLike', (req, res) => {
    let variable = {
        postId: req.body.postId,
        userId: req.body.userId
    }

    const like = new Like(variable)

    like.save((err, likeResult) => {
        if (err) return res.json({
            success: false,
            err
        })

        Dislike.findOneAndDelete(variable)
            .exec((err, dislikeResult) => {
                if(err) return res.status(400).json({
                    success: false,
                    err
                })

                res.status(200).json({
                    success: true
                })
            })
    })
})

router.post('/unLike', (req, res) => {
    let variable = {
        postId: req.body.postId,
        userId: req.body.userId
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({
                success: false,
                err
            })

            res.status(200).json({
                success: true
            })
        })
})

router.post('/unDislike', (req, res) => {
    let variable = {
        postId: req.body.postId,
        userId: req.body.userId
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({
                success: false,
                err
            })

            res.status(200).json({
                success: true
            })
        })
})

router.post('/upDislike', (req, res) => {
    let variable = {
        postId: req.body.postId,
        userId: req.body.userId
    }

    const dislike = new Dislike(variable)

    dislike.save((err, dislikeResult) => {
        if (err) return res.json({
            success: false,
            err
        })

        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if(err) return res.status(400).json({
                    success: false,
                    err
                })

                res.status(200).json({
                    success: true
                })
            })
    })
})


module.exports = router