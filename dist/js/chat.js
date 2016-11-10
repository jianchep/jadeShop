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
	    $scope.input = ''
	    $scope.username = window.utils.getQuery('username')
	    $scope.chatName = window.utils.getQuery('chatName')
	    $scope.showName = window.utils.getQuery('chatName')
	    $scope.height = window.$(document).height()
	    $scope.chatDate = []
	    $scope.index = 1
	    $scope.flag = true
	    $scope.touchStart = []
	    $scope.touchMove = []
	    var socket = window.io.connect()
	    var from = window.$.cookie('user')
	    /* update chatlist for msg state. */
	    function updateChatList () {
	      $http({
	        url: '/updateChatList',
	        method: 'POST',
	        data: {
	          'username': window.utils.getQuery('username'),
	          'chatname': window.utils.getQuery('chatName')
	        }
	      }).success(function (data) {
	        console.log(data)
	      })
	    }
	    /* update chat for read state. */
	    function updateChat () {

	    }
	    updateChat()
	    /* GET showchat for six data chat msg. */
	    function getDate () {
	      $http({
	        url: '/getChatDate',
	        method: 'POST',
	        data: {
	          'from': window.utils.getQuery('username'),
	          'to': window.utils.getQuery('chatName')
	        }
	      }).success(function (data) {
	        console.log(data)
	        $scope.chatDate = data.reverse()
	      })
	    }
	    /* touch event. */
	    function touchStart (event) {
	      var touch = event.touches[0]
	      $scope.touchStart = [touch.pageX, touch.pageY, new Date().getTime()]
	    }
	    function touchMove (event) {
	      var touch = event.touches[0]
	      $scope.touchMove = [touch.pageX, touch.pageY, new Date().getTime()]
	    }
	    function touchEnd (event) {
	      if ($scope.touchMove[1] - $scope.touchStart[1] >= 200 && $scope.touchMove[2] - $scope.touchStart[2] <= 666) {
	        if (window.$(document).scrollTop() <= 0) {
	          historyData()
	        }
	      }
	    }
	    document.addEventListener('touchstart', touchStart, false)
	    document.addEventListener('touchmove', touchMove, false)
	    document.addEventListener('touchend', touchEnd, false)
	    /* GET historyData. */
	    function historyData () {
	      if ($scope.flag) {
	        $scope.flag = false
	        $http({
	          url: '/getHistoryDate',
	          method: 'POST',
	          data: {
	            'from': window.utils.getQuery('username'),
	            'to': window.utils.getQuery('chatName'),
	            'index': $scope.index
	          }
	        }).success(function (data) {
	          console.log(data)
	          if (data[0]) {
	            $scope.chatDate = data.reverse().concat($scope.chatDate)
	            setTimeout(function () {
	              $scope.flag = true
	              $scope.index++
	            }, 2000)
	          } else {
	            $scope.more = false
	          }
	          if (data.length < 20) {
	            $scope.more = false
	            $scope.flag = false
	          }
	        })
	      }
	    }
	    /* UPDATE view data state. */
	    function readState () {
	      for (var i = 0; i < $scope.chatDate.length; i++) {
	        if ($scope.chatDate[i].read === 0) {
	          $scope.chatDate[i].read = 1
	        }
	      }
	      $scope.$apply()
	    }
	    /* GET now time. */
	    function nowTime () {
	      var date = new Date()
	      var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
	      return time
	    }
	    getDate()
	    /* socket.io emit and on. */
	    socket.emit('online', {user: from})
	    socket.emit('see', {from: from, to: window.utils.getQuery('chatName')})
	    socket.on('online', function (data) {
	      console.log(data)
	      console.log(data.from)
	      var str = ''
	      if (data.user !== from) {
	        // str = '<p class="chatCenter">用户 ' + data.user + ' 上线了！</p>'
	      } else {
	        // str = '<p class="chatCenter">' + nowTime() + '</p>'
	      }
	      window.$('.container').append(str)
	      window.$(document).scrollTop(window.$(document).height() - $scope.height)
	    })
	    socket.on('see', function (data) {
	      readState()
	    })
	    socket.on('focus', function (data) {
	      if (data.from === window.utils.getQuery('chatName')) {
	        $scope.focusNumber = 0
	        $scope.showName = '对方正在讲话'
	        $scope.interval = setInterval(function () {
	          if ($scope.focusNumber === 3) {
	            $scope.showName = '对方正在讲话'
	            $scope.focusNumber = 0
	          } else {
	            $scope.showName += '.'
	            $scope.focusNumber++
	          }
	          $scope.$apply()
	        }, 1000)
	        $scope.$apply()
	      }
	    })
	    socket.on('blur', function (data) {
	      $scope.showName = window.utils.getQuery('chatName')
	      clearInterval($scope.interval)
	      $scope.$apply()
	    })
	    socket.on('say', function (data) {
	      updateChatList()
	      console.log(data)
	      var obj = {
	        'from': window.utils.getQuery('chatName'),
	        'to': window.utils.getQuery('username'),
	        'read': 0,
	        'msg': data.msg
	      }
	      $scope.chatDate.push(obj)
	      // var str = '<div class="chatContentLeft">' +
	      //           '<div class="chatLeftFlag1"></div>' +
	      //           '<div class="chatLeftFlag2"></div>' +
	      //           '<img src="/images/patient.png"/>' +
	      //           '<div>' +
	      //             '<p>' + data.msg + '</p>' +
	      //           '</div>' +
	      //         '</div>'
	      // window.$('.container').append(str)
	      socket.emit('see', {from: from, to: window.utils.getQuery('chatName')})
	      window.$(document).scrollTop(window.$(document).height() - $scope.height)
	    })
	    $scope.say = function () {
	      var obj = {
	        'from': window.utils.getQuery('username'),
	        'to': window.utils.getQuery('chatName'),
	        'read': 0,
	        'msg': $scope.input
	      }
	      // var str = '<div class="chatContentRight">' +
	      //             '<div class="chatRightFlag1"></div>' +
	      //             '<div class="chatRightFlag2"></div>' +
	      //             '<img src="/images/patient.png"/>' +
	      //             '<div>' +
	      //               '<p>' + $scope.input + '</p>' +
	      //             '</div>' +
	      //             '<div class="clear"></div>' +
	      //           '</div>'
	      // window.$('.container').append(str)
	      $scope.chatDate.push(obj)
	      window.$(document).scrollTop(window.$(document).height() - $scope.height)
	      socket.emit('say', {from: from, to: window.utils.getQuery('chatName'), msg: $scope.input})
	      $scope.input = ''
	    }
	    $scope.until = function (o) {
	      console.log(o)
	    }
	    $scope.blur = function () {
	      socket.emit('blur', {from: from, to: window.utils.getQuery('chatName')})
	    }
	    $scope.focus = function () {
	      console.log(2)
	      socket.emit('focus', {from: from, to: window.utils.getQuery('chatName')})
	    }
	    $scope.back = function () {
	      var str = '/chatList?username=' + window.utils.getQuery('username')
	      window.location = str
	    }
	  }
	  window.hyyApp.controller('chat', ['$scope', '$http', TimeByClinic])


/***/ }
/******/ ]);