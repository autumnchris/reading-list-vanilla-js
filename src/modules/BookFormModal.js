import ErrorMessage from './ErrorMessage';
import ReadingList from './ReadingList';
import Book from './Book';
import getReadingList from '../utils/getReadingList';

class BookFormModal {
  constructor() {
    this.errorMessage = new ErrorMessage();
    this.readingList = new ReadingList();
    this.bookFormType = null;
    this.currentBookID = null;
    this.formValues = {
      title: '',
      author: '',
      pages: '',
      read: false
    };
  }

  // Toggle a book's Read status in the Book Form Modal with keyboard
  handleKeyDown(event) {

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      document.getElementById(event.target.dataset.inputId).checked = !document.getElementById(event.target.dataset.inputId).checked;
      this.formValues.read = document.getElementById(event.target.dataset.inputId).checked;
    }
  }

  // Save a book in form modal
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

      if (this.bookFormType === 'edit') {
        this.editBook(formValues, [...getReadingList()]);
      }
      else {
        this.addNewBook(formValues, [...getReadingList()]);
      }
      this.closeModal();
    }
  }

  // Add a new book to the reading list
  addNewBook(formValues, readingListData) {
    const newBook = new Book(formValues.title, formValues.author, formValues.pages, formValues.read, Date.now());
    this.readingList.addNewBook(newBook, readingListData);
  }

  // Edit a book in the reading list
  editBook(formValues, readingListData) {
    this.readingList.editBook(formValues, this.currentBookID, readingListData);
  }

  // Open book form modal
  openModal(bookFormType, readingListData = null, bookID = null) {
    let bookToBeEdited;
    let formData;

    if (bookFormType === 'edit') {
      this.bookFormType = 'edit';
      this.currentBookID = bookID;

      bookToBeEdited = readingListData.find(book => book.id === Number(bookID));
      formData = {
        title: bookToBeEdited.title,
        author: bookToBeEdited.author,
        pages: bookToBeEdited.pages,
        read: bookToBeEdited.read
      };
    }
    else {
      this.bookFormType = 'add';
      formData = this.formValues;
    }
    this.renderBookFormModal('main', formData);
  }

  // Close book form modal
  closeModal() {
    this.removeBookFormModal('main');
    this.formValues = {
      ...this.formValues,
      title: '',
      author: '',
      pages: '',
      read: false
    };
    this.currentBookID = null;
  }
  
  // DOM methods
  renderBookFormModal(location, formData) {
    const bookFormModal = document.createElement('div');
    bookFormModal.setAttribute('id', 'modal');
    bookFormModal.classList.add('modal');
    bookFormModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">${this.bookFormType === 'edit' ? 'Edit' : 'Add New'} Book</div>
        <div class="modal-body">
          <form class="new-book-form" novalidate>
            <div class="form-group">
              <label for="title-value">Title</label>
              <input type="text" class="title-value" name="title" value="${formData.title}" id="title-value" autocomplete="off" required />
            </div>
            <div class="form-group">
              <label for="author-value">Author</label>
              <input type="text" class="author-value" name="author" value="${formData.author}" id="author-value" autocomplete="off" required />
            </div>
            <div class="form-group">
              <label for="pages-value">Number of Pages</label>
              <input type="text" class="pages-value" name="pages" inputmode="numeric" value="${formData.pages}" id="pages-value" autocomplete="off" required />
            </div>
            <div class="form-group">
              <label class="check-label" for="read-value">Read
                <input type="checkbox" name="read" tabindex="-1" id="read-value" ${formData.read ? 'checked' : ''} autocomplete="off" />
                <span class="checkmark" tabindex="0" data-input-id="read-value"></span>
              </label>
            </div>
            <div class="button-group">
              <button type="submit" class="button modal-button">Save</button>
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