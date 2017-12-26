$(function () {
    window.PC = new PopupController();
});

class PopupController {
    constructor() {
        this.$button = $('#button');
        this.$timeframe = $('#timeframe');
        this.addListeners();
    }

    parseMilliseconds($timeframe) {
        var now = new Date().getTime();
        var milliseconds = {
            'hour': 60 * 60 * 1000,
            'day': 24 * 60 * 60 * 1000,
            'week': 7 * 24 * 60 * 60 * 1000,
            '4weeks': 4 * 7 * 24 * 60 * 60 * 1000
        };
        if (milliseconds[$timeframe.val()]) {
            return now - milliseconds[$timeframe.val()];
        } else if ($timeframe.val() === 'forever') {
            return 0;
        }
        return null;
    }

    addListeners() {
        this.$button.click(() => this.handleClick());
    }

    handleCallBack() {
        var $overlay = $('<div>')
            .addClass('overlay')
            .attr('role', 'alert')
            .text('Data has been Clear');
        $overlay.appendTo(document.body);
        setTimeout(function () {
            $overlay.addClass('visible');
        }, 10);
        setTimeout(function () {
            if (close === false)
                $overlay.removeClass('visible');
            else
                window.close();
        }, 4000);

        // $('#dialog').empty().text("haha").dialog({
        //     autoOpen: false,
        //     title: 'Data has been Created!',
        //     modal: true,
        //     buttons: {
        //         'Cancel': function () {
        //             $(this).dialog('destroy');
        //         }
        //     }
        // }).dialog('open');
    }

    handleClick() {
        var removal_start = this.parseMilliseconds(this.$timeframe);
        if (removal_start !== undefined) {
            this.$button.attr('disabled', 'disabled');
            this.$button.text('Clearing...');
            chrome.browsingData.remove({
                "since": removal_start
            }, {
                "appcache": true,
                "cache": true,
                "cookies": true,
                "downloads": true,
                "fileSystems": true,
                "formData": true,
                "history": true,
                "indexedDB": true,
                "localStorage": true,
                "serverBoundCertificates": true,
                "pluginData": true,
                "passwords": true,
                "webSQL": true
            }, this.handleCallBack);
        }
        console.log(this.$timeframe.val())
    }
}

