var OPTIONS = (function (opt) {

  opt.View = (function (data) {
    var cells = document.querySelectorAll('td'),
      areas = document.querySelectorAll('.areas'),
      area_center_right = document.getElementById('center_right'),
      area_center_left = document.getElementById('center_left'),
      area_center_bottom = document.getElementById('center_bottom'),
      opacity_range = document.querySelector('#opacity_range'),
      speed_range = document.querySelector('#speed_range'),
      speed_output = document.querySelector('#speed_output'),
      area_height,
      element_width,
      pos_center_bottom,
      pos_center_right,
      pos_center_left,

      setCenterRight = function (area_height) {
        chrome.storage.sync.get(function (items) {
          area_height = parseInt(area_height || items.area_height) || 105,
            pos_center_right = (window.innerHeight / 2 - area_height / 2);
          area_center_right.style.right = '20px';
          area_center_right.style.top = pos_center_right + 'px';
        });

      },

      setCenterLeft = function (area_height) {
        chrome.storage.sync.get(function (items) {
          area_height = parseInt(area_height || items.area_height) || 105,
            pos_center_left = (window.innerHeight / 2 - area_height / 2);
          area_center_left.style.left = '20px';
          area_center_left.style.top = pos_center_left + 'px';
        });

      },

      setCenterBottom = function () {
        element_width = parseInt(panel.getElement().style.width);
        pos_center_bottom = (window.innerWidth / 2 - element_width / 2);
        area_center_bottom.style.left = pos_center_bottom + 'px';
        area_center_bottom.style.bottom = '20px';
      };

    setCenterRight();
    setCenterLeft();
    setCenterBottom();

    data.getSrcObserver().addObserver(function () {
      panel.arrow_down.setSrc(data.getSrc());
      panel.arrow_up.setSrc(data.getSrc());
    });

    data.getAreaObserver().addObserver(function (area_height) {
      panel.setPosition(data.getPosition(), area_height);
    });

    data.getOpacityObserver().addObserver(function () {
      panel.setOpacity(data.getOpacity());
    });

    data.getSpeedObserver().addObserver(function () {
      panel.arrow_down.setSpeed(data.getSpeed());
      panel.arrow_up.setSpeed(data.getSpeed());
      console.log(data.getSpeed());
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

      getOpacityRange: function () {
        return opacity_range;
      },

      getSpeedRange: function () {
        return speed_range;
      },

      getSpeedOutput: function () {
        return speed_output;
      },

      setCenterRight: setCenterRight,
      setCenterLeft: setCenterLeft

    };
  }(opt.Model));

  return opt;

}(OPTIONS || {}));
