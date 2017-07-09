/*класс Scroller реализует основную логику расширения*/
var Scroller = function () {
  var self = this;//алиас this
  this.enabled = false;// логическая переменная управляет включением/отключением прокрутки на странице
  /*объект обсервера; рассылает уведомления графическим контроллерам (BrowserAction, ContextMenu)
   * и контроллеру хоткеев
   * */
  this.ui_updater = new Event();

  this.ui_updater.//подписка scroller на рассылку уведомлений
    addListener(self.updateContextMenu, self).
    addListener(self.changeStatus, self).
    addListener(self.sendQuery, self);

  chrome.contextMenus.create({//создание контекстного меню
    id: "toggle",// идентификатор меню; необходим для метода обновления меню
    title: "Disabled",//название пункта меню
    contexts: ["all"],// контекст опредедяет при щелчке правой кнопкой мыши над какими элементами страницы в контекстном меню отображается созданный пункт меню
    onclick: function (info, tab) {//коллбэк - срабатывает при щелчке на пункте меню
      self.ui_updater.fire();//вызов методов подписчиков
    }
  });
};

Scroller.prototype = {
  constructor: Scroller,

  updateContextMenu: function () {//обновление пункта меню
    var self = this;//алиас this
    var toggle = this.enabled ? "Disabled" : "Enabled";//текстовая переменная, зависящая от переменной enabled; служит названием пункта меню

    chrome.contextMenus.update("toggle", {//обновить контекстное меню; toggle - идентификатор пунка меню
      title: toggle,// заголовок пункта - отображается в меню
      contexts: ["all"],//контекст
      onclick: function (info, tab) {//коллбэк - срабатывает при клике на пункте меню
        self.ui_updater.fire();//рассылка уведомлений подписчикам
      }
    });
  },

  setControl: function () {//задает поведение при клике на BrowserAction
    var self = this;//алиас this
    chrome.browserAction.onClicked.addListener(function (tab) {//срабатывает при клике на BrowserAction
      self.ui_updater.fire();//рассылка уведомлений подписчикам
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {//отправка сообщения конетентному скрипту

        chrome.tabs.sendMessage(tabs[0].id, {status: self.enabled}, function (response) {//отправляет значение логической переменной disabled
        });

      });

    });

  },

  setBadgeText: function (text) {//устанавливает надпись text на заначок BrowserAction
    chrome.browserAction.setBadgeText({text: text});
  },

  setIcon: function (path) {//устанавливает иконку для BrowserAction, находящуюся по пути path
    chrome.browserAction.setIcon({path: path});
  },

  changeStatus: function () {//инверсия переменной enabled
    if (!this.enabled) {//если enabled = false
      this.enabled = true;//инвертировать в true
      this.setBadgeText("on");//изменить надпись на BrowserAction на "on"
      this.setIcon("../img/16.png");//сменить иконку BrowserAction
    }

    else if (this.enabled) {//если enable = true
      this.enabled = false;//инвертировать в false
      this.setBadgeText("off");//изменить надпись на BrowserAction на "off"
      this.setIcon("../img/16_red.png");//сменить иконку BrowserAction
    }
  },

  sendQuery: function () {
    var self = this;//алиас this
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {//отправка сообщения контентному скрипту

      chrome.tabs.sendMessage(tabs[0].id, {status: self.enabled}, function (response) {//отправка значения логической переменной enabled
      });

    });
  }

};
