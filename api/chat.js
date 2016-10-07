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
  insertChat: function (data, callback) {
    console.log([data.from, data.to, data.msg])
    connection.query('insert into chat(chat_id,chat.from,chat.to,msg,chat.read)values(null,?,?,?,0)', [data.from, data.to, data.msg], function (err, rows, fields) {
      callback(rows)
    })
  },
  getChatDate: function (req, res, callback) {
    connection.query('select * from chat where (chat.from = ? and chat.to = ?) or (chat.from = ? and chat.to = ?) order by chat_id desc limit 0,6', [req.body.from, req.body.to, req.body.to, req.body.from], function (err, rows, fields) {
      callback(rows)
    })
  },
  getHistoryDate: function (req, res, callback) {
    connection.query('select * from chat where (chat.from = ? and chat.to = ?) or (chat.from = ? and chat.to = ?) order by chat_id desc limit ?,?', [req.body.from, req.body.to, req.body.to, req.body.from, (req.body.index - 1) * 20 + 6, req.body.index * 20 + 6], function (err, rows, fields) {
      callback(rows)
    })
  }
}
