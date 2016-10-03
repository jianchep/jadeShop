  var TimeByClinic = function ($scope, $http) {
    $scope.input = ''
    var socket = window.io.connect()
    var from = window.$.cookie('user')
    // var to = 'all'
    /* GET now time. */
    function nowTime () {
      var date = new Date()
      var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
      return time
    }
    console.log(nowTime())
    socket.emit('online', {user: from})
    socket.on('online', function (data) {
      console.log(data)
      console.log(data.from)
      var str = ''
      if (data.user !== from) {
        str = '<p class="chatCenter">用户 ' + data.user + ' 上线了！</p>'
      } else {
        str = '<p class="chatCenter">' + nowTime() + '</p>'
      }
      window.$('.container').append(str)
    })
    socket.on('offline', function (data) {
      var str = '<p class="chatCenter">用户 ' + data.user + ' 下线了！</p>'
      window.$('.container').append(str)
    })
    socket.on('say', function (data) {
      console.log(data)
      var str = '<div class="chatContentLeft">' +
                '<div class="chatLeftFlag1"></div>' +
                '<div class="chatLeftFlag2"></div>' +
                '<img src="/images/banner.jpeg"/>' +
                '<div>' +
                  '<p>' + data.msg + '</p>' +
                '</div>' +
              '</div>'
      window.$('.container').append(str)
    })
    $scope.say = function () {
      var str = '<div class="chatContentRight">' +
                  '<div class="chatRightFlag1"></div>' +
                  '<div class="chatRightFlag2"></div>' +
                  '<img src="/images/banner.jpeg"/>' +
                  '<div>' +
                    '<p>' + $scope.input + '</p>' +
                  '</div>' +
                  '<div class="clear"></div>' +
                '</div>'
      window.$('.container').append(str)
      socket.emit('say', {from: from, to: window.utils.getQuery('chatName'), msg: $scope.input})
      $scope.input = ''
    }
  }
  window.hyyApp.controller('chat', ['$scope', '$http', TimeByClinic])
