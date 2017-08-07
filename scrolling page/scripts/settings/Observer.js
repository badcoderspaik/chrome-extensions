var OPTIONS = (function (opt) {

  opt.Observer = function () {
    var i;
    this.observers = [],

      this.addObserver = function (o) {
        this.observers.push(o);
      },

      this.notify = function (data) {
        for (i = 0; i < this.observers.length; i++) {
          var observer = this.observers[i];
          observer(data);
        }
      };
  };

  return opt;

}(OPTIONS || {}));
