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
  upDataChatList: function (data, callback) {
    connection.query('select * from chatList where chatList_username = ? and chatList_chatname = ?', [data.to, data.from], function (err, rows, fields) {
      console.log('rows--->', rows)
      if (rows[0]) {
        console.log('info--->', [rows[0].chatList_chat + 1, data.msg, data.to, data.from])
        connection.query('UPDATE chatList SET chatList_chat = ? where chatList_username = ? and chatList_chatname = ? ', [rows[0].chatList_chat + 1, data.to, data.from], function (err, cont, fields) {
        })
        connection.query('UPDATE chatList SET chatList_content = ? where chatList_username = ? and chatList_chatname = ? ', [data.msg, data.to, data.from], function (err, cont, fields) {
        })
        connection.query('UPDATE chatList SET chatList_time = ? where chatList_username = ? and chatList_chatname = ? ', [new Date().getTime(), data.to, data.from], function (err, cont, fields) {
          callback(cont)
        })
      } else {
        connection.query('insert into chatList(chatList_id,chatList_username,chatList_chatname,chatList_time,chatList_content,chatList_chat)values(null,?,?,?,?,1)', [data.to, data.from, new Date().getTime(), data.msg], function (err, cont, fields) {
          callback(cont)
        })
      }
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
  },
  getChatListData: function (req, res, callback) {
    connection.query('select * from chatList where chatList_username = ? order by chatList_time desc', [req.body.username], function (err, rows, fields) {
      callback(rows)
    })
  },
  updateChatList: function (req, res, callback) {
    connection.query('UPDATE chatList SET chatList_chat = 0 where chatList_username = ? and chatList_chatname = ?', [req.body.username, req.body.chatname], function (err, rows, fields) {
      callback(rows)
    })
  },
  updateChat: function (data, callback) {
    connection.query('UPDATE chat SET chat.read = 1 where chat.from = ? and chat.to = ? and chat.read=0', [data.to, data.from], function (err, rows, fields) {
      callback(rows)
    })
  }
}
