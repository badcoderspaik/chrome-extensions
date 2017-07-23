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
function Container(options) {
  options = options || {};
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
    position = options.position || 'bottom_right';
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
  style.opacity = options.opacity || 0.5;
  element.style.transition = 'opacity 0.5s cubic-bezier(0, .5, .5, 1)';
  style.zIndex = 9999999999;
  style.width = '60px';
  /**
   * Добавляет в контейнер dom элемент с изображением стрелки
   * @method add
   * @param {Arrow} arrow Объект класса Arrow
   */
  this.add = function (arrow) {
    element.appendChild(arrow.getDomElement());
  };
  /**
   * Устанавливает позицию контейнера на странице
   * @method setPosition
   * @param {String} position Строка, указывающая положение котейнера на странице.</br>
   * Должна принимать одно из следующих значений: 'bottom_right', 'center_right', 'top_right',
   * 'bottom_left', 'center_left', 'top_left', 'center_bottom'.
   */
  this.setPosition = function (position) {
    switch (position) {
      case 'bottom_right':
        style.right = '20px';
        style.bottom = '50px';
      break;

      case 'top_right':
        style.right = '20px';
        style.top = '50px';
      break;

      case 'bottom_left':
        style.left = '20px';
        style.bottom = '50px';
      break;

      case 'top_left':
        style.left = '20px';
        style.top = '50px';
      break;

      case 'center_right':
        style.right = '20px';
        style.top = window.innerHeight/2 - 72 + 'px';
      break;

      case 'center_left':
        style.left = '20px';
        style.top = window.innerHeight/2 - 72 + 'px';
      break;

      case 'center_bottom':
        style.left = window.innerWidth/2 - 35 + 'px';
        style.bottom = '20px';
      break;
    }
  };
  this.setPosition(position);

  this.updatePosition = function () {
    this.setPosition('center_bottom');
  };

  window.onresize = function () {
    if(position == 'center_bottom'){
      that.updatePosition();
      console.log(style.left);
    }
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
    //src: chrome.runtime.getURL('img/arrows/simple.png'),
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
    //src: chrome.runtime.getURL('img/arrows/simple.png'),
    type: 'arrow_down',
    is_arrow_down: true,
    speed: 200,
    alt: 'down',
  });
  this.add(this.arrow_up);
  this.add(this.arrow_down);

  document.body.appendChild(element);

}