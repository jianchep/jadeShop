var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  database: 'shop',
  user: 'root',
  password: '123456'
})
function handleDisconnect (connection) {
  connection.on('error', function (err) {
    if (!err.fatal) {
      return
    }
    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err
    }
    console.log('Re-connecting lost connection: ' + err.stack)
    connection = mysql.createConnection(connection.config)
    handleDisconnect(connection)
    connection.connect()
  })
}
handleDisconnect(connection)
connection.connect()

module.exports = {
  serachGoods: function (req, res, callback) {
    connection.query('select * from shop_info where introduce like \'%' + req.body.like + '%\'', [], function (err, rows, fields) {
      rows = rows.splice((req.body.start - 1) * 4, 4)
      callback(rows)
    })
  },
  serachGoodsIndex: function (req, res, callback) {
    connection.query('select * from shop_info where introduce like \'%' + req.body.like + '%\'', function (err, rows, fields) {
      callback(rows.length)
    })
  },
  serachCollects: function (req, res, callback) {
    connection.query('select * from collect join shop_info where user_name = ? and state = 1 and collect.shop_info_id = shop_info.shop_info_id', [req.body.username], function (err, rows, fields) {
      rows = rows.splice((req.body.start - 1) * 4, 4)
      callback(rows)
    })
  },
  serachCollectsIndex: function (req, res, callback) {
    connection.query('select * from collect join shop_info where user_name = ? and state = 1 and collect.shop_info_id = shop_info.shop_info_id', [req.body.username],  function (err, rows, fields) {
      callback(rows.length)
    })
  },
  serachFeets: function (req, res, callback) {
    connection.query('select * from feet join shop_info where user_name = ? and feet.feet_id = shop_info.shop_info_id', [req.body.username], function (err, rows, fields) {
      console.log(rows)
      rows = rows.splice((req.body.start - 1) * 4, 4)
      callback(rows)
    })
  },
  serachFeetsIndex: function (req, res, callback) {
    connection.query('select * from feet join shop_info where user_name = ? and feet.feet_id = shop_info.shop_info_id', [req.body.username],  function (err, rows, fields) {
      callback(rows.length)
    })
  },
  serachCarts: function (req, res, callback) {
    connection.query('select * from order_info join shop_info where isbuy = 0 and order_info.delete = 0 and order_info.order_info_id = shop_info.shop_info_id', function (err, rows, fields) {
      rows = rows.splice((req.body.start - 1) * 4, 4)
      callback(rows)
    })
  },
  serachCartsIndex: function (req, res, callback) {
    connection.query('select * from order_info where isbuy = 0 and order_info.delete = 0', function (err, rows, fields) {
      callback(rows.length)
    })
  },
  serachPurchares: function (req, res, callback) {
    connection.query('select * from order_info join shop_info where order_info.delete = 0 and isbuy = 1 and order_info.order_info_id = shop_info.shop_info_id', function (err, rows, fields) {
      console.log(rows)
      rows = rows.splice((req.body.start - 1) * 4, 4)
      callback(rows)
    })
  },
  serachPurcharesIndex: function (req, res, callback) {
    connection.query('select * from order_info where isbuy = 1 and order_info.delete = 0', function (err, rows, fields) {
      callback(rows.length)
    })
  },
  serachOneGoodsInfo: function (req, res, callback) {
    connection.query('select * from shop_info where shop_info_id = ?', [req.body.goodId], function (err, rows, fields) {
      callback(rows)
    })
  },
  isCollect: function (req, res, callback) {
    connection.query('select * from collect where shop_info_id = ? and user_name = ?', [req.body.goodId, req.body.username], function (err, rows, fields) {
      callback(rows)
    })
  },
  reviseCollectState: function (req, res, callback) {
    if (req.body.collect === 'yes') {
      connection.query('select * from collect where shop_info_id = ? and user_name = ?', [req.body.goodId, req.body.username], function (err, rows, fields) {
        console.log(rows)
        if (rows[0]) {
          connection.query('UPDATE collect SET state = 1 where shop_info_id = ? and user_name = ? ', [req.body.goodId, req.body.username], function (err, rows, fields) {
            console.log(rows)
            callback(rows)
          })
        } else {
          connection.query('insert into collect(collect_id,shop_info_id,user_name,state)values(null,?,?,?)', [req.body.goodId, req.body.username, req.body.state], function (err, rows, fields) {
            callback(rows)
          })
        }
      })
    } else if (req.body.collect === 'no') {
      connection.query('UPDATE collect SET state = 0 where shop_info_id = ? and user_name = ? ', [req.body.goodId, req.body.username], function (err, rows, fields) {
        callback(rows)
      })
    }
  },
  insertFeet: function (req, res, callback) {
    connection.query('insert into feet(feet_id,shop_info_id,user_name)values(null,?,?)', [req.body.goodId, req.body.username], function (err, rows, fields) {
      callback(rows)
    })
  },
  updateShop: function (req, res, callback) {
    connection.query('select * from shop_info where shop_info_id = ?', [req.body.goodId], function (err, rows, fields) {
      var num = rows[0].skim_number + 1
      connection.query('UPDATE shop_info SET skim_number = ? where shop_info_id = ?', [num, req.body.goodId], function (err, rows, fields) {
        callback(rows)
      })
    })
  },
  deleteDate: function (req, res, callback) {
    connection.query('UPDATE order_info SET order_info.delete = 1 where order_info_id = ?', [req.body.orderId], function (err, rows, fields) {
      callback(rows)
    })
  },
  updateIsbuy: function (req, res, callback) {
    connection.query('UPDATE order_info SET order_info.isbuy = 1 where order_info_id = ?', [req.body.orderId], function (err, rows, fields) {
      callback(rows)
    })
  },
  insertOrder: function (req, res, callback) {
    connection.query('select * from shop_info where shop_info_id = ?', [req.body.goodId], function (err, rows, fields) {
      req.body.sellId = rows[0].user_id
      connection.query('insert into order_info(order_info_id,shop_info_id,user_name,sell_id,isbuy,is_sell,number,price_all,order_info.delete,is_comment)values(null,?,?,?,?,0,?,?,0,0)', [req.body.goodId, req.body.username, req.body.sellId, req.body.isbuy, req.body.number, req.body.price_all], function (err, rows, fields) {
        callback(rows)
      })
    })
  }
}
