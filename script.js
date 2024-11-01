// Elements
const form = document.getElementById('book_form')
const addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', addBookToLibrary)

// SVGs
const trashCan = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>'

let myLibrary = [];
let newBook;

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function render() {
    purge();
    let count = 0;
    myLibrary.forEach(function(book) {
        const bookShelf = document.getElementById('library')
        const bookCard = document.createElement('div')
        const title = document.createElement('h3')
        const author = document.createElement('h4')
        const pageCount = document.createElement('h4')
        const readWrap = document.createElement('div')
        const readStatus = document.createElement('h4')
        const top = document.createElement('div')
        const bottom = document.createElement('div')
        const trash = document.createElement('div')

        bookCard.classList.add('book-card')
        trash.classList.add('icon')
        // readStatus.classList.add('status')
        readWrap.classList.add('status')
        top.classList.add('card-top')
        bottom.classList.add('card-bottom')
        bookCard.setAttribute('id', count)
        readWrap.setAttribute('id', 'statusToggle')

        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pageCount.innerHTML = book.pages + ' pages';

        if (book.read) {
            readStatus.innerHTML = 'Completed';
            readWrap.setAttribute("data-read", "read");
        } else {
            readStatus.innerHTML = 'In Progress';
            readWrap.setAttribute("data-read", "unread")
        }
        trash.innerHTML += trashCan;

        bookShelf.appendChild(bookCard)
        bookCard.appendChild(top)
        bookCard.appendChild(bottom)
        top.appendChild(title)
        top.appendChild(author)
        top.appendChild(pageCount)
        bottom.appendChild(readWrap)
        readWrap.appendChild(readStatus)
        bottom.appendChild(trash)

        readWrap.addEventListener('click', () => {
            if (book.read == true) {
                readStatus.innerHTML = 'In Progress';
                readWrap.setAttribute("data-read", "unread");
                book.read = false;
            } else {
                readStatus.innerHTML = 'Completed';
                readWrap.setAttribute("data-read", "read");
                book.read = true;            
            }
            console.log(book.title + ' read? ' + book.read)
        })

        trash.addEventListener('click', () => {
            console.log('Deleted ' + book.title)
            myLibrary.splice(myLibrary.indexOf(book),1)
            render();
        })

        count++;
    });
};

function loadDemo() {
    const demo = new Book("Sample Book", "John Smith","200", true);

    myLibrary.push(demo);
}

function purge() {
    const bookShelf = document.getElementById('library');
    bookShelf.innerHTML = '';
}

function addBookToLibrary(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readBox = document.getElementById('read');
    if (readBox.checked) {
        read = true;
    } else {
        read = false;
    }
    const addToLibrary = new Book(title,author,pages,read)
    
    myLibrary.push(addToLibrary);
    form.reset();
    render();
}

loadDemo()
render();