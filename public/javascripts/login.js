(function (angular) {
  var hyyApp = angular.module('hyyApp', [])
  var TimeByClinic = function ($scope, $http) {
    if (window.localStorage.getItem('shop_username')) {
      $scope.username = window.localStorage.getItem('shop_username') || ''
    }
    $scope.password = ''
    $scope.warnOrInfo = true
    $scope.rememberUsername = false
    $scope.login = function () {
      $http({
        url: '/login',
        method: 'POST',
        data: {
          'username': $scope.username,
          'password': $scope.password
        }
      }).success(function (data) {
        console.log(data)
        if (data[0]) {
          if ($scope.rememberUsername) {
            window.localStorage.setItem('shop_username', $scope.username)
          }
          if (data[0].realname) {
            window.localStorage.setItem('realname', data[0].realname)
          }
          window.alert('success')
          window.location = '/index?username=' + $scope.username
        } else {
          $scope.warnOrInfo = false
        }
      })
    }
    $scope.chooseMemberUsername = function () {
      $scope.rememberUsername = !$scope.rememberUsername
    }
    $scope.revise = function () {
      window.location = '/revise'
    }
    $scope.register = function () {
      window.location = '/register'
    }
  }
  hyyApp.controller('login', ['$scope', '$http', '$interval', TimeByClinic])
})(window.angular)
