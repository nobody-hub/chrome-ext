var numIcons = 5;
var curIcon = 1;

function updateIcon() {
    chrome.browserAction.setIcon({
        path: 'icon' + curIcon + '.png'
    });
    curIcon++;
    if(curIcon > numIcons) {
        curIcon = 1;
    }
}
chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();


