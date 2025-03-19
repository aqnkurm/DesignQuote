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
        this.animating = false;
        this.particles = [];
        
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
        this.generateVisualization();
    }
    
    // Generate visualization based on quote content
    generateVisualization() {
        // Clear any existing animation
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // If no quote, exit
        if (!this.currentQuote) return;
        
        // Generate a hash from the quote text for consistent randomness
        const hash = this.hashString(this.currentQuote);
        const random = this.seededRandom(hash);
        
    }
};