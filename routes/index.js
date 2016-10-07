var express = require('express')
var router = express.Router()
var userControllers = require('../controllers/user')
var shopControllers = require('../controllers/shop')
var chatControllers = require('../controllers/chat')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/login', function (req, res, next) {
  res.render('login')
})
router.get('/revise', function (req, res, next) {
  res.render('revise')
})
router.get('/register', function (req, res, next) {
  res.render('register')
})
router.get('/index', function (req, res, next) {
  res.render('index')
})
router.get('/good', function (req, res, next) {
  res.render('good')
})
router.get('/collect', userControllers.isLogin, function (req, res, next) {
  res.render('collect')
})
router.get('/feet', userControllers.isLogin, function (req, res, next) {
  res.render('feet')
})
router.get('/cart', userControllers.isLogin, function (req, res, next) {
  res.render('cart')
})
router.get('/purchare', userControllers.isLogin, function (req, res, next) {
  res.render('purchare')
})
// router.get('/chat', function (req, res, next) {
//   res.render('chat')
// })

router.get('/chat', userControllers.chat)
/* GET test page. */
router.get('/i', userControllers.isLogin, function (req, res, next) {
  res.render('index')
})

/* userController router. */
router.post('/login', userControllers.login)
router.post('/accountSearch', userControllers.reviseSearch)
router.post('/revise', userControllers.revise)
router.post('/register', userControllers.register)

/* shopController router. */
router.post('/serachGoods', shopControllers.serachGoods)
router.post('/serachGoodsIndex', shopControllers.serachGoodsIndex)
router.post('/serachCollects', shopControllers.serachCollects)
router.post('/serachCollectsIndex', shopControllers.serachCollectsIndex)
router.post('/serachFeets', shopControllers.serachFeets)
router.post('/serachFeetsIndex', shopControllers.serachFeetsIndex)
router.post('/serachCarts', shopControllers.serachCarts)
router.post('/serachCartsIndex', shopControllers.serachCartsIndex)
router.post('/serachPurchares', shopControllers.serachPurchares)
router.post('/serachPurcharesIndex', shopControllers.serachPurcharesIndex)

router.post('/serachOneGoodsInfo', shopControllers.serachOneGoodsInfo)
router.post('/isCollect', shopControllers.isCollect)
router.post('/reviseCollectState', shopControllers.reviseCollectState)
router.post('/insertFeet', shopControllers.insertFeet)
router.post('/updateShop', shopControllers.updateShop)
router.post('/deleteDate', shopControllers.deleteDate)
router.post('/updateIsbuy', shopControllers.updateIsbuy)
router.post('/insertOrder', shopControllers.insertOrder)

/* ChatController router. */
router.post('/getChatDate', chatControllers.getChatDate)
router.post('/getHistoryDate', chatControllers.getHistoryDate)

module.exports = router
