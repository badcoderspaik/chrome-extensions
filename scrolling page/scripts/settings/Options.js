/**
 * Класс настроек расширения
 * @class OPTIONS
 */
var OPTIONS = (function (opt) {
  /**
   * Создает пространство имен (вложенные объекты) из параметра items
   * @method OPTIONS.namespace
   * @param {string} items Разделенная пробелами строка
   */
  opt.namespace = function (items) {
    /**
     * Массив объектов родительского объекта OPTIONS, созданный из параметра items метода OPTIONS.namespace
     * @private
     * @property parts
     * @type {Array}
     * @default none
     */
    var parts = items.split('.'),
      /**
       * ссылка на OPTIONS
       * @private
       * @property parent
       * @type OPTIONS
       */
      parent = opt,
      i;
    /**
     * если 1ый элемент массива parts == 'OPTIONS', то вырезать его
     */
    if (parts[0] === 'OPTIONS') {
      parts = parts.slice(1);
    }
    /**
     * для каждого элемента массива
     */
    for (i = 0; i < parts.length; i++) {
      /**
       * если свойство в OPTIONS не найдено, создать его и проинициализировать пустым объектом
      */
      if (typeof parent[parts[i]] === 'undefined') {
        parent[parts[i]] = {};
      }
      /**
       * перезаписать объект OPTIONS с добалением новых свойств
       */
      parent = parent[parts[i]];
    }

  };
  /**
   * Создает объекты, яляющиеся свойствами объекта OPTIONS из параметра items
   * @method OPTIONS.items
   * @param {String} items разделенная пробелами строка
   */
  opt.items = function (items) {

    var parts = items.split(' '),
      parent = opt,
      i;

    if (parts[0] === 'OPTIONS') {
      parts = parts.slice(1);
    }
    /**
     * для каждого элемента массива
     */
    for (i = 0; i < parts.length; i++) {
      /**
       * если свойство в OPTIONS не найдено, создать его, проинициализировать пустым объектом,
       * и добавить в объект OPTIONS
       */
      if (typeof parent[parts[i]] === 'undefined') {
        parent[parts[i]] = {};
      }
    }

  };
  /**
   * вернуть объект OPTIONS
   */
  return opt;

}(OPTIONS || {}));

OPTIONS.items('Observer Model View Controller');
