document.addEventListener('DOMContentLoaded', () => {
    initializePrivacyModal();
    initializeDropdowns();
    loadHeroBar();
});

function initializePrivacyModal() {
    const modal = document.getElementById('privacyPolicyModal');
    const link = document.getElementById('privacyPolicyLink');

    if (!modal || !link) {
        return;
    }

    const closeButton = modal.querySelector('.close');

    const hideModal = () => {
        modal.style.display = 'none';
    };

    link.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'block';
    });

    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    document.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });
}

function loadHeroBar() {
    const heroBar = document.getElementById('hero-bar');

    if (!heroBar) {
        return;
    }

    fetch('hero.html', { credentials: 'same-origin' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load hero.html: ${response.status}`);
            }

            return response.text();
        })
        .then((html) => {
            heroBar.innerHTML = sanitizeHtml(html);
        })
        .catch((error) => {
            console.error(error);
            heroBar.setAttribute('hidden', 'hidden');
        });
}

function sanitizeHtml(htmlString) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(htmlString, 'text/html');

    parsed.querySelectorAll('script, iframe, object, embed, link, meta, style').forEach((element) => {
        element.remove();
    });

    parsed.body.querySelectorAll('*').forEach((element) => {
        Array.from(element.attributes).forEach((attribute) => {
            if (attribute.name.toLowerCase().startsWith('on')) {
                element.removeAttribute(attribute.name);
            }
        });
    });

    return parsed.body.innerHTML;
}

function initializeDropdowns() {
    const dropdowns = Array.from(document.querySelectorAll('.nav-item.has-dropdown'));

    if (!dropdowns.length) {
        return;
    }

    const closeAll = (exception) => {
        dropdowns.forEach((item) => {
            if (item === exception) {
                return;
            }

            item.classList.remove('open');
            const toggle = item.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    };

    dropdowns.forEach((item) => {
        const toggle = item.querySelector('.dropdown-toggle');
        const menu = item.querySelector('.dropdown-menu');

        if (!toggle || !menu) {
            return;
        }

        toggle.addEventListener('click', (event) => {
            event.preventDefault();
            const isOpen = item.classList.contains('open');
            closeAll();
            item.classList.toggle('open', !isOpen);
            toggle.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-item.has-dropdown')) {
            closeAll();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAll();
        }
    });
}
