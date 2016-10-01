window.utils = {
  getQuery: function (name) {
    var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  },
  checkPhoneTel: function (telno) {
    var str = telno
    var regPartton = /1[3-8]+\d{9}/
    if (!str || str == null) {
      window.alert('手机号码不能为空！')
      return false
    } else if (!regPartton.test(str)) {
      window.alert('手机号码格式不正确！')
      return false
    } else {
      return true
    }
  },
  storage: new Storage(),
  ismobile: function (test) {
    var u = navigator.userAgent
    // var app = navigator.appVersion
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
      if (window.location.href.indexOf('?mobile') < 0) {
        try {
          if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
            return '0'
          } else {
            return '1'
          }
        } catch (e) {}
      }
    } else if (u.indexOf('iPad') > -1) {
      return '0'
    } else {
      return '1'
    }
  }
}

function Storage () {
  var tracking = (function () {
    var listeners = {}
    var listening = false

    function listen () {
      if (window.addEventListener) {
        window.addEventListener('storage', change, false)
      } else if (window.attachEvent) {
        window.attachEvent('onstorage', change)
      } else {
        window.onstorage = change
      }
    }

    function change (e) {
      if (!e) {
        e = window.event
      }
      var all = listeners[e.key]
      if (all) {
        all.forEach(fire)
      }

      function fire (listener) {
        listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri)
      }
    }

    function on (key, fn) {
      if (listeners[key]) {
        listeners[key].push(fn)
      } else {
        listeners[key] = [fn]
      }
      if (listening === false) {
        listen()
      }
    }

    function off (key, fn) {
      var ns = listeners[key]
      if (ns.length > 1) {
        ns.splice(ns.indexOf(fn), 1)
      } else {
        listeners[key] = []
      }
    }

    return {
      on: on,
      off: off
    }
  })()

  var ls = 'localStorage' in window && window.localStorage

  function accessor (key, value) {
    if (arguments.length === 1) {
      return get(key)
    }
    return set(key, value)
  }

  function get (key) {
    return JSON.parse(ls.getItem(key))
  }

  function set (key, value) {
    try {
      ls.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  }

  function remove (key) {
    return ls.removeItem(key)
  }

  function clear () {
    return ls.clear()
  }

  accessor.set = set
  accessor.get = get
  accessor.remove = remove
  accessor.clear = clear
  accessor.on = tracking.on
  accessor.off = tracking.off

  return accessor
}