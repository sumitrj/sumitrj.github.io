'use strict';

/* =========================================================================
   Small DOM helpers. UI structure lives here; all copy lives in content.json.
   ========================================================================= */

// Create an element. attrs: class, id, html, text, plus any attribute name.
// children: array of nodes or strings (null/undefined are skipped).
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

function icon(name) {
    if (name === 'linkedin') {
        var span = document.createElement('span');
        span.className = 'custom-icon';
        span.style.display = 'flex';
        span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';
        return span;
    }
    if (name === 'github') {
        var span = document.createElement('span');
        span.className = 'custom-icon';
        span.style.display = 'flex';
        span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>';
        return span;
    }
    return el('span', { class: 'material-symbols-rounded', text: name });
}

function tagList(className, items) {
    return el('div', { class: className }, (items || []).map(function (t) {
        return el('span', { class: 'tag', text: t });
    }));
}

function bulletList(className, items) {
    return el('ul', { class: className }, (items || []).map(function (t) {
        return el('li', { text: t });
    }));
}

function badge(b) {
    if (!b) return null;
    return el('span', { class: 'badge badge-' + b.variant, text: b.text });
}

function section(id, eyebrow, title, sub) {
    var head = [
        el('div', { class: 'eyebrow', text: eyebrow }),
        el('h2', { class: 'section-title', text: title })
    ];
    if (sub) head.push(el('p', { class: 'section-sub', text: sub }));
    return { wrap: el('section', { class: 'section', id: id }), head: head };
}

/* =========================================================================
   Section builders. Each takes its slice of content and returns a node.
   ========================================================================= */

function buildTopNav(data) {
    return el('nav', { class: 'top-nav' }, data.nav.map(function (item) {
        return el('a', { href: '#' + item.section, 'data-section': item.section, text: item.label });
    }));
}

function buildSidebar(data) {
    var hero = data.hero;
    var contactLinks = (data.contact.items || []).map(function (item) {
        if (item.type === 'copy') {
            return el('button', {
                type: 'button', class: 'hero-contact-icon icon-only',
                'data-copy': item.value, title: item.title
            }, [icon(item.icon)]);
        }
        var aProps = { class: 'hero-contact-icon', href: item.href, target: '_blank', rel: 'noopener', title: item.text };
        if (item.download) aProps.download = '';
        return el('a', aProps, [icon(item.icon)]);
    });

    var skillsGroup = el('div', { class: 'sidebar-card' }, [
        el('span', { class: 'skill-header', text: 'Tech Stack' }),
        el('div', { class: 'skill-tags' }, (data.skills || []).map(function(s) {
            return el('span', { class: 'tag', text: s });
        }))
    ]);

    var recognitionsGroup = el('div', { class: 'sidebar-card' }, [
        el('span', { class: 'skill-header', text: 'Recognition' }),
        el('div', { class: 'award-list' }, (data.recognitions || []).map(function(r) {
            var iconBox = el('div', { class: 'award-icon-box' }, [icon(r.icon)]);
            var content = el('div', { class: 'award-content' }, [
                el('strong', { text: r.title }),
                el('span', { text: r.sub })
            ]);
            if (r.href) {
                return el('a', { class: 'award-item', href: r.href, target: '_blank' }, [iconBox, content]);
            }
            return el('div', { class: 'award-item' }, [iconBox, content]);
        }))
    ]);

    return el('div', { class: 'sidebar-container' }, [
        el('div', { class: 'sidebar-card profile-card' }, [
            el('div', { class: 'profile-header' }, [
                el('h1', { text: hero.title }),
                el('div', { class: 'hero-contact-row' }, contactLinks),
                el('div', { class: 'role', text: hero.role }),
                el('p', { class: 'lead', text: hero.lead })
            ])
        ]),
        skillsGroup,
        recognitionsGroup
    ]);
}

function buildWhatIDo(items) {
    return el('section', { class: 'section', 'aria-label': 'What I do' }, [
        el('div', { class: 'container' }, [
            el('div', { class: 'card-grid cols-3' }, items.map(function (c) {
                return el('div', { class: 'card do-card' }, [
                    el('div', { class: 'do-icon' }, [icon(c.icon)]),
                    el('h3', { text: c.title }),
                    el('p', { text: c.body })
                ]);
            }))
        ])
    ]);
}

