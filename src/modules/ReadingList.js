import InfoMessage from './InfoMessage';
import FilterSortForm from './FilterSortForm';
import getReadingList from '../utils/getReadingList';

class ReadingList {
  constructor(sidebarInstance) {
    this.infoMessage = new InfoMessage();
    this.sidebar = sidebarInstance;
    this.filterSortForm = new FilterSortForm();
    this.viewableReadingList = [...getReadingList()];
    this.filterSortFormData = {
      searchValue: '',
      filterReadValue: 'all',
      sortValue: 'title'
    };
    this.editBookFormData = {
      title: '',
      author: '',
      pages: '',
      read: false,
      id: null
    };
  }

  // Update filterSortFormData variable when the Filter/Sort form inputs change
  handleChange(event) {
    this.filterSortFormData = {
      ...this.filterSortFormData,
      [event.target.name]: event.target.value
    };
    this.updateViewableReadingList();
  }

  // Update viewable reading list based on Filter/Sort form inputs
  updateViewableReadingList() {
    if (document.querySelector('.filter-sort-form')) {
      this.filterSortFormData.searchValue = document.getElementById('search-value').value;
      this.filterSortFormData.filterReadValue = document.getElementById('filter-read-value').value;
      this.filterSortFormData.sortValue = document.getElementById('sort-value').value;
    }

    let viewableReadingListData = [...getReadingList()];
    viewableReadingListData = this.searchReadingList(this.filterSortFormData.searchValue, viewableReadingListData);
    viewableReadingListData = this.filterByReadStatus(this.filterSortFormData.filterReadValue, viewableReadingListData);
    viewableReadingListData = this.sortBooks(this.filterSortFormData.sortValue, viewableReadingListData);
    this.viewableReadingList = viewableReadingListData;

    if ([...getReadingList()].length === 0) {
      this.removeReadingListContent('.reading-list-container');
      this.renderReadingListContent([...getReadingList()], '.reading-list-container');
    }
    else {
      this.removeReadingList('.reading-list-content');
      this.renderReadingList(viewableReadingListData, '.reading-list-content');
    }
  }

  // Filter viewable reading list by search input
  searchReadingList(value, viewableReadingListData) {
    value = value.toLowerCase();

    if (value) {
      return viewableReadingListData.filter(book => book.title.toLowerCase().includes(value) || book.author.toLowerCase().includes(value));
    }
    else {
      return viewableReadingListData;
    }
  }

  // Filter viewable reading list by Read status
  filterByReadStatus(value, viewableReadingListData) {
    viewableReadingListData = viewableReadingListData.filter(book => {

      if (value === 'read') {
        return book.read;
      }
      else if (value === 'unread') {
        return !book.read;
      }
      else {
        return book;
      }
    });
    return viewableReadingListData;
  }

  // Sort viewable reading list
  sortBooks(value, viewableReadingListData) {

    viewableReadingListData = viewableReadingListData.sort((a, b) => {
      const authorNameA = a.author.toLowerCase().split(' ');
      const authorNameB = b.author.toLowerCase().split(' ');
      const lastNameA = authorNameA[authorNameA.length - 1];
      const lastNameB = authorNameB[authorNameB.length - 1];
      const firstNameA = authorNameA[0];
      const firstNameB = authorNameB[0];

      switch(value) {
        case 'title':
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        case 'first-name':      
          if (lastNameA === lastNameB && firstNameA === firstNameB && authorNameA.length > authorNameB.length) {
            return authorNameB.join(' ').localeCompare(authorNameA.join(' '));
          }
          else {
            return authorNameA.join(' ').localeCompare(authorNameB.join(' '));
          }
        case 'last-name':
          if (lastNameA === lastNameB) {
            authorNameA.pop();
            authorNameB.pop();
            return authorNameA.join(' ').localeCompare(authorNameB.join(' '));
          }
          else {
            return lastNameA.localeCompare(lastNameB);
          }
        case 'pages-least':
          return a.pages - b.pages;
        case 'pages-greatest':
          return b.pages - a.pages;
      }
    });
    return viewableReadingListData;
  }

