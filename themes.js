// Theme switcher functionality
const themes = [
    {
        name: 'Default',
        colors: {
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            text: '#333',
            accent: '#4f5d75',
            accent2: '#2d3142',
            card: 'white',
            particleColor: '45, 49, 66' // RGB format for particles
        }
    },
    {
        name: 'Bauhaus',
        colors: {
            background: 'linear-gradient(135deg, #f9f9f9 0%, #ececec 100%)',
            text: '#121212',
            accent: '#e3342f',
            accent2: '#0047ab',
            card: 'white',
            particleColor: '227, 52, 47' // RGB format for particles
        }
    },
    {
        name: 'Swiss',
        colors: {
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            text: '#222222',
            accent: '#ff0000',
            accent2: '#000000',
            card: 'white',
            particleColor: '0, 0, 0' // RGB format for particles
        }
    },
    {
        name: 'Memphis',
        colors: {
            background: 'linear-gradient(135deg, #fdfdfd 0%, #f6f6f6 100%)',
            text: '#333333',
            accent: '#00a8ff',
            accent2: '#ff9642',
            card: 'white',
            particleColor: '255, 150, 66' // RGB format for particles
        }
    }
];

class ThemeSwitcher {
    constructor() {
        this.currentThemeIndex = 0;
        this.root = document.documentElement;
        
        // Create theme switcher UI
        this.createThemeSwitcherUI();
        
        // Apply default theme
        this.applyTheme(themes[0]);
    }
    
    // Check if current theme index is valid
    validateThemeIndex() {
        if (this.currentThemeIndex >= themes.length) {
            this.currentThemeIndex = 0; // Reset to default theme
            this.applyTheme(themes[0]);
        }
    }
    
    createThemeSwitcherUI() {
        // Create theme switcher container
        const themeContainer = document.createElement('div');
        themeContainer.className = 'theme-switcher';
        
        // Create theme button
        const themeButton = document.createElement('button');
        themeButton.className = 'theme-button';
        themeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path></svg>';
        themeButton.title = 'Change Theme';
        
        // Create theme dropdown
        const themeDropdown = document.createElement('div');
        themeDropdown.className = 'theme-dropdown';
        
        // Add theme options to dropdown
        themes.forEach((theme, index) => {
            const themeOption = document.createElement('button');
            themeOption.className = 'theme-option';
            themeOption.textContent = theme.name;
            themeOption.addEventListener('click', () => {
                this.currentThemeIndex = index;
                this.applyTheme(theme);
                themeDropdown.classList.remove('active');
            });
            themeDropdown.appendChild(themeOption);
        });
        
        // Toggle dropdown on button click
        themeButton.addEventListener('click', () => {
            themeDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!themeContainer.contains(e.target)) {
                themeDropdown.classList.remove('active');
            }
        });
        
        // Append elements to container
        themeContainer.appendChild(themeButton);
        themeContainer.appendChild(themeDropdown);
        
        // Add container to document
        document.body.appendChild(themeContainer);
    }
    
    applyTheme(theme) {
        // Apply theme colors to CSS variables
        this.root.style.setProperty('--background', theme.colors.background);
        this.root.style.setProperty('--text-color', theme.colors.text);
        this.root.style.setProperty('--accent-color', theme.colors.accent);
        this.root.style.setProperty('--accent-color-2', theme.colors.accent2);
        this.root.style.setProperty('--card-color', theme.colors.card);
        this.root.style.setProperty('--particle-color', theme.colors.particleColor);
        
        // Update particle colors if particle system exists
        if (window.particleSystem) {
            window.particleSystem.updateColors(theme.colors.particleColor);
        }
        
        // Dispatch theme change event
        const event = new CustomEvent('themechange', { detail: theme });
        document.dispatchEvent(event);
    }
    
    nextTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % themes.length;
        this.validateThemeIndex();
        this.applyTheme(themes[this.currentThemeIndex]);
    }
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeSwitcher = new ThemeSwitcher();
});