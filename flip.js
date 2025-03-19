// 3D Flip effect for quote container
class FlipEffect {
    constructor() {
        this.container = null;
        this.isFlipping = false;
        this.flipDuration = 1000; // Duration of flip animation in ms
        
        // Initialize when DOM is loaded
        this.init();
    }
    
    init() {
        // Find quote container
        this.container = document.querySelector('.quote-container');
        
        if (!this.container) {
            console.error('Quote container not found');
            return;
        }
        
        // Add perspective to container's parent for 3D effect
        this.container.parentElement.style.perspective = '1000px';
        
        // Add transition for smooth animation
        this.container.style.transition = `transform ${this.flipDuration/1000}s ease-in-out`;
        this.container.style.transformStyle = 'preserve-3d';
    }
    
    // Flip the container
    flip() {
        if (!this.container || this.isFlipping) return;
        
        this.isFlipping = true;
        
        // First half of flip (front to edge)
        this.container.style.transform = 'rotateY(90deg)';
        
        // After half duration, complete the flip
        setTimeout(() => {
            this.container.style.transform = 'rotateY(0deg)';
            
            // Reset flipping state after animation completes
            setTimeout(() => {
                this.isFlipping = false;
            }, this.flipDuration / 2);
        }, this.flipDuration / 2);
        
        return true;
    }
    
    // Set flip duration
    setDuration(duration) {
        this.flipDuration = duration;
        this.container.style.transition = `transform ${this.flipDuration/1000}s ease-in-out`;
    }
}

// Initialize flip effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.flipEffect = new FlipEffect();
});