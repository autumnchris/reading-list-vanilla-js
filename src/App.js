import Header from './modules/Header';
import Footer from './modules/Footer';
import Sidebar from './modules/Sidebar';
import ReadingList from './modules/ReadingList';
import BookFormModal from './modules/BookFormModal';
import getReadingList from './utils/getReadingList';

class App {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.sidebar = new Sidebar();
    this.readingList = new ReadingList();
    this.bookFormModal = new BookFormModal();
    this.renderApp();
    this.events();
  }

  // Event listeners
  events() {
    document.addEventListener('click', event => {
      const element = event.target;
      element.matches('.sidebar .add-book-button') ? this.bookFormModal.renderBookFormModal('main') : null;
      element.matches('#modal .modal-button.cancel') ? this.bookFormModal.removeBookFormModal('main') : null;
      element.matches('#modal') ? this.bookFormModal.removeBookFormModal('main') : null;
      element.matches('.book-card .delete-book-button') ? this.readingList.deleteBook(getReadingList(), element.dataset.id) : null;
      element.matches('.book-card .check-label input[type=checkbox]') ? this.readingList.toggleRead(event, getReadingList(), element.dataset.id) : null;
    });

    document.addEventListener('change', event => {
      const element = event.target;
      element.matches('#modal .new-book-form .form-group input') ? this.bookFormModal.handleChange(event) : null;
    });

    document.addEventListener('submit', event => {
      const element = event.target;
      element.matches('#modal .new-book-form') ? this.bookFormModal.handleSubmit(event, {
        title: document.getElementById('title-value').value,
        author: document.getElementById('author-value').value,
        pages: document.getElementById('pages-value').value,
        read: document.getElementById('read-value').checked
      }) : null;
    });

    document.addEventListener('keydown', event => {
      const element = event.target;
      document.querySelector('#modal') && event.key === 'Escape' ? this.bookFormModal.removeBookFormModal('main'): null;
      element.matches('#modal .new-book-form .checkmark') ? this.bookFormModal.handleKeyDown(event) : null;
      element.matches('.book-card .checkmark') ? this.readingList.toggleRead(event, getReadingList(), element.dataset.id) : null;
    });
  }

  // DOM methods
  renderApp() {
    this.header.renderHeader('#app');
    this.renderMain('#app');
    this.footer.renderFooter('#app');
    this.sidebar.renderSidebar('.reading-list-container');
    this.readingList.renderReadingListContent(getReadingList(), '.reading-list-container');
  }

  renderMain(location) {
    const main = document.createElement('main');
    main.innerHTML = `<div class="reading-list-container"></div>`;
    document.querySelector(location).appendChild(main);
  }
}

export default App;