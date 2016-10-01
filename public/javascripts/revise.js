(function (angular) {
  var hyyApp = angular.module('hyyApp', [])
  var TimeByClinic = function ($scope, $http) {
    if (window.localStorage.getItem('shop_username')) {
      $scope.username = window.localStorage.getItem('shop_username') || ''
    }
    $scope.password = ''
    $scope.answer = ''
    $scope.warnOrInfo = false
    $scope.warnOrInfoClick = false
    $scope.question = ''
    $scope.annountExist = true
    $scope.next = function () {
      $http({
        url: '/accountSearch',
        method: 'POST',
        data: {
          'username': $scope.username
        },
        dataType: 'json'
      }).success(function (data) {
        $scope.warnOrInfoClick = true
        if (data.length) {
          $scope.question = data[0].password_key_question
          $scope.warnOrInfo = true
        } else {
          $scope.question = ''
          $scope.warnOrInfo = false
        }

        $scope.data = data
        console.log(data)
      })
    }
    $scope.revise = function () {
      $http({
        url: '/revise',
        method: 'POST',
        data: {
          'username': $scope.username,
          'password': $scope.password,
          'answer': $scope.answer
        },
        dataType: 'json'
      }).success(function (data) {
        if (data === 'success') {
          window.alert('success')
          window.location = '/login'
        } else if (data === 'fail') {
          window.alert('fail:answer is wrong!!')
        }
      })
    }
    $scope.login = function () {
      window.location = '/login'
    }
  }
  hyyApp.controller('revise', ['$scope', '$http', '$interval', TimeByClinic])
})(window.angular)
