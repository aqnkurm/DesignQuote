const quotes = {
    graphic: [
        {
            text: "Good design is obvious. Great design is transparent.",
            author: "Joe Sparano"
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
            text: "Design is not just what it looks like and feels like. Design is how it works.",
            author: "Steve Jobs"
        },
        {
            text: "Make it simple, but significant.",
            author: "Don Draper"
        }
    ],
    ux: [
        {
            text: "A user interface is like a joke. If you have to explain it, it's not that good.",
            author: "Martin LeBlanc"
        },
        {
            text: "Design is not just what it looks like and feels like. Design is how it works.",
            author: "Steve Jobs"
        },
        {
            text: "Details aren't just details. They make the design.",
            author: "Charles Eames"
        },
        {
            text: "Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.",
            author: "Don Norman"
        },
        {
            text: "If you think good design is expensive, you should look at the cost of bad design.",
            author: "Ralf Speth"
        }
    ],
    product: [
        {
            text: "Design is where science and art break even.",
            author: "Robin Mathew"
        },
        {
            text: "Everything is designed. Few things are designed well.",
            author: "Brian Reed"
        },
        {
            text: "Good design is problem solving.",
            author: "Jeffrey Veen"
        },
        {
            text: "Design is not just what it looks like and feels like. Design is how it works.",
            author: "Steve Jobs"
        },
        {
            text: "Design is a solution to a problem. Art is a question to a problem.",
            author: "John Maeda"
        }
    ]
};

// Add all quotes to a combined array for the "All" category
quotes.all = [...quotes.graphic, ...quotes.ux, ...quotes.product];

// Remove duplicates from the "all" category
quotes.all = quotes.all.filter((quote, index, self) => 
    index === self.findIndex((q) => q.text === quote.text)
);