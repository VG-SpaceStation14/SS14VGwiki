// Navigation highlight + homepage enhancements (TOC + reveal animations)
document.addEventListener("DOMContentLoaded", function () {
    const ensureAmbientLayers = () => {
        const body = document.body;
        if (!body || body.querySelector(".wiki-ambient-a")) return;

        const fragment = document.createDocumentFragment();
        ["wiki-ambient-a", "wiki-ambient-b", "wiki-ambient-c"].forEach((layer) => {
            const div = document.createElement("div");
            div.className = `wiki-ambient ${layer}`;
            div.setAttribute("aria-hidden", "true");
            fragment.appendChild(div);
        });
        body.prepend(fragment);
    };

    ensureAmbientLayers();

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) return;

        if (
            currentPath.endsWith(href) ||
            (href === "/" && currentPath.endsWith("/index.html")) ||
            (href !== "/" && currentPath.includes(href))
        ) {
            link.classList.add("active");
        }
    });

    const revealTargets = document.querySelectorAll("[data-reveal]");
    if (revealTargets.length > 0 && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.1 }
        );

        revealTargets.forEach((target) => revealObserver.observe(target));
    } else {
        revealTargets.forEach((target) => target.classList.add("is-visible"));
    }

    const dockLinks = Array.from(document.querySelectorAll(".dock-link[href^='#']"));
    dockLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const counters = Array.from(document.querySelectorAll(".metric-value[data-count]"));
    const animateCounter = (el) => {
        const target = Number.parseInt(el.getAttribute("data-count") || "0", 10);
        if (!Number.isFinite(target) || target <= 0) {
            el.textContent = "0";
            return;
        }

        const duration = 900;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased).toString();
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    if (counters.length > 0) {
        if ("IntersectionObserver" in window) {
            const counterObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    });
                },
                { threshold: 0.6 }
            );
            counters.forEach((counter) => counterObserver.observe(counter));
        } else {
            counters.forEach((counter) => animateCounter(counter));
        }
    }

});
