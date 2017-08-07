/*var OPTIONS = (function (opt) {

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

OPTIONS.items('Observer Model View Controller');*/

/*OPTIONS.Observer = function () {
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
};*/

/*OPTIONS.Model = (function () {
  var settings = {},
    srcObserver = new OPTIONS.Observer,
    areaObserver = new OPTIONS.Observer,
    opacityObserver = new OPTIONS.Observer,

    setSrc = function (src) {
      if (!src) return;
      settings.src = src;
      chrome.storage.sync.set(settings, function () {
      });
      srcObserver.notify();
    },

    getSrc = function () {
      return settings.src;
    },

    setPosition = function (position) {
      if (!position) return;
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
    }

  return {

    getSrcObserver: getSrcObserver,
    getAreaObserver: getAreaObserver,
    getOpacityObserver: getOpacityObserver,

    getSrc: getSrc,
    setSrc: setSrc,

    getPosition: getPosition,
    setPosition: setPosition,

    getAreaHeight: getAreaHeight,
    setAreaHeight: setAreaHeight,

    getOpacity: getOpacity,
    setOpacity: setOpacity

  }

}());*/

/*OPTIONS.View = (function (data) {
  var cells = document.querySelectorAll('td'),
    areas = document.querySelectorAll('.areas'),
    area_center_right = document.getElementById('center_right'),
    area_center_left = document.getElementById('center_left'),
    area_center_bottom = document.getElementById('center_bottom'),
    range = document.querySelector('input[type=range'),
    element_height,
    element_width,
    pos_center_bottom,
    pos_center_right,
    pos_center_left,

    setCenterRight = function () {
      element_height = parseInt(getComputedStyle(panel.getElement()).height);
      pos_center_right = (window.innerHeight / 2 - element_height / 2);
      area_center_right.style['right'] = '20px';
      area_center_right.style.top = pos_center_right + 'px';
    },

    setCenterBottom = function () {
      element_width = parseInt(getComputedStyle(panel.getElement()).width);
      pos_center_bottom = (window.innerWidth / 2 - element_width / 2);
      console.log(pos_center_bottom);
      area_center_bottom.style.left = pos_center_bottom + 'px';
      area_center_bottom.style.bottom = '20px';
    },

    setCenterLeft = function () {
      element_height = parseInt(getComputedStyle(panel.getElement()).height);
      pos_center_left = (window.innerHeight / 2 - element_height / 2);
      area_center_left.style['left'] = '20px';
      area_center_left.style.top = pos_center_left + 'px';
    };

  setTimeout(function () {
    setCenterLeft();
    setCenterRight();
    setCenterBottom();
  }, 100);


  data.getSrcObserver().addObserver(function () {
    var src = data.getSrc();
    panel.arrow_down.setSrc(src);
    panel.arrow_up.setSrc(src);
  });

  data.getAreaObserver().addObserver(function () {
    panel.setPosition(data.getPosition());
  });

  data.getOpacityObserver().addObserver(function () {
    panel.setOpacity(data.getOpacity());
  });

  return {

    findImg: function (node) {
      var img = node.querySelector('img');
      return img.src;
    },

    getCells: function () {
      return cells;
    },

    getAreas: function () {
      return areas;
    },

    getRange: function () {
      return range;
    },

    setCenterRight: setCenterRight,
    setCenterLeft: setCenterLeft

  };
}(OPTIONS.Model));*/

/*OPTIONS.Controller = (function (data, view) {
  var cells = view.getCells(),
    areas = view.getAreas(),
    range = view.getRange(),
    c_length = cells.length,
    a_length = areas.length,
    panel_height,
    k,
    j,
    i;

  for (i = 0; i < c_length; i++) {
    cells[i].onmousedown = function () {
      this.style.outline = '1px solid blue';
      data.setSrc(view.findImg(this));
      panel_height = getComputedStyle(panel.getElement()).height;
      data.setAreaHeight(panel_height);
      chrome.storage.sync.get(function (items) {
        if (items.position === 'center_right' || items.position === 'center_left') {
          panel.resetPosition();
        }
      });

      for (k = 0; k < a_length; k++) {
        areas[k].style.height = panel_height;
      }

      view.setCenterRight();
      view.setCenterLeft();

    };

    cells[i].onmouseup = function () {
      this.style.outline = '';
    };

    cells[i].onmouseout = function () {
      this.style.outline = '';
    }
  }

  for (j = 0; j < a_length; j++) {
    areas[j].onclick = function () {
      data.setPosition(this.id);
    };
  }

  range.oninput = function () {
    panel.setOpacity(this.value);
  };

  range.onchange = function () {
    data.setOpacity(this.value);
  }

}(OPTIONS.Model, OPTIONS.View));*/

/*
(function () {
  chrome.storage.sync.get(function (items) {
    var src = items.src || chrome.runtime.getURL('img/arrows/simple.png'),
      position = items.position || 'bottom_right',
      areas = OPTIONS.View.getAreas(),
      range = OPTIONS.View.getRange(),
      opacity = items.opacity || 0.2,
      a_length = areas.length,
      get_container_height = getComputedStyle(panel.getElement()).height,
      i;

    for (i = 0; i < a_length; i++) {
      areas[i].style.height = get_container_height;
    }

    panel.arrow_up.setSrc(src);
    panel.arrow_down.setSrc(src);
    panel.setPosition(position);
    panel.setOpacity(opacity);
    range.value = items.opacity || 0.5;
  });

}());
*/

