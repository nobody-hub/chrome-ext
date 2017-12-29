chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.debugger.attach({
        tabId: tab.id
    }, version, () => onAttach(tab.id))
});

var version = "1.0";

function onAttach(tabId) {
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }
    chrome.windows.create({
        url: "header.html?" + tabId,
        type: "popup",
        width: 800,
        height: 600
    });
}