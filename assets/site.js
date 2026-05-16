/* Papino Village — shared site script. Every lookup is null-safe so the
   same file works on the home page and every subpage. */
(function () {
  "use strict";

  var byId = function (id) { return document.getElementById(id); };

  /* ---- mobile nav ---- */
  var toggle = byId('navToggle'), links = byId('navLinks'), nav = byId('nav');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav-solid', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- seasonal hero (home only) — spec §7 ---- */
  var heroSub = byId('heroSub'), hero = byId('hero');
  if (heroSub && hero) {
    var SEASON = [
      { months: [11, 0, 1], sub: "Чан в снегу. Камин. Тишина.", img: "winter" },
      { months: [2, 3, 4], sub: "Лес просыпается. Первые рассветы на террасе.", img: "spring" },
      { months: [5, 6, 7], sub: "Речка, костёр, звёздное небо.", img: "summer" },
      { months: [8, 9, 10], sub: "Золото леса. Баня. Горячий чай.", img: "autumn" }
    ];
    var mo = new Date().getMonth();
    var se = SEASON.find(function (x) { return x.months.indexOf(mo) > -1; }) || SEASON[2];
    heroSub.textContent = se.sub;
    var base = hero.getAttribute('data-img-base') || 'images/hero/';
    // Absolute URL: a relative url() inside the --hero-img custom property
    // would be resolved against the stylesheet (/assets/), not the page.
    var abs = function (n) { return new URL(base + n + '.jpg', document.baseURI).href; };
    var apply = function (n) { hero.style.setProperty('--hero-img', 'url("' + abs(n) + '")'); };
    var probe = new Image();
    probe.onload = function () { apply(se.img); };
    probe.onerror = function () { apply('summer'); };
    probe.src = abs(se.img);
  }

  /* ---- sliders ---- */
  document.querySelectorAll('[data-slider]').forEach(function (sl) {
    var track = sl.querySelector('.track');
    var p = sl.querySelector('.prev'), n = sl.querySelector('.next');
    if (track && p) p.addEventListener('click', function () {
      track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
    });
    if (track && n) n.addEventListener('click', function () {
      track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
    });
  });

  /* ---- FAQ accordion (static HTML, indexable) ---- */
  var qs = document.querySelectorAll('.faq-q');
  qs.forEach(function (q) {
    q.addEventListener('click', function () {
      var open = q.getAttribute('aria-expanded') === 'true';
      qs.forEach(function (o) {
        o.setAttribute('aria-expanded', 'false');
        if (o.nextElementSibling) o.nextElementSibling.style.maxHeight = null;
      });
      if (!open) {
        q.setAttribute('aria-expanded', 'true');
        var a = q.nextElementSibling;
        if (a) a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---- footer year ---- */
  var y = byId('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- cookie consent (152-ФЗ notice model) ---- */
  var box = byId('cookie');
  var consent = null;
  try { consent = localStorage.getItem('pv_cookie'); } catch (e) {}
  if (box && consent !== '1') box.classList.add('show');
  var ok = byId('cookieOk');
  if (ok) ok.addEventListener('click', function () {
    try { localStorage.setItem('pv_cookie', '1'); } catch (e) {}
    if (box) box.classList.remove('show');
    initMetrika();
  });

  /* ---- Yandex.Metrika — guarded by id AND consent (spec §8) ---- */
  var METRIKA_ID = 0; /* ← реальный номер счётчика, см. CONTENT.md */
  var ymReady = false;
  function initMetrika() {
    if (ymReady || !METRIKA_ID) return; ymReady = true;
    (function (mw, d, t, r, i, k, a) {
      mw[i] = mw[i] || function () { (mw[i].a = mw[i].a || []).push(arguments); };
      k = d.createElement(t); a = d.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(METRIKA_ID, "init", { webvisor: true, clickmap: true, accurateTrackBounce: true });
  }
  if (consent === '1') initMetrika();
  function goal(name) {
    if (METRIKA_ID && window.ym) { try { ym(METRIKA_ID, 'reachGoal', name); } catch (e) {} }
  }
  function bind(id, name) {
    var el = byId(id);
    if (el) el.addEventListener('click', function () { goal(name); });
  }
  var bw = byId('bookingWidget');
  if (bw) bw.addEventListener('click', function () { goal('booking_widget_click'); });
  bind('waBtn', 'whatsapp_click'); bind('waBtn2', 'whatsapp_click');
  bind('tgBtn', 'telegram_click'); bind('tgBtn2', 'telegram_click');
  document.querySelectorAll('.phone').forEach(function (el) {
    el.addEventListener('click', function () { goal('phone_click'); });
  });
  if ('IntersectionObserver' in window) {
    var seen = {};
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting && !seen[en.target.id]) {
          seen[en.target.id] = 1;
          if (en.target.id === 'faq') goal('faq_reached');
          if (en.target.id === 'houses') goal('houses_reached');
        }
      });
    }, { threshold: .3 });
    var f = byId('faq'), h = byId('houses');
    if (f) io.observe(f); if (h) io.observe(h);
  }
})();
