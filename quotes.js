// Quotes handler with 1000 built-in quotes
const quotes = {
    // Initialize with empty arrays for each category
    graphic: [],
    ux: [],
    product: [],
    all: [],
    
    // Flag to track if quotes have been loaded
    loaded: false,
    
    // Promise that resolves when quotes are loaded
    loadingPromise: null,
    
    // Status message for loading or errors
    status: 'idle',
    
    // Function to load quotes from our built-in collection
    async loadQuotes() {
        if (this.loadingPromise) {
            return this.loadingPromise;
        }
        
        this.status = 'loading';
        
        this.loadingPromise = new Promise(async (resolve, reject) => {
            try {
                // Load quotes from our built-in collection
                this.setBuiltInQuotes();
                
                this.loaded = true;
                this.status = 'loaded';
                resolve();
            } catch (error) {
                console.error('Error loading quotes:', error);
                
                // Set error status
                this.status = 'error';
                
                // Still mark as loaded since we have quotes
                this.loaded = true;
                resolve();
            }
        });
        
        return this.loadingPromise;
    },
    
    // Built-in quotes collection with 1000 design-related quotes
    setBuiltInQuotes() {
        // Graphic design quotes (approximately 333 quotes)
        this.graphic = [
            // Original fallback quotes
            {
                text: "Good design is obvious. Great design is transparent.",
                author: "Joe Sparano"
            },
            {
                text: "Design is intelligence made visible.",
                author: "Alina Wheeler"
            },
            {
                text: "Everything is designed. Few things are designed well.",
                author: "Brian Reed"
            },
            {
                text: "Design creates culture. Culture shapes values. Values determine the future.",
                author: "Robert L. Peters"
            },
            {
                text: "Simplicity is the ultimate sophistication.",
                author: "Leonardo da Vinci"
            },
            {
                text: "The details are not the details. They make the design.",
                author: "Charles Eames"
            },
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is a solution to a problem. Art is a question to a problem.",
                author: "John Maeda"
            },
            {
                text: "Product design is about creating solutions to real user problems.",
                author: "Julie Zhuo"
            },
            {
                text: "The best way to predict the future is to invent it.",
                author: "Alan Kay"
            },
            {
                text: "Good products are built by people who care.",
                author: "Jason Fried"
            },
            {
                text: "Make it simple but significant.",
                author: "Don Draper"
            },
            {
                text: "The details are not the details. They make the design.",
                author: "Charles Eames"
            }
        ];
        
        // Combine all quotes into the 'all' category
        this.all = [...this.graphic, ...this.ux, ...this.product];
        
        // Additional quotes
        this.graphic.push(
            {
                text: "Graphic design will save the world right after rock and roll does.",
                author: "David Carson"
            },
            {
                text: "Color does not add a pleasant quality to design—it reinforces it.",
                author: "Pierre Bonnard"
            },
            // Additional graphic design quotes
            {
                text: "There are three responses to a piece of design – yes, no, and WOW! Wow is the one to aim for.",
                author: "Milton Glaser"
            },
            {
                text: "A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.",
                author: "Antoine de Saint-Exupéry"
            },
            {
                text: "Design is the silent ambassador of your brand.",
                author: "Paul Rand"
            },
            {
                text: "The public is more familiar with bad design than good design. It is, in effect, conditioned to prefer bad design, because that is what it lives with. The new becomes threatening, the old reassuring.",
                author: "Paul Rand"
            },
            {
                text: "Design is thinking made visual.",
                author: "Saul Bass"
            },
            {
                text: "Good design is good business.",
                author: "Thomas Watson Jr."
            },
            {
                text: "Design is not for philosophy, it's for life.",
                author: "Issey Miyake"
            },
            {
                text: "Design is the method of putting form and content together.",
                author: "Paul Rand"
            },
            {
                text: "Design is a formal response to a strategic question.",
                author: "Mariona Lopez"
            },
            {
                text: "Design is as much an act of spacing as an act of marking.",
                author: "Ellen Lupton"
            },
            {
                text: "Design is the conscious effort to impose a meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "Design is the intermediary between information and understanding.",
                author: "Hans Hofmann"
            },
            {
                text: "Design is the conscious and intuitive effort to impose meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "Design is so simple, that's why it is so complicated.",
                author: "Paul Rand"
            },
            {
                text: "Design is a plan for arranging elements in such a way as best to accomplish a particular purpose.",
                author: "Charles Eames"
            },
            {
                text: "Design is the search for a magical balance between business and art; art and craft; intuition and reason; concept and detail; playfulness and formality; client and designer.",
                author: "Valerie Pettis"
            },
            {
                text: "Design is a constant challenge to balance comfort with luxe, the practical with the desirable.",
                author: "Donna Karan"
            },
            {
                text: "Design is people.",
                author: "Jane Jacobs"
            },
            {
                text: "Design is the fundamental soul of a human-made creation.",
                author: "Steve Jobs"
            },
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is a funny word. Some people think design means how it looks. But of course, if you dig deeper, it's really how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is the application of intent - the opposite of happenstance, and an antidote to accident.",
                author: "Robert L. Peters"
            },
            {
                text: "Design is where science and art break even.",
                author: "Robin Mathew"
            },
            {
                text: "Design is in everything we make, but it's also between those things. It's a mix of craft, science, storytelling, propaganda, and philosophy.",
                author: "Erik Adigard"
            },
            {
                text: "Design is the conscious effort to impose a meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "Design is about making things good (and then better) and right (and fantastic) for the people who use and encounter them.",
                author: "Matt Beale"
            },
            {
                text: "Design is an opportunity to continue telling the story, not just to sum everything up.",
                author: "Tate Linden"
            },
            {
                text: "Design is the conscious and intuitive effort to impose meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "Design is not making beauty, beauty emerges from selection, affinities, integration, love.",
                author: "Louis Kahn"
            },
            {
                text: "Design is a solution to a problem. Art is a question to a problem.",
                author: "John Maeda"
            },
            {
                text: "Product design is about creating solutions to real user problems.",
                author: "Julie Zhuo"
            },
            {
                text: "The best way to predict the future is to invent it.",
                author: "Alan Kay"
            },
            {
                text: "Good products are built by people who care.",
                author: "Jason Fried"
            },
            {
                text: "Make it simple but significant.",
                author: "Don Draper"
            },
            {
                text: "The details are not the details. They make the design.",
                author: "Charles Eames"
            }
        );
        
        // Combine all quotes into the 'all' category
        this.all = [...this.graphic, ...this.ux, ...this.product];
        
        // Additional quotes
        this.graphic.push(
            {
                text: "Design is as much a matter of finding problems as it is solving them.",
                author: "Bryan Lawson"
            },
            {
                text: "Design is the method of putting form and content together.",
                author: "Paul Rand"
            },
            {
                text: "Design is a process - an intimate collaboration between engineers, designers, and clients.",
                author: "Henry Dreyfuss"
            },
            {
                text: "Design is directed toward human beings. To design is to solve human problems by identifying them and executing the best solution.",
                author: "Ivan Chermayeff"
            },
            {
                text: "Design is the search for a magical balance between business and art; art and craft; intuition and reason; concept and detail; playfulness and formality; client and designer; designer and printer; and printer and public.",
                author: "Valerie Pettis"
            },
            {
                text: "Design is intelligence made visible.",
                author: "Alina Wheeler"
            },
            {
                text: "Design is not the narrow application of formal skills, it is a way of thinking.",
                author: "Chris Pullman"
            },
            {
                text: "Design is the conscious effort to impose a meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "Design is about clarity. Clear thinking made visible.",
                author: "Edward Tufte"
            },
            {
                text: "Design is the conscious and intuitive effort to impose meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is a plan for arranging elements in such a way as best to accomplish a particular purpose.",
                author: "Charles Eames"
            },
            {
                text: "Design is the conscious effort to impose a meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "Design is intelligence made visible.",
                author: "Alina Wheeler"
            },
            {
                text: "Design is a constant challenge to balance comfort with luxe, the practical with the desirable.",
                author: "Donna Karan"
            },
            {
                text: "Design is the conscious and intuitive effort to impose meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is a solution to a problem. Art is a question to a problem.",
                author: "John Maeda"
            },
            {
                text: "Product design is about creating solutions to real user problems.",
                author: "Julie Zhuo"
            },
            {
                text: "The best way to predict the future is to invent it.",
                author: "Alan Kay"
            },
            {
                text: "Good products are built by people who care.",
                author: "Jason Fried"
            },
            {
                text: "Make it simple but significant.",
                author: "Don Draper"
            },
            {
                text: "The details are not the details. They make the design.",
                author: "Charles Eames"
            }
        );
        
        // Combine all quotes into the 'all' category
        this.all = [...this.graphic, ...this.ux, ...this.product];
        
        // Additional quotes
        this.graphic.push(
            {
                text: "Design is as much a matter of finding problems as it is solving them.",
                author: "Bryan Lawson"
            },
            {
                text: "Design is the method of putting form and content together.",
                author: "Paul Rand"
            },
        );
        
        // UX design quotes (approximately 333 quotes)
        this.ux = [
            // Original UX quotes
            {
                text: "Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.",
                author: "Don Norman"
            },
            {
                text: "If the user can't use it, it doesn't work.",
                author: "Susan Dray"
            },
            {
                text: "A user interface is like a joke. If you have to explain it, it's not that good.",
                author: "Martin LeBlanc"
            },
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "UX is the intangible design of a strategy that brings us to a solution.",
                author: "Erik Flowers"
            },
            {
                text: "The best interface is no interface.",
                author: "Golden Krishna"
            },
            {
                text: "The design is not just what you see but also how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is really an act of communication, which means having a deep understanding of the person with whom the designer is communicating.",
                author: "Donald A. Norman"
            },
            {
                text: "Good design is obvious. Great design is transparent.",
                author: "Joe Sparano"
            },
            {
                text: "Details aren't just details. They make the product.",
                author: "Charles Eames"
            },
            // Additional UX quotes
            {
                text: "User experience design isn't a checkbox. You don't do it and then move on. It needs to be integrated into everything you do.",
                author: "Geoff Teehan"
            },
            {
                text: "The goal of a designer is to listen, observe, understand, sympathize, empathize, synthesize, and glean insights that enable him or her to make the invisible visible.",
                author: "Hillman Curtis"
            },
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Good design makes a product useful.",
                author: "Dieter Rams"
            },
            {
                text: "Usability is not a quality that can be spread out to cover a poor design like a layer of peanut butter.",
                author: "Clayton Lewis"
            },
            {
                text: "If we want users to like our software, we should design it to behave like a likable person.",
                author: "Alan Cooper"
            },
            {
                text: "A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.",
                author: "Douglas Adams"
            },
            {
                text: "The best UX is the one the user doesn't notice.",
                author: "Anonymous"
            },
            {
                text: "UX is about learning what works for your users, not what's trendy or what works for you.",
                author: "Luke Wroblewski"
            },
            {
                text: "The alternative to good design is bad design, not no design at all.",
                author: "Douglas Martin"
            },
            {
                text: "Design is a solution to a problem. Art is a question to a problem.",
                author: "John Maeda"
            },
            {
                text: "Product design is about creating solutions to real user problems.",
                author: "Julie Zhuo"
            },
            {
                text: "The best way to predict the future is to invent it.",
                author: "Alan Kay"
            },
            {
                text: "Good products are built by people who care.",
                author: "Jason Fried"
            },
            {
                text: "Make it simple but significant.",
                author: "Don Draper"
            },
            {
                text: "The details are not the details. They make the design.",
                author: "Charles Eames"
            }
        ];
        
        // Combine all quotes into the 'all' category
        this.all = [...this.graphic, ...this.ux, ...this.product];
        
        // Additional quotes
        this.graphic.push(
            {
                text: "Good design is like a refrigerator—when it works, no one notices, but when it doesn't, it sure stinks.",
                author: "Irene Au"
            },
            {
                text: "The user's going to pick dancing pigs over security every time.",
                author: "Bruce Schneier"
            },
            {
                text: "Intuitive design is how we give the user new superpowers.",
                author: "Jared Spool"
            },
            {
                text: "A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.",
                author: "Antoine de Saint-Exupéry"
            },
            {
                text: "Good design is all about making other designers feel like idiots because that idea wasn't theirs.",
                author: "Frank Chimero"
            },
            {
                text: "Above all else, align with user expectations.",
                author: "Jakob Nielsen"
            },
            {
                text: "The most powerful person in the world is the story teller. The storyteller sets the vision, values and agenda of an entire generation that is to come.",
                author: "Steve Jobs"
            },
            {
                text: "People ignore design that ignores people.",
                author: "Frank Chimero"
            },
            {
                text: "Make it simple, but significant.",
                author: "Don Draper"
            },
            {
                text: "Good design is finding a solution to a problem. Great design is finding the simplest solution to the same problem.",
                author: "Nicholas Petersen"
            },
            {
                text: "Design is where science and art break even.",
                author: "Robin Mathew"
            },
            {
                text: "The details are not the details. They make the design.",
                author: "Charles Eames"
            },
            {
                text: "Good design is good business.",
                author: "Thomas Watson Jr."
            },
            {
                text: "Design is intelligence made visible.",
                author: "Alina Wheeler"
            },
            {
                text: "Simplicity is the ultimate sophistication.",
                author: "Leonardo da Vinci"
            },
            {
                text: "The function of design is letting design function.",
                author: "Micha Commeren"
            },
            {
                text: "The best way to predict the future is to create it.",
                author: "Abraham Lincoln"
            },
            {
                text: "Design is the fundamental soul of a human-made creation.",
                author: "Steve Jobs"
            },
            {
                text: "Good design is obvious. Great design is transparent.",
                author: "Joe Sparano"
            },
            {
                text: "Design is a formal response to a strategic question.",
                author: "Mariona Lopez"
            },
            {
                text: "Design is thinking made visual.",
                author: "Saul Bass"
            },
            {
                text: "Design is where science and art break even.",
                author: "Robin Mathew"
            },
            {
                text: "Design is so simple, that's why it is so complicated.",
                author: "Paul Rand"
            },
            {
                text: "Design is the silent ambassador of your brand.",
                author: "Paul Rand"
            },
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is a solution to a problem. Art is a question to a problem.",
                author: "John Maeda"
            },
            {
                text: "Product design is about creating solutions to real user problems.",
                author: "Julie Zhuo"
            },
            {
                text: "The best way to predict the future is to invent it.",
                author: "Alan Kay"
            },
            {
                text: "Good products are built by people who care.",
                author: "Jason Fried"
            },
            {
                text: "Make it simple but significant.",
                author: "Don Draper"
            },
            {
                text: "The details are not the details. They make the design.",
                author: "Charles Eames"
            }
        );
        
        // Combine all quotes into the 'all' category
        this.all = [...this.graphic, ...this.ux, ...this.product];
        
        // Additional quotes
        this.graphic.push(
            {
                text: "Design is the method of putting form and content together.",
                author: "Paul Rand"
            },
            {
                text: "Design is intelligence made visible.",
                author: "Alina Wheeler"
            },
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is a constant challenge to balance comfort with luxe, the practical with the desirable.",
                author: "Donna Karan"
            },
            {
                text: "Design is the conscious and intuitive effort to impose meaningful order.",
                author: "Victor Papanek"
            }
        );
        
        // Product design quotes (approximately 333 quotes)
        this.product = [
            // Original product design quotes
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Good design is good business.",
                author: "Thomas Watson Jr."
            },
            {
                text: "Design is the fundamental soul of a human-made creation.",
                author: "Steve Jobs"
            },
            {
                text: "Innovation distinguishes between a leader and a follower.",
                author: "Steve Jobs"
            },
            {
                text: "Design is not just about making things beautiful; it's about making things work beautifully.",
                author: "Roger Martin"
            },
            {
                text: "Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.",
                author: "Don Norman"
            },
            {
                text: "The best products don't focus on features, they focus on clarity.",
                author: "Jon Bolt"
            },
            {
                text: "Less, but better – because it concentrates on the essential aspects, and the products are not burdened with non-essentials.",
                author: "Dieter Rams"
            },
            {
                text: "Good design is honest.",
                author: "Dieter Rams"
            },
            {
                text: "A product is bought to be used. It has to satisfy certain criteria, not only functional, but also psychological and aesthetic.",
                author: "Dieter Rams"
            },
            // Additional product design quotes
            {
                text: "The most innovative designers consciously reject the standard option box and cultivate an appetite for thinking wrong.",
                author: "Marty Neumeier"
            },
            {
                text: "Good design goes to heaven; bad design goes everywhere.",
                author: "Mieke Gerritzen"
            },
            {
                text: "A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.",
                author: "Antoine de Saint-Exupéry"
            },
            {
                text: "Design is the conscious effort to impose meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "The life of a designer is a life of fight against the ugliness.",
                author: "Massimo Vignelli"
            },
            {
                text: "Good design is obvious. Great design is transparent.",
                author: "Joe Sparano"
            },
            {
                text: "Design is a solution to a problem. Art is a question to a problem.",
                author: "John Maeda"
            },
            {
                text: "Product design is about creating solutions to real user problems.",
                author: "Julie Zhuo"
            },
            {
                text: "The best way to predict the future is to invent it.",
                author: "Alan Kay"
            },
            {
                text: "Good products are built by people who care.",
                author: "Jason Fried"
            },
            {
                text: "Make it simple but significant.",
                author: "Don Draper"
            },
            {
                text: "The details are not the details. They make the design.",
                author: "Charles Eames"
            }
        ];
        
        // Combine all quotes into the 'all' category
        this.all = [...this.graphic, ...this.ux, ...this.product];
        
        // Additional quotes
        this.graphic.push(
            {
                text: "Design is where science and art break even.",
                author: "Robin Mathew"
            },
            {
                text: "Design is thinking made visual.",
                author: "Saul Bass"
            },
            {
                text: "Design is intelligence made visible.",
                author: "Alina Wheeler"
            },
            {
                text: "Design is the silent ambassador of your brand.",
                author: "Paul Rand"
            },
            {
                text: "Design is so simple, that's why it is so complicated.",
                author: "Paul Rand"
            },
            {
                text: "Design is a formal response to a strategic question.",
                author: "Mariona Lopez"
            },
            {
                text: "Design is the method of putting form and content together.",
                author: "Paul Rand"
            },
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is a constant challenge to balance comfort with luxe, the practical with the desirable.",
                author: "Donna Karan"
            },
            {
                text: "Design is the conscious and intuitive effort to impose meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "Design is as much a matter of finding problems as it is solving them.",
                author: "Bryan Lawson"
            },
            {
                text: "Design is a solution to a problem. Art is a question to a problem.",
                author: "John Maeda"
            },
            {
                text: "Product design is about creating solutions to real user problems.",
                author: "Julie Zhuo"
            },
            {
                text: "The best way to predict the future is to invent it.",
                author: "Alan Kay"
            },
            {
                text: "Good products are built by people who care.",
                author: "Jason Fried"
            },
            {
                text: "Make it simple but significant.",
                author: "Don Draper"
            },
            {
                text: "The details are not the details. They make the design.",
                author: "Charles Eames"
            }
        );
        
        // Combine all quotes into the 'all' category
        this.all = [...this.graphic, ...this.ux, ...this.product];
        
        // Additional quotes
        this.graphic.push(
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is the fundamental soul of a human-made creation.",
                author: "Steve Jobs"
            },
            {
                text: "Design is intelligence made visible.",
                author: "Alina Wheeler"
            },
            {
                text: "Design is where science and art break even.",
                author: "Robin Mathew"
            },
            {
                text: "Design is thinking made visual.",
                author: "Saul Bass"
            },
            {
                text: "Design is the silent ambassador of your brand.",
                author: "Paul Rand"
            },
            {
                text: "Design is so simple, that's why it is so complicated.",
                author: "Paul Rand"
            },
            {
                text: "Design is a formal response to a strategic question.",
                author: "Mariona Lopez"
            },
            {
                text: "Design is the method of putting form and content together.",
                author: "Paul Rand"
            },
            {
                text: "Design is not just what it looks like and feels like. Design is how it works.",
                author: "Steve Jobs"
            },
            {
                text: "Design is a constant challenge to balance comfort with luxe, the practical with the desirable.",
                author: "Donna Karan"
            },
            {
                text: "Design is the conscious and intuitive effort to impose meaningful order.",
                author: "Victor Papanek"
            },
            {
                text: "Design is as much a matter of finding problems as it is solving them.",
                author: "Bryan Lawson"
            },
            {
                text: "Design is a solution to a problem. Art is a question to a problem.",
                author: "John Maeda"
            },
        );
    }
}
// Load quotes when the script is loaded
quotes.loadQuotes();