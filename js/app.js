(function () {
  "use strict";

  var config = window.LANDING_CONFIG || {};
  var toast = document.getElementById("toast");
  var toastTimer;

  document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  applyOfferConfig();
  configureCheckoutButtons();
  configureOfferTracking();
  configureFaqTracking();

  function applyOfferConfig() {
    var price = String(config.price || "").trim();
    var comparePrice = String(config.comparePrice || "").trim();

    if (!price) return;

    document.querySelectorAll("[data-price-block]").forEach(function (element) {
      element.hidden = false;
    });
    document.querySelectorAll("[data-price]").forEach(function (element) {
      element.textContent = price;
    });
    document.querySelectorAll("[data-compare-price]").forEach(function (element) {
      element.textContent = comparePrice ? "Regular " + comparePrice : "";
      element.hidden = !comparePrice;
    });
    document.querySelectorAll("[data-mobile-price]").forEach(function (element) {
      element.textContent = price + " • ONE TIME";
    });
  }

  function configureCheckoutButtons() {
    document.querySelectorAll("[data-checkout]").forEach(function (button) {
      button.addEventListener("click", function () {
        var value = numericPrice(config.price);
        window.trackLandingEvent("InitiateCheckout", {
          content_name: config.productName || "30-Day Dinner Bundle",
          content_ids: ["30-day-dinner-bundle"],
          content_type: "product",
          currency: config.currency || "USD",
          value: value
        }, { standard: true });

        if (!String(config.checkoutUrl || "").trim()) {
          showToast("Your English Cakto checkout still needs to be added in js/config.js.");
          return;
        }

        window.location.href = withAttribution(config.checkoutUrl);
      });
    });
  }

  function configureOfferTracking() {
    var offer = document.getElementById("offer");
    if (!offer || !("IntersectionObserver" in window)) return;

    var fired = false;
    var observer = new IntersectionObserver(function (entries) {
      if (fired || !entries.some(function (entry) { return entry.isIntersecting; })) return;
      fired = true;
      window.trackLandingEvent("ViewContent", {
        content_name: config.productName || "30-Day Dinner Bundle",
        content_ids: ["30-day-dinner-bundle"],
        content_type: "product",
        currency: config.currency || "USD",
        value: numericPrice(config.price)
      }, { standard: true });
      observer.disconnect();
    }, { threshold: .25 });

    observer.observe(offer);
  }

  function configureFaqTracking() {
    document.querySelectorAll("details").forEach(function (detail, index) {
      detail.addEventListener("toggle", function () {
        if (!detail.open) return;
        window.trackLandingEvent("FaqOpened", { question_number: index + 1 });
      });
    });
  }

  function withAttribution(url) {
    var target = new URL(url, window.location.href);
    var current = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "sck"].forEach(function (key) {
      if (current.has(key) && !target.searchParams.has(key)) target.searchParams.set(key, current.get(key));
    });
    return target.toString();
  }

  function numericPrice(price) {
    var normalized = String(price || "").replace(/[^\d.,-]/g, "").replace(/,/g, "");
    var value = Number(normalized);
    return Number.isFinite(value) ? value : 0;
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 4200);
  }
})();

