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

    root.appendChild(el('div', { class: 'rows' }, articles.map(function (item, i) {
        var marker = el('span', { class: 'story-marker', text: '+ read' });
        var btn = el('button', { class: 'story-toggle', type: 'button' }, [
            el('span', { class: 'story-title', text: item.title }),
            marker
        ]);

        var parsedHtml = (item.markdown && window.marked) ? marked.parse(item.markdown) : '';
        var content = el('div', { class: 'story-content' }, [
            parsedHtml ? el('div', { class: 'story-body', html: parsedHtml }) : null
        ]);

        var article = el('article', { class: 'row story-item' }, [
            el('div', { class: 'row-label', text: 'note ' + String(i + 1).padStart(2, '0') }),
            el('div', { class: 'row-body' }, [
                btn,
                item.glance ? el('p', { class: 'story-glance', text: item.glance }) : null,
                content
            ])
        ]);

        btn.addEventListener('click', function () {
            article.classList.toggle('expanded');
            marker.textContent = article.classList.contains('expanded') ? '− close' : '+ read';
        });

        return article;
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
