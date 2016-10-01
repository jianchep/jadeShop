  var TimeByClinic = function ($scope, $http) {
    $scope.goodInfo = []
    $scope.num = 1
    $scope.collectFlag = false
    // console.log(window.utils.getQuery('goodId'))
    function feet () {
      if (window.utils.getQuery('username')) {
        if (window.utils.getQuery('goodId')) {
          $http({
            url: '/insertFeet',
            method: 'POST',
            data: {
              'goodId': window.utils.getQuery('goodId'),
              'username': window.utils.getQuery('username')
            }
          }).success(function (data) {
            console.log('success！')
          })
        }
      }
    }
    function goodInfo () {
      $http({
        url: '/serachOneGoodsInfo',
        method: 'POST',
        data: {
          'goodId': window.utils.getQuery('goodId')
        }
      }).success(function (data) {
        console.log(data)
        $scope.goodInfo = data
      })
    }
    function isCollect () {
      $http({
        url: '/isCollect',
        method: 'POST',
        data: {
          'goodId': window.utils.getQuery('goodId'),
          'username': window.utils.getQuery('username')
        }
      }).success(function (data) {
        if (data[0]) {
          if (data[0].state === 1) {
            $scope.collectFlag = true
          }
          if (data[0].state === 0) {
            $scope.collectFlag = false
          }
        }
        console.log(data)
      })
    }
    function skim () {
      if (window.utils.getQuery('goodId')) {
        $http({
          url: '/updateShop',
          method: 'POST',
          data: {
            'goodId': window.utils.getQuery('goodId')
          }
        }).success(function (data) {
          console.log('success!!！')
        })
      }
    }
    // feet()
    // skim()
    goodInfo()
    isCollect()
    $scope.upNum = function () {
      $scope.num++
    }
    $scope.downNum = function () {
      if ($scope.num <= 1) {
        $scope.num = 1
      } else {
        $scope.num--
      }
    }
    $scope.keyup = function () {
      $scope.num = parseInt($scope.num)
      if (isNaN($scope.num)) {
        $scope.num = 1
      }
    }
    $scope.collectYes = function () {
      $http({
        url: '/reviseCollectState',
        method: 'POST',
        data: {
          'goodId': window.utils.getQuery('goodId'),
          'username': window.utils.getQuery('username'),
          'state': 1,
          'collect': 'yes'
        }
      }).success(function (data) {
        $scope.collectFlag = true
      })
    }
    $scope.collectNo = function () {
      $http({
        url: '/reviseCollectState',
        method: 'POST',
        data: {
          'goodId': window.utils.getQuery('goodId'),
          'username': window.utils.getQuery('username'),
          'state': 0,
          'collect': 'no'
        }
      }).success(function (data) {
        $scope.collectFlag = false
      })
    }
    $scope.buy = function () {
      insertOrder(1)
    }
    $scope.add = function () {
      insertOrder(2)
    }
    function insertOrder (num) {
      $http({
        url: '/insertOrder',
        method: 'POST',
        data: {
          'goodId': window.utils.getQuery('goodId'),
          'username': window.utils.getQuery('username'),
          'isbuy': num,
          'number': $scope.num,
          'price_all': $scope.goodInfo[0].price
        }
      }).success(function (data) {
        console.log(data)
      })
    }
  }
  window.hyyApp.controller('good', ['$scope', '$http', TimeByClinic])
