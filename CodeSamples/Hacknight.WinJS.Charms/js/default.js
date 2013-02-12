/* Copyright (c) 2013 Szymon Rozga
 *
 * See the file LICENSE.txt for copying permission. */
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    function doSearch(term) {
        $('#searchResult').text('Searching for term: ' + term)
    }
    function doLaunchSearch(term) {
        $('#searchResult').text('Searching on launch for term: ' + term)
    }

    function doSuggestions(term) {
        $('#searchResult').text('Getting suggestions for term: ' + term)
    }

    function hookupCharms() {
        Windows.ApplicationModel.Search.SearchPane.getForCurrentView().onquerysubmitted = function (ev) {
            doSearch(ev.queryText);
        };
        Windows.ApplicationModel.Search.SearchPane.getForCurrentView().onquerychanged = function (ev) {
            doSuggestions(ev.queryText);
        };

        var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
        
        dtm.ondatarequested = function (ev) {
            var request = ev.request;
            request.data.properties.title = "Share Text Example";
            request.data.properties.description = "A demonstration that shows how to share.";
            var val = $('#texttoshare').val();
            request.data.setText(val);
        };
    }

    app.onactivated = function (args) {

        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll().then(function () {
                hookupCharms();
            }));
        } else if (args.detail.kind === activation.ActivationKind.search) {
            args.setPromise(WinJS.UI.processAll().then(function () {
                hookupCharms();
                doLaunchSearch(args.detail.queryText);
            }));
        }
    };
    app.start();
})();
