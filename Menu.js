//Book CLass
class Book {
    constructor(bookTitle, genre) {
        this.bookTitle = bookTitle;
        this.genre = genre;
    }
    describe() {
        return `${this.bookTitle} - ${this.genre}`;
    }
}
//Author Class
class Author {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.collection = [];
    }

    addBook(book) {
        if (book instanceof Book) {
            this.collection.push(book);
        } else {
            throw new Error(`Invalid book: ${book}`);
        }
    }

    describe() {
        return `${this.firstName} ${this.lastName} wrote ${this.collection.length} books`;
    }
}
//Menu Class
class Menu {
    constructor() {
        this.authors = [];
        this.selectedAuthor = null;
    }
//This is where my start loop starts
    start() {
        let selection = this.menuOptions();
//Main options page
        while (selection !== '5') {
            switch (selection) {
                case '1':
                    this.createAuthor();
                    break;
                case '2':
                    this.viewAuthors();
                    break;
                case '3':
                    this.deleteAuthor();
                    break;
                case '4':
                    this.displayAuthors();
                    break;
                default:
                    selection = '5'; 
                    break;
            }
            selection = this.menuOptions();
        }
        alert('Have A Great Day!');
    }
// Display for the main menu options
    menuOptions() {
        return prompt(`
        1. Create Author
        2. View Authors
        3. Delete Author 
        4. Display All Authors
        5. Exit
        `);
    }
//This is the view authors section that defines the actions of this section. 
    viewAuthors() {
        let index = prompt('Enter the index of the Author you would like to see:');
        if (index > -1 && index < this.authors.length) {
            this.selectedAuthor = this.authors[index];
            let description = `Author Name: ${this.selectedAuthor.firstName} ${this.selectedAuthor.lastName}\n`;

            for (let i = 0; i < this.selectedAuthor.collection.length; i++) {
                description += `${i}: ${this.selectedAuthor.collection[i].describe()}\n`;
            }

            let selection = this.showMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createBook();
                    break;
                case '2':
                    this.deleteBook();
            }
        }
    }
//Sub section of view authors that lets you create, and delete books based on the author you pick
    createBook() {
        let title = prompt('Enter Book Title:');
        let genre = prompt('Enter Genre:');
        this.selectedAuthor.addBook(new Book(title, genre));
    }

    deleteBook() {
        let index = prompt('Select Book You Want to Delete');
        if (index > -1 && index < this.selectedAuthor.collection.length) {
            this.selectedAuthor.collection.splice(index, 1);
            alert('Book deleted successfully.');
        } 
    }
//This section lets you create a new author by inserting thier first and last name 
    createAuthor() {
        let firstName = prompt('Enter New Author\'s First Name');
        let lastName = prompt('Enter New Author\'s Last Name');
        this.authors.push(new Author(firstName, lastName));
    }
//This section lets you delete an author based on their number in the index
    deleteAuthor() {
        let index = prompt('Select Author You Want to Delete');
        if (index > -1 && index < this.authors.length) {
            this.authors.splice(index, 1);
            alert('Author deleted successfully.');
        } 
    }
//This section displays all the authors in the index so the user knows what number they are.
    displayAuthors() {
        let display = '';
        for (let i = 0; i < this.authors.length; i++) {
            display += `${i}: ${this.authors[i].firstName} ${this.authors[i].lastName}\n`;
        }
        alert(display);
    }
//This is the menu in the subclass for view authors. 
    showMenuOptions(options) {
        return prompt(`
        0) Back
        1) Add Book
        2) Delete Book
        ${options}`);
    }
}

let menu = new Menu();
menu.start();


