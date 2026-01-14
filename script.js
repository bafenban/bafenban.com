const rssLink = document.getElementById('rss');

function adjustFontSize() {
    const maxWidth = window.innerWidth * 0.8;
    let fontSize = Math.max(window.innerWidth * 0.03, 20);
    rssLink.style.fontSize = fontSize + 'px';
    while (rssLink.scrollWidth > maxWidth && fontSize > 10) {
        fontSize -= 0.5;
        rssLink.style.fontSize = fontSize + 'px';
    }
}

function updateBgColor() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    document.body.style.backgroundColor = `#${h}${m}${s}`;
}

document.fonts.ready.then(() => {
    adjustFontSize();
});

window.addEventListener('resize', adjustFontSize);

updateBgColor();
setInterval(updateBgColor, 1000);
