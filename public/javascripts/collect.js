  var TimeByClinic = function ($scope, $http) {
    $scope.isActive = [true, false, false]
    $scope.goodsIndex = 1
    $scope.goodsIndexArr = []
    $scope.isStartDisabled = true
    $scope.isEndDisabled = false
    if (window.localStorage.getItem('realname')) {
      $scope.realname = window.localStorage.getItem('realname') || ''
    }
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
        url: '/serachCollectsIndex',
        method: 'POST',
        data: {
          'username': window.utils.getQuery('username')
        }
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
        url: '/serachCollects',
        method: 'POST',
        data: {
          'start': $scope.goodsIndex,
          'username': window.utils.getQuery('username')
        }
      }).success(function (data) {
        console.log(data,333)
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
    $scope.goodClick = function (o) {
      console.log(o)
      var str = '/good?username=' + window.utils.getQuery('username')
      if (o.shop_info_id) {
        str += '&goodId=' + o.shop_info_id
      }
      window.location = str
      // window.open(str)
    }
  }
  window.hyyApp.controller('collect', ['$scope', '$http', TimeByClinic])
