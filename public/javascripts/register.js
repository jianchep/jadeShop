(function (angular) {
  var hyyApp = angular.module('hyyApp', [])
  var TimeByClinic = function ($scope, $http) {
    $scope.username = ''
    $scope.realname = ''
    $scope.keyQuestion = ''
    $scope.keyAnswer = ''
    $scope.password = ''
    $scope.passwordNext = ''
    $scope.warnOrInfo = true
    $scope.warnOrInfoFlag = false
    $scope.login = function () {
      window.location = '/login'
    }
    $scope.register = function () {
      if ($scope.password === $scope.passwordNext) {
        $http({
          url: '/register',
          method: 'POST',
          data: {
            'username': $scope.username,
            'realname': $scope.realname,
            'keyQuestion': $scope.keyQuestion,
            'keyAnswer': $scope.keyAnswer,
            'password': $scope.password
          }
        }).success(function (data) {
          if (data === 'success') {
            window.alert('register is success！redirect the login')
            window.location = '/login'
          } else if (data === 'fail') {
            window.alert('register is wrong!Please try again!')
          }
        })
      } else {
        window.alert('Two passwords are not consistent！')
      }
    }
    $scope.revise = function () {
      window.location = '/revise'
    }
    $scope.test = function () {
      if ($scope.username) {
        $http({
          url: '/accountSearch',
          method: 'POST',
          data: {
            'username': $scope.username
          },
          dataType: 'json'
        }).success(function (data) {
          $scope.warnOrInfoFlag = true
          console.log(data)
          if (data.length) {
            $scope.warnOrInfo = true
          } else {
            $scope.warnOrInfo = false
          }
        })
      }
    }
  }
  hyyApp.controller('login', ['$scope', '$http', '$interval', TimeByClinic])
})(window.angular)
