chrome.runtime.onInstalled.addListener(function(){
    for(let key of Object.keys(kLocales)) {
        chrome.contextMenus.create({
            id:key,
            title: kLocales[key],
            type:'normal',
            contexts:['selection']
        });
    }
});

chrome.contextMenus.onClicked.addListener(function(item, tab) {
    let url = 'https://google.' + item.menuItemId + '/search?q=' + item.selectionText;
    chrome.tabs.create({
        url:url,
        index: tab.index+1
    })
});

chrome.storage.onChanged.addListener(function(list, namespace){
    let newlyDisabled = [];
    let newlyEnabled = [];
    let currentRemoved = list.removedContextMenu.newValue;
    let oldRemoved = list.removedContextMenu.oldValue || [];
    for (let key of Object.keys(kLocales)) {
        if (currentRemoved.includes(key) && !oldRemoved.includes(key)) {
            newlyDisabled.push(key);
        } else if (oldRemoved.includes(key) && !currentRemoved.includes(key)) {
            newlyEnabled.push({
                id: key,
                title: kLocales[key]
            });
        }1
    }
    for (let locale of newlyEnabled) {
        chrome.contextMenus.create({
            id: locale.id,
            title: locale.title,
            type: 'normal',
            contexts: ['selection'],
        });
    }
    for (let locale of newlyDisabled) {
        chrome.contextMenus.remove(locale);
    }
});
