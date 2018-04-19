let readingList = JSON.parse(localStorage.getItem('readingList')) || [];

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

  function removeBook(event) {
    readingList.splice(event.target.parentNode.dataset.index, 1);
    document.querySelector('tbody').removeChild(event.target.parentNode.parentNode.parentNode);
    populateReadingList();
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }

  document.querySelectorAll('.remove-book').forEach(i => {
    i.addEventListener('click', () => {
      removeBook(event);
    });
  });
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

document.querySelector('.add-book').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.querySelector('.new-book').addEventListener('submit', () => {
  addNewBook(event);
});

document.querySelector('.cancel').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (event) => {

  if (event.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});
