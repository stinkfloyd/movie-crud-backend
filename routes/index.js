let express = require(`express`)
let router = express.Router()

router.get(`/`, (req, res, next) => {
  res.render(`index`, {
    title: `Express`
  })
})
module.exports = router