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
    this.readingList = new ReadingList(this.sidebar);
    this.bookFormModal = new BookFormModal(this.readingList);
    this.renderApp();
  }

  // Event listeners
  events() {
    document.addEventListener('click', event => {
      const element = event.target;
      element.matches('#modal .modal-button.cancel') ? this.bookFormModal.closeModal() : null;
      element.matches('#modal') ? this.bookFormModal.closeModal() : null;
      element.matches('.book-card .delete-book-button') ? this.readingList.deleteBook([...getReadingList()], element.dataset.id) : null;
      element.matches('.book-card .check-label input[type=checkbox]') ? this.readingList.toggleRead(event, element.dataset.id, [...getReadingList()]) : null;
      element.matches('.sidebar .add-book-button') ? this.bookFormModal.openModal('add') : null;
      element.matches('.book-card .edit-book-button') ? this.bookFormModal.openModal('edit', [...getReadingList()], element.dataset.id) : null;
    });

    document.addEventListener('change', event => {
      const element = event.target;
      element.matches('.filter-sort-form #filter-read-value') ? this.readingList.handleChange(event) : null;
      element.matches('.filter-sort-form #sort-value') ? this.readingList.handleChange(event) : null;
    });

    document.addEventListener('submit', event => {
      const element = event.target;
      element.matches('#modal .new-book-form') ? this.bookFormModal.handleSubmit(event, {
        title: document.getElementById('title-value').value,
        author: document.getElementById('author-value').value,
        pages: document.getElementById('pages-value').value,
        read: document.getElementById('read-value').checked
      }) : null;
      element.matches('.filter-sort-form') ? event.preventDefault() : null;
    });

    document.addEventListener('keydown', event => {
      const element = event.target;
      document.querySelector('#modal') && event.key === 'Escape' ? this.bookFormModal.closeModal() : null;
      element.matches('#modal .new-book-form .checkmark') ? this.bookFormModal.handleKeyDown(event) : null;
      element.matches('.book-card .checkmark') ? this.readingList.toggleRead(event, element.dataset.id, [...getReadingList()]) : null;
    });

    document.addEventListener('keyup', event => {
      const element = event.target;
      element.matches('.filter-sort-form #search-value') ? this.readingList.handleChange(event) : null;
    });
  }

  // DOM methods
  renderApp() {
    this.header.renderHeader('#app');
    this.renderMain('#app');
    this.footer.renderFooter('#app');
    this.sidebar.renderSidebar('.reading-list-container');
    this.readingList.renderReadingListContent([...getReadingList()], '.reading-list-container');
    this.events();
  }

  renderMain(location) {
    const main = document.createElement('main');
    main.innerHTML = `<div class="reading-list-container"></div>`;
    document.querySelector(location).appendChild(main);
  }
}

export default App;