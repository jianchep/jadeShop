var userApi = require('../api/user')

module.exports = {
  login: function (req, res) {
    userApi.login(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  reviseSearch: function (req, res) {
    userApi.reviseSearch(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  revise: function (req, res) {
    userApi.revise(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  register: function (req, res) {
    userApi.register(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  isLogin: function (req, res, next) {
    if (req.query.username) {
      userApi.isLogin(req, res, function (data) {
        if (data[0]) {
          next()
        } else {
          res.render('login')
        }
      })
      console.log(req.query.username)
    } else {
      res.render('login')
    }
  }
}
