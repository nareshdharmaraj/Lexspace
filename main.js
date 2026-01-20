// Theme Management
const themeToggles = document.querySelectorAll('.theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcons(currentTheme);

themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });
});

function updateThemeIcons(theme) {
    themeToggles.forEach(toggle => {
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    });
}

// Custom Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover effect for links
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => outline.style.transform = 'translate(-50%, -50%) scale(2)');
    el.addEventListener('mouseleave', () => outline.style.transform = 'translate(-50%, -50%) scale(1)');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Parallax for Hero Image Vessel
window.addEventListener('scroll', () => {
    const vessel = document.querySelector('.hero-image-vessel');
    const title = document.querySelector('.hero-title');
    if (vessel) {
        let scroll = window.pageYOffset;
        // Subtle vertical movement and scaling for "breathing" effect
        vessel.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.1}px)) scale(${1 + scroll * 0.0002})`;
        if (title) {
            title.style.transform = `translateY(${scroll * -0.05}px)`;
        }
    }
});

// Scroll Reveal Animation (Enhanced)
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax-bg');
    if (parallax) {
        let scrollPosition = window.pageYOffset;
        parallax.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)';
    }
});

// Fade out preloader if exists
window.addEventListener('load', () => {
    const loader = document.getElementById('preloader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
});

// Counter Animation Logic
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The higher the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const currentText = counter.innerText.replace(/,/g, '').replace('+', '').replace('%', '').replace('k', '000');
            const count = isNaN(currentText) ? 0 : +currentText;
            const inc = target / speed;

            if (count < target) {
                const newValue = Math.ceil(count + inc);
                const suffix = counter.getAttribute('data-suffix') || '';
                counter.innerText = newValue.toLocaleString() + suffix;
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
};

window.addEventListener('load', animateCounters);

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinksContainer.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target) && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
}

// Dropdown Toggle Logic
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            const dropdown = toggle.nextElementSibling;
            if (dropdown && dropdown.classList.contains('dropdown-menu')) {
                // Close others
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    if (menu !== dropdown) {
                        menu.classList.remove('show');
                    }
                });
                dropdown.classList.toggle('show');
            }
        }
    });
});

// Dashboard Sidebar Toggle
const dashMenuToggle = document.querySelector('.dashboard-menu-toggle');
const voltMenuBtn = document.querySelector('.volt-menu-btn');
const voltHamburger = document.querySelector('.volt-hamburger');
const voltNavOverlay = document.querySelector('.volt-nav-overlay');
const sidebar = document.querySelector('.sidebar');

const toggleSidebar = (e) => {
    if (sidebar) {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        // Close nav overlay if sidebar opens
        if (voltNavOverlay) voltNavOverlay.classList.remove('active');
    }
};

const toggleNavOverlay = (e) => {
    if (voltNavOverlay) {
        e.stopPropagation();
        voltNavOverlay.classList.toggle('active');
        // Close sidebar if nav overlay opens
        if (sidebar) sidebar.classList.remove('active');
    }
};

if (dashMenuToggle) dashMenuToggle.addEventListener('click', toggleSidebar);
if (voltMenuBtn) voltMenuBtn.addEventListener('click', toggleSidebar);
if (voltHamburger) voltHamburger.addEventListener('click', toggleNavOverlay);

document.addEventListener('click', (e) => {
    // Close sidebar logic
    if (sidebar && sidebar.classList.contains('active')) {
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnSidebarToggle = (dashMenuToggle && dashMenuToggle.contains(e.target)) ||
            (voltMenuBtn && voltMenuBtn.contains(e.target));
        if (!isClickInsideSidebar && !isClickOnSidebarToggle) {
            sidebar.classList.remove('active');
        }
    }

    // Close nav overlay logic
    if (voltNavOverlay && voltNavOverlay.classList.contains('active')) {
        const isClickInsideNav = voltNavOverlay.contains(e.target);
        const isClickOnNavToggle = (voltHamburger && voltHamburger.contains(e.target));
        if (!isClickInsideNav && !isClickOnNavToggle) {
            voltNavOverlay.classList.remove('active');
        }
    }
});

if (sidebar) {
    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
        });
    });
}
