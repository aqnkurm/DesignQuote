// Quote Image Generator
class QuoteImageGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.modal = null;
        this.currentQuote = null;
        this.currentTheme = null;
        
        // Default image settings
        this.settings = {
            width: 1200,
            height: 630,
            fontFamily: 'Playfair Display, serif',
            fontSize: 48,
            padding: 60,
            borderRadius: 15,
            showAuthor: true,
            showQuotationMarks: true
        };
        
        // Initialize the generator
        this.init();
        
        // Listen for theme changes
        document.addEventListener('themechange', (e) => {
            this.currentTheme = e.detail;
            this.updatePreview();
        });
    }
    
    init() {
        // Create the modal for image generation
        this.createModal();
        
        // Add download button to quote container
        this.addDownloadButton();
    }
    
    addDownloadButton() {
        const quoteContainer = document.querySelector('.quote-container');
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        downloadBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4 4 4-4"></path></svg>';
        downloadBtn.title = 'Create Image';
        
        downloadBtn.addEventListener('click', () => {
            // Get current quote
            const quoteText = document.getElementById('quote').textContent;
            const authorText = document.getElementById('author').textContent.replace('— ', '');
            
            this.currentQuote = {
                text: quoteText,
                author: authorText
            };
            
            // Get current theme
            this.currentTheme = themes[window.themeSwitcher.currentThemeIndex];
            
            // Show the modal
            this.showModal();
            
            // Generate preview
            this.updatePreview();
        });
        
        // Insert the download button before the share button
        const shareBtn = quoteContainer.querySelector('#share-btn');
        if (shareBtn) {
            quoteContainer.insertBefore(downloadBtn, shareBtn);
        } else {
            quoteContainer.appendChild(downloadBtn);
        }
    }
    
    createModal() {
        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = 'modal hidden';
        this.modal.id = 'image-generator-modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        // Add close button
        const closeButton = document.createElement('span');
        closeButton.className = 'close-modal';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => this.hideModal());
        
        // Add title
        const title = document.createElement('h2');
        title.textContent = 'Create Quote Image';
        
        // Create preview container
        const previewContainer = document.createElement('div');
        previewContainer.style.width = '100%';
        previewContainer.style.marginBottom = '20px';
        previewContainer.style.textAlign = 'center';
        
        // Add canvas to preview container
        this.canvas.style.maxWidth = '100%';
        this.canvas.style.height = 'auto';
        this.canvas.style.borderRadius = '10px';
        this.canvas.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        previewContainer.appendChild(this.canvas);
        
        // Create settings container
        const settingsContainer = document.createElement('div');
        settingsContainer.className = 'form-group';
        
        // Add settings options
        // Define image size presets
        const imageSizes = [
            { name: 'Landscape (1200×630)', width: 1200, height: 630 },
            { name: 'Square (1080×1080)', width: 1080, height: 1080 },
            { name: 'Portrait (1080×1350)', width: 1080, height: 1350 },
            { name: 'Twitter Post (1200×675)', width: 1200, height: 675 },
            { name: 'Instagram Story (1080×1920)', width: 1080, height: 1920 },
            { name: 'Facebook Cover (851×315)', width: 851, height: 315 }
        ];
        
        // Size selector
        const sizeContainer = document.createElement('div');
        sizeContainer.style.display = 'flex';
        sizeContainer.style.alignItems = 'center';
        sizeContainer.style.marginBottom = '15px';
        
        const sizeLabel = document.createElement('label');
        sizeLabel.textContent = 'Image Size:';
        sizeLabel.style.marginRight = '10px';
        
        const sizeSelect = document.createElement('select');
        sizeSelect.id = 'size-select';
        sizeSelect.style.padding = '5px';
        sizeSelect.style.borderRadius = '4px';
        sizeSelect.style.border = '1px solid #ccc';
        
        // Add size options
        imageSizes.forEach((size, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = size.name;
            // Set default size as selected (Landscape)
            if (index === 0) {
                option.selected = true;
            }
            sizeSelect.appendChild(option);
        });
        
        // Add event listener for size change
        sizeSelect.addEventListener('change', (e) => {
            const selectedIndex = parseInt(e.target.value);
            const selectedSize = imageSizes[selectedIndex];
            this.settings.width = selectedSize.width;
            this.settings.height = selectedSize.height;
            this.updatePreview();
        });
        
        sizeContainer.appendChild(sizeLabel);
        sizeContainer.appendChild(sizeSelect);
        
        // Theme selector
        const themeContainer = document.createElement('div');
        themeContainer.style.display = 'flex';
        themeContainer.style.alignItems = 'center';
        themeContainer.style.marginBottom = '15px';
        
        const themeLabel = document.createElement('label');
        themeLabel.textContent = 'Theme:';
        themeLabel.style.marginRight = '10px';
        
        const themeSelect = document.createElement('select');
        themeSelect.id = 'theme-select';
        themeSelect.style.padding = '5px';
        themeSelect.style.borderRadius = '4px';
        themeSelect.style.border = '1px solid #ccc';
        
        // Add theme options
        themes.forEach((theme, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = theme.name;
            // Set current theme as selected
            if (window.themeSwitcher && window.themeSwitcher.currentThemeIndex === index) {
                option.selected = true;
            }
            themeSelect.appendChild(option);
        });
        
        // Add event listener for theme change
        themeSelect.addEventListener('change', (e) => {
            const selectedIndex = parseInt(e.target.value);
            this.currentTheme = themes[selectedIndex];
            this.updatePreview();
        });
        
        themeContainer.appendChild(themeLabel);
        themeContainer.appendChild(themeSelect);
        
        // Show author toggle
        const authorContainer = document.createElement('div');
        authorContainer.style.display = 'flex';
        authorContainer.style.alignItems = 'center';
        authorContainer.style.marginBottom = '10px';
        
        const authorLabel = document.createElement('label');
        authorLabel.textContent = 'Show Author:';
        authorLabel.style.marginRight = '10px';
        
        const authorToggle = document.createElement('input');
        authorToggle.type = 'checkbox';
        authorToggle.checked = this.settings.showAuthor;
        authorToggle.addEventListener('change', (e) => {
            this.settings.showAuthor = e.target.checked;
            this.updatePreview();
        });
        
        authorContainer.appendChild(authorLabel);
        authorContainer.appendChild(authorToggle);
        
        // Show quotation marks toggle
        const quotesContainer = document.createElement('div');
        quotesContainer.style.display = 'flex';
        quotesContainer.style.alignItems = 'center';
        quotesContainer.style.marginBottom = '10px';
        
        const quotesLabel = document.createElement('label');
        quotesLabel.textContent = 'Show Quotation Marks:';
        quotesLabel.style.marginRight = '10px';
        
        const quotesToggle = document.createElement('input');
        quotesToggle.type = 'checkbox';
        quotesToggle.checked = this.settings.showQuotationMarks;
        quotesToggle.addEventListener('change', (e) => {
            this.settings.showQuotationMarks = e.target.checked;
            this.updatePreview();
        });
        
        quotesContainer.appendChild(quotesLabel);
        quotesContainer.appendChild(quotesToggle);
        
        // Add settings to container
        settingsContainer.appendChild(sizeContainer);
        settingsContainer.appendChild(themeContainer);
        settingsContainer.appendChild(authorContainer);
        settingsContainer.appendChild(quotesContainer);
        
        // Create download button
        const downloadButton = document.createElement('button');
        downloadButton.className = 'btn submit-btn';
        downloadButton.textContent = 'Download Image';
        downloadButton.addEventListener('click', () => this.downloadImage());
        
        // Assemble modal content
        modalContent.appendChild(closeButton);
        modalContent.appendChild(title);
        modalContent.appendChild(previewContainer);
        modalContent.appendChild(settingsContainer);
        modalContent.appendChild(downloadButton);
        
        // Add modal content to modal
        this.modal.appendChild(modalContent);
        
        // Add modal to document
        document.body.appendChild(this.modal);
    }
    
    showModal() {
        this.modal.classList.remove('hidden');
    }
    
    hideModal() {
        this.modal.classList.add('hidden');
    }
    
    updatePreview() {
        if (!this.currentQuote || !this.currentTheme) return;
        
        // Set canvas dimensions
        this.canvas.width = this.settings.width;
        this.canvas.height = this.settings.height;
        
        // Get context and clear canvas
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Parse background gradient
        const bgGradient = this.parseGradient(this.currentTheme.colors.background);
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        
        if (bgGradient.type === 'linear') {
            bgGradient.stops.forEach(stop => {
                gradient.addColorStop(stop.position, stop.color);
            });
        }
        
        // Fill background
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add border if needed
        ctx.strokeStyle = this.currentTheme.colors.accent;
        ctx.lineWidth = 10;
        ctx.strokeRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
        
        // Set text styles
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw quotation mark if enabled
        if (this.settings.showQuotationMarks) {
            ctx.font = `120px ${this.settings.fontFamily}`;
            ctx.fillStyle = this.hexToRgba(this.currentTheme.colors.accent, 0.2);
            ctx.fillText('"', 100, 120);
        }
        
        // Draw quote text
        ctx.font = `${this.settings.fontSize}px ${this.settings.fontFamily}`;
        ctx.fillStyle = this.currentTheme.colors.text;
        
        // Wrap text to fit canvas
        const wrappedText = this.wrapText(ctx, this.currentQuote.text, this.canvas.width - (this.settings.padding * 2), this.settings.fontSize * 1.5);
        
        // Calculate text position
        const textY = this.canvas.height / 2 - (wrappedText.length * this.settings.fontSize * 0.8) / 2;
        
        // Draw each line of text
        wrappedText.forEach((line, index) => {
            ctx.fillText(line, this.canvas.width / 2, textY + (index * this.settings.fontSize * 1.5));
        });
        
        // Draw author if enabled
        if (this.settings.showAuthor && this.currentQuote.author) {
            ctx.font = `italic ${this.settings.fontSize * 0.7}px ${this.settings.fontFamily}`;
            ctx.fillStyle = this.currentTheme.colors.accent;
            ctx.fillText(`— ${this.currentQuote.author}`, this.canvas.width / 2, this.canvas.height - this.settings.padding);
        }
    }
    
    wrapText(ctx, text, maxWidth, lineHeight) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        
        lines.push(currentLine);
        return lines;
    }
    
    parseGradient(gradientStr) {
        // Default gradient if parsing fails
        const defaultGradient = {
            type: 'linear',
            stops: [
                { position: 0, color: '#f8f9fa' },
                { position: 1, color: '#e9ecef' }
            ]
        };
        
        // Try to parse linear-gradient
        if (gradientStr.includes('linear-gradient')) {
            try {
                // Extract content inside parentheses
                const content = gradientStr.match(/linear-gradient\(([^)]+)\)/)[1];
                
                // Split by comma
                const parts = content.split(',');
                
                // First part is the angle
                const angle = parts[0].trim();
                
                // Rest are color stops
                const stops = [];
                
                for (let i = 1; i < parts.length; i++) {
                    const stopParts = parts[i].trim().split(' ');
                    const color = stopParts[0];
                    const position = parseFloat(stopParts[1]) / 100;
                    
                    stops.push({
                        position: isNaN(position) ? (i - 1) / (parts.length - 2) : position,
                        color: color
                    });
                }
                
                return {
                    type: 'linear',
                    angle: angle,
                    stops: stops
                };
            } catch (e) {
                console.error('Error parsing gradient:', e);
                return defaultGradient;
            }
        }
        
        return defaultGradient;
    }
    
    hexToRgba(hex, alpha = 1) {
        // If it's already an rgba value, return it
        if (hex.startsWith('rgba')) return hex;
        
        // If it's an rgb value, convert to rgba
        if (hex.startsWith('rgb(')) {
            return hex.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
        }
        
        // Convert hex to rgba
        let r = 0, g = 0, b = 0;
        
        // 3 digits
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        // 6 digits
        else if (hex.length === 7) {
            r = parseInt(hex.substring(1, 3), 16);
            g = parseInt(hex.substring(3, 5), 16);
            b = parseInt(hex.substring(5, 7), 16);
        }
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    downloadImage() {
        // Create a temporary link element
        const link = document.createElement('a');
        link.download = `quote-${Date.now()}.png`;
        
        // Convert canvas to data URL
        link.href = this.canvas.toDataURL('image/png');
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show notification
        this.showNotification('Image downloaded successfully!');
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}