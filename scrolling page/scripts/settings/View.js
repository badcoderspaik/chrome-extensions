var OPTIONS = (function (opt) {

  opt.View = (function (data) {
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
  }(opt.Model));

  return opt;

}(OPTIONS || {}));
