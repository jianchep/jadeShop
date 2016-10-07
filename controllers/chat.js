var chatApi = require('../api/chat')
module.exports = {
  getChatDate: function (req, res) {
    chatApi.getChatDate(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  getHistoryDate: function (req, res) {
    chatApi.getHistoryDate(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  getChatListData: function (req, res) {
    chatApi.getChatListData(req, res, function (data) {
      res.json(data)
      res.end()
    })
  },
  updateChatList: function (req, res) {
    chatApi.updateChatList(req, res, function (data) {
      res.json(data)
      res.end()
    })
  }
}
