var attachedTabs = {};
var version = "1.0";

chrome.debugger.onEvent.addListener(onEvent);
chrome.debugger.onDetach.addListener(onDetach);

chrome.browserAction.onClicked.addListener(function (tab) {
    var tabId = tab.id;
    var debugee = {tabId: tabId};
    if(attachedTabs[tabId] === 'pausing') {
        return;
    }
    if(!attachedTabs[tabId]) {
        chrome.debugger.attach(debugee, version, () => onAttach(debugee));
    } else if(attachedTabs[tabId]) {
        chrome.debugger.detach(debugee, () => onDetach(debugee))
    }
})

function onAttach(debugee) {
    if(chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }
    var tabId = debugee.tabId;
    chrome.browserAction.setIcon({
        tabId: tabId,
        path: "pausing.png"
    });
    chrome.browserAction.setTitle({
        tabId: tabId,
        title: "Pausing Javascript"
    });

    attachedTabs[tabId] = "pausing";
    chrome.debugger.sendCommand(
        debugee, "Debugger.enable", {}, () => onDebuggerEnable(debugee)
    )
}

function onDetach(debugee) {
    var tabId = debugee.tabId;
    delete attachedTabs[tabId];
    chrome.browserAction.setIcon({
        tabId: tabId,
        path: "pause.png"
    });
    chrome.browserAction.setIcon({
        tabId: tabId,
        title: "Pause JavaScript"
    })
}

function onDebuggerEnable(debugee) {
    chrome.debugger.sendCommand(debugee, "Debugger.pause");
}

function onEvent(debugee, method){
    var tabId = debugee.tabId;
    if (method === "Debugger.paused") {
        attachedTabs[tabId] = "paused";
        chrome.browserAction.setIcon({tabId:tabId, path:"continue.png"});
        chrome.browserAction.setTitle({tabId:tabId, title:"Resume JavaScript"});
    }
}
