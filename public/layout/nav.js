var TimeByClinicNav = function ($scope, $http) {
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
}
window.hyyApp.controller('nav', ['$scope', '$http', TimeByClinicNav])
