function clickDiv(e) {
    if ($(e.target).attr('id') === 'reset') {
        chrome.tabs.executeScript({
            code: '$("body").css("background-color", "initial")'
        });
    } else {
        chrome.tabs.executeScript({
            code: '$("body").css("background-color", "' + $(e.target).attr('id') + '")'
        });
    }
    window.close();
}

$(function () {
    var $div = $('div');
    for (var i = 0; i < $div.length; i++) {
        $($div[i]).click(clickDiv);
    }
});