/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	  var TimeByClinic = function ($scope, $http) {
	    $scope.isActive = [true, false, false]
	    $scope.goodsIndex = 1
	    $scope.goodsIndexArr = []
	    $scope.serachInput = ''
	    $scope.isStartDisabled = true
	    $scope.isEndDisabled = false
	    if (window.localStorage.getItem('realname')) {
	      $scope.realname = window.localStorage.getItem('realname') || ''
	    }
	    if (window.utils.getQuery('q')) {
	      $scope.serachInput = window.utils.getQuery('q') || ''
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
	        url: '/serachGoodsIndex',
	        method: 'POST',
	        data: {
	          'like': $scope.serachInput
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
	        url: '/serachGoods',
	        method: 'POST',
	        data: {
	          'start': $scope.goodsIndex,
	          'like': $scope.serachInput
	        }
	      }).success(function (data) {
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
	      $scope.isActive = [true, false, false]
	      $scope.serachInput = ''
	      serachGoodsIndex()
	      $scope.goodsIndex = 1
	      serachGoods()
	    }
	    $scope.activeTwo = function () {
	      $scope.isActive = [false, true, false]
	      $scope.serachInput = 'Clothes'
	      serachGoodsIndex()
	      $scope.goodsIndex = 1
	      serachGoods()
	    }
	    $scope.activeThree = function () {
	      $scope.isActive = [false, false, true]
	      $scope.serachInput = 'Books'
	      serachGoodsIndex()
	      $scope.goodsIndex = 1
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
	  window.hyyApp.controller('index', ['$scope', '$http', TimeByClinic])


/***/ }
/******/ ]);