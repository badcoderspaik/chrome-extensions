var OPTIONS = (function (opt) {

  opt.Model = (function () {
    var settings = {},
      srcObserver = new opt.Observer,
      areaObserver = new opt.Observer,
      opacityObserver = new opt.Observer,
      speedObserver = new opt.Observer,
      speed_output_observer = new opt.Observer,

      setSrc = function (src) {
        settings.src = src;
        chrome.storage.sync.set(settings, function () {
        });
        //srcObserver.notify();
      },

      getSrc = function () {
        return settings.src;
      },

      setPosition = function (position, area_height) {
        settings.position = position;
        chrome.storage.sync.set(settings, function () {
        });
        areaObserver.notify(area_height);
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

      getOpacityObserver = function () {
        return areaObserver;
      },

      getSpeedObserver = function () {
        return speedObserver;
      },

      setOpacity = function (opacity) {
        settings.opacity = opacity;
        chrome.storage.sync.set(settings, function () {
        });
        opacityObserver.notify();
      },

      getOpacity = function () {
        return settings.opacity;
      },

      setSpeed = function (speed) {
        settings.speed = speed;
        chrome.storage.sync.set(settings, function () {
        });
        speedObserver.notify();
      },

      getSpeed = function () {
        return settings.speed;
      };

    return {

      getSrcObserver: getSrcObserver,
      getAreaObserver: getAreaObserver,
      getOpacityObserver: getOpacityObserver,
      getSpeedObserver: getSpeedObserver,

      setSrc: setSrc,
      getSrc: getSrc,

      setPosition: setPosition,
      getPosition: getPosition,

      setAreaHeight: setAreaHeight,
      getAreaHeight: getAreaHeight,

      setOpacity: setOpacity,
      getOpacity: getOpacity,

      setSpeed: setSpeed,
      getSpeed: getSpeed

    }

  }());

  return opt;

}(OPTIONS || {}));
