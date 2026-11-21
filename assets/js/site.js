/* PRS Shangrila – shared behaviour.
   1. Builds the header and footer from data/site.js (single source for every page).
   2. Theme toggle (light default, choice remembered).
   3. Renders data-driven blocks: any element with data-render="<name>" is filled by RENDERERS[name].
   4. Click-to-enlarge photos (native <dialog>).
   To add a new block type: add a function to RENDERERS and put <div data-render="name"></div> in a page.
   Data lives in /data as plain .js files (not JSON) so pages also work when opened straight from a folder. */
(function () {
  "use strict";
  var SITE = window.PRS_SITE || {}, DATA = window.PRS_CONTENT || {};
  var doc = document, root = doc.documentElement;
  /* The 404 page can be served from any folder depth, so it sets <meta name="site-root" content="/"> and all links get that prefix. */
  var rm = doc.querySelector('meta[name="site-root"]'), R = rm ? rm.content : "";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  /* Only http(s), mailto, tel and relative URLs are allowed in data-driven links. Anything else (e.g. javascript:) becomes "#". */
  function safe(url) {
    var u = String(url == null ? "" : url).trim();
    return /^(https?:|mailto:|tel:)/i.test(u) || !/^[a-z][a-z0-9+.-]*:/i.test(u) ? u : "#";
  }
  function ext(href) { return /^https?:/i.test(String(href).trim()) ? ' target="_blank" rel="noopener noreferrer"' : ""; }
  function page() { var p = location.pathname.split("/").pop(); return p || "index.html"; }
  function ml(t) { return t ? '<span class="ml ml-line" lang="ml">' + esc(t) + "</span>" : ""; }

  var C = SITE.contact || {};
  function waUrl() { return "https://wa.me/" + String(C.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(SITE.whatsappText || ""); }
  /* Call and WhatsApp buttons; WhatsApp is hidden when no number is set. */
  function actions(extra) {
    return '<div class="btn-row">' +
      '<a class="btn" href="tel:' + esc(C.phoneTel) + '">Call ' + esc(C.phoneDisplay) + ' <span lang="ml">വിളിക്കുക</span></a>' +
      (C.whatsapp ? '<a class="btn wa" href="' + esc(waUrl()) + '" target="_blank" rel="noopener noreferrer">WhatsApp <span lang="ml">വാട്സ്ആപ്പ്</span></a>' : "") +
      (extra || "") + "</div>";
  }

  /* ---------- Header and footer ---------- */
  function buildHeader() {
    var el = doc.getElementById("site-header");
    if (!el) return;
    var cur = page();
    var links = (SITE.nav || []).map(function (n) {
      return '<a href="' + R + esc(safe(n.href)) + '"' + (n.href === cur ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a>";
    }).join("");
    el.innerHTML =
      '<header class="site"><div class="wrap bar">' +
      '<a class="brand" href="' + R + 'index.html" aria-label="' + esc(SITE.name) + ', home"><span class="wm"><span class="wm-prs">PRS</span><span class="wm-name">shangrila</span></span><span class="wm-sub">' + esc(SITE.tagline) + "</span></a>" +
      '<button class="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav">Menu</button>' +
      '<nav class="main" id="main-nav" aria-label="Main">' + links +
      '<button class="theme" id="theme" type="button" aria-label="Switch to dark theme"><span aria-hidden="true" id="ticon">☾</span><span id="tlabel">Dark</span></button>' +
      "</nav></div></header>";
    var btn = doc.getElementById("menu-btn"), nav = doc.getElementById("main-nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    });
    initTheme();
  }

  function buildFooter() {
    var el = doc.getElementById("site-footer");
    if (!el) return;
    var nav = (SITE.nav || []).map(function (n) { return '<li><a href="' + R + esc(safe(n.href)) + '">' + esc(n.label) + "</a></li>"; }).join("");
    el.innerHTML =
      '<footer class="site"><div class="wrap foot">' +
      "<div><h3>" + esc(SITE.name) + "</h3><p>" + (C.addressLines || []).map(esc).join("<br>") + "</p></div>" +
      "<div><h3>Contact</h3><ul><li>Phone: <a href=\"tel:" + esc(C.phoneTel) + '">' + esc(C.phoneDisplay) + "</a></li>" +
      (C.whatsapp ? '<li><a href="' + esc(waUrl()) + '" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>' : "") +
      (C.email ? '<li>Email: <a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li>" : "") +
      '<li><a href="' + esc(safe(C.mapUrl)) + '" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></li></ul></div>' +
      "<div><h3>Explore</h3><ul>" + nav + "</ul></div>" +
      '<div><h3>Renting?</h3><p>No brokers, please. Contact us directly.<span class="ml ml-line" lang="ml">ബ്രോക്കർമാർ വേണ്ട. നേരിട്ട് ബന്ധപ്പെടുക.</span></p></div></div>' +
      '<div class="wrap legal">© ' + new Date().getFullYear() + " " + esc(SITE.name) + '. <a href="' + R + 'privacy.html">Privacy</a></div></footer>';
  }

  /* ---------- Theme ---------- */
  function initTheme() {
    var btn = doc.getElementById("theme");
    if (!btn) return;
    function paint() {
      var d = root.getAttribute("data-theme") === "dark";
      btn.setAttribute("aria-label", d ? "Switch to light theme" : "Switch to dark theme");
      doc.getElementById("ticon").textContent = d ? "☀" : "☾";
      doc.getElementById("tlabel").textContent = d ? "Light" : "Dark";
    }
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("prs-theme", next); } catch (e) { /* ignore */ }
      paint();
    });
    paint();
  }

  /* ---------- Responsive pictures ---------- */
  /* Image files are named <base>-<width>.avif and <base>-<width>.webp. AVIF first, WebP as the fallback. */
  function pic(it, sizes, lazy) {
    var widths = it.widths || [800];
    var set = function (fmt) {
      return widths.map(function (x) { return esc(safe(it.image)) + "-" + x + "." + fmt + " " + x + "w"; }).join(", ");
    };
    var mid = widths[widths.length - 1];
    return '<picture><source type="image/avif" srcset="' + set("avif") + '" sizes="' + esc(sizes) + '">' +
      '<source type="image/webp" srcset="' + set("webp") + '" sizes="' + esc(sizes) + '">' +
      '<img src="' + esc(safe(it.image)) + "-" + mid + '.webp" width="' + it.w + '" height="' + it.h + '" alt="' + esc(it.alt) + '"' +
      (lazy === false ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"></picture>';
  }
  function zoom(it, sizes, label, lazy) {
    var full = (it.widths || [800])[(it.widths || [800]).length - 1];
    return '<button type="button" class="zoom" data-zoom data-full="' + esc(safe(it.image)) + "-" + full + '.webp" aria-label="Enlarge photo: ' + esc(label) + '">' + pic(it, sizes, lazy) + "</button>";
  }

  /* ---------- Click-to-enlarge photos (native <dialog>) ---------- */
  function initLightbox() {
    var dlg = null, img, cap, last = null;
    function build() {
      dlg = doc.createElement("dialog");
      dlg.className = "lightbox";
      dlg.setAttribute("aria-label", "Enlarged photo");
      dlg.innerHTML = '<button type="button" class="lb-close" aria-label="Close enlarged photo">×</button><img class="lb-img" alt=""><p class="lb-cap"></p>';
      doc.body.appendChild(dlg);
      img = dlg.querySelector(".lb-img");
      cap = dlg.querySelector(".lb-cap");
      dlg.querySelector(".lb-close").addEventListener("click", function () { dlg.close(); });
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
      dlg.addEventListener("close", function () { if (last) last.focus(); });
    }
    doc.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-zoom]") : null;
      if (!b) return;
      var thumb = b.querySelector("img");
      if (!doc.createElement("dialog").showModal) { window.open(b.getAttribute("data-full"), "_blank", "noopener"); return; }
      if (!dlg) build();
      last = b;
      img.src = b.getAttribute("data-full");
      img.alt = thumb ? thumb.alt : "";
      cap.textContent = thumb ? thumb.alt : "";
      dlg.showModal();
    });
  }

  /* ---------- Data-driven blocks ---------- */
  var RENDERERS = {
    facts: function (el) {
      el.className = "stats";
      el.innerHTML = (DATA.facts || []).map(function (f) { return "<li><b>" + esc(f.value) + "</b><span>" + esc(f.text) + "</span></li>"; }).join("");
    },
    facilities: function (el) {
      el.className = "grid fit";
      el.innerHTML = (DATA.facilities || []).map(function (f) {
        return '<article class="card fac">' + (f.image ? zoom(f, "(min-width: 700px) 380px, 92vw", f.title) : "") +
          "<div><h3>" + esc(f.title) + "</h3>" + ml(f.ml) + "<p>" + esc(f.text) + "</p></div></article>";
      }).join("");
    },
    nearby: function (el) {
      el.innerHTML = '<ul class="checks">' + (DATA.nearby || []).map(function (n) {
        return "<li><span>" + esc(n.place) + (n.ml ? '<small lang="ml" class="ml">' + esc(n.ml) + "</small>" : "") + "</span></li>";
      }).join("") + "</ul>";
    },
    gallery: function (el) {
      var n = parseInt(el.getAttribute("data-limit"), 10) || 99;
      el.innerHTML = '<ul class="gallery">' + (DATA.gallery || []).slice(0, n).map(function (g) {
        return "<li><figure>" + zoom(g, "(min-width: 700px) 300px, 92vw", g.caption) + "<figcaption>" + esc(g.caption) + "</figcaption></figure></li>";
      }).join("") + "</ul>";
    },
    vacancies: function (el) {
      var v = DATA.vacancies || {}, items = v.items || [];
      if (!items.length) {
        el.innerHTML = '<div class="card"><h3>No apartments are listed as vacant right now</h3>' +
          "<p>Availability changes often. Please call or send a WhatsApp message to check for a vacancy.</p>" +
          '<p class="ml" lang="ml">ഒഴിവുകൾ അറിയാൻ വിളിക്കുകയോ വാട്സ്ആപ്പ് ചെയ്യുകയോ ചെയ്യുക.</p>' + actions() + "</div>";
        return;
      }
      el.innerHTML = (v.asOf ? '<p class="lead">Availability as of ' + esc(v.asOf) + ".</p>" : "") +
        '<div class="grid">' + items.map(function (i) {
          return '<article class="card"><h3>' + esc(i.unit || "Apartment") + "</h3><ul class=\"checks\">" +
            (i.floor ? "<li>Floor: " + esc(i.floor) + "</li>" : "") + (i.bedrooms ? "<li>Bedrooms: " + esc(i.bedrooms) + "</li>" : "") +
            (i.area ? "<li>Area: " + esc(i.area) + "</li>" : "") + (i.rent ? "<li>Rent: " + esc(i.rent) + "</li>" : "") +
            (i.note ? "<li>" + esc(i.note) + "</li>" : "") + "</ul></article>";
        }).join("") + "</div>" + actions();
    },
    notices: function (el) {
      var list = DATA.notices || [];
      var limit = parseInt(el.getAttribute("data-limit"), 10) || 99;
      if (!list.length && el.hasAttribute("data-hide-empty")) {
        /* e.g. on the home page: show nothing at all when there are no notices */
        var sec = el.closest("section");
        if (sec) sec.parentNode.removeChild(sec);
        return;
      }
      if (!list.length) {
        el.innerHTML = '<div class="card"><h3>No current notices</h3><p>Notices for residents and tenants will be posted here.</p><p class="ml" lang="ml">അറിയിപ്പുകൾ ഇവിടെ പ്രസിദ്ധീകരിക്കും.</p></div>';
        return;
      }
      el.innerHTML = '<ul class="list">' + list.slice(0, limit).map(function (n) {
        return "<li><span><b>" + esc(n.title) + "</b>" + (n.text ? "<br><small>" + esc(n.text) + "</small>" : "") + "</span><small>" + esc(n.date) + "</small></li>";
      }).join("") + "</ul>";
    },
    faq: function (el) {
      el.className = "faq";
      el.innerHTML = (DATA.faq || []).map(function (f) {
        return "<details><summary>" + esc(f.q) + (f.ml ? '<span class="ml ml-line" lang="ml">' + esc(f.ml) + "</span>" : "") + '</summary><div class="ans"><p>' + esc(f.a) + "</p>" +
          (f.mla ? '<p class="ml" lang="ml">' + esc(f.mla) + "</p>" : "") + "</div></details>";
      }).join("");
    },
    "call-actions": function (el) { el.innerHTML = actions(); },
    "facility-list": function (el) {
      el.innerHTML = '<ul class="checks">' + (DATA.facilities || []).map(function (f) {
        return "<li><span>" + esc(f.title) + (f.ml ? '<small lang="ml" class="ml">' + esc(f.ml) + "</small>" : "") + "</span></li>";
      }).join("") + "</ul>";
    },
    "map-link": function (el) {
      el.innerHTML = '<p class="mt-16"><a class="btn alt" href="' + esc(safe(C.mapUrl)) + '" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>';
    },
    "call-strip": function (el) {
      el.innerHTML = '<div class="callstrip"><div><h2>Looking to rent? <span lang="ml">വാടകയ്ക്ക് അപ്പാർട്ട്മെന്റ്?</span></h2>' +
        "<p>Call or message us directly. No brokers, please.</p></div>" + actions() + "</div>";
    },
    contact: function (el) {
      el.className = "grid fit";
      el.innerHTML = '<div class="card"><h3>Address</h3><p>' + (C.addressLines || []).map(esc).join("<br>") + '</p><p><a href="' + esc(safe(C.mapUrl)) + '" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p></div>' +
        '<div class="card"><h3>Call or message</h3><p>Phone: <a href="tel:' + esc(C.phoneTel) + '">' + esc(C.phoneDisplay) + "</a></p>" +
        "<p>Calls from outside India: dial the number above with +91. Time zone: Indian Standard Time (UTC+5:30).</p>" + actions() + "</div>" +
        (C.email ? '<div class="card"><h3>Email</h3><p><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></p></div>" : "");
    }
  };

  function renderAll() {
    var nodes = doc.querySelectorAll("[data-render]");
    for (var i = 0; i < nodes.length; i++) {
      var fn = RENDERERS[nodes[i].getAttribute("data-render")];
      if (fn) fn(nodes[i]);
    }
  }

  buildHeader();
  buildFooter();
  renderAll();
  initLightbox();
})();
