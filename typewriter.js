// Typewriter effect for quote text
class TypewriterEffect {
    constructor() {
        this.speed = 30; // Speed of typing in milliseconds
        this.currentText = '';
        this.currentIndex = 0;
        this.element = null;
        this.callback = null;
        this.isActive = false;
    }
    
    // Type text into an element
    typeText(element, text, callback = null) {
        // If already typing, stop current typing
        if (this.isActive) {
            this.stop();
        }
        
        this.element = element;
        this.currentText = text;
        this.currentIndex = 0;
        this.callback = callback;
        this.isActive = true;
        
        // Store original text and clear element
        const originalText = text;
        this.element.textContent = '';
        
        // Start typing
        this.typeNextCharacter();
        
        return originalText; // Return original text for reference
    }
    
    // Type the next character
    typeNextCharacter() {
        if (!this.isActive) return;
        
        if (this.currentIndex < this.currentText.length) {
            // Add next character
            this.element.textContent += this.currentText.charAt(this.currentIndex);
            this.currentIndex++;
            
            // Schedule next character
            setTimeout(() => this.typeNextCharacter(), this.speed);
        } else {
            // Typing complete
            this.isActive = false;
            
            // Call callback if provided
            if (typeof this.callback === 'function') {
                this.callback();
            }
        }
    }
    
    // Stop typing
    stop() {
        this.isActive = false;
        
        // If element exists, fill with complete text
        if (this.element && this.currentText) {
            this.element.textContent = this.currentText;
        }
        
        // Reset
        this.element = null;
        this.currentText = '';
        this.currentIndex = 0;
    }
    
    // Set typing speed
    setSpeed(speed) {
        this.speed = speed;
    }
}

// Initialize typewriter effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.typewriterEffect = new TypewriterEffect();
});