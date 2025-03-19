document.addEventListener('DOMContentLoaded', async () => {
    // DOM elements
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const favoriteButton = document.getElementById('favorite-btn');
    const favoritesContainer = document.getElementById('favorites-container');
    const favoritesList = document.getElementById('favorites-list');
    
    // Current category and quote
    let currentCategory = 'all';
    let currentQuote = null;
    
    // Wait for quotes to be loaded
    if (!quotes.loaded) {
        await quotes.loadQuotes();
    }
    
    // Function to get a random quote from the current category
    function getRandomQuote() {
        const categoryQuotes = quotes[currentCategory];
        const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
        return categoryQuotes[randomIndex];
    }
    
    // Function to display a new quote with enhanced animations
    function displayNewQuote() {
        const quote = getRandomQuote();
        currentQuote = quote;
        const quoteContainer = document.querySelector('.quote-container');
        
        // Update favorite button state
        updateFavoriteButtonState();
        
        // Add fade-out and transform effect
        quoteElement.style.opacity = 0;
        quoteElement.style.transform = 'translateY(20px)';
        authorElement.style.opacity = 0;
        authorElement.style.transform = 'translateY(20px)';
        
        // Add a subtle shake effect to the container
        quoteContainer.classList.add('shake-effect');
        
        // Trigger confetti effect
        if (window.confettiEffect) {
            window.confettiEffect.trigger();
        }
        
        // Use flip effect if available
        let useFlipEffect = false;
        if (window.flipEffect) {
            useFlipEffect = window.flipEffect.flip();
        }
        
        // Update quote and author after a short delay
        // If using flip effect, wait for half the flip duration
        const updateDelay = useFlipEffect ? window.flipEffect.flipDuration / 2 : 300;
        
        setTimeout(() => {
            // Use typewriter effect if available
            if (window.typewriterEffect) {
                window.typewriterEffect.typeText(quoteElement, quote.text, () => {
                    // After typing is complete, show the author with a fade-in
                    authorElement.textContent = `— ${quote.author}`;
                    authorElement.style.opacity = 1;
                    authorElement.style.transform = 'translateY(0)';
                });
            } else {
                // Fallback if typewriter effect is not available
                quoteElement.textContent = quote.text;
                authorElement.textContent = `— ${quote.author}`;
            }
            
            // Add fade-in and transform effect for quote container
            quoteElement.style.opacity = 1;
            quoteElement.style.transform = 'translateY(0)';
            
            // Remove shake effect
            setTimeout(() => {
                quoteContainer.classList.remove('shake-effect');
            }, 500);
        }, updateDelay);
    }
    
    // Event listener for the new quote button
    newQuoteButton.addEventListener('click', displayNewQuote);
    
    // Event listeners for category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active category
            currentCategory = button.getAttribute('data-category');
            
            // Update active button styling
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/hide favorites container
            if (currentCategory === 'favorites') {
                displayFavorites();
                favoritesContainer.classList.remove('hidden');
            } else {
                favoritesContainer.classList.add('hidden');
                // Display a new quote from the selected category
                displayNewQuote();
            }
        });
    });
    
    // Function to update favorite button state
    function updateFavoriteButtonState() {
        if (currentQuote && window.favoritesManager.isFavorite(currentQuote)) {
            favoriteButton.classList.add('active');
        } else {
            favoriteButton.classList.remove('active');
        }
    }
    
    // Function to display favorites
    function displayFavorites() {
        // Clear current favorites list
        favoritesList.innerHTML = '';
        
        // Get all favorites
        const favorites = window.favoritesManager.getAllFavorites();
        
        if (favorites.length === 0) {
            // Display message if no favorites
            favoritesList.innerHTML = '<p class="no-favorites">You haven\'t saved any favorites yet.</p>';
            return;
        }
        
        // Create and append favorite items
        favorites.forEach(favorite => {
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            
            const quoteText = document.createElement('p');
            quoteText.className = 'quote-text';
            quoteText.textContent = favorite.text;
            
            const quoteAuthor = document.createElement('p');
            quoteAuthor.className = 'quote-author';
            quoteAuthor.textContent = `— ${favorite.author}`;
            
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-favorite';
            removeButton.innerHTML = '&times;';
            removeButton.title = 'Remove from favorites';
            
            // Add event listener to remove button
            removeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                window.favoritesManager.removeFavorite(favorite);
                displayFavorites();
                
                // Update favorite button state if current quote
                if (currentQuote && 
                    currentQuote.text === favorite.text && 
                    currentQuote.author === favorite.author) {
                    updateFavoriteButtonState();
                }
            });
            
            favoriteItem.appendChild(quoteText);
            favoriteItem.appendChild(quoteAuthor);
            favoriteItem.appendChild(removeButton);
            favoritesList.appendChild(favoriteItem);
        });
    }
    
    // Event listener for favorite button
    favoriteButton.addEventListener('click', () => {
        if (!currentQuote) return;
        
        if (window.favoritesManager.isFavorite(currentQuote)) {
            // Remove from favorites
            window.favoritesManager.removeFavorite(currentQuote);
            favoriteButton.classList.remove('active');
        } else {
            // Add to favorites
            window.favoritesManager.addFavorite(currentQuote);
            favoriteButton.classList.add('active');
            
            // Show brief animation/feedback
            favoriteButton.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.3)' },
                { transform: 'scale(1)' }
            ], {
                duration: 500,
                easing: 'ease-in-out'
            });
        }
        
        // Update favorites display if visible
        if (currentCategory === 'favorites') {
            displayFavorites();
        }
    });
    
    // Add transition effect to quote and author elements
    quoteElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    authorElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Display a random quote on page load
    displayNewQuote();
});