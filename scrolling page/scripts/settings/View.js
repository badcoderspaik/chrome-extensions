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
      opacity_message = document.getElementById('opacity_message'),
      speed_message = document.getElementById('speed_message'),
      area_message = document.getElementById('area_message'),
      area_height,
      element_width,
      pos_center_bottom,
      pos_center_right,
      pos_center_left,
      title = document.querySelector('title'),
      caption = document.querySelector('caption h1'),

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

      updateCenterRight = function (area_height) {
        area_height = parseInt(area_height);
        pos_center_right = window.innerHeight / 2 - area_height / 2;
        area_center_right.style.right = '20px';
        area_center_right.style.top = pos_center_right + 'px';
      },

      updateCenterLeft = function (area_height) {
        area_height = parseInt(area_height);
        pos_center_left = window.innerHeight / 2 - area_height / 2;
        area_center_left.style.left = '20px';
        area_center_left.style.top = pos_center_left + 'px';
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

    data.setMessage('title', title).set('caption_message', caption).set('opacity_message', opacity_message).set('speed_message', speed_message).set('areas_message', area_message);
    speed_message.appendChild(speed_output);

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
    });

    return {

      findImg: function (node) {
        var img = node.querySelector('img');
        return img.src;
      },

      getImageHeight: function (node) {
        var img = node.querySelector('img');
        return img.height;
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
      setCenterLeft: setCenterLeft,
      setCenterBottom: setCenterBottom,
      updateCenterLeft: updateCenterLeft,
      updateCenterRight: updateCenterRight

    };
  }(opt.Model));

  return opt;

}(OPTIONS || {}));
