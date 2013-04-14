// usage: phantomjs this_file url file.out [width height]

var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

    address = system.args[1];
    output = system.args[2];
    page.viewportSize = { width: 1024, height: 2000 };
    page.clipRect = { width: 1024, height: 2000 };
    if (system.args.length === 5) // if a resolution was supplied
    {
        var w = system.args[3], h = system.args[4];
        page.viewportSize = {
            width: w,
            height: h
        }
        page.clipRect = {
            top: 0,
            left: 0,
            width: w,
            height: h
        };
    }
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
        } else {
            window.setTimeout(function () {
                page.render(output);
                phantom.exit();
            }, 200);
        }
    });
