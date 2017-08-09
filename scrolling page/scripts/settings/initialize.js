var OPTIONS = (function (opt) {
  chrome.storage.sync.get(function (items) {
    var src = items.src || chrome.runtime.getURL('img/arrows/simple.png'),
      areas = opt.View.getAreas(),
      range = opt.View.getRange(),
      opacity = items.opacity || 0.2,
      a_length = areas.length,
      areas_height = items.area_height || 105,
      i;

    for (i = 0; i < a_length; i++) {
      areas[i].style.height = areas_height;
    }

    panel.arrow_up.setSrc(src);
    panel.arrow_down.setSrc(src);
    panel.setOpacity(opacity);
    range.value = items.opacity || 0.5;
  });
}(OPTIONS || {}));