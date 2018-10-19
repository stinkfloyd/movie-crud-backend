const express = require('express')

const router = express.Router()
const knex = require('../knex')

const isValidID = (req, res, next) => {
  let {
    id
  } = req.params
  if (isNaN(id)) {
    let err = new Error(`Not a Valid ID`)
    err.status = 400
    throw err
  } else {
    next()
  }
}

const validateRequestBody = (req, res, next) => {
  if (!req.body.title || !req.body.director || !req.body.year || !req.body.rating) {
    let err = new Error(`Not a Valid Request`)
    err.status = 400
    throw err
  }
}

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
router.get('/:id', isValidID, (req, res, next) => {
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

// CREATE ONE record for this table
router.post('/', validateRequestBody, (req, res, next) => {
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
router.put('/:id', isValidID, validateRequestBody, (req, res, next) => {
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
router.delete('/:id', isValidID, (req, res, next) => {
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