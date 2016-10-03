var express = require('express')
var http = require('http')
var app = express()
var server = http.createServer(app)
var io = require('socket.io').listen(server)
module.exports = {
  chat: function (req, res, callback) {
    var users = {}
    io.sockets.on('connection', function (socket) {
      socket.on('online', function (data) {
        socket.name = data.user
        if (!users[data.user]) {
          users[data.user] = data.user
        }
        io.sockets.emit('online', {users: users, user: data.user})
      })
    })
  }
}
