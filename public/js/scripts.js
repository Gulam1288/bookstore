function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function showAllBooks() {
    fetch(`/books`)
        .then(response => response.json())
        .then(data => {
            const books = data.books;
            let htmlContent = '<div class="row">';
            books.forEach(book => {
                htmlContent += `
                    <div class="col-md-4 book-card">
                        <div class="card all-card">
                            <img src="${book.image}" class="card-img-top book-image" alt="${book.bookName}">
                            <div class="card-body">
                                <h5 class="card-title">${truncateText(book.bookName, 20)}</h5>
                                <p class="card-text">Author: ${truncateText(book.authorName, 20)}</p>
                                <p class="card-text">Pages: ${book.pages}</p>
                                <p class="card-text">Price: $${book.price.toFixed(2)}</p>
                                <a href="view-book.html?id=${book.id}" class="btn btn-info">View</a>
                                <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            htmlContent += '</div>';
            document.getElementById('content').innerHTML = htmlContent;
        });
}

function viewBook(id) {
    fetch(`/books/${id}`)
        .then(response => response.json())
        .then(data => {
            const book = data.book;
            let htmlContent = `
                <div class="card mb-4 single-book">
                    <img src="${book.image}" class="card-img-top book-image" alt="${book.bookName}">
                    <div class="card-body">
                        <h5 class="card-title">${book.bookName}</h5>
                        <p class="card-text">Author: ${book.authorName}</p>
                        <p class="card-text">Pages: ${book.pages}</p>
                        <p class="card-text">Price: $${book.price.toFixed(2)}</p>
                        <p class="card-text">ISBN: ${book.isbn}</p>
                        <a href="all-books.html" class="btn btn-primary">Back to All Books</a>
                    </div>
                </div>
            `;
            document.getElementById('content').innerHTML = htmlContent;
        });
}

function addBook(event) {
    event.preventDefault();
    const bookName = document.getElementById('bookName').value;
    const authorName = document.getElementById('authorName').value;
    const isbn = document.getElementById('isbn').value;
    const pages = document.getElementById('pages').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;

    const newBook = {
        id: Date.now(),
        bookName,
        authorName,
        isbn: Number(isbn),
        pages: Number(pages),
        price: Number(price),
        image
    };

    fetch(`/book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    })
        .then(response => response.json())
        .then(() => {
            window.location.href = 'all-books.html';
        });
}

function deleteBook(id) {
    fetch(`/book/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => {
            showAllBooks();
        });
}
