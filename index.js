const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to log requests
function logRequests(req, res, next) {
    const log = `Route accessed: ${req.url}, Method: ${req.method}, Time: ${new Date().toISOString()}\n`;
    fs.appendFile('server.txt', log, (err) => {
        if (err) {
            console.error('Failed to write to server.txt:', err);
        }
    });
    next();
}

// Apply the middleware
app.use(logRequests);

var books = [
    {
        "id": 1,
        "isbn": 9780131103627,
        "authorName": "Brian W. Kernighan, Dennis M. Ritchie",
        "bookName": "The C Programming Language",
        "pages": 272,
        "price": 45.00,
        "image": "https://th.bing.com/th/id/OIP.QQl2lIUjBnkddroWgw5-twHaKA?w=202&h=272&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
        "id": 2,
        "isbn": 9780201616224,
        "authorName": "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
        "bookName": "Design Patterns: Elements of Reusable Object-Oriented Software",
        "pages": 395,
        "price": 54.95,
        "image": "https://m.media-amazon.com/images/I/81snQYegu6L._SL1500_.jpg"
    },
    {
        "id": 3,
        "isbn": 9780132350884,
        "authorName": "Robert C. Martin",
        "bookName": "Clean Code: A Handbook of Agile Software Craftsmanship",
        "pages": 464,
        "price": 37.95,
        "image": "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg"
    },
    {
        "id": 4,
        "isbn": 9780262033848,
        "authorName": "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
        "bookName": "Introduction to Algorithms",
        "pages": 1312,
        "price": 99.95,
        "image": "https://th.bing.com/th/id/OIP.3YBaTEDl9yVQt3-ZSPZ-7gAAAA?rs=1&pid=ImgDetMain"
    },
    {
        "id": 5,
        "isbn": 9780137081073,
        "authorName": "Martin Fowler",
        "bookName": "Refactoring: Improving the Design of Existing Code",
        "pages": 448,
        "price": 47.99,
        "image": "https://m.media-amazon.com/images/I/71e6ndHEwqL._SL1500_.jpg"
    },
    {
        "id": 6,
        "isbn": 9780134685991,
        "authorName": "Robert C. Martin",
        "bookName": "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
        "pages": 432,
        "price": 40.00,
        "image": "https://www.informit.com/ShowCover.aspx?isbn=0134494164"
    },
    {
        "id": 7,
        "isbn": 9780132354165,
        "authorName": "Kent Beck",
        "bookName": "Test Driven Development: By Example",
        "pages": 240,
        "price": 49.99,
        "image": "https://th.bing.com/th/id/OIP.15HPlUkFSTSv0uZ08fd2qADvEs?w=960&h=1203&rs=1&pid=ImgDetMain"
    },
    {
        "id": 8,
        "isbn": 9780321127426,
        "authorName": "Martin Fowler",
        "bookName": "Patterns of Enterprise Application Architecture",
        "pages": 560,
        "price": 59.99,
        "image": "https://th.bing.com/th/id/OIP.BueP3lLKiMHXaDnExc3M_gHaJS?rs=1&pid=ImgDetMain"
    },
    {
        "id": 9,
        "isbn": 9780596007126,
        "authorName": "David Flanagan",
        "bookName": "JavaScript: The Definitive Guide",
        "pages": 1096,
        "price": 49.99,
        "image": "https://th.bing.com/th/id/OIP.MqIvwgpbRXOVFimai5JwQgAAAA?rs=1&pid=ImgDetMain"
    },
    {
        "id": 10,
        "isbn": 9780134685991,
        "authorName": "Eric Evans",
        "bookName": "Domain-Driven Design: Tackling Complexity in the Heart of Software",
        "pages": 560,
        "price": 64.99,
        "image": "https://th.bing.com/th/id/OIP.W7Fep1m5sPq1EwwmhxaS1wHaJ8?w=596&h=800&rs=1&pid=ImgDetMain"
    },
    {
        "id": 11,
        "isbn": 9780596517748,
        "authorName": "Steve Krug",
        "bookName": "Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability",
        "pages": 216,
        "price": 35.99,
        "image": "https://www.peachpit.com/ShowCover.aspx?isbn=0321965515"
    },
    {
        "id": 12,
        "isbn": 9780134494166,
        "authorName": "Robert C. Martin",
        "bookName": "The Clean Coder: A Code of Conduct for Professional Programmers",
        "pages": 256,
        "price": 29.99,
        "image": "https://geekbookstore.net/ecdata/stores/ZDXHED6399/image/data/products/1588421289_The%20clean%20coder.jpg"
    },
    {
        "id": 13,
        "isbn": 9780321751041,
        "authorName": "David Thomas, Andrew Hunt",
        "bookName": "The Pragmatic Programmer: Your Journey to Mastery",
        "pages": 352,
        "price": 49.99,
        "image": "https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL._SX397_BO1,204,203,200_.jpg"
    },
    {
        "id": 14,
        "isbn": 9780137081073,
        "authorName": "Eric Freeman, Elisabeth Robson, Bert Bates, Kathy Sierra",
        "bookName": "Head First Design Patterns: A Brain-Friendly Guide",
        "pages": 694,
        "price": 49.99,
        "image": "https://images-na.ssl-images-amazon.com/images/I/518FqJvR9aL._SX374_BO1,204,203,200_.jpg"
    },
    {
        "id": 15,
        "isbn": 9780134757599,
        "authorName": "Sandi Metz",
        "bookName": "Practical Object-Oriented Design: An Agile Primer Using Ruby",
        "pages": 272,
        "price": 49.99,
        "image": "https://m.media-amazon.com/images/I/61qpmhZRxGL._SX260_.jpg"
    }
];

app.get('/books', (req, res) => {
    if (books.length === 0) {
        return res.status(404).json({ message: "No books available" });
    }
    res.json({ books });
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const book = books.find(e => e.id === Number(id));
    if (!book) {
        return res.status(404).json({ message: "No book found with such ID" });
    }
    res.json({ book });
});


app.post('/book', (req, res) => {
    const bodyFromUser = req.body;
    books.push(bodyFromUser);
    res.json({ status: "200 OK" });
});

app.delete('/book/:bookid', (req, res) => {
    const id = req.params.bookid;
    books = books.filter(e => e.id !== Number(id));
    return res.json({ status: "200 OK" });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(8000, () => {
    console.log('started server');
});