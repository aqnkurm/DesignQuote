// Favorites manager for quote generator
class FavoritesManager {
    constructor() {
        this.favorites = [];
        this.loadFromLocalStorage();
    }
    
    // Load favorites from local storage
    loadFromLocalStorage() {
        const storedFavorites = localStorage.getItem('favoriteQuotes');
        if (storedFavorites) {
            try {
                this.favorites = JSON.parse(storedFavorites);
            } catch (error) {
                console.error('Error loading favorites:', error);
                this.favorites = [];
            }
        }
    }
    
    // Save favorites to local storage
    saveToLocalStorage() {
        localStorage.setItem('favoriteQuotes', JSON.stringify(this.favorites));
    }
    
    // Add a quote to favorites
    addFavorite(quote) {
        // Check if quote already exists in favorites
        const exists = this.favorites.some(fav => 
            fav.text === quote.text && fav.author === quote.author);
            
        if (!exists) {
            this.favorites.push(quote);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }
    
    // Remove a quote from favorites
    removeFavorite(quote) {
        const initialLength = this.favorites.length;
        this.favorites = this.favorites.filter(fav => 
            !(fav.text === quote.text && fav.author === quote.author));
            
        if (initialLength !== this.favorites.length) {
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }
    
    // Check if a quote is in favorites
    isFavorite(quote) {
        return this.favorites.some(fav => 
            fav.text === quote.text && fav.author === quote.author);
    }
    
    // Get all favorites
    getAllFavorites() {
        return this.favorites;
    }
    
    // Clear all favorites
    clearAllFavorites() {
        this.favorites = [];
        this.saveToLocalStorage();
    }
}

// Initialize favorites manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.favoritesManager = new FavoritesManager();
});