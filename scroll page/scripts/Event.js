//обект, реализующий шаблон Observer(Издатель/Подписчик)
function Event() {
  this.listeners = [];//массив, хранящий подписчиков
}

Event.prototype = {
  constructor: Event,
/*добавляет подписчика; listener - функция, которая будет выполняться, context - объект, относительно которого
* будет выполняться listener
* */
  addListener: function (listener, context) {
    if (!listener || typeof listener != "function") return;//если listener не функция или же не передан этот параметр - выйти
    if(!context) context = null;

    var i,
      count = this.listeners.length;//количество добавленных подписчиков

//          for(i = 0; i < count; i++){
//            var observer = this.listeners[i];
//            if(observer == context[listener]) return;
//          }

/*добавить в массив подписчика - по сути добавляет в массив listeners новый объект со свойствами listener и context
 и инициализирует их значениями, переданными в параметрах функции listener и context
*метод возвращает объект Event для составления цепочек методов
* */
    this.listeners.push({listener: listener, context: context});
    return this;
  },

  fire: function(arg){//выполняет все функции из массива listeners(уведомляет подписчиков)
    var i,//переменная цикла
      count = this.listeners.length;//число подписчиков
    for(i = 0; i < count; i++){//цикл по подписчикам
      var observer = this.listeners[i];//текущий подписчик
      observer.listener.call(observer.context, arg);//выполнить функцию (уведомить подписчика)
    }
  }
}