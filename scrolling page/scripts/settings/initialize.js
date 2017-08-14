var OPTIONS = (function (opt) {
  chrome.storage.sync.get(function (items) {
    var src = items.src || chrome.runtime.getURL('img/arrows/simple.png'),
      areas = opt.View.getAreas(),
      opacity_range = opt.View.getOpacityRange(),
      speed_range = opt.View.getSpeedRange(),
      speed_output = opt.View.getSpeedOutput(),
      opacity = items.opacity || 0.2,
      a_length = areas.length,
      areas_height = items.area_height || 105,
      i;

    for (i = 0; i < a_length; i++) {
      areas[i].style.height = areas_height;
    }

    panel.arrow_up.setSrc(src);
    panel.arrow_down.setSrc(src);
    console.log(panel.arrow_down.getDomElement());
    panel.setOpacity(opacity);
    opacity_range.value = items.opacity || 0.5;
    speed_range.value = items.speed || 200;
    speed_output.textContent = items.speed ? items.speed + 'px' : speed_range.value + 'px';
  });
}(OPTIONS || {}));