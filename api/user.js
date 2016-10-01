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
  login: function (req, res, callback) {
    connection.query('select * from user where user_name = ? and password = ?', [req.body.username, req.body.password], function (err, rows, fields) {
      callback(rows)
    })
  },
  reviseSearch: function (req, res, callback) {
    connection.query('select * from user where user_name = ?', [req.body.username], function (err, rows, fields) {
      callback(rows)
    })
  },
  revise: function (req, res, callback) {
    connection.query('select * from user where user_name = ? and password_key_answer = ?', [req.body.username, req.body.answer], function (err, rows, fields) {
      if (rows.length) {
        connection.query('update user set password = ? where user_name = ? and password_key_answer = ?', [req.body.password, req.body.username, req.body.answer], function (err, rows, fields) {
          callback('success')
        })
      } else {
        callback('fail')
      }
    })
  },
  register: function (req, res, callback) {
    connection.query('insert into user(user_id, user_name, password, realname, password_key_question, password_key_answer )values(?,?,?,?,?,?)', [null, req.body.username, req.body.password, req.body.realname, req.body.keyQuestion, req.body.keyAnswer], function (err, rows, fields) {
      if (rows) {
        callback('success')
      } else {
        callback('fail')
      }
    })
  },
  isLogin: function (req, res, callback) {
    connection.query('select * from user where user_name = ?', [req.query.username], function (err, rows, fields) {
      callback(rows)
    })
  }
}
