  var TimeByClinic = function ($scope, $http) {
    console.log(new Date(1475820838104).getFullYear())
    var socket = window.io.connect()
    var from = window.$.cookie('user')
    $scope.chatLists = []
    $scope.timeStamp = new Date().getTime()
    function getTime (date) {
      for (var i = 0; i < date.length; i++) {
        date[i].year = new Date(parseInt(date[i].chatList_time)).getFullYear()
        date[i].month = new Date(parseInt(date[i].chatList_time)).getMonth() + 1
        date[i].data = new Date(parseInt(date[i].chatList_time)).getDate()
        if ($scope.timeStamp - date[i].chatList_time <= 86400000) {
          if (new Date(parseInt(date[i].chatList_time)).getMinutes() < 10) {
            date[i].time = new Date(parseInt(date[i].chatList_time)).getHours() + ':0' + new Date(parseInt(date[i].chatList_time)).getMinutes()
          } else {
            date[i].time = new Date(parseInt(date[i].chatList_time)).getHours() + ':' + new Date(parseInt(date[i].chatList_time)).getMinutes()
          }
        } else {
          date[i].time = date[i].data + '|' + date[i].month + '|' + date[i].year
        }
      }
      console.log(date)
    }
    function chatList () {
      $http({
        url: '/getChatListData',
        method: 'POST',
        data: {
          'username': window.utils.getQuery('username')
        }
      }).success(function (data) {
        $scope.chatLists = data
        getTime(data)
      })
    }
    function updateChatList (o) {
      $http({
        url: '/updateChatList',
        method: 'POST',
        data: {
          'username': window.utils.getQuery('username'),
          'chatname': o.chatList_chatname
        }
      }).success(function (data) {
        console.log(data)
      })
    }
    chatList()
    $scope.chatListClick = function (o) {
      updateChatList(o)
      var str = '/chat?' + 'username=' + o.chatList_username + '&chatName=' + o.chatList_chatname
      window.location = str
    }
    socket.emit('online', {user: from})
    socket.on('online', function (data) {
      console.log(data)
    })
    socket.on('say', function (data) {
      console.log(data)
      chatList()
      $scope.$apply()
    })
  }
  window.hyyApp.controller('chat', ['$scope', '$http', TimeByClinic])
