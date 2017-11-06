var jsdom = require('jsdom');
var { window: win } = new jsdom.JSDOM('<!doctype html><html><body></body></html>');

global.window = win;
global.document = win.document;

(function() {
    if (!win.requestAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        win.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})();

Object.keys(win).forEach(function(key) {
    if (!(key in global)) {
        global[key] = win[key];
    }
});

