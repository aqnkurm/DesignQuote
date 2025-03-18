document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Current category
    let currentCategory = 'all';
    
    // Function to get a random quote from the current category
    function getRandomQuote() {
        const categoryQuotes = quotes[currentCategory];
        const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
        return categoryQuotes[randomIndex];
    }
    
    // Function to display a new quote
    function displayNewQuote() {
        const quote = getRandomQuote();
        
        // Add fade-out effect
        quoteElement.style.opacity = 0;
        authorElement.style.opacity = 0;
        
        // Update quote and author after a short delay
        setTimeout(() => {
            quoteElement.textContent = quote.text;
            authorElement.textContent = `— ${quote.author}`;
            
            // Add fade-in effect
            quoteElement.style.opacity = 1;
            authorElement.style.opacity = 1;
        }, 300);
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
            
            // Display a new quote from the selected category
            displayNewQuote();
        });
    });
    
    // Add transition effect to quote and author elements
    quoteElement.style.transition = 'opacity 0.3s ease';
    authorElement.style.transition = 'opacity 0.3s ease';
    
    // Display a random quote on page load
    displayNewQuote();
});