/**
 * Skoop Hello World Application
 */

async function loadAppData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load app data:', error);
        return null;
    }
}

async function init() {
    const data = await loadAppData();
    if (!data) return;

    const sections = data.sections;
    const settings = sections.app_settings;
    const content = sections.content;

    // Apply data-driven styles
    const root = document.documentElement;
    root.style.setProperty('--background-color', settings.background_color.value);
    root.style.setProperty('--primary-color', settings.primary_color.value);
    root.style.setProperty('--text-color', settings.text_color.value);

    // Populate content
    const headlineEl = document.querySelector('.headline');
    const subtextEl = document.querySelector('.subtext');

    if (headlineEl) {
        headlineEl.textContent = content.headline.value;
    }

    if (subtextEl) {
        // Replacing newlines with <br> for simple HTML display
        subtextEl.innerHTML = content.subtext.value.replace(/\n/g, '<br>');
    }

    // Reveal the app
    const appContainer = document.getElementById('app-container');
    if (appContainer) {
        appContainer.classList.add('loaded');
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