function buildStories(stories) {
    if (!stories) return el('div');
    var articles = window.SITE_ARTICLES || [];
    return el('section', { class: 'section', id: 'stories', 'aria-label': 'Stories' }, [
        el('div', { class: 'container' }, [
            el('h2', { class: 'section-title', text: stories.title }),
            el('p', { class: 'section-sub', text: stories.sub }),
            articles.length > 0
                ? el('div', { class: 'story-list' }, articles.map(function(item) {
                      var thumbnail = item.thumbnail ? el('div', { class: 'story-thumbnail' }, [
                          el('img', { src: item.thumbnail, alt: item.title })
                      ]) : null;

                      var title = el('h3', { class: 'story-talking-title', text: item.title });

                      var parsedHtml = item.markdown ? marked.parse(item.markdown) : '';

                      var contentContainer = el('div', { class: 'story-content' }, [
                          item.glance ? el('div', { class: 'p-premise' }, [
                              el('strong', { text: 'At a Glance: ' }),
                              el('span', { text: item.glance })
                          ]) : null,
                          parsedHtml ? el('div', { class: 'p-body story-body', html: parsedHtml }) : null
                      ]);

                      var btn = el('button', { class: 'story-read-more' }, [
                          el('span', { class: 'read-more-text', text: 'Read more' }),
                          el('span', { class: 'material-symbols-rounded', text: 'expand_more' })
                      ]);

                      var article = el('article', { class: 'project-card story-item' }, [
                          thumbnail,
                          el('div', { class: 'story-header' }, [title]),
                          contentContainer,
                          btn
                      ]);

                      var toggleExpanded = function() {
                          article.classList.toggle('expanded');
                          var icon = btn.querySelector('.material-symbols-rounded');
                          var textSpan = btn.querySelector('.read-more-text');
                          if (article.classList.contains('expanded')) {
                              textSpan.textContent = 'Read less';
                              icon.textContent = 'expand_less';
                          } else {
                              textSpan.textContent = 'Read more';
                              icon.textContent = 'expand_more';
                          }
                      };

                      btn.addEventListener('click', toggleExpanded);
                      if (thumbnail) {
                          thumbnail.addEventListener('click', toggleExpanded);
                          thumbnail.style.cursor = 'pointer';
                      }

                      return article;
                  }))
                : el('div', { style: 'font-style: italic; color: var(--text-subtle);' }, ['Articles coming soon...'])
        ])
    ]);
}

function buildSystems(data) {
    var s = section('systems', data.eyebrow, data.title, data.sub);
    var cards = data.items.map(function (item) {
        return el('article', { class: 'card system-card' }, [
            el('div', { class: 'system-head' }, [
                el('span', { class: 'system-name', text: item.name }),
                badge(item.badge)
            ]),
            item.client ? el('div', { class: 'system-client', text: item.client }) : null,
            el('p', { class: 'system-desc', text: item.desc }),
            bulletList('clean-list', item.points),
            tagList('tags', item.tags)
        ]);
    });
    s.wrap.appendChild(el('div', { class: 'container' }, s.head.concat([
        el('div', { class: 'card-grid' }, cards)
    ])));
    return s.wrap;
}

function buildWork(data, labels) {
    var s = section('work', data.eyebrow, data.title, data.sub);
    var cards = data.items.map(function (p) {
        return el('article', { class: 'project-card' }, [
            el('div', { class: 'p-head' }, [
                el('div', null, [
                    el('div', { class: 'p-title', text: p.title }),
                    el('div', { class: 'p-client', text: p.client })
                ]),
                badge(p.badge)
            ]),
            el('div', { class: 'p-premise' }, [
                el('strong', { text: labels.useCase + ': ' }),
                p.useCase
            ]),
            el('div', { class: 'p-body' }, [
                el('div', null, [
                    el('div', { class: 'p-col-label', text: labels.does }),
                    bulletList('p-list', p.does)
                ]),
                el('div', null, [
                    el('div', { class: 'p-col-label', text: labels.contributions }),
                    bulletList('p-list', p.contributions)
                ])
            ]),
            tagList('p-tech', p.tech)
        ]);
    });
    s.wrap.appendChild(el('div', { class: 'container' }, s.head.concat([
        el('div', { class: 'card-grid' }, cards)
    ])));
    return s.wrap;
}

function timelineItem(item) {
    return el('div', { class: 'timeline-item' }, [
        el('div', { class: 'ti-head' }, [
            el('div', null, [
                el('span', { class: 'ti-role', text: item.role }),
                ', ',
                el('span', { class: 'ti-org', text: item.org })
            ]),
            el('span', { class: 'ti-date', text: item.date })
        ]),
        el('p', { class: 'ti-desc', text: item.desc })
    ]);
}

function buildAbout(data) {
    var s = section('about', data.eyebrow, data.title);
    var edu = data.education;
    var content = s.head.concat([
        el('p', { class: 'section-sub', text: data.intro, style: 'max-width:680px;' }),

        el('h3', { class: 'sub-head', text: data.experience.heading }),
        el('div', { class: 'card' }, data.experience.items.map(timelineItem)),

        el('h3', { class: 'sub-head', text: edu.heading }),
        el('div', { class: 'card' }, [
            el('div', { class: 'ti-head' }, [
                el('div', null, [
                    el('span', { class: 'ti-role', text: edu.role }),
                    ', ',
                    el('span', { class: 'ti-org', text: edu.org })
                ]),
                el('span', { class: 'ti-date', text: edu.date })
            ]),
            el('p', { class: 'ti-desc', text: edu.desc })
        ])
    ]);
    s.wrap.appendChild(el('div', { class: 'container' }, content));
    return s.wrap;
}

