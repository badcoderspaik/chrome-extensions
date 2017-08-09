var OPTIONS = (function (opt) {

  opt.Controller = (function (data, view) {
    var cells = view.getCells(),
      areas = view.getAreas(),
      range = view.getRange(),
      c_length = cells.length,
      a_length = areas.length,
      panel_height,
      i;

    for (i = 0; i < c_length; i++) {
      cells[i].onmousedown = function () {
        this.style.outline = '1px solid blue';
        data.setSrc(view.findImg(this));
        panel_height = getComputedStyle(panel.getElement()).height;
        data.setAreaHeight(panel_height);
        console.log(data.getAreaHeight());
        chrome.storage.sync.get(function (items) {
          if (items.position === 'center_right' || items.position === 'center_left') {
            panel.resetPosition();
          }
        });

        for (i = 0; i < a_length; i++) {
          areas[i].style.height = panel_height;
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

    for (i = 0; i < a_length; i++) {
      areas[i].onclick = function () {
        data.setPosition(this.id);
      };
    }

    range.oninput = function () {
      panel.setOpacity(this.value);
    };

    range.onchange = function () {
      data.setOpacity(this.value);
    }

  }(opt.Model, opt.View));

  return opt;

}(OPTIONS || {}));

// (function () {
//   chrome.storage.sync.get(function (items) {
//     var src = items.src || chrome.runtime.getURL('img/arrows/simple.png'),
//       //position = items.position || 'bottom_right',
//       areas = OPTIONS.View.getAreas(),
//       range = OPTIONS.View.getRange(),
//       opacity = items.opacity || 0.2,
//       a_length = areas.length,
//       areas_height = items.area_height || 105,
//       i;
//
//     for (i = 0; i < a_length; i++) {
//       areas[i].style.height = areas_height;
//     }
//
//     panel.arrow_up.setSrc(src);
//     panel.arrow_down.setSrc(src);
//     panel.setOpacity(opacity);
//     range.value = items.opacity || 0.5;
//   });
//
// }());

