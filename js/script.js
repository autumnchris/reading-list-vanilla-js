class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

let readingList = JSON.parse(localStorage.getItem('readingList')) || [];

function populateReadingList() {

  if (readingList.length === 0) {
    document.querySelector('.reading-list').style.display = 'none';
    document.querySelector('.no-books').style.display = 'block';
  }
  else {
    document.querySelector('.no-books').style.display = 'none';
    document.querySelector('.reading-list').style.display = 'block';
  }

  document.querySelector('.reading-list').innerHTML = readingList.map((book, i) => {
    return `<div class="book-card">
      <div class="row">
        <h2>
          <cite>${book.title}</cite>
        </h2>
        <button type="button" class="delete-book" data-index="${i}" aria-label="delete book" title="Delete">
          <span class="fa fa-trash-alt"></span>
        </button>
      </div>
      <div class="row">
        <hr>
        <div class="author">by ${book.author}</div>
        <div class="pages">Pages: ${book.pages}</div>
        <form>
          <label class="check-label" for="read-${i}">Read
            <input type="checkbox" data-index="${i}" name="read-input" tabindex="-1" id="read-${i}" ${book.read ? 'checked' : ''} />
            <span class="checkmark" tabindex="0"></span>
          </label>
        </form>
      </div>
    </div>`;
  }).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }).join('');

  function deleteBook(event) {
    readingList.splice(event.target.dataset.index, 1);
    document.querySelector('.reading-list').removeChild(event.target.parentNode.parentNode);
    populateReadingList();
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }

  document.querySelectorAll('.delete-book').forEach(i => {
    i.addEventListener('click', (event) => {

      if (confirm('Are you sure you want to remove this book from your reading list?')) {
        deleteBook(event);
      }
    });
  });
}

populateReadingList();

function addNewBook(event) {
  event.preventDefault();
  const form = {
    title: document.getElementById('title-input').value,
    author: document.getElementById('author-input').value,
    pages: document.getElementById('pages-input').value,
    read: document.getElementById('read-input').checked
  };
  let newBook;

  if (isNaN(form.pages) || form.pages < 0) {
    document.querySelector('.error-message').style.display = 'block';
  }
  else {
    document.querySelector('.error-message').style.display = 'none';
    newBook = new Book(form.title, form.author, form.pages, form.read ? true : false);
    readingList.push(newBook);
    populateReadingList();
    localStorage.setItem('readingList', JSON.stringify(readingList));
    document.getElementById('modal').style.display = 'none';
    document.querySelector('.new-book').reset();
  }
}

function toggleRead(event) {

  if (!event.target.matches('input[type=checkbox]')) return;
  readingList[event.target.dataset.index].read = !readingList[event.target.dataset.index].read;
  localStorage.setItem('readingList', JSON.stringify(readingList));
  populateReadingList();
}

document.querySelector('.reading-list').addEventListener('click', (event) => {
  toggleRead(event);
});

document.querySelector('.add-book').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.querySelector('.new-book').addEventListener('submit', (event) => {
  addNewBook(event);
});

document.querySelector('.cancel').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

document.querySelector('.current-year').innerHTML = new Date().getFullYear();

window.addEventListener('click', (event) => {

  if (event.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});
