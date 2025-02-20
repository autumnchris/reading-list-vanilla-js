import InfoMessage from './InfoMessage';
import Sidebar from './Sidebar';
import getReadingList from '../utils/getReadingList';

class ReadingList {
  constructor() {
    this.infoMessage = new InfoMessage();
    this.sidebar = new Sidebar();
  }

  deleteBook(readingListData, bookID) {

    if (confirm('Are you sure you want to remove this book from your reading list?')) {
      readingListData = readingListData.filter(book => book.id !== Number(bookID));
      this.sidebar.removeSidebar('.reading-list-container');
      this.removeReadingListContent('.reading-list-container');
      getReadingList(readingListData);
      this.sidebar.renderSidebar('.reading-list-container');
      this.renderReadingListContent(readingListData, '.reading-list-container');
    }
  }

  toggleRead(event, readingListData, bookID) {
    if (event.type === 'click' && !event.target.matches('input[type=checkbox]')) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById(`read-${bookID}`).checked = !document.getElementById(`read-${bookID}`).checked;
    }

    if (event.key === 'Enter' || event.type === 'click') {
      readingListData = readingListData.map(book => {
        if (book.id === Number(bookID)) book.read = !book.read;
        return book;
      });
      this.sidebar.removeSidebar('.reading-list-container');
      this.removeReadingListContent('.reading-list-container');
      getReadingList(readingListData);
      this.sidebar.renderSidebar('.reading-list-container');
      this.renderReadingListContent(readingListData, '.reading-list-container');
    }
  }

  // DOM methods
  renderBooks(readingListData) {
    const readingList = document.querySelector('.reading-list');
    readingList.innerHTML = readingListData.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())).map(book => {
      return `
        <div class="book-card">
          <div class="row">
            <div class="title">${book.title}</div>
            <button type="button" class="button delete-book-button" data-id="${book.id}" aria-label="delete book" title="Delete">
              <span class="fa-solid fa-trash fa-sm icon"></span>
            </button>
          </div>
          <div class="row">
            <div class="book-info author"><span class="book-info-label">by </span>${book.author}</div>
            <div class="book-info pages"><span class="book-info-label">Pages </span>${book.pages}</div>
            <form novalidate>
              <div class="form-group">
                <label class="check-label" for="read-${book.id}">Read
                  <input type="checkbox" name="readValue" tabindex="-1" data-id="${book.id}" id="read-${book.id}" autocomplete="off" ${book.read ? 'checked' : ''} />
                  <span class="checkmark" tabindex="0" data-id="${book.id}"></span>
                </label>
              </div>
            </form>
          </div>
        </div>
      `;
    }).join('');
  }

  renderReadingList(readingListData, location) {
    const readingList = document.createElement('div');
    readingList.classList.add('reading-list');
    document.querySelector(location).appendChild(readingList);
    this.renderBooks(readingListData);
  }

  renderReadingListContent(readingListData, location) {
    const readingListContent = document.createElement('div');
    readingListContent.classList.add('col', 'reading-list-content');
    document.querySelector(location).appendChild(readingListContent);

    if (readingListData.length === 0) {
      this.infoMessage.renderInfoMessage('You currently have no books in your reading list. Click the Add Book button to get started.', '.reading-list-content');
    }
    else {
      this.renderReadingList(readingListData, '.reading-list-content');
    }
  }

  removeReadingListContent(location) {
    const readingListContent = document.querySelector(`${location} .reading-list-content`);
    readingListContent ? document.querySelector(location).removeChild(readingListContent) : null;
  }
}

export default ReadingList;