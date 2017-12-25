chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('Turning ' +tab.title+' to red');
    chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
    });
});