function toggleShow(id, focus = null) {
    let target = document.getElementById(id);
    let overlay = document.getElementById('drawer-overlay');
    target.classList.toggle("show");
    overlay.classList.toggle("show");
    if (overlay.classList.contains('show')) {
        overlay.onclick = function () {
            toggleShow(id);
        };
        if (focus) {
            let focusElement = document.querySelector(focus);
            if (focusElement) {
                focusElement.focus();
            }
        }
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
        overlay.onclick = null;
    }
}

function toggleDropdown(id) {
    document.getElementById(id).classList.toggle("show");
}

function focusOn(id) {
    document.getElementById(id).focus();
}

function scrollSpy(selector) {
    let element = document.querySelector(selector);
    if (!element) {
        return;
    }

    let entries = [];
    let links = element.querySelectorAll('a[href^="#"]');


    for (let i = 0, l = links.length; i < l; i++) {
        let currLink = links[i];
        let refElement = document.querySelector(currLink.getAttribute('href'));
        entries.push({
            e: currLink,
            r: refElement
        });
    }

    let entriesLength = entries.length;
    let currentElement = null;

    let callback = function (event) {
        let scrollPos = window.scrollY;
        let hasActive = false;

        for (let i = 0; i < entriesLength; i++) {
            let entry = entries[i];
            let currLink = entry.e;
            let refElement = entry.r;

            if (!refElement || !currLink) {
                continue;
            }

            if (refElement.offsetTop <= scrollPos) {
                if (currentElement !== currLink) {
                    if (currentElement !== null) {
                        currentElement.classList.remove('active');
                    }
                    currentElement = currLink;
                    currentElement.classList.add('active');
                }
                hasActive = true;
            }
        }

        if (!hasActive && currentElement !== null) {
            currentElement.classList.remove('active');
            currentElement = null;
        }
    };

    document.addEventListener('scroll', callback);
}

function scrollNavbar(selector, className) {
    let element = document.querySelector(selector);

    if (!element) {
        return;
    }

    let height = parseFloat(window.getComputedStyle(element).height);
    let prevScrollPosition = window.scrollY;
    let prevScrollHeight = window.document.body.scrollHeight;

    let callback = function (event) {
        let scrollPosition = window.scrollY;
        let scrollHeight = window.document.body.scrollHeight;

        if (scrollHeight !== prevScrollHeight) {
            prevScrollPosition = scrollPosition;
            prevScrollHeight = scrollHeight;
            return;
        }

        if (prevScrollPosition > scrollPosition) {
            if (element.classList.contains(className)) {
                element.classList.remove(className);
            }
        } else {
            if (scrollPosition >= height && !element.classList.contains(className)) {
                element.classList.add(className);
            }
        }

        prevScrollPosition = scrollPosition;
        prevScrollHeight = scrollHeight;
    };

    window.addEventListener('scroll', callback);
}

window.addEventListener('load', function () {
    scrollSpy('#on-this-page-section');
    scrollNavbar('.navbar', 'scrolled-down');

    setTimeout(function () {
        document.body.classList.add('fix-pre-scrollbars');
    }, 0);
});

function algoliaNavigate(prefix, url, anchor) {
    url = prefix + url;
    if (anchor) {
        url += '#' + anchor;
    }
    toggleShow('search-drawer');
    window.location = url;
}

const searchElement = document.getElementById('search-drawer');
const searchClient = algoliasearch(searchElement.getAttribute('data-app-id'),
    searchElement.getAttribute('data-api-key'));
const versionFilter = searchElement.getAttribute('data-version');

const urlPrefix = searchElement.getAttribute('data-prefix');
const algoliaHit = document.getElementById('algolia-hits');

algoliaHit.addEventListener('click', function (event) {
    let element = event.target;

    do {
        if (element.classList.contains('search-result')) {
            break;
        }
        element = element.parentElement;
    } while (element !== algoliaHit);

    if (element === algoliaHit) {
        return true;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    algoliaNavigate(urlPrefix, element.getAttribute('data-url'), element.getAttribute('data-anchor'));
});

const search = instantsearch({
    indexName: searchElement.getAttribute('data-index'),
    searchClient,
    searchFunction: function(helper) {
        if (helper.state.query === '') {
            algoliaHit.innerHTML = "";
            return;
        }

        helper.search();
    }
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#algolia-search-box',
        placeholder: 'Search',
        searchAsYouType: true,
        showReset: false,
        showSubmit: false,
        showLoadingIndicator: false
    })
);

search.addWidget(
    instantsearch.widgets.configure({
        filters: `version:"${versionFilter}"`,
    })
);


search.addWidget(
    instantsearch.widgets.hits({
        container: '#algolia-hits',
        cssClasses: {
            root: 'algolia-search-result',
            emptyRoot: 'algolia-empty-list',
            list: 'algolia-result-list',
            item: 'algolia-result-item',
        },
        templates: {
            item: (hit) => {
                let headings = '';
                if (hit._highlightResult.hasOwnProperty('headings')) {
                    headings = '<h5># ' + hit._highlightResult.headings.map(v => `<span>${v.value}</span>`).join(' > ') + '</h5>';
                }
                return `
                    <div data-url="${hit.url}" data-anchor="${hit.hasOwnProperty('anchor') ? hit.anchor : ''}" class="search-result">
                        <h3>${instantsearch.highlight({ attribute: 'title', highlightedTagName: 'mark', hit })}</h3>
                        ${headings}
                        <p>${instantsearch.snippet({ attribute: 'content', highlightedTagName: 'mark', hit })}</p>
                    </div>
                `
            }
        },
    })
);

search.start();