const rssLink = document.getElementById('rss');
const originalText = rssLink.textContent;

function adjustFontSize() {
    const maxWidth = window.innerWidth * 0.8;
    // Reset font size to start calculation
    let fontSize = Math.max(window.innerWidth * 0.03, 20);
    rssLink.style.fontSize = fontSize + 'px';
    
    // Decrease font size until it fits
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

async function copyToClipboard(text) {
    // Try Modern Async API first
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.warn('Clipboard API failed, trying fallback', err);
        }
    }

    // Fallback method for older browsers or non-secure contexts
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Ensure it's not visible but part of the DOM
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (err) {
        console.error('Fallback copy failed', err);
        document.body.removeChild(textArea);
        return false;
    }
}

rssLink.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const success = await copyToClipboard(rssLink.href);

    if (success) {
        rssLink.textContent = "copied";
        adjustFontSize();
        
        setTimeout(() => {
            rssLink.textContent = originalText;
            adjustFontSize();
        }, 2000);
    } else {
        rssLink.textContent = "copy failed";
        adjustFontSize();
        setTimeout(() => {
            rssLink.textContent = originalText;
            adjustFontSize();
        }, 2000);
    }
});

document.fonts.ready.then(() => {
    adjustFontSize();
});

window.addEventListener('resize', adjustFontSize);

updateBgColor();
setInterval(updateBgColor, 1000);
