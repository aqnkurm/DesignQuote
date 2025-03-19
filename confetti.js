// Confetti effect for quote generator
class ConfettiEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.confetti = [];
        this.animationId = null;
        this.isActive = false;
        
        // Initialize
        this.init();
    }
    
    init() {
        // Set up canvas
        this.canvas.className = 'confetti-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1000';
        document.body.appendChild(this.canvas);
        
        // Set canvas size
        this.resizeCanvas();
        
        // Listen for window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    // Create a single confetti piece
    createConfetti() {
        // Get theme colors
        const root = document.documentElement;
        const accentColor = getComputedStyle(root).getPropertyValue('--accent-color').trim();
        const accentColor2 = getComputedStyle(root).getPropertyValue('--accent-color-2').trim();
        
        // Confetti colors - use theme colors plus some fun extras
        const colors = [
            accentColor,
            accentColor2,
            '#FFD700', // Gold
            '#FF6B6B', // Light red
            '#4ECDC4', // Turquoise
            '#FF8C42'  // Orange
        ];
        
        return {
            x: Math.random() * this.canvas.width,
            y: -20, // Start above the screen
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: Math.random() > 0.5 ? 'circle' : 'rect',
            speedX: Math.random() * 6 - 3,
            speedY: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        };
    }
    
    // Trigger confetti explosion
    trigger() {
        // Clear any existing animation
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Reset confetti array
        this.confetti = [];
        
        // Create new confetti pieces
        for (let i = 0; i < 100; i++) {
            this.confetti.push(this.createConfetti());
        }
        
        // Start animation
        this.isActive = true;
        this.animate();
        
        // Auto-stop after 4 seconds
        setTimeout(() => {
            this.isActive = false;
        }, 4000);
    }
    
    // Animation loop
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw confetti
        for (let i = 0; i < this.confetti.length; i++) {
            const c = this.confetti[i];
            
            // Update position
            c.x += c.speedX;
            c.y += c.speedY;
            c.rotation += c.rotationSpeed;
            
            // Draw confetti
            this.ctx.save();
            this.ctx.translate(c.x, c.y);
            this.ctx.rotate((c.rotation * Math.PI) / 180);
            this.ctx.fillStyle = c.color;
            
            if (c.shape === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
            }
            
            this.ctx.restore();
            
            // Remove confetti if it's off-screen
            if (c.y > this.canvas.height + 20) {
                this.confetti.splice(i, 1);
                i--;
            }
        }
        
        // Continue animation if active or if confetti still exists
        if (this.isActive || this.confetti.length > 0) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else {
            this.animationId = null;
        }
    }
}

// Initialize confetti effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.confettiEffect = new ConfettiEffect();
});