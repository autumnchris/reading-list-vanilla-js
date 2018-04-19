let readingList = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function populateReadingList() {

  if (readingList.length === 0) {
    document.querySelector('.table').style.display = 'none';
    document.querySelector('.no-books').style.display = 'block';
  }
  else {
    document.querySelector('.no-books').style.display = 'none';
    document.querySelector('.table').style.display = 'block';
  }

  document.querySelector('tbody').innerHTML = readingList.map((book, i) => {
    return `<tr>
      <td>
        <cite>${book.title}</cite>
      </td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>
        <form>
          <input type="checkbox" data-index="${i}" aria-label="check if read" ${book.read ? 'checked' : ''} />
        </form>
      </td>
      <td>
        <button type="button" class="remove-book" data-index="${i}" aria-label="remove book" title="Remove">
          <span class="fas fa-times fa-lg"></span>
        </button>
      </td>
    </tr>`;
  }).sort().join('');
}

populateReadingList();

function addNewBook(event) {
  event.preventDefault();
  const titleInput = document.getElementById('title-input').value;
  const authorInput = document.getElementById('author-input').value;
  const pagesInput = document.getElementById('pages-input').value;
  const readInput = document.getElementById('read-input').checked;

  if (!pagesInput.match(/^[0-9]+$/) || pagesInput < 0) {
    document.querySelector('.error-message').style.display = 'block';
  }
  else {
    document.querySelector('.error-message').style.display = 'none';
    const newBook = new Book(titleInput, authorInput, pagesInput, readInput ? true : false);
    readingList.push(newBook);
    populateReadingList();
    document.getElementById('modal').style.display = 'none';
    document.querySelector('.new-book').reset();
  }
}

document.querySelector('.add-book').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.querySelector('.cancel').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (event) => {

  if (event.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});