  // Add a new book to the reading list
  addNewBook(newBook, readingListData) {
    const wasEmpty = readingListData.length === 0;
    readingListData.push(newBook);
    getReadingList(readingListData);

    if (wasEmpty) {
      this.filterSortForm.renderFilterSortForm('.reading-list-content', this.filterSortFormData);
    }

    this.updateViewableReadingList();

    this.sidebar.removeReadingListStats('.sidebar');
    this.sidebar.renderReadingListStats('.sidebar');
  }

  // Edit a book in the reading list
  editBook(editBookFormData, bookID, readingListData) {
    readingListData = readingListData.map(book => {

      if (book.id === Number(bookID)) {
        return {
          ...book,
          title: editBookFormData.title,
          author: editBookFormData.author,
          pages: editBookFormData.pages,
          read: editBookFormData.read
        };
      }
      else {
        return book;
      }
    });
    getReadingList(readingListData);
    this.updateViewableReadingList();
    this.sidebar.removeReadingListStats('.sidebar');
    this.sidebar.renderReadingListStats('.sidebar');
  }

  // Delete a book from the reading list
  deleteBook(readingListData, bookID) {

    if (confirm('Are you sure you want to remove this book from your reading list?')) {
      readingListData = readingListData.filter(book => book.id !== Number(bookID));
      getReadingList(readingListData);
      this.updateViewableReadingList();
      this.sidebar.removeReadingListStats('.sidebar');
      this.sidebar.renderReadingListStats('.sidebar');
    }
  }

  // Toggle a book's read status in the reading list
  toggleRead(event, bookID, readingListData) {
    if (event.type === 'click' && !event.target.matches('input[type=checkbox]')) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      document.getElementById(`read-${bookID}`).checked = !document.getElementById(`read-${bookID}`).checked;
    }

    if (event.key === 'Enter' || event.key === ' ' || event.type === 'click') {
      readingListData = readingListData.map(book => {
        if (book.id === Number(bookID)) {
          return {
            ...book,
            read: !book.read
          };
        }
        return book;
      });

      getReadingList(readingListData);
      this.updateViewableReadingList();
      this.sidebar.removeReadingListStats('.sidebar');
      this.sidebar.renderReadingListStats('.sidebar');
    }
  }

  // DOM methods
  renderBooks(readingListData) {
    const readingList = document.querySelector('.reading-list');
    readingList.innerHTML = readingListData.map(book => {
      return `
        <div class="book-card">
          <div class="row">
            <div class="title">${book.title}</div>
            <div class="button-group">
              <button type="button" class="button edit-book-button" data-id="${book.id}" aria-label="edit book ${book.title} by ${book.author}" title="Edit">
                <span class="fa-solid fa-pencil fa-sm fa-fw icon"></span>
              </button>
              <button type="button" class="button delete-book-button" data-id="${book.id}" aria-label="delete book ${book.title} by ${book.author}" title="Delete">
                <span class="fa-solid fa-trash fa-sm icon"></span>
              </button>
            </div>
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
    this.infoMessage.removeInfoMessage('.reading-list-content');

    if (readingListData.length === 0) {
      this.infoMessage.renderInfoMessage('No results match your search specifications.', '.reading-list-content');
    }
    else {
      this.infoMessage.removeInfoMessage('.reading-list-content');
      this.renderBooks(readingListData);
    }
  }

  removeReadingList(location) {
    const readingList = document.querySelector(`${location} .reading-list`);
    readingList ? document.querySelector(location).removeChild(readingList) : null;
  }

  renderReadingListContent(readingListData, location) {
    const readingListContent = document.createElement('div');
    readingListContent.classList.add('col', 'reading-list-content');
    document.querySelector(location).appendChild(readingListContent);

    if (readingListData.length === 0) {
      this.infoMessage.renderInfoMessage('You currently have no books in your reading list. Click the Add Book button to get started.', '.reading-list-content');
    }
    else {
      this.filterSortForm.renderFilterSortForm('.reading-list-content', this.filterSortFormData);
      this.updateViewableReadingList();
    }
  }

  removeReadingListContent(location) {
    const readingListContent = document.querySelector(`${location} .reading-list-content`);
    readingListContent ? document.querySelector(location).removeChild(readingListContent) : null;
  }
}

export default ReadingList;