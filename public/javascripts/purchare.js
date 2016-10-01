  var TimeByClinic = function ($scope, $http) {
    $scope.isActive = [true, false]
    $scope.goodsIndex = 1
    $scope.goodsIndexArr = []
    $scope.serachInput = ''
    $scope.isStartDisabled = true
    $scope.isEndDisabled = false

    /* GET status for paging prev and next. */
    function trueOrFalse () {
      if ($scope.goodsIndex === 1) {
        $scope.isStartDisabled = true
      } else {
        $scope.isStartDisabled = false
      }
      if ($scope.goodsIndex === $scope.index) {
        $scope.isEndDisabled = true
      } else {
        $scope.isEndDisabled = false
      }
    }
    /* GET number for paging. */
    function serachGoodsIndex () {
      $http({
        url: '/serachPurcharesIndex',
        method: 'POST'
      }).success(function (data) {
        $scope.index = Math.ceil(data / 4)
        $scope.goodsIndexArr = []
        for (let i = 1; i <= Math.ceil(data / 4); i++) {
          $scope.goodsIndexArr.push(i)
        }
        trueOrFalse()
      })
    }
    /* DELETE date for paging. */
    function deleteDate (o) {
      $http({
        url: '/deleteDate',
        method: 'POST',
        data: {
          'orderId': o.order_info_id
        }
      }).success(function (data) {
        for (var i = 0; i < $scope.allGoods.length; i++) {
          if ($scope.allGoods[i].order_info_id === o.order_info_id) {
            $scope.allGoods[i].delete = 1
          }
        }
        for (var i = 0; i < $scope.allGoods.length; i++) {
          if ($scope.allGoods[i].delete === 0) {
            break
          }
          if ($scope.allGoods[i].delete !== 0 && i === $scope.allGoods.length - 1) {
            $scope.allGoods = []
          }
        }
        console.log($scope.allGoods)
      })
    }
    /* GET data for shoping goods. */
    function serachGoods () {
      $http({
        url: '/serachPurchares',
        method: 'POST',
        data: {
          'start': $scope.goodsIndex
        }
      }).success(function (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].is_sell === 0) {
            data[i].state = 'no'
          }
          if (data[i].is_sell === 1) {
            data[i].state = 'yes'
          }
        }
        $scope.allGoods = data
      })
    }
    serachGoodsIndex()
    serachGoods()
    $scope.indexClick = function (index) {
      $scope.goodsIndex = index
      trueOrFalse()
      serachGoods()
    }
    $scope.indexPrev = function () {
      $scope.goodsIndex--
      trueOrFalse()
      serachGoods()
    }
    $scope.indexNext = function () {
      $scope.goodsIndex++
      trueOrFalse()
      serachGoods()
    }
    $scope.activeOne = function () {
      var str = '/purchare?username=' + window.utils.getQuery('username')
      window.location = str
    }
    $scope.activeTwo = function () {
      var str = '/cart?username=' + window.utils.getQuery('username')
      window.location = str
    }
    $scope.goodClick = function (o) {
      console.log(o)
      var str = '/good?username=' + window.utils.getQuery('username')
      if (o.shop_info_id) {
        str += '&goodId=' + o.shop_info_id
      }
      window.location = str
    }
    $scope.delete = function (o) {
      deleteDate(o)
    }
  }
  window.hyyApp.controller('purchare', ['$scope', '$http', TimeByClinic])
