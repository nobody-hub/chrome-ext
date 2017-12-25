$(function () {
    $('#search').change(function () {
        $('#bookmarks').empty();
        dumpBookmarks($('#search').val());
    });
    dumpBookmarks();
});

function dumpBookmarks(query) {
    chrome.bookmarks.getTree(function (bookmarkNodes) {
        var list = dumpTreeNodes(bookmarkNodes, query);
        $('#bookmarks').append(list);
    });
}

function dumpTreeNodes(bookmarkNodes, query) {
    var list = $('<ul>');
    for (var i = 0; i < bookmarkNodes.length; i++) {
        list.append(dumpNode(bookmarkNodes[i], query));
    }
    return list;
}

function dumpNode(bookmarkNode, query) {
    var $span = $('<span>');
    if (bookmarkNode.title) {
        if (query && !bookmarkNode.children) {
            if (String(bookmarkNode.title).indexOf(query) === -1) {
                return $('<span></span>');
            }
        }
        var $anchor = $('<a>');
        $anchor.attr('href', bookmarkNode.url);
        $anchor.text(bookmarkNode.title);
        $anchor.click(function () {
            chrome.tabs.create({url: bookmarkNode.url});
        });
        var $options = bookmarkNode.children ?
            $('<span>[<a href="#" id="addlink">Add</a>]</span>') :
            $('<span>[<a href="#" id="editlink">Edit</a> <a href="#" id="deletelink">Delete</a>]</span>');
        var $edit = bookmarkNode.children ?
            $('<table><tr><td>Name</td><td><input id="title" placeholder="Title"></td></tr><tr><td>URL</td><td><input id="url" placeholder="URL"></td></tr></table>') :
            $('<input>');
        $span.hover(function(){
            $span.append($options);
            $('#deletelink').click(function(){
                $('#deletedialog').empty().dialog({
                    autoOpen:true,
                    title:'Confirm Deletion',
                    resizable:false,
                    height:140,
                    modal:true,
                    overlay: {
                        backgroundColor:'#000',
                        opacity:0.5
                    },
                    buttons: {
                        'Yes, Delete It': function() {
                            chrome.bookmarks.remove(String(bookmarkNode.id));
                            $span.parent().remove();
                            $(this).dialog('destroy');
                        },
                        Cancel: function() {
                            $(this).dialog('destroy');
                        }
                    }
                }).dialog('open');
            });
            $('#addlink').click(function(){
                $('#adddialog').empty().append($edit).dialog({
                    autoOpen:false,
                    closeOnEscape: true,
                    title: 'Add New Bookmark',
                    modal:'true',
                    buttons: {
                        'Add': function() {
                            chrome.bookmarks.create({
                                parentId:bookmarkNode.id,
                                title:$('#title').val(),
                                url:$('#url').val()
                            });
                            $('#bookmarks').empty();
                            $(this).dialog('destroy');
                            window.dumpBookmarks();
                        },
                        'Cancel': function() {
                            $(this).dialog('destroy');
                        }
                    }
                }).dialog('open');
            });
            $('#editlink').click(function() {
                $edit.val($anchor.text());
                $('#editdialog').empty().append($edit).dialog({
                    autoOpen:false,
                    show:'slide',
                    buttons:{
                        'Save':function() {
                            chrome.bookmarks.update(String(bookmarkNode.id), {
                                title: $edit.val()
                            });
                            $anchor.val($edit.val());
                            $options.show();
                            $(this).dialog('destroy');
                        },
                        'Cancel':function(){
                            $(this).dialog('destroy');
                        }
                    }
                }).dialog('open');
            });
            $options.fadeIn();
        },function(){
            $options.remove();
        }).append($anchor);
    }
    var $li = $(bookmarkNode.title ? '<li>' : '<div>').append($span);
    if (bookmarkNode.children && bookmarkNode.children.length > 0) {
        $li.append(dumpTreeNodes(bookmarkNode.children, query));
    }
    return $li;
}

//
// document.addEventListener('DOMContentLoaded', function(){
//     dumpBookmarks();
// });