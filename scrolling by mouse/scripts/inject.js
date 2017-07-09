//scroll page

var scroll = new Scroller();//объект главного класса расширения
scroll.setIcon("../img/16_red.png");//установить иконку BrowserAction
scroll.setBadgeText("off");//установить надпись на BrowserAction
scroll.setControl();//задать поведение при клике на BrowserAction

chrome.commands.onCommand.addListener(function(command) {//задать слушателя на нажтия хоткеев
  scroll.ui_updater.fire();//уведомить подписчиков
});