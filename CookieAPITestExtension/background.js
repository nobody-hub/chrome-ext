chrome.cookies.onChanged.addListener(function (info) {
    console.log('onChanged' + JSON.stringify(info));
});


function focusOrCreateTab(url) {
    chrome.windows.getAll({
        'populate': true
    }, function (windows) {
        let existingTab = null;
        for (let i in windows) {
            let tabs = windows[i].tabs;
            for (let j in tabs) {
                let tab = tabs[j];
                if (tab.url === url) {
                    existingTab = tab;
                    break;
                }
            }
        }
        if (existingTab) {
            chrome.tabs.update(existingTab.id, {
                selected: true
            })
        } else {
            chrome.tabs.create({
                url: url,
                selected: true
            })
        }
    });
}

chrome.browserAction.onClicked.addListener(function (tab) {
    let managerUrl= chrome.extension.getURL('manager.html');
    focusOrCreateTab(managerUrl);
});

