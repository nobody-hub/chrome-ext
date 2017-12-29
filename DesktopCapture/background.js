chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('index.html', {
        bounds: {
            width: 1080,
            height: 550
        }
    })
});

chrome.runtime.onMessage.addListener(function (message, sender, sendReponse) {
    chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], function (id) {
        sendReponse({id: id});
    })
});