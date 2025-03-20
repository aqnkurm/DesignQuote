// AI-Generated Quotes Module
const aiQuotes = {
    // Initialize with empty array for AI-generated quotes
    ai: [],
    
    // Templates for different design themes
    templates: {
        graphic: [
            "The essence of {concept} is finding balance between {element1} and {element2}.",
            "{concept} isn't just about aesthetics, it's about communicating {element1} through {element2}.",
            "Great {concept} happens when {element1} meets {element2} in perfect harmony.",
            "The power of {concept} lies in transforming {element1} into {element2}.",
            "When designing with {concept} in mind, always remember that {element1} leads to {element2}."
        ],
        ux: [
            "The best {concept} is invisible, allowing users to focus on {element1} without noticing {element2}.",
            "Good {concept} anticipates user needs by balancing {element1} with {element2}.",
            "Successful {concept} creates a seamless journey from {element1} to {element2}.",
            "{concept} should solve problems by connecting {element1} with {element2} intuitively.",
            "The measure of effective {concept} is how easily users can navigate from {element1} to {element2}."
        ],
        product: [
            "Innovative {concept} transforms {element1} into {element2} that users didn't know they needed.",
            "The future of {concept} depends on how well we integrate {element1} with {element2}.",
            "Successful {concept} creates solutions where {element1} enhances {element2}.",
            "When {concept} is done right, {element1} becomes indistinguishable from {element2}.",
            "The evolution of {concept} is about finding new ways to connect {element1} with {element2}."
        ]
    },
    
    // Design concepts for each category
    concepts: {
        graphic: ["visual communication", "typography", "composition", "color theory", "brand identity", "visual hierarchy", "graphic design", "illustration", "layout design", "visual storytelling"],
        ux: ["user experience", "interaction design", "usability", "information architecture", "user interface", "accessibility", "user research", "UX design", "user journey", "design thinking"],
        product: ["product design", "innovation", "functionality", "user-centered design", "product development", "design strategy", "industrial design", "product experience", "design process", "solution design"]
    },
    
    // Design elements for each category
    elements: {
        graphic: [
            "form", "space", "texture", "balance", "contrast", "rhythm", "harmony", "proportion", 
            "dominance", "unity", "minimalism", "typography", "color", "white space", "grid systems", 
            "visual weight", "alignment", "proximity", "repetition", "direction", "movement", "depth", 
            "perspective", "symmetry", "asymmetry", "pattern", "focal point", "hierarchy", "scale", "emphasis"
        ],
        ux: [
            "usability", "accessibility", "user flow", "navigation", "interaction", "feedback", 
            "affordance", "consistency", "efficiency", "learnability", "satisfaction", "error prevention", 
            "recognition", "flexibility", "control", "discoverability", "responsiveness", "clarity", 
            "context", "simplicity", "familiarity", "predictability", "transparency", "trust", 
            "engagement", "delight", "personalization", "adaptability", "intuitiveness", "guidance"
        ],
        product: [
            "functionality", "aesthetics", "ergonomics", "durability", "sustainability", "innovation", 
            "utility", "efficiency", "reliability", "performance", "adaptability", "scalability", 
            "maintainability", "compatibility", "integration", "customization", "simplicity", "versatility", 
            "accessibility", "affordability", "convenience", "safety", "quality", "consistency", 
            "modularity", "precision", "elegance", "intuitiveness", "desirability", "value"
        ]
    },
    
    // Famous designers for each category
    designers: {
        graphic: [
            "Paul Rand", "Saul Bass", "Milton Glaser", "Stefan Sagmeister", "Paula Scher", 
            "David Carson", "Massimo Vignelli", "Chip Kidd", "Neville Brody", "Jessica Walsh", 
            "Michael Bierut", "Pentagram", "April Greiman", "Herb Lubalin", "Bradbury Thompson"
        ],
        ux: [
            "Don Norman", "Jakob Nielsen", "Steve Krug", "Jared Spool", "Luke Wroblewski", 
            "Jesse James Garrett", "Alan Cooper", "Aarron Walter", "Jane Fulton Suri", "Bill Buxton", 
            "Cennydd Bowles", "Whitney Hess", "Karen Holtzblatt", "Kim Goodwin", "Mike Monteiro"
        ],
        product: [
            "Dieter Rams", "Jonathan Ive", "James Dyson", "Yves Béhar", "Karim Rashid", 
            "Philippe Starck", "Naoto Fukasawa", "Marc Newson", "Jasper Morrison", "Patricia Urquiola", 
            "Charles and Ray Eames", "Konstantin Grcic", "Ross Lovegrove", "Hella Jongerius", "Ronan and Erwan Bouroullec"
        ]
    },
    
    // Generate a quote using template-based generation
    async generateQuote(category = 'all') {
        // If category is 'all' or 'ai', randomly select one of the three categories
        if (category === 'all' || category === 'ai') {
            const categories = ['graphic', 'ux', 'product'];
            category = categories[Math.floor(Math.random() * categories.length)];
        }
        
        // Select a random template for the category
        const template = this.templates[category][Math.floor(Math.random() * this.templates[category].length)];
        
        // Select random concept and elements
        const concept = this.concepts[category][Math.floor(Math.random() * this.concepts[category].length)];
        const element1 = this.elements[category][Math.floor(Math.random() * this.elements[category].length)];
        
        // Make sure element2 is different from element1
        let element2;
        do {
            element2 = this.elements[category][Math.floor(Math.random() * this.elements[category].length)];
        } while (element2 === element1);
        
        // Generate the quote text by replacing placeholders
        const text = template
            .replace('{concept}', concept)
            .replace('{element1}', element1)
            .replace('{element2}', element2);
        
        // Select a random designer as the author
        const author = this.designers[category][Math.floor(Math.random() * this.designers[category].length)] + ' (AI)'; 
        
        // Create and return the quote object
        const quote = {
            text,
            author,
            isAI: true,
            category: category
        };
        
        // Add to AI quotes collection
        this.ai.push(quote);
        
        return quote;
    },
    
    // Get all AI-generated quotes
    getAllAIQuotes() {
        return this.ai;
    },
    
    // Clear all AI-generated quotes
    clearAIQuotes() {
        this.ai = [];
        return true;
    }
};

// Make aiQuotes available globally
window.aiQuotes = aiQuotes;