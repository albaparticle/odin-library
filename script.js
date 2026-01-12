const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw new Error("Book constructor must be called with 'new'");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);

const form = document.querySelector("#new-book-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, isRead);

    form.reset();
    console.log("Updated Library:", myLibrary);
    document.querySelector('#form-dialog').close();

    render();
});

function render() {
    const libraryContainer = document.querySelector("#library-container");
    libraryContainer.innerHTML = myLibrary.map((book, index) => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text"><strong>Author:</strong> ${book.author}</p>
                    <p class="card-text"><strong>Pages:</strong> ${book.pages}</p>
                    <p class="card-text"><span class="badge ${book.read ? 'bg-success' : 'bg-warning'}">${book.read ? 'Read' : 'Unread'}</span>
                        <button class="btn btn-outline-dark btn-sm" onclick="updateStatus(${index})">Edit</button>
                    </p>
                    <button class="btn btn-danger" onclick="removeBook(${index})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
} 

function updateStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    render();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
}

render();