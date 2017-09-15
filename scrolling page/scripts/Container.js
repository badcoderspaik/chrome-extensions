/**
 * Класс контейнера для кнопок
 * @class Container
 * @param {Object} options Объект, содержащий настройки объекта класса:
 * String options.position - строка, от значения которой зависит расположение контейнера;</br>
 * должна принимать одно из следующих значений: 'bottom_right', 'center_right', 'top_right',
 * 'bottom_left', 'center_left', 'top_left', 'center_bottom'.</br>
 * Положение контейнера на странице также может быть задано методом setPosition ( String position ) объекта класса.</br>
 * Float options.opacity - степень прозрачности контейнера, min - 0 ( полноя прозрачность ), max - 1 ( полная непрозрачность ).</br>
 * Степень прозрачности контейнера также может быть задана методом setOpacity ( Number opacity ) объекта класса
 * @constructor
 */
function Container() {
  /**
   * dom элемент контейнера
   * @private
   * @property element
   * @type {HtmlDivElement}
   */
  var element = document.createElement('div'),
    that = this,
    style = element.style,
    /**
     * Переменная, которая будет инициализироваться новым значением при очередном наведении указателя мыши на элемент
     * контейнера.</br> В переменную будет записываться текущее значение свойства opacity контейнера.</br> Это нужно для того,
     * чтобы при отработке события mouseout на элементе его свойство opacity было установлено в прежнее значение, которое
     * как раз и записывается в переменную last_opacity
     * @private
     * @property last_opacity
     * @type {Float}
     */
    last_opacity,
    /**
     * Позиция контейнера на странице</br>
     * Может принимать одно из следующих значений: 'bottom_right', 'center_right', 'top_right',
     * 'bottom_left', 'center_left', 'top_left', 'center_bottom'.</br>
     * Настраиваемое свойство - задается в конструкторе контейнера через свойство options.position</br>
     * либо методом setPosition() контейнера
     * @private
     * @property position
     * @type {String}
     */
    _height,
    _position,
    visibility;
  chrome.storage.sync.get(function (items) {
    _position = items.position;
    _height = items.area_height;
    visibility = items.visibility || true;
  });
  /**
   * html-класс dom элемента контейнера
   * @private
   * @property element.className
   * @type {string}
   */
  element.className = 'for_arrow_container';
  /**
   * Позиция dom элемента конейнера ( css свойство style.position )
   * @private
   * @property style.position
   * @type {string}
   */
  style.position = 'fixed';
  /**
   * Степень прозрачности конейнера - свойство element.style.opacity. Принимает значения от 0 до 1.</br>
   * Настраиваемое свойство: задается через параметр конструктора options.opacity
   * @private
   * @property style.opacity
   * @type {float}
   * @default 0.5
   */
  style.opacity = 0;
  chrome.storage.sync.get(function (items) {
    style.opacity = items.opacity || 0.2;
  });

  element.style.transition = 'opacity 0.5s cubic-bezier(0, .5, .5, 1)';
  style.zIndex = 9999999999;
  style.width = '60px';
  style.display = 'block';
  /**
   * Добавляет в контейнер dom элемент с изображением стрелки
   * @method add
   * @param {Arrow} arrow Объект класса Arrow
   */
  this.add = function (arrow) {
    element.appendChild(arrow.getDomElement());
  };

  this.resetPosition = function (area_height) {
    if (area_height) {
      area_height = parseInt(area_height);
      style.top = window.innerHeight / 2 - area_height / 2 + 'px';
    } else {
      chrome.storage.sync.get(function (items) {
        if (items.position === 'center_right' || items.position === 'center_left') {
          var preset_height = items.area_height || '105px';
          preset_height = parseInt(preset_height);
          style.top = window.innerHeight / 2 - preset_height / 2 + 'px';
        }
      });
    }
  };
  /**
   * Устанавливает позицию контейнера на странице
   * @method setPosition
   * @param {String} position Строка, указывающая положение котейнера на странице.</br>
   * Должна принимать одно из следующих значений: 'bottom_right', 'center_right', 'top_right',
   * 'bottom_left', 'center_left', 'top_left', 'center_bottom'.
   */
  this.setPosition = function (position, top) {
    switch (position) {
      case 'bottom_right':
        _position = 'bottom_right';
        style.left = null;
        style.top = null;
        style.right = '20px';
        style.bottom = '50px';
        break;

      case 'top_right':
        _position = 'top_right';
        style.left = null;
        style.bottom = null;
        style.right = '20px';
        style.top = '50px';
        break;

      case 'bottom_left':
        _position = 'bottom_left';
        style.right = null;
        style.top = null;
        style.left = '20px';
        style.bottom = '50px';
        break;

      case 'top_left':
        _position = 'top_left';
        style.right = null;
        style.bottom = null;
        style.left = '20px';
        style.top = '50px';
        break;

      case 'center_right':
        _position = 'center_right';
        style.left = null;
        style.bottom = null;
        style.right = '20px';
        this.resetPosition(top);
        break;

      case 'center_left':
        _position = 'center_left';
        style.right = null;
        style.bottom = null;
        style.left = '20px';
        this.resetPosition(top);
        break;

      case 'center_bottom':
        _position = 'center_bottom';
        style.right = null;
        style.top = null;
        style.left = window.innerWidth / 2 - 30 + 'px';
        style.bottom = '20px';
        break;
    }
  };

  this.get_Position = function () {
    return _position;
  };

  chrome.storage.sync.get(function (items) {
    that.setPosition(items.position || 'bottom_right');
  });

  this.updatePosition = function () {
    this.setPosition('center_bottom');
  };

  this.getElement = function () {
    return element;
  };
  /**
   * Отображает контейнер
   * @method show
   */
  this.show = function () {
    style.display = 'block';
  };
  /**
   * Скрывает контейнер
   * @method hide
   */
  this.hide = function () {
    style.display = 'none';
  };
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(style.display === 'block') that.hide();
    else if(style.display === 'none') that.show();
  });
  /**
   * Устанавливает степень прозрачности контейнера
   * @method setOpacity
   * @param {Float} level Число от 0 до 1
   */
  this.setOpacity = function (level) {
    style.opacity = level;
  };
  /**
   * Срабатывает при нахождении курсора над dom элементом контейнера.</br>
   * Свойств opacity элемента при этом устанавливается в значение 1
   *@event onmouseover
   * @param {Object} event Объект события
   */
  element.onmouseover = function (event) {
    last_opacity = this.style.opacity;
    style.opacity = 1;
  };
  /**
   * Срабатывает при выходе курсора с dom элемента контейнера.</br>
   * Свойство opacity элемента при этом устанавливается в первоначальное значение
   * @event onmouseover
   * @param {Object} event
   */
  element.onmouseout = function (event) {
    style.opacity = last_opacity;
  };
  /**
   * Объект класса Arrow. Кнопка "вверх"
   * @property arrow_up
   * @type {Arrow}
   */
  this.arrow_up = new Arrow({
    type: 'arrow_up',
    speed: 200,
    margin: true
  });
  /**
   * Объект класса Arrow. Кнопка "вниз"
   * @property arrow_down
   * @type {Arrow}
   */
  this.arrow_down = new Arrow({
    type: 'arrow_down',
    is_arrow_down: true,
    speed: 200
  });
  style.height = parseInt(getComputedStyle(this.arrow_up.getDomElement()).height);

  this.add(this.arrow_up);
  this.add(this.arrow_down);

  document.body.appendChild(element);

  window.addEventListener('resize', function () {
    if (that.get_Position() === 'center_right' || that.get_Position() === 'center_left') {
      that.resetPosition(_height);
    }
    if (that.get_Position() == 'center_bottom') {
      that.updatePosition();
    }
  }, false);

}