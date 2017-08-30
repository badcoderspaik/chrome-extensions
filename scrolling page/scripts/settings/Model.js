var OPTIONS = (function (opt) {
  /**
   * Реализация Модели приложения настроек
   * @class Model
   * @parent OPTIONS
   */
  opt.Model = (function () {
    /**
     * Объект, хранящийся в локальном хранилище chrome.sync.storage.<br>
     * Запись в объект производится функцией chrome.sync.storage.set.<br>
     * Чтение объекта производится функцией chrome.sync.storage.get.<br>
     * settings.src - путь к файлу изображения кнопок,<br>
     * settings.src - строка, определяющая положение родительского элемента-контейнера кнопок.<br>
     * Может принимать одно из следующих значений:<br>
     * bottom_right,<br>
     * center_right,<br>
     * top_left,<br>
     * bottom_left,<br>
     * center_left,<br>
     * top_left,<br>
     * center_bottom.
     *
     * settigs.area_height - высота areas - зон расположения кнопок.
     *
     * settings.speed - скорость прокрутки
     * @private
     * @property settings
     * @type {Object}
     */
    var settings = {},
      /**
       * Объект класса Observer. Следит за изменением изображения кнопок
       * @private
       * @property srcObserver
       * @type {Observer}
       */
      srcObserver = new opt.Observer,
      /**
       * Объект класса Observer. Следит за изменением высоты areas - зон расположения кнопок
       * @private
       * @property areaObserver
       * @type {Observer}
       */
      areaObserver = new opt.Observer,
      /**
       * Объект класса Observer. Следит за изменением прозрачности Container - родительского блока кнопок
       * @private
       * @property opacityObserver
       * @type {Observer}
       */
      opacityObserver = new opt.Observer,
      /**
       *
       * @type {Observer}
       */
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
      },

      setMessage = function (message, node) {
        node.textContent = chrome.i18n.getMessage(message);
        return this;
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
      getSpeed: getSpeed,

      setMessage: setMessage,
      set: setMessage

    }

  }());

  return opt;

}(OPTIONS || {}));
