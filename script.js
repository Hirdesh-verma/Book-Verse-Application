const books = [];

function addBook() {
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;

  if (!title || !author) {
    alert('Please enter both title and author.');
    return;
  }

  const newBook = { title, author, verses: [] };
  books.push(newBook);

  updateBookList();
  populateSelectBook();
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
}

function addVerse() {
  const bookTitle = document.getElementById('selectBook').value;
  const verseContent = document.getElementById('verseContent').value;
  const link = document.getElementById('bookLink').value;

  if (!bookTitle || !verseContent || !link) {
    alert('Please fill all the fields.');
    return;
  }

  const book = books.find(b => b.title === bookTitle);
  if (book) {
    book.verses.push({ content: verseContent, link });
    updateBookList();
    document.getElementById('verseContent').value = '';
    document.getElementById('bookLink').value = '';
  }
}

function searchBooks() {
  const searchTerm = document.getElementById('searchTitle').value.toLowerCase();
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));
  updateBookList(filteredBooks);
}

function populateSelectBook() {
  const selectBook = document.getElementById('selectBook');
  selectBook.innerHTML = '<option value="">Select Book</option>';
  books.forEach(book => {
    const option = document.createElement('option');
    option.value = book.title;
    option.textContent = book.title;
    selectBook.appendChild(option);
  });
}

function updateBookList(filteredBooks = books) {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '<h2>All Books and Verses</h2>';
  filteredBooks.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `<strong>${book.title} by ${book.author}</strong>`;
    if (book.verses.length) {
      book.verses.forEach(verse => {
        const verseDiv = document.createElement('div');
        verseDiv.innerHTML = `
          <p>${verse.content}</p>
          <a href="${verse.link}" target="_blank">${verse.link}</a>
        `;
        bookDiv.appendChild(verseDiv);
      });
    } else {
      bookDiv.innerHTML += '<p>No verses available.</p>';
    }
    bookList.appendChild(bookDiv);
  });
}
