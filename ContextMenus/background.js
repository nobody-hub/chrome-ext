function genericOnClick(info, tab) {
    console.log('item' + info.menuItemId + ' was clicked');
    console.log('info' + JSON.stringify(info));
    console.log('tab' + JSON.stringify(tab));
}

var contexts = [
    "page",
    "selection",
    "link",
    "editable",
    "image",
    'video',
    "audio"
];
contexts.forEach(function (context) {
    var title = 'Test "' + context + '" menu item';
    var id = chrome.contextMenus.create({
        "title": title,
        "contexts": [context],
        "onclick": genericOnClick
    });
    console.log("'" + context + "' item: " + id);
});

var parent = chrome.contextMenus.create({
    title: "Test Parente Item"
});
var child1 = chrome.contextMenus.create({
    title: "Child 1",
    parentId: parent,
    onclick: genericOnClick
});

var child2 = chrome.contextMenus.create({
    title: "Child2",
    parentId: parent,
    onclick: genericOnClick
});

console.log('parent: ' + parent + 'child1:' + child1 + 'child2:' + child2);

function radioOnClick(info, tab) {
    console.log(JSON.stringify(info));
    console.log("checked item " + info.menuItemId + " was clicked, " +
        "state is now: " + info.checked +
        '(previous state was ' + info.wasChecked + " )");
}

var radio1 = chrome.contextMenus.create({
    title: "radio 1",
    type: "radio",
    onclick: radioOnClick
});

var radio2 = chrome.contextMenus.create({
    title: "radio 2",
    type: "radio",
    onclick: radioOnClick
});

function checkboxOnClick(info, tab) {
    console.log(JSON.stringify(info));
    console.log("checkbox item" + info.menuItemId +
        "was clicked, state is now: " + info.checked +
        "(previous state was" + info.wasChecked + ")");
}

var checkbox1 = chrome.contextMenus.create({
    title: "CheckBox1",
    type: "checkbox",
    onclick: checkboxOnClick
});

var checkbox2 = chrome.contextMenus.create({
    title: "CheckBox2",
    type: "checkbox",
    onclick: checkboxOnClick
});

console.log("About to try creating an invalid item - an error about " +
    "item 999 should show up");

chrome.contextMenus.create({
    "title": "Oops", "parentId": 999
}, function () {
    if (chrome.extension.lastError) {
        console.log("Got expected error: " + chrome.extension.lastError.message);
    }
});
