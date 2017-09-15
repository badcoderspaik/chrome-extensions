/**
 * Функция анимации прокрутки страницы вверх
 * @property scrollUp
 * @type {function}
 */
var scrollUp = '';
/**
 * Функция анимации прокрутки страницы вниз
 * @property scrollDown
 * @type {string}
 */
var scrollDown = '';
/**
 * Флаг, управляющий анимацией прокрутки страницы вверх
 * @property up_jumping
 * @type {boolean}
 * @default false
 */
var up_jumping = false;
/**
 * Флаг, управляющий анимацией прокрутки страницы вниз
 * @property down_jumping
 * @type {boolean}
 * @default false
 */
var down_jumping = false;
/**
 * Класс объекта, содержащего кнопку с изображением стрелки
 * @class Arrow
 * @param {Object} options Объект, свойства которого содержат значения для настройки объекта класса
 * @constructor
 */
function Arrow(options) {
  /**
   * Объект с настрайкоми кнопки
   * @private
   * @property options
   * @type {Object}
   * @default {}
   */
  options = options || {};
  /**
   * @private
   * dom елемент кнопки с изображением стрелки
   * @property element
   * @type {HtmlImageElement}
   * @default HtmlImageElement
   */
  var element = document.createElement('img'),
    /**
     * Скорость прокрутки. Настраиваемое свойство: задается через параметр конструктора options._speed
     * или методом setSpeed(speed)
     * @private
     * @property _speed
     * @type {Number}
     */
    _speed;
  chrome.storage.sync.get(function (items) {
    _speed = items.speed || options.speed;
  });
  /**
   * Атрибут src - путь к файлу изображения стрелки.</br>
   * Настраиваемое свойство: задается через параметр options.src конструктора класса
   * @property element.src
   * @type {string}
   * @default ''
   */
  chrome.storage.sync.get(function (items) {
    element.src = items.src || chrome.runtime.getURL('img/arrows/simple.png');
  });
  /**
   * Атрибут class изображения.</br>
   * Настраиваемое свойство: задается через параметр options.src конструктора класса.
   * @property element.className
   * @type {string}
   * @default 'arrow_up'
   */
  element.className = options.type || 'arrow_up';
  /**
   * Атрибут element.style.display элемента изображения.</br>
   * Настраиваемое свойство: задается через параметр options.type конструктора класса.</br>
   * Может иметь одно из двух значений - 'arrow_up' или 'arrow_down'.
   * @property element.style.display
   * @type {string}
   * @default 'block'
   */
  element.style.display = 'block';
  /**
   * Атрибут element.style.cursor элемента изображения;</br>
   * задает вид указателя мыши при наведении на стрелку.
   * @property element.style.cursor
   * @type {string}
   * @default 'pointer'
   */
  element.style.margin = 'auto';
  element.style.cursor = 'pointer';
  if (options.is_arrow_down && options.is_arrow_down === true) element.style.transform = 'rotate(180deg)';
  /**
   *Высота страницы
   * @private
   * @property page_height
   * @type {number}
   * @default number
   */
  var page_height = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
    ),
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
    observer = new MutationObserver(function () {
      page_height = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
    });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true
  });
  /**
   * Если в параметре options конструктора указано свойство options.margin со значением true,</br>
   * то изображение стрелки будет иметь нижнее поле marginBottom равное 5px.</br> Оно служит для
   * визуального разделения стрелок. Имеет смысл только для кнопки 'вверх'
   * @property margin
   * @type {boolean}
   */
  if (options.margin && options.margin === true) element.style.marginBottom = '5px';
  /**
   * Возвращает dom элемент изображения
   * @method getDomElement
   * @return {HtmlImageElement}
   */
  this.getDomElement = function () {
    return element;
  };
  /**
   * Устанавливает скорость прокрутки
   * @method setSpeed
   * @param {number} speed Скорость прокрутки в пикселях
   * @return undefined
   */
  this.setSpeed = function (speed) {
    _speed = speed;
  };
  /**
   * Устанавливает изображение кнопки
   * @method setSrc
   * @param {string} src путь к файлу изображения
   * @return undefined
   */
  this.setSrc = function (src) {
    element.src = src;
  };
  /**
   * Обработчик нажатия кнопки "вверх".</br>
   * Сбрасывает интервал прокрутки (если таковой запущен) вниз,</br>
   * устанавливает флаг up_jumping в true для предотвращения повторного запуска интервала прокрутки вверх,</br>
   * запускает интервал, в котором при каждом вызове функции страница на указанное число пикселей прокручивается вверх.</br>
   * Если позиция полосы прокрутки window.pageYOffset <= 0 (что говорит о том, что страница прокручена в начало),</br>
   * происходит сброс интервала прокрутки и установка флага up_jumping в false. Флаг должен обязательно быть установлен</br>
   * в false, в противном случае произойдет блокировка последующих нажатий на кнопку вверх.
   * @private
   * @property jumpUp
   * @type {function}
   */
  function jumpUp() {
    clearInterval(scrollDown);
    up_jumping = true;
    scrollUp = setInterval(function () {
      window.scrollBy(0, -_speed);
      if (window.pageYOffset <= 0) {
        clearInterval(scrollUp);
        up_jumping = false;
      }
    }, 10);
  }
  /**
   * Обработчик нажатия кнопки "вниз".</br>
   * Сбрасывает интервал прокрутки (если таковой запущен) вверх,</br>
   * устанавливает флаг down_jumping в true для предотвращения повторного запуска интервала прокрутки вниз,</br>
   * запускает интервал, в котором при каждом вызове функции страница на указанное число пикселей прокручивается вниз.</br>
   * Если позиция полосы прокрутки window.pageYOffset >= page_height(высота страницы)</br>
   * (что говорит о том, что страница прокручена в конец),</br>
   * происходит сброс интервала прокрутки и установка флага down_jumping в false. Флаг должен обязательно быть установлен</br>
   * в false, в противном случае произойдет блокировка последующих нажатий на кнопку вниз.</br>
   * @private
   * @property jumpDown
   * @type {function}
   */
  function jumpDown() {
    clearInterval(scrollUp);
    down_jumping = true;
    //page_height = document.documentElement.offsetHeight - window.innerHeight;
    page_height = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    scrollDown = setInterval(function () {
      window.scrollBy(0, _speed);
      page_height = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );

      if (Math.ceil(window.pageYOffset) >= (page_height - window.innerHeight)) {
        clearInterval(scrollDown);
        down_jumping = false;
      }
    }, 10);

  }
  /**
   * Срабатывает при нажатии на кнопки-стрелки "вверх/вниз".</br>
   * Если класс элемента, на котором произошло событие клика равен 'arrow_up', значит нажата кнопка "вверх".</br>
   * Если же класс равен 'arrow_down', значит нажата кнопка "вниз".</br>
   * При нажати кнопки "вверх" флаг 'down_jumping' обязательно должен быть установлен в false, потому как он</br>
   * снимает и устаналивает блокировку запуска интервавла прокрутки вниз. Так как разблокировка повторного</br>
   * запуска интервала прокрутки страницы вниз происходит лишь при достижении бегунка полосы прокрутки конца страницы</br>
   * внутри функции интервала, может случиться, что во время работы интервала прокрутки вниз будет нажата кнопка "вверх"</br>
   * и бегунок не достигнет конца страницы, что сделает невозможным разблокировку. Таким образом нажатие кнопки "вверх" -</br>
   * это второе место в коде, где необходимо сбросить флаг 'down_jumping'.</br>
   * Аналогично при нажати кнопки "вниз" сбрасывается флаг 'up_jumping'.</br>
   *@event onmousedown
   * @param {Object} event Объект события
   */
  element.onmousedown = function (event) {
    if (this.className == 'arrow_up') {
      down_jumping = false;
      if (up_jumping || window.pageYOffset <= 0) return;
      jumpUp();
    }

    if (this.className == 'arrow_down') {
      up_jumping = false;
      if (down_jumping || Math.ceil(window.pageYOffset) >= (page_height - window.innerHeight)) return;
      jumpDown();
    }
  };

}
