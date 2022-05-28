const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('../database')

function generateAccessToken(id) {
    return jwt.sign( id, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

router.post("/signup", function(req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    })
        .then( user => {
            const token = {'accesstoken': generateAccessToken({id: user.id})}
            res.status(200).send(JSON.stringify(token))
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.post("/signin", function(req, res) {
    db.User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        
        .then( user => {
            const token = {'accesstoken': generateAccessToken({id: user.id})}
            res.status(200).send(JSON.stringify(token))
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

module.exports = router
