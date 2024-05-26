const myLibrary = [];

//Book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeRead = function() {
    this.read = !this.read;
}

//Adds book to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

//prints books in a table on the screen
function printBooks() {

        //Clean table
        const bookRows = document.getElementsByClassName('book-row');
        while(bookRows[0]) {
            bookRows[0].parentNode.removeChild(bookRows[0]);
        }

        //loop over all elements in myLibrary array and print them
        for ( let i = 0; i < myLibrary.length; i++) {
            const tr = document.createElement("tr");
            tr.classList.add("book-row");
            tr.setAttribute("LibLocation", i);

            const tdTitle = document.createElement("td");
            const tdTitleText = document.createTextNode(myLibrary[i].title);
            tdTitle.appendChild(tdTitleText);
            tr.appendChild(tdTitle);

            const tdAuthor = document.createElement("td");
            const tdAuthorText = document.createTextNode(myLibrary[i].author);
            tdAuthor.appendChild(tdAuthorText);
            tr.appendChild(tdAuthor);

            const tdPages = document.createElement("td");
            const tdPagesText = document.createTextNode(myLibrary[i].pages);
            tdPages.appendChild(tdPagesText);
            tr.appendChild(tdPages);

            const tdRead = document.createElement("td");
            const tdReadText = document.createTextNode(myLibrary[i].read);
            tdRead.addEventListener("click", function(){
                const tableRow = this.parentNode;
                const bookLocationArr = tableRow.getAttribute("LibLocation");
                myLibrary[bookLocationArr].changeRead();
                console.log(myLibrary);
                printBooks();
            });
            tdRead.appendChild(tdReadText);
            tr.appendChild(tdRead);

            const tdRemove = document.createElement("td");
            const tdRemoveButton = document.createElement("button");
            tdRemoveButton.textContent = "Remove";
            tdRemoveButton.addEventListener("click", function(){
                const tableRow = this.parentNode.parentNode;
                const bookArrIndex = tableRow.getAttribute("LibLocation");
                //tableRow.remove();
                myLibrary.splice(bookArrIndex, 1);
                printBooks();
            });
            tdRemove.appendChild(tdRemoveButton);
            tr.appendChild(tdRemove);
            const bookList = document.getElementById("book-list");
            console.log(tr);
            bookList.appendChild(tr);
        }

}

//button to open modal with add book form
const modal = document.getElementById("add-book-modal");
document.getElementById("add-book").addEventListener("click", function(){
    modal.style.display = "block";
});

//X click to close Modal
document.getElementById("x").addEventListener("click", function(){
    modal.style.display = "none";
});

//Submit form
document.getElementById("add-new-book-form").addEventListener("submit", function(event){
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;
    const newBook = addBookToLibrary(title, author, pages, read);
    const newBookLocation = myLibrary.length - 1;
    printBooks(newBook, newBookLocation);
    modal.style.display = "none";
    this.reset();
});
