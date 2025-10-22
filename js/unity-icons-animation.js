// Unity Icons Animation (replaces music notes)
document.addEventListener('DOMContentLoaded', function () {
    // Ensure we only create the layer once
    const content = document.querySelector('main.content');
    if (!content) return;

    // Remove/hide old canvas if present
    const oldCanvas = document.getElementById('music-notes-canvas');
    if (oldCanvas) {
        oldCanvas.style.display = 'none';
    }

    // Create overlay layer for Unity icons
    let layer = document.getElementById('unity-icons-layer');
    if (!layer) {
        layer = document.createElement('div');
        layer.id = 'unity-icons-layer';
        layer.className = 'unity-icons-background';
        content.appendChild(layer);
    }

    function spawnCount() {
        const area = layer.clientWidth * layer.clientHeight;
        // Lower density: ~1 icon per 25k px^2, cap and floor reduced
        return Math.min(24, Math.max(6, Math.floor(area / 25000)));
    }

    function rand(min, max) { return Math.random() * (max - min) + min; }

    // Clear any existing children (in case of hot reload)
    layer.innerHTML = '';

    const count = spawnCount();
    for (let i = 0; i < count; i++) {
        // Wrapper that moves vertically
        const wrapper = document.createElement('span');
        wrapper.className = 'unity-icon';

        // Inner that wiggles horizontally and rotates
        const inner = document.createElement('span');
        inner.className = 'unity-icon-inner';

        // Font Awesome Unity icon
        const icon = document.createElement('i');
        icon.className = 'fa-brands fa-unity';

        inner.appendChild(icon);
        wrapper.appendChild(inner);
        layer.appendChild(wrapper);

        // Randomize attributes
        const left = rand(0, 100); // percent
        const size = rand(14, 28); // px
        const opacity = rand(0.35, 0.8);
        const riseDur = rand(12, 26); // seconds
        const wiggleDur = rand(3, 7); // seconds
        const delay = rand(0, 12); // seconds
        const hueRotate = rand(-10, 10); // subtle tint wobble

        // Position and animation via CSS vars
        wrapper.style.left = left + '%';
        wrapper.style.setProperty('--rise-duration', riseDur + 's');
        wrapper.style.setProperty('--rise-delay', delay + 's');
        wrapper.style.setProperty('--hue-rotate', hueRotate + 'deg');

        inner.style.setProperty('--wiggle-duration', wiggleDur + 's');
        inner.style.setProperty('--wiggle-amplitude', rand(6, 18) + 'px');
        inner.style.setProperty('--spin-angle', rand(-12, 12) + 'deg');
        inner.style.opacity = String(opacity);
        icon.style.fontSize = size + 'px';

        // Stagger some start positions by offsetting animation progress
        // Let CSS handle infinite looping
    }

    // Rebuild on resize to keep density responsive
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recreate particles
            layer.innerHTML = '';
            const count = spawnCount();
            for (let i = 0; i < count; i++) {
                const wrapper = document.createElement('span');
                wrapper.className = 'unity-icon';
                const inner = document.createElement('span');
                inner.className = 'unity-icon-inner';
                const icon = document.createElement('i');
                icon.className = 'fa-brands fa-unity';
                inner.appendChild(icon);
                wrapper.appendChild(inner);
                layer.appendChild(wrapper);

                const left = rand(0, 100);
                const size = rand(16, 36);
                const opacity = rand(0.35, 0.8);
                const riseDur = rand(12, 26);
                const wiggleDur = rand(3, 7);
                const delay = rand(0, 12);
                const hueRotate = rand(-10, 10);

                wrapper.style.left = left + '%';
                wrapper.style.setProperty('--rise-duration', riseDur + 's');
                wrapper.style.setProperty('--rise-delay', delay + 's');
                wrapper.style.setProperty('--hue-rotate', hueRotate + 'deg');

                inner.style.setProperty('--wiggle-duration', wiggleDur + 's');
                inner.style.setProperty('--wiggle-amplitude', rand(6, 18) + 'px');
                inner.style.setProperty('--spin-angle', rand(-12, 12) + 'deg');
                inner.style.opacity = String(opacity);
                icon.style.fontSize = size + 'px';
            }
        }, 200);
    });

    // Make scroll indicator clickable to go to next section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.cursor = 'pointer';
        scrollIndicator.addEventListener('click', () => {
            const next = document.querySelector('#about');
            if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});
