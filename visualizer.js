// Quote Visualizer - Generates abstract art based on quote content
class QuoteVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentQuote = '';
        this.currentAuthor = '';
        this.colors = [];
        this.shapes = [];
        this.animationFrame = null;
        
        // Initialize
        this.init();
    }
    
    init() {
        // Set up canvas
        this.canvas.className = 'quote-visualizer-canvas';
        this.container.appendChild(this.canvas);
        
        // Set initial size
        this.resize();
        
        // Listen for window resize
        window.addEventListener('resize', () => this.resize());
        
        // Listen for theme changes
        document.addEventListener('themechange', (e) => {
            this.updateColors(e.detail.colors);
            this.generateVisualization();
        });
    }
    
    resize() {
        const containerRect = this.container.getBoundingClientRect();
        this.canvas.width = containerRect.width;
        this.canvas.height = 200; // Fixed height for visualization
    }
    
    updateColors(themeColors) {
        // Extract colors from theme
        this.colors = [
            themeColors.accent,
            themeColors.accent2,
            themeColors.text
        ];
    }
    
    setQuote(text, author) {
        this.currentQuote = text;
        this.currentAuthor = author;
    }
    
    // Helper methods
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    
    seededRandom(seed) {
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    }
    
    containsDesignKeywords(text) {
        const keywords = ['design', 'art', 'creative', 'visual', 'color', 'form', 'shape', 'space'];
        const lowerText = text.toLowerCase();
        return keywords.some(keyword => lowerText.includes(keyword));
    }
}

// Initialize visualizer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create visualizer container
    const visualizerContainer = document.createElement('div');
    visualizerContainer.id = 'quote-visualizer';
    visualizerContainer.className = 'quote-visualizer';
    
    // Insert visualizer before controls
    const controls = document.querySelector('.controls');
    controls.parentNode.insertBefore(visualizerContainer, controls);
    
    // Initialize visualizer
    const visualizer = new QuoteVisualizer('quote-visualizer');
    
    // Update visualizer when quote changes
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    
    // Observer for quote changes
    const observer = new MutationObserver(() => {
        visualizer.setQuote(
            quoteElement.textContent,
            authorElement.textContent.replace('— ', '')
        );
    });
    
    // Start observing
    observer.observe(quoteElement, { childList: true, characterData: true, subtree: true });
    
    // Set initial quote
    visualizer.setQuote(
        quoteElement.textContent,
        authorElement.textContent.replace('— ', '')
    );
});