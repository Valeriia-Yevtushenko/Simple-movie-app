const express = require('express')
const router = express.Router()
const db = require('../database')

router.get("/me", function(req, res) {
    db.User.findByPk(req.user.id)
        .then( user => {
            res.status(200).send(JSON.stringify(user));
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.put("/me", function(req, res) {
    db.User.update({
        email: req.body.email,
        password: req.body.password
    }, 
    {
        where: {
          id: req.user.id
        }
    })
        .then( user => {
            res.status(200).send();
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.get("/movies", function(req, res) {
    db.User.findByPk(req.user.id,
        {
            include: db.Movie
        })
        .then( movies => {
            res.status(200).send(JSON.stringify(movies));
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.put("/movies", function(req, res) {
    const associations = req.body.movies.map((id) => ({"MovieId": id, "UserId": req.user.id}))
    db.UserMovie.bulkCreate(associations)
        .then( movies => {
            res.status(200).send();
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.delete("/:id", function(req, res) {
    db.UserMovie.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.status(204).send();
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

module.exports = router