function buildContact(data) {
    var s = section('contact', data.eyebrow, data.title);
    var rows = data.items.map(function (item) {
        if (item.type === 'copy') {
            return el('button', {
                type: 'button', class: 'contact-item copy-row',
                'data-copy': item.value, title: item.title
            }, [
                el('span', { class: 'copy-label' }, [icon(item.icon), item.text]),
                el('span', { class: 'material-symbols-rounded copy-icon', text: 'content_copy' })
            ]);
        }
        var aProps = { class: 'contact-item', href: item.href, target: '_blank', rel: 'noopener' };
        if (item.download) aProps.download = '';
        return el('a', aProps, [
            icon(item.icon),
            el('span', { text: item.text })
        ]);
    });
    s.wrap.appendChild(el('div', { class: 'container' }, s.head.concat([
        el('div', { class: 'contact-grid' }, rows)
    ])));
    return s.wrap;
}

function buildFooter(footer) {
    return [
        el('div', { text: footer.copyright }),
        el('div', { class: 'footer-links' }, footer.links.map(function (l) {
            return el('a', { href: l.href, target: '_blank', rel: 'noopener', text: l.label });
        }))
    ];
}

/* =========================================================================
   Behaviours, wired after the DOM is rendered.
   ========================================================================= */

function initCopy(root) {
    root.querySelectorAll('[data-copy]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var text = btn.getAttribute('data-copy');
            var isIconOnly = btn.classList.contains('icon-only');
            var label = btn.querySelector('.copy-label');
            var icn = btn.querySelector('.material-symbols-rounded');
            var originalHTML = label ? label.innerHTML : '';
            var originalIcon = icn ? icn.textContent : '';

            var done = function () {
                btn.classList.add('copied');
                if (isIconOnly) {
                    if (icn) icn.textContent = 'check';
                } else if (label) {
                    label.innerHTML = '<span class="material-symbols-rounded">check</span> Copied';
                }
                setTimeout(function () {
                    btn.classList.remove('copied');
                    if (isIconOnly) {
                        if (icn) icn.textContent = originalIcon;
                    } else if (label) {
                        label.innerHTML = originalHTML;
                    }
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

function initScrollSpy(root) {
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.top-nav a[data-section]'));
    if (!navLinks.length) return;

    var sections = navLinks
        .map(function (a) { return document.getElementById(a.dataset.section); })
        .filter(Boolean);
    if (!sections.length) return;

    function setActive(id) {
        navLinks.forEach(function (a) { a.classList.toggle('active', a.dataset.section === id); });
    }

    function update() {
        var line = window.scrollY + 140;
        var current = null;
        sections.forEach(function (s) {
            if (s.getBoundingClientRect().top + window.scrollY <= line) current = s;
        });
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
            current = sections[sections.length - 1];
        }
        setActive(current ? current.id : null);
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

/* =========================================================================
   Entry point: load content, render, wire behaviours.
   ========================================================================= */

function render(data) {
    document.title = data.meta.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', data.meta.description);

    var navRoot = document.getElementById('nav-root');
    var sidebarRoot = document.getElementById('sidebar-root');
    var mainRoot = document.getElementById('main-root');
    var footerRoot = document.getElementById('footer-root');

    if (navRoot) navRoot.appendChild(buildTopNav(data));
    sidebarRoot.appendChild(buildSidebar(data));

    [
        buildWhatIDo(data.whatIDo),
        buildSystems(data.systems),
        buildWork(data.work, data.labels),
        buildAbout(data.about),
        buildStories(data.stories),
        buildContact(data.contact)
    ].forEach(function (s) { mainRoot.appendChild(s); });

    buildFooter(data.footer).forEach(function (n) { footerRoot.appendChild(n); });

    initCopy(document);
    initScrollSpy(document);
}

function showError(message) {
    var mainRoot = document.getElementById('main-root');
    if (!mainRoot) return;
    mainRoot.appendChild(el('section', { class: 'section' }, [
        el('div', { class: 'container' }, [
            el('p', { class: 'section-sub', text: message })
        ])
    ]));
}

// Content is provided by content.js as a global (window.SITE_CONTENT).
// Loading it as a script rather than fetching a .json file means the page
// also works when opened directly from disk (file://), where fetch is blocked.
document.addEventListener('DOMContentLoaded', function () {
    try {
        if (!window.SITE_CONTENT) {
            throw new Error('content.js did not load (window.SITE_CONTENT is missing)');
        }
        render(window.SITE_CONTENT);
    } catch (err) {
        showError('Something went wrong loading this page. Please refresh.');
        if (window.console) console.error(err);
    }
});
