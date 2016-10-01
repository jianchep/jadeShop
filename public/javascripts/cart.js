  var TimeByClinic = function ($scope, $http) {
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
    /* hidden the info been none. */
    function hide (o) {
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
        hide(o)
      })
    }
    /* update isbuy for goods. */
    function buy (o) {
      $http({
        url: '/updateIsbuy',
        method: 'POST',
        data: {
          'orderId': o.order_info_id
        }
      }).success(function (data) {
        hide(o)
        window.alert('success')
      })
    }
    /* GET number for paging. */
    function serachGoodsIndex () {
      $http({
        url: '/serachCartsIndex',
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
    /* GET data for shoping goods. */
    function serachGoods () {
      $http({
        url: '/serachCarts',
        method: 'POST',
        data: {
          'start': $scope.goodsIndex
        }
      }).success(function (data) {
        console.log(data)
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
    $scope.buy = function (o) {
      buy(o)
    }
  }
  window.hyyApp.controller('cart', ['$scope', '$http', TimeByClinic])
