chrome.browserAction.onClicked.addListener(function (tab) {
    var actionUrl = "javascript:window.print();";
    chrome.tabs.update(tab.id, {
        url: actionUrl
    });
});
