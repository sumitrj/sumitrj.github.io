'use strict';

/* Interactions for a static page: copy-to-clipboard, scroll spy,
   scroll progress, section reveal, kicker parallax, and rendering
   the articles list (articles.js) into #stories-root. */

var REDUCED_MOTION = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- Copy to clipboard --- */
function initCopy() {
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
        var original = btn.textContent;
        btn.addEventListener('click', function () {
            var text = btn.getAttribute('data-copy');
            var done = function () {
                btn.classList.add('copied');
                btn.textContent = 'copied';
                setTimeout(function () {
                    btn.classList.remove('copied');
                    btn.textContent = original;
                }, 1500);
            };
            var fallback = function () {
                var ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
                document.body.removeChild(ta);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done).catch(fallback);
            } else {
                fallback();
            }
        });
    });
}

/* --- Scroll spy --- */
function initScrollSpy() {
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.top-nav a[data-section]'));
    if (!navLinks.length) return;

    var sections = navLinks
        .map(function (a) { return document.getElementById(a.dataset.section); })
        .filter(Boolean);
    if (!sections.length) return;

    function update() {
        var line = window.scrollY + 120;
        var current = null;
        sections.forEach(function (s) {
            if (s.getBoundingClientRect().top + window.scrollY <= line) current = s;
        });
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
            current = sections[sections.length - 1];
        }
        navLinks.forEach(function (a) {
            a.classList.toggle('active', current && a.dataset.section === current.id);
        });
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

/* --- Scroll progress bar --- */
function initProgress() {
    var bar = document.querySelector('.progress');
    if (!bar) return;
    var ticking = false;
    function update() {
        var max = document.body.scrollHeight - window.innerHeight;
        var pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
        bar.style.width = pct + '%';
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
}

/* --- Section reveal on entry --- */
function initReveal() {
    if (REDUCED_MOTION || !('IntersectionObserver' in window)) return;
    var fired = false;
    var observer = new IntersectionObserver(function (entries) {
        fired = true;
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    var sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
        section.classList.add('reveal');
        observer.observe(section);
    });
    // Content must never stay hidden: if the observer is throttled or
    // never fires, reveal everything.
    setTimeout(function () {
        if (!fired) {
            observer.disconnect();
            sections.forEach(function (section) { section.classList.add('in'); });
        }
    }, 1200);
}

/* --- Kicker parallax: elements drift against scroll while in view --- */
function initParallax() {
    if (REDUCED_MOTION) return;
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (!els.length) return;
    var ticking = false;
    function update() {
        var vh = window.innerHeight;
        els.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.bottom < -100 || rect.top > vh + 100) return;
            var progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -0.5 .. 0.5
            var amp = parseFloat(el.getAttribute('data-parallax')) || 16;
            el.style.transform = 'translateY(' + (progress * amp).toFixed(1) + 'px)';
        });
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
}

/* --- Stories --- */
function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
        Object.keys(attrs).forEach(function (key) {
            var val = attrs[key];
            if (val == null) return;
            if (key === 'class') node.className = val;
            else if (key === 'text') node.textContent = val;
            else if (key === 'html') node.innerHTML = val;
            else node.setAttribute(key, val);
        });
    }
    (children || []).forEach(function (child) {
        if (child == null) return;
        node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
}

function initStories() {
    var root = document.getElementById('stories-root');
    var articles = window.SITE_ARTICLES || [];
    if (!root || !articles.length) return;

    // Single reusable modal, built once and appended to <body>.
    var eyebrow = el('p', { class: 'modal-eyebrow' });
    var title = el('h2', { class: 'modal-title' });
    var glance = el('p', { class: 'modal-glance' });
    var body = el('div', { class: 'story-body' });
    var closeBtn = el('button', {
        class: 'modal-close', type: 'button', 'aria-label': 'Close'
    }, ['×']);
    var scroll = el('div', { class: 'modal-scroll' }, [eyebrow, title, glance, body]);
    var panel = el('div', {
        class: 'modal-panel', role: 'dialog', 'aria-modal': 'true',
        'aria-labelledby': 'modal-title'
    }, [closeBtn, scroll]);
    title.id = 'modal-title';
    var overlay = el('div', { class: 'modal-overlay', 'aria-hidden': 'true' }, [panel]);
    document.body.appendChild(overlay);

    var lastFocus = null;

    function open(item, i) {
        lastFocus = document.activeElement;
        eyebrow.textContent = 'Note ' + String(i + 1).padStart(2, '0');
        title.textContent = item.title;
        glance.textContent = item.glance || '';
        glance.style.display = item.glance ? '' : 'none';
        body.innerHTML = (item.markdown && window.marked) ? marked.parse(item.markdown) : '';
        scroll.scrollTop = 0;
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-lock');
        closeBtn.focus();
    }

    function close() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-lock');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });

    root.appendChild(el('div', { class: 'rows' }, articles.map(function (item, i) {
        var btn = el('button', { class: 'story-open', type: 'button' }, [
            el('span', { class: 'story-title', text: item.title }),
            el('span', { class: 'story-marker', text: 'read →' })
        ]);
        btn.addEventListener('click', function () { open(item, i); });

        return el('article', { class: 'row story-item' }, [
            el('div', { class: 'row-label', text: 'note ' + String(i + 1).padStart(2, '0') }),
            el('div', { class: 'row-body' }, [
                btn,
                item.glance ? el('p', { class: 'story-glance', text: item.glance }) : null
            ])
        ]);
    })));
}

document.addEventListener('DOMContentLoaded', function () {
    initCopy();
    initScrollSpy();
    initProgress();
    initReveal();
    initParallax();
    initStories();
});
