import { ReadingList } from './ReadingList';

const BookFormModal = (() => {
  let formInputValues = {
    titleValue: '',
    authorValue: '',
    pagesValue: '',
    readValue: false
  };

  class Book {
    constructor(titleValue, authorValue, pagesValue, readValue) {
      this.titleValue = titleValue;
      this.authorValue = authorValue;
      this.pagesValue = pagesValue;
      this.readValue = readValue;
    }
  }

  function handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    formInputValues[event.target.name] = value;
  }

  function handleKeyDown(event) {

    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById(event.target.dataset.inputId).checked = !document.getElementById(event.target.dataset.inputId).checked;
      formInputValues.readValue = document.getElementById(event.target.dataset.inputId).checked;
    }
  }

  function addNewBook(event, titleValue, authorValue, pagesValue, readValue, readingList) {
    event.preventDefault();
    removeFormErrorMessage();
    titleValue = titleValue.trim();
    authorValue = authorValue.trim();
    pagesValue = pagesValue.trim();
    const newBook = new Book(titleValue, authorValue, pagesValue, readValue);

    if (!titleValue) {
      renderFormErrorMessage('A book title is required to add a new book.');
    }
    else if (!authorValue) {
      renderFormErrorMessage('An author is required to add a new book.');
    }
    else if (!pagesValue) {
      renderFormErrorMessage('The number of pages is required to add a new book.');
    }
    else if (isNaN(pagesValue) || pagesValue <= 0) {
      renderFormErrorMessage('The number of pages must be a number greater than 0.');
    }
    else {
      readingList.push(newBook);
      closeBookFormModal();
      ReadingList.renderReadingListArray(readingList);
      formInputValues = {
        titleValue: '',
        authorValue: '',
        pagesValue: '',
        readValue: false
      };
    }
  }

  function openBookFormModal() {

    const bookFormModal = document.createElement('div');
    bookFormModal.classList.add('modal');
    bookFormModal.setAttribute('id', 'modal');
    bookFormModal.innerHTML = `<div class="modal-content">
      <div class="modal-header">Add New Book</div>
      <div class="modal-body">
        <form class="new-book-form" novalidate>
          <div class="form-group">
            <label for="title-value">Title</label>
            <input type="text" class="title-value" name="titleValue" value="${formInputValues.titleValue}" id="title-value" required />
          </div>
          <div class="form-group">
            <label for="author-value">Author</label>
            <input type="text" class="author-value" name="authorValue" value="${formInputValues.authorValue}" id="author-value" required />
          </div>
          <div class="form-group">
            <label for="pages-value">Number of Pages</label>
            <input type="text" class="pages-value" name="pagesValue" inputmode="numeric" value="${formInputValues.pagesValue}" id="pages-value" required />
          </div>
          <div class="form-group">
              <label class="check-label" for="read-value">Read
                <input type="checkbox" name="readValue" tabindex="-1" id="read-value" ${formInputValues.readValue ? 'checked' : ''} />
                <span class="checkmark" tabindex="0" data-input-id="read-value"></span>
              </label>
            </div>
          <div class="button-group">
            <button type="submit" class="button modal-button">Add</button>
            <button type="button" class="button modal-button cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>`;

    document.querySelector('main').appendChild(bookFormModal);
    document.querySelector('body').classList.add('modal-open');
  }

  function closeBookFormModal() {
    const bookFormModal = document.getElementById('modal');
    bookFormModal ? document.querySelector('main').removeChild(bookFormModal) : null;
    document.querySelector('body').classList.remove('modal-open');
  }

  function renderFormErrorMessage(messageText) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('message', 'error-message');
    errorMessage.innerHTML = `<span class="fa fa-exclamation-circle fa-lg fa-fw"></span> ${messageText}`;

    document.querySelector('.modal-body').appendChild(errorMessage);
  }

  function removeFormErrorMessage() {
    const errorMessage = document.querySelector('.modal-body .error-message');
    errorMessage ? document.querySelector('.modal-body').removeChild(errorMessage) : null;
  }

  return {
    handleChange,
    handleKeyDown,
    addNewBook,
    openBookFormModal,
    closeBookFormModal
  };
})();

export { BookFormModal };
