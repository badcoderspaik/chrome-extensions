//scroll page
var body = document.body,
  all = $("*");

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    var status = request.status;
    function scrollMode(event) {
      var scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        ),
        step = Math.floor(scrollHeight / window.innerHeight);
      body.scrollTop = (event.clientY) * step;
    }

    if (status) {
      all.on("mousemove.scroll", scrollMode);
    }

    else if (!status) {
      all.off("mousemove.scroll");
    }
  });