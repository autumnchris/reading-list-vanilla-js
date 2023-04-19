import ErrorMessage from './ErrorMessage';
import ReadingList from './ReadingList';
import Book from './Book';
import getReadingList from '../utils/getReadingList';

class BookFormModal {
  constructor() {
    this.errorMessage = new ErrorMessage();
    this.readingList = new ReadingList();
    this.formValues = {
      title: '',
      author: '',
      pages: '',
      read: false
    };
  }

  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.formValues[event.target.name] = value;
  }

  handleKeyDown(event) {

    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById(event.target.dataset.inputId).checked = !document.getElementById(event.target.dataset.inputId).checked;
      this.formValues.read = document.getElementById(event.target.dataset.inputId).checked;
    }
  }

  handleSubmit(event, formValues) {
    event.preventDefault();
    this.errorMessage.removeErrorMessage('#modal .modal-body');
    formValues.title = formValues.title.trim();
    formValues.author = formValues.author.trim();
    formValues.pages = formValues.pages.trim();

    if (!formValues.title) {
      this.errorMessage.renderErrorMessage('A book title is required to add a new book.', '#modal .modal-body');
    }
    else if (!formValues.author) {
      this.errorMessage.renderErrorMessage('An author is required to add a new book.', '#modal .modal-body');
    }
    else if (!formValues.pages) {
      this.errorMessage.renderErrorMessage('The number of pages is required to add a new book.',
      '#modal .modal-body');
    }
    else if (isNaN(formValues.pages) || formValues.pages <= 0) {
      this.errorMessage.renderErrorMessage('The number of pages must be a number greater than 0.', '#modal .modal-body');
    }
    else {
      this.addNewBook(formValues);
      this.removeBookFormModal('main');
      this.formValues = {
        title: '',
        author: '',
        pages: '',
        read: false
      };
    }
  }

  addNewBook(formValues) {
    let readingListData = getReadingList();
    const newBook = new Book(formValues.title, formValues.author, formValues.pages, formValues.read, Date.now());
    this.readingList.removeReadingListContent('.reading-list-container');
    readingListData.push(newBook);
    getReadingList(readingListData);
    this.readingList.renderReadingListContent(readingListData, '.reading-list-container');
  }

  // DOM methods
  renderBookFormModal(location) {
    const bookFormModal = document.createElement('div');
    bookFormModal.setAttribute('id', 'modal');
    bookFormModal.classList.add('modal');
    bookFormModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">Add New Book</div>
        <div class="modal-body">
          <form class="new-book-form" novalidate>
            <div class="form-group">
              <label for="title-value">Title</label>
              <input type="text" class="title-value" name="title" value="${this.formValues.title}" id="title-value" required />
            </div>
            <div class="form-group">
              <label for="author-value">Author</label>
              <input type="text" class="author-value" name="author" value="${this.formValues.author}" id="author-value" required />
            </div>
            <div class="form-group">
              <label for="pages-value">Number of Pages</label>
              <input type="text" class="pages-value" name="pages" inputmode="numeric" value="${this.formValues.pages}" id="pages-value" required />
            </div>
            <div class="form-group">
              <label class="check-label" for="read-value">Read
                <input type="checkbox" name="read" tabindex="-1" id="read-value" ${this.formValues.read ? 'checked' : ''} />
                <span class="checkmark" tabindex="0" data-input-id="read-value"></span>
              </label>
            </div>
            <div class="button-group">
              <button type="submit" class="button modal-button">Add</button>
              <button type="button" class="button modal-button cancel">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.querySelector(location).appendChild(bookFormModal);
    document.querySelector('body').classList.add('modal-open');
  }

  removeBookFormModal(location) {
    const bookFormModal = document.querySelector(`${location} #modal`);
    bookFormModal ? document.querySelector(location).removeChild(bookFormModal) : null;
    document.querySelector('body').classList.remove('modal-open');
  }
}

export default BookFormModal;