const express = require('express')

const router = express.Router()
const knex = require('../knex')
// READ ALL records for this table
router.get('/', (req, res, next) => {
  knex('movies')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  knex('movies')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        let err = new Error(`ID not found`)
        err.status = 400
        throw err
      } else {
        res.json(row)
      }
    })
    .catch((err) => {
      next(err)
    })
})

// Validates that req.body contains all information for POST and PUT
function validateRequestBody(req) {
  if (!req.body.title || !req.body.director || !req.body.year || !req.body.rating) {
    let err = new Error(`All information required`)
    err.status = 400
    throw err
  }
}

// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  validateRequestBody(req)

  knex('movies')
    .insert({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      rating: req.body.rating
    })
    .returning('*')
    .then((data) => {
      res.json(data[0])
    })
    .catch((err) => {
      next(err)
    })
})

// UPDATE ONE record for this table
router.put('/:id', (req, res, next) => {
  validateRequestBody(req)
  knex('movies')
    .where('id', req.params.id)
    .then((data) => {
      knex('movies')
        .where('id', req.params.id)
        .limit(1)
        .update({
          title: req.body.title,
          director: req.body.director,
          year: req.body.year,
          rating: req.body.rating
        })
        .returning('*')
        .then((data) => {
          res.json(data[0])
        })
    })
    .catch((err) => {
      next(err)
    })
})
// DELETE ONE record for this table
router.delete('/:id', function (req, res, next) {
  knex('movies')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        let err = new Error(`ID not found`)
        err.status = 400
        throw err
      }
      knex('movies')
        .del()
        .where('id', req.params.id)
        .then(() => {
          res.send(`ID ${req.params.id} Deleted`)
        })
    })
    .catch((err) => {
      next(err)
    })
})
module.exports = router