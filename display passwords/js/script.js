var doc = window.document;//
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function toggle() {
  var password_fields = document.querySelectorAll("input[type = password]");

  if (password_fields.length != 0) {
    for (var i = 0, count_password_fields = password_fields.length; i < count_password_fields; i++) {
      var password_field = password_fields[i];
      password_field.addEventListener("focus", function () {
        this.type = "text";
      }, false);
      password_field.addEventListener("blur", function () {
        this.type = "password";
      }, false);

    }
  }
}

toggle();
var observer = new MutationObserver(toggle);
observer.observe(doc.documentElement, {
  childList: true,
  subtree: true
});


