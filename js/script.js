(function () {
  "use strict";

  var root = document.documentElement;
  var THEME_KEY = "shawon-portfolio-theme";

  /* ---------------- Theme toggle ---------------- */
  function getStoredTheme() {
    try {
      return window.localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(value) {
    try {
      window.localStorage.setItem(THEME_KEY, value);
    } catch (e) {
      /* localStorage unavailable (e.g. sandboxed preview) — theme still
         works for this session via the DOM attribute below. */
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      var isLight = theme === "light";
      toggle.setAttribute("aria-pressed", String(isLight));
      toggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    }
    var metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute("content", theme === "light" ? "#eef3fb" : "#0a0e14");
    }
  }

  function initTheme() {
    var stored = getStoredTheme();
    if (stored === "dark" || stored === "light") {
      applyTheme(stored);
      return;
    }
    var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark");
  }

  initTheme();

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(next);
        storeTheme(next);
      });
    }

    /* ---------------- Mobile nav ---------------- */
    var navToggle = document.getElementById("nav-toggle");
    var mainNav = document.getElementById("main-nav");
    if (navToggle && mainNav) {
      navToggle.addEventListener("click", function () {
        var isOpen = mainNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
      });
      mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mainNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* ---------------- Footer year ---------------- */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------------- Scroll reveal ---------------- */
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealEls = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) { observer.observe(el); });
    }

    /* ---------------- Typing effect (hero role) ---------------- */
    var typeTarget = document.querySelector(".type-target");
    if (typeTarget) {
      var words = (typeTarget.getAttribute("data-words") || "")
        .split(",")
        .map(function (w) { return w.trim(); })
        .filter(Boolean);

      if (!words.length) {
        typeTarget.textContent = "";
      } else if (reduceMotion) {
        typeTarget.textContent = words[0];
      } else {
        var wordIndex = 0;
        var charIndex = 0;
        var deleting = false;
        var typeDelay = 55;
        var deleteDelay = 30;
        var holdDelay = 1400;

        function tick() {
          var current = words[wordIndex];
          if (!deleting) {
            charIndex++;
            typeTarget.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
              deleting = true;
              setTimeout(tick, holdDelay);
              return;
            }
            setTimeout(tick, typeDelay);
          } else {
            charIndex--;
            typeTarget.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
              deleting = false;
              wordIndex = (wordIndex + 1) % words.length;
              setTimeout(tick, 300);
              return;
            }
            setTimeout(tick, deleteDelay);
          }
        }
        setTimeout(tick, 500);
      }
    }
  });
})();
