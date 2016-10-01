var shopApi = require('../api/shop')

module.exports = {
  serachGoods: function (req, res) {
    shopApi.serachGoods(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  serachGoodsIndex: function (req, res) {
    shopApi.serachGoodsIndex(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  serachCollects: function (req, res) {
    shopApi.serachCollects(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  serachFeets: function (req, res) {
    shopApi.serachFeets(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  serachFeetsIndex: function (req, res) {
    shopApi.serachFeetsIndex(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  serachCollectsIndex: function (req, res) {
    shopApi.serachCollectsIndex(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  serachCarts: function (req, res) {
    shopApi.serachCarts(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  serachCartsIndex: function (req, res) {
    shopApi.serachCartsIndex(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  serachPurchares: function (req, res) {
    shopApi.serachPurchares(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  serachPurcharesIndex: function (req, res) {
    shopApi.serachPurcharesIndex(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  serachOneGoodsInfo: function (req, res) {
    shopApi.serachOneGoodsInfo(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  isCollect: function (req, res) {
    shopApi.isCollect(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  reviseCollectState: function (req, res) {
    shopApi.reviseCollectState(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  insertFeet: function (req, res) {
    shopApi.insertFeet(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  updateShop: function (req, res) {
    shopApi.updateShop(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  deleteDate: function (req, res) {
    shopApi.deleteDate(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  updateIsbuy: function (req, res) {
    shopApi.updateIsbuy(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  insertOrder: function (req, res) {
    shopApi.insertOrder(req, res, function (data) {
      res.json(data)
      res.end()
    })
  }
}
