// usage: phantomjs this_file url file.out [width height]

var page = require('webpage').create(),
    system = require('system'),
    w = 1024, h = 2000,
    address, output, size;

    address = system.args[1];
    output = system.args[2];
    page.viewportSize = { width: w, height: h };
    page.clipRect = { width: w, height: h };
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
		console.log(page.title);
		var data = page.evaluate(function () {
		    return {
			docHeight: document.height,
			excerpt: document.getElementsByTagName("p")[0]
		    };
		});
		if (typeof data.excerpt !== "undefined") {
		    console.log(' - ' + data.excerpt.textContent);
		}
		page.clipRect.height = Math.min(data.docHeight, h);
                page.render(output);
                phantom.exit();
            }, 200);
        }
    });
