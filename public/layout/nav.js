var TimeByClinicNav = function ($scope, $http) {
  var socket = window.io.connect()
  var from = window.$.cookie('user')
  socket.emit('online', {user: from})
  socket.on('online', function (data) {
    console.log(data)
  })
  socket.on('say', function (data) {
    chatList()
    $scope.$apply()
  })
  $scope.chatNumber = 0
  function chatList () {
    $http({
      url: '/getChatListData',
      method: 'POST',
      data: {
        'username': window.utils.getQuery('username')
      }
    }).success(function (data) {
      $scope.chatNumber = 0
      for (var i = 0; i < data.length; i++) {
        $scope.chatNumber += data[i].chatList_chat
      }
    })
  }
  chatList()
  $scope.input = window.utils.getQuery('q') || ''
  if (window.localStorage.getItem('realname')) {
    $scope.realname = window.localStorage.getItem('realname') || ''
  }
  $scope.routerLogin = function () {
    window.location = '/login'
  }
  $scope.routerIndex = function () {
    var str = '/index?username=' + window.utils.getQuery('username')
    window.location = str
  }
  $scope.submitClick = function () {
    var str = '/index?username=' + window.utils.getQuery('username')
    if ($scope.input) {
      str += '&q=' + $scope.input
      window.location.href = str
    } else {
      window.alert('please enter the search!')
    }
  }
  $scope.collect = function () {
    var str = '/collect?username=' + window.utils.getQuery('username')
    window.location = str
  }
  $scope.feet = function () {
    var str = '/feet?username=' + window.utils.getQuery('username')
    window.location = str
  }
  $scope.cart = function () {
    var str = '/cart?username=' + window.utils.getQuery('username')
    window.location = str
  }
  $scope.purchare = function () {
    var str = '/purchare?username=' + window.utils.getQuery('username')
    window.location = str
  }
  $scope.chatList = function () {
    var str = '/chatList?username=' + window.utils.getQuery('username')
    window.location = str
  }
}
window.hyyApp.controller('nav', ['$scope', '$http', TimeByClinicNav])
