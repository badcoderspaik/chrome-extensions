var OPTIONS = (function (opt) {

  opt.Model = (function () {
    var settings = {},
      srcObserver = new opt.Observer,
      areaObserver = new opt.Observer,
      opacityObserver = new opt.Observer,

      setSrc = function (src) {
        settings.src = src;
        chrome.storage.sync.set(settings, function () {
        });
        srcObserver.notify();
      },

      getSrc = function () {
        return settings.src;
      },

      setPosition = function (position) {
        settings.position = position;
        chrome.storage.sync.set(settings, function () {
        });
        areaObserver.notify();
      },

      getPosition = function () {
        return settings.position;
      },

      setAreaHeight = function (height) {
        settings.area_height = height;
        chrome.storage.sync.set(settings, function () {
        });
      },

      getAreaHeight = function () {
        return settings.area_height;
      },

      getSrcObserver = function () {
        return srcObserver;
      },

      getAreaObserver = function () {
        return areaObserver;
      },

      getOpacity = function () {
        return settings.opacity;
      },

      setOpacity = function (opacity) {
        settings.opacity = opacity;
        chrome.storage.sync.set(settings, function () {
        });
        opacityObserver.notify();
      },

      getOpacityObserver = function () {
        return areaObserver;
      };

    return {

      getSrcObserver: getSrcObserver,
      getAreaObserver: getAreaObserver,
      getOpacityObserver: getOpacityObserver,

      setSrc: setSrc,
      getSrc: getSrc,

      setPosition: setPosition,
      getPosition: getPosition,

      setAreaHeight: setAreaHeight,
      getAreaHeight: getAreaHeight,

      setOpacity: setOpacity,
      getOpacity: getOpacity

    }

  }());

  return opt;

}(OPTIONS || {}));
