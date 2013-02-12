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
                $('#url').val('http://finance.yahoo.com/d/quotes.csv?s=AAPL+GOOG+MSFT&f=snl1d1t1c1hgw');


                $('#go').click(function () {
                    var uri = encodeURI($('#url').val());

                    WinJS.xhr({ url: uri }).done(function (result) {
                        $('#result').val(result.response);
                    });
                });
            }));
        }
    };
    app.start();
})();
