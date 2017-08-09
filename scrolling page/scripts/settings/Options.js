var OPTIONS = (function (opt) {

  opt.namespace = function (items) {
    var parts = items.split('.'),
      parent = opt,
      i;

    if (parts[0] === 'OPTIONS') {
      parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {
      if (typeof parent[parts[i]] === 'undefined') {
        parent[parts[i]] = {};
      }
      parent = parent[parts[i]];
    }

    //return parent;
  };

  opt.items = function (items) {

    var parts = items.split(' '),
      parent = opt,
      i;

    if (parts[0] === 'OPTIONS') {
      parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {
      if (typeof parent[parts[i]] === 'undefined') {
        parent[parts[i]] = {};
      }
    }

    //return parent;
  };

  return opt;

}(OPTIONS || {}));

OPTIONS.items('Observer Model View Controller');
