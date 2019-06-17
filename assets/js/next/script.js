function toggleShow(id) {
    let target = document.getElementById(id);
    let overlay = document.getElementById('drawer-overlay');
    target.classList.toggle("show");
    overlay.classList.toggle("show");
    if (overlay.classList.contains('show')) {
        overlay.onclick = function () {
            toggleShow(id);
        }
    } else {
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

    let callback = function (event) {
        let scrollPosition = window.scrollY;
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
    };

    window.addEventListener('scroll', callback);
}

window.addEventListener('load', function () {
    scrollSpy('#on-this-page-section');
    scrollNavbar('.navbar', 'scrolled-down');

    document.querySelectorAll('h2[id],h3[id],h4[id],h5[id],h6[id]').forEach(function (element) {
        // append a hash tag
    })
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

const urlPrefix = searchElement.getAttribute('data-prefix');

const search = instantsearch({
    indexName: searchElement.getAttribute('data-index'),
    searchClient,
    searchFunction: function(helper) {
        if (helper.state.query === '') {
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
    instantsearch.widgets.hits({
        container: '#algolia-hits',
        templates: {
            item: `
        <div onclick="algoliaNavigate('${urlPrefix}','{{url}}','{{anchor}}')">
            <h5>
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
            </h5>
            <p>{{#helpers.highlight}}{ "attribute": "content" }{{/helpers.highlight}}</p>
        </div>
    `,
        },
    })
);

search.start();