const express = require('express')
const router = express.Router()
const db = require('../database')

router.get("/", function(req, res) {
    db.Movie.findAll({
        include: db.Genre
    })
        .then( movies => {
            res.status(200).send(JSON.stringify(movies));
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.get("/:id", function(req, res) {
    db.Movie.findByPk(req.params.id,
        {
            include: db.Genre
        })
        .then( movie => {
            res.status(200).send(JSON.stringify(movie));
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.post("/", function(req, res) {
    console.log(req.body)
    db.Movie.create({
        name: req.body.name,
        rate: req.body.rate,
        year: req.body.year,
        description: req.body.description,
        DirectorId: req.body.directorid
    })
        .then( movie => {
            const associations = req.body.genres.map((id) => ({"MovieId": movie.id, "GenreId": id}))
            db.MovieGenre.bulkCreate(associations)
            .then(movieGenre => {
                db.Movie.findByPk(movie.id,
                    {
                        include: db.Genre
                    })
                    .then( movie => {
                        res.status(200).send(JSON.stringify(movie));
                    })
                    .catch( error => {
                        res.status(500).send(JSON.stringify(error));
                    })
            }).catch( error => {
                res.status(500).send(JSON.stringify(error))
            })
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error))
        })
})
   
router.put("/:id", function(req, res) {
    db.Movie.update({
        name: req.body.name,
        rate: req.body.rate,
        year: req.body.year,
        description: req.body.description,
        DirectorId: req.body.directorid
    }, 
    {
        where: {id: req.params.id}
    })
        .then( movie => {
            db.MovieGenre.destroy({
                where: {MovieId: req.params.id} 
            })
                .then(() => {
                    if (req.body.genres) {
                        const associations = req.body.genres.map((id) => ({"MovieId": req.params.id, "GenreId": id}))
                        db.MovieGenre.bulkCreate(associations)
                        .then( movieGenres => {
                            db.Movie.findByPk(req.params.id, {include: db.Genre})
                            .then( movie => {
                                res.status(200).send(JSON.stringify(movie));
                            })
                        })
                    }
                    db.Movie.findByPk(req.params.id, {include: db.Genre})
                    .then( movie => {
                        res.status(200).send(JSON.stringify(movie));
                    })
                    .catch(error => {
                        res.status(500).send(JSON.stringify(error))
                    })
                })
            })

        .catch(error => {
            res.status(500).send(JSON.stringify(error));
        })
    })

router.delete("/:id", function(req, res) {
    db.Movie.destroy({
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
