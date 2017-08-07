var range = document.querySelector('input[type=range]');
console.log(range.value);
range.oninput = function () {
  panel.setOpacity(this.value);
  console.log(this.value);
};
