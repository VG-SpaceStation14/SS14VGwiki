// Подсветка активного пункта меню
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || 
            (href === '/' && currentPath.endsWith('/index.html')) ||
            (href !== '/' && currentPath.includes(href))) {
            link.classList.add('active');
        }
    });
});