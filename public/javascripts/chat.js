  var TimeByClinic = function ($scope, $http) {
    $scope.input = ''
    $scope.username = window.utils.getQuery('username')
    $scope.chatName = window.utils.getQuery('chatName')
    $scope.height = window.$(document).height()
    $scope.chatDate = []
    $scope.index = 1
    $scope.flag = true
    $scope.touchStart = []
    $scope.touchMove = []
    var socket = window.io.connect()
    var from = window.$.cookie('user')
    /* GET showchat for six data chat msg. */
    function getDate () {
      $http({
        url: '/getChatDate',
        method: 'POST',
        data: {
          'from': window.utils.getQuery('username'),
          'to': window.utils.getQuery('chatName')
        }
      }).success(function (data) {
        console.log(data)
        $scope.chatDate = data.reverse()
      })
    }
    /* touch event. */
    function touchStart (event) {
      var touch = event.touches[0]
      $scope.touchStart = [touch.pageX, touch.pageY, new Date().getTime()]
    }
    function touchMove (event) {
      var touch = event.touches[0]
      $scope.touchMove = [touch.pageX, touch.pageY, new Date().getTime()]
    }
    function touchEnd (event) {
      if ($scope.touchMove[1] - $scope.touchStart[1] >= 200 && $scope.touchMove[2] - $scope.touchStart[2] <= 666) {
        if (window.$(document).scrollTop() <= 0) {
          historyData()
        }
      }
    }
    document.addEventListener('touchstart', touchStart, false)
    document.addEventListener('touchmove', touchMove, false)
    document.addEventListener('touchend', touchEnd, false)
    /* GET historyData. */
    function historyData () {
      if ($scope.flag) {
        $scope.flag = false
        $http({
          url: '/getHistoryDate',
          method: 'POST',
          data: {
            'from': window.utils.getQuery('username'),
            'to': window.utils.getQuery('chatName'),
            'index': $scope.index
          }
        }).success(function (data) {
          console.log(data)
          if (data[0]) {
            $scope.chatDate = data.reverse().concat($scope.chatDate)
            setTimeout(function () {
              $scope.flag = true
              $scope.index++
            }, 2000)
          } else {
            $scope.more = false
          }
          if (data.length < 20) {
            $scope.more = false
            $scope.flag = false
          }
        })
      }
    }

    /* GET now time. */
    function nowTime () {
      var date = new Date()
      var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
      return time
    }
    getDate()
    /* socket.io emit and on. */
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
      window.$(document).scrollTop(window.$(document).height() - $scope.height)
    })
    // socket.on('offline', function (data) {
    //   var str = '<p class="chatCenter">用户 ' + data.user + ' 下线了！</p>'
    //   window.$('.container').append(str)
    //   window.$(document).scrollTop(window.$(document).height() - $scope.height)
    // })
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
      window.$(document).scrollTop(window.$(document).height() - $scope.height)
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
      window.$(document).scrollTop(window.$(document).height() - $scope.height)
      socket.emit('say', {from: from, to: window.utils.getQuery('chatName'), msg: $scope.input})
      $scope.input = ''
    }
    $scope.until = function (o) {
      console.log(o)
    }
  }
  window.hyyApp.controller('chat', ['$scope', '$http', TimeByClinic])
