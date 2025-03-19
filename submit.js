// Quote submission and sharing functionality
class QuoteManager {
    constructor() {
        this.userQuotes = [];
        this.loadUserQuotes();
        this.initShareButton();
        this.initSubmitButton();
        this.initModal();
    }
    
    // Load user-submitted quotes from local storage
    loadUserQuotes() {
        const storedQuotes = localStorage.getItem('userSubmittedQuotes');
        if (storedQuotes) {
            try {
                this.userQuotes = JSON.parse(storedQuotes);
            } catch (error) {
                console.error('Error loading user quotes:', error);
                this.userQuotes = [];
            }
        }
    }
    
    // Save user-submitted quotes to local storage
    saveUserQuotes() {
        localStorage.setItem('userSubmittedQuotes', JSON.stringify(this.userQuotes));
    }
    
    // Add a new user-submitted quote
    addUserQuote(quote) {
        // Add category for user-submitted quotes
        quote.category = 'user';
        this.userQuotes.push(quote);
        this.saveUserQuotes();
        
        // Add to quotes collection if it exists
        if (window.quotes && window.quotes.all) {
            window.quotes.all.push(quote);
            // Also add to user category if it doesn't exist
            if (!window.quotes.user) {
                window.quotes.user = [];
            }
            window.quotes.user.push(quote);
        }
        
        return true;
    }
    
    // Initialize share button
    initShareButton() {
        // Create share button
        const shareBtn = document.createElement('button');
        shareBtn.id = 'share-btn';
        shareBtn.className = 'share-btn';
        shareBtn.title = 'Share this quote';
        shareBtn.innerHTML = '🔗';
        
        // Add to quote container
        const quoteContainer = document.querySelector('.quote-container');
        if (quoteContainer) {
            quoteContainer.appendChild(shareBtn);
            
            // Add event listener
            shareBtn.addEventListener('click', () => this.shareQuote());
        }
    }
    
    // Initialize submit button
    initSubmitButton() {
        // Create submit button
        const submitBtn = document.createElement('button');
        submitBtn.id = 'submit-quote-btn';
        submitBtn.className = 'btn submit-btn';
        submitBtn.textContent = 'Submit a Quote';
        
        // Add to controls
        const controls = document.querySelector('.controls');
        if (controls) {
            controls.appendChild(submitBtn);
            
            // Add event listener
            submitBtn.addEventListener('click', () => this.openSubmitModal());
        }
        
        // Add user category button if it doesn't exist
        const categoriesDiv = document.querySelector('.categories');
        if (categoriesDiv) {
            const userCategoryExists = Array.from(categoriesDiv.children).some(
                btn => btn.getAttribute('data-category') === 'user'
            );
            
            if (!userCategoryExists) {
                const userCategoryBtn = document.createElement('button');
                userCategoryBtn.className = 'category-btn';
                userCategoryBtn.setAttribute('data-category', 'user');
                userCategoryBtn.textContent = 'My Quotes';
                categoriesDiv.appendChild(userCategoryBtn);
                
                // Add event listener (same as other category buttons)
                userCategoryBtn.addEventListener('click', () => {
                    // Update active category
                    const currentCategory = 'user';
                    
                    // Update active button styling
                    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                    userCategoryBtn.classList.add('active');
                    
                    // Hide favorites container
                    const favoritesContainer = document.getElementById('favorites-container');
                    if (favoritesContainer) {
                        favoritesContainer.classList.add('hidden');
                    }
                    
                    // Display a new quote from user category
                    if (window.displayNewQuote) {
                        window.currentCategory = 'user';
                        window.displayNewQuote();
                    }
                });
            }
        }
    }
    
    // Initialize modal
    initModal() {
        // Create modal container
        const modal = document.createElement('div');
        modal.id = 'submit-modal';
        modal.className = 'modal hidden';
        
        // Create modal content
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Submit Your Quote</h2>
                <form id="quote-form">
                    <div class="form-group">
                        <label for="quote-text">Quote:</label>
                        <textarea id="quote-text" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="quote-author">Author:</label>
                        <input type="text" id="quote-author" required>
                    </div>
                    <button type="submit" class="btn">Submit</button>
                </form>
                <div id="submission-message" class="hidden"></div>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(modal);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => this.closeSubmitModal());
        
        // Close when clicking outside the modal
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeSubmitModal();
            }
        });
        
        // Form submission
        const form = document.getElementById('quote-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitQuote();
        });
    }
    
    // Open submit modal
    openSubmitModal() {
        const modal = document.getElementById('submit-modal');
        if (modal) {
            modal.classList.remove('hidden');
            // Reset form
            const form = document.getElementById('quote-form');
            if (form) form.reset();
            // Hide message
            const message = document.getElementById('submission-message');
            if (message) message.classList.add('hidden');
        }
    }
    
    // Close submit modal
    closeSubmitModal() {
        const modal = document.getElementById('submit-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    // Submit quote
    submitQuote() {
        const quoteText = document.getElementById('quote-text').value.trim();
        const quoteAuthor = document.getElementById('quote-author').value.trim();
        
        if (quoteText && quoteAuthor) {
            // Create quote object
            const quote = {
                text: quoteText,
                author: quoteAuthor
            };
            
            // Add to user quotes
            this.addUserQuote(quote);
            
            // Show success message
            const message = document.getElementById('submission-message');
            if (message) {
                message.textContent = 'Your quote has been submitted successfully!';
                message.className = 'success-message';
                message.classList.remove('hidden');
                
                // Hide message after 3 seconds
                setTimeout(() => {
                    this.closeSubmitModal();
                }, 3000);
            }
        }
    }
    
    // Share quote
    shareQuote() {
        const quoteElement = document.getElementById('quote');
        const authorElement = document.getElementById('author');
        
        if (quoteElement && authorElement) {
            const quoteText = quoteElement.textContent;
            const authorText = authorElement.textContent;
            const shareText = `"${quoteText}" ${authorText}`;
            
            // Check if Web Share API is available
            if (navigator.share) {
                navigator.share({
                    title: 'Design Inspiration Quote',
                    text: shareText
                }).catch(error => {
                    console.error('Error sharing:', error);
                    this.fallbackShare(shareText);
                });
            } else {
                this.fallbackShare(shareText);
            }
        }
    }
    
    // Fallback share method (copy to clipboard)
    fallbackShare(text) {
        // Create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = 0;
        document.body.appendChild(textarea);
        
        // Select and copy text
        textarea.select();
        document.execCommand('copy');
        
        // Remove textarea
        document.body.removeChild(textarea);
        
        // Show copied notification
        this.showCopiedNotification();
    }
    
    // Show copied notification
    showCopiedNotification() {
        // Check if notification already exists
        let notification = document.getElementById('copy-notification');
        
        if (!notification) {
            // Create notification
            notification = document.createElement('div');
            notification.id = 'copy-notification';
            notification.className = 'notification';
            notification.textContent = 'Quote copied to clipboard!';
            document.body.appendChild(notification);
        }
        
        // Show notification
        notification.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Initialize quote manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quoteManager = new QuoteManager();
});