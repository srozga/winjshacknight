/* Copyright (c) 2013 Szymon Rozga
 *
 * See the file LICENSE.txt for copying permission. */
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll().then(function () {
                setupListView();
                setupToggleButtons();
            }));
        }
    };

    function setupToggleButtons() {
        $('#toggleListLayout').click(function () {
            toggleToListLayout();
        });
        $('#toggleGridLayout').click(function () {
            toggleToGridLayout();
        });
    }

    function setupListView() {
        var lv = $('#listview')[0].winControl;
        var arr = range(1,100).map(function (i) { return { itemTitle: 'item ' + i }; });
        var data = new WinJS.Binding.List(arr);

        lv.itemDataSource = data.dataSource;

        lv.oniteminvoked = function (ev) {
            ev.detail.itemPromise.done(function (item) {
                $('#selectionOrInvokeMessage').text(item.data.itemTitle + ' invoked');
            });
        };

        lv.onselectionchanged = function () {
            lv.selection.getItems().done(function (items) {
                $('#selectionOrInvokeMessage').text(items.length + ' items selected');
            });
        };
    }

    function range(min, max) {
        var result = [];
        for (var i = min; i <= max; i++) {
            result.push(i);
        }
        return result;
    }

    function toggleToListLayout() {
        var lv = $('#listview')[0].winControl;
        lv.itemTemplate = $('#listLayoutItemTemplate')[0];
        lv.layout = new WinJS.UI.ListLayout();
    }

    function toggleToGridLayout() {
        var lv = $('#listview')[0].winControl;
        lv.itemTemplate = $('#gridLayoutItemTemplate')[0];
        lv.layout = new WinJS.UI.GridLayout();
    }


    app.start();
})();
