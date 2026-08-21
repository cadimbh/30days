(function () {
  "use strict";

  var config = window.LANDING_CONFIG || {};
  var pixelId = String(config.metaPixelId || "").trim();

  window.trackLandingEvent = function (name, params, options) {
    if (typeof window.fbq !== "function") return;
    window.fbq(options && options.standard ? "track" : "trackCustom", name, params || {});
  };

  if (!pixelId) return;

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
})();

