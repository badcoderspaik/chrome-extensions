(function (doc) {

  var options = {

    settings: {},

    columns: doc.querySelectorAll('td'),

    btn_save: doc.getElementById('btn_save'),

    message: {
      dom: doc.getElementById('message'),

      show: function () {
        var self = this;
        this.dom.style.display = 'block';
        setTimeout(function () {
          self.hide();
        }, 2000);

      },

      hide: function () {
        this.dom.style.display = 'none';
      }
    },

    bindTableEvents: function () {
      var length = this.columns.length,
        self = this,
        i = 0;

      for (; i < length; i++) {
        var column = this.columns[i];

        column.onmousedown = function () {
          this.style.outline = '1px solid blue';
          var img = this.querySelector('img'),
            src = img.src;
          panel.arrow_down.setSrc(src);
          panel.arrow_up.setSrc(src);
          self.settings.src = src;
          console.log(self.settings.src);
        };

        column.onmouseout = function () {
          this.style.outline = '';
        };

        column.onmouseup = function () {
          this.style.outline = '';
        };

      }
    },

    bindBtnSaveEvents: function () {
      var self = this;
      this.btn_save.onclick = function () {
        chrome.storage.sync.set(self.settings, function () {
          self.message.show();
        });
      };

      this.btn_save.onmousedown = function () {
        this.style.boxShadow = 'none';
        this.style.marginTop = '155px';
      };

      this.btn_save.onmouseup = function () {
        this.style.boxShadow = '';
        this.style.marginTop = '';
        //alert("success!");
      };

      this.btn_save.onmouseout = function () {
        this.style.boxShadow = '';
        this.style.marginTop = '';
      };
    },

    readSettings: function () {
      var self = this;
      chrome.storage.sync.get(function (items) {
        self.settings.src = items.src || chrome.runtime.getURL('img/arrows/simple.png');
        panel.arrow_up.setSrc(self.settings.src);
        panel.arrow_down.setSrc(self.settings.src);
      });
    },

    init: function () {
      this.readSettings();
      this.bindTableEvents();
      this.bindBtnSaveEvents();
    }
  };

  options.init();

}(document));

