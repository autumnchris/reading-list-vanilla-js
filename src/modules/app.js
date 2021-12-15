import bgImage from '.././images/background-image.jpg';
import { BookFormModal } from './book-form-modal';
import { ReadingList } from './reading-list';

const App = (() => {

  function renderApp() {
    document.getElementById('app').innerHTML = `
    <header>
      <div class="bg-image" style="background-image: url(${bgImage})"></div>
      <h1>Build Your Reading List</h1>
    </header>
    <main>
      <div class="reading-list-container">
        <div class="col sidebar">
          <button type="button" class="button add-book-button"><span class="fas fa-plus"></span> Add Book</button>
        </div>
        <div class="col reading-list-content"></div>
      </div>
    </main>
    <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()}</footer>`;

    ReadingList.renderReadingListContent(ReadingList.renderReadingListArray());

    document.addEventListener('click', event => {
      const element = event.target;
      element.matches('.add-book-button') ? BookFormModal.openBookFormModal() : null;
      element.matches('#modal .cancel') ? BookFormModal.closeBookFormModal() : null;
      element.matches('#modal') ? BookFormModal.closeBookFormModal() : null;
      element.matches('.new-book-form .form-group input[type=checkbox]') ? BookFormModal.handleChange(event) : null;
      element.matches('.delete-book-button') ? ReadingList.deleteBook(event, ReadingList.renderReadingListArray()) : null;
      element.matches('.book-card input[type=checkbox]') ? ReadingList.toggleRead(event, ReadingList.renderReadingListArray()) : null;
    });

    document.addEventListener('keyup', event => {
       const element = event.target;
       element.matches('.new-book-form .form-group input[type=text]') ? BookFormModal.handleChange(event) : null;
    });

    document.addEventListener('keydown', event => {
      const element = event.target;
      element.matches('.new-book-form .form-group .checkmark') ? BookFormModal.handleKeyDown(event) : null;
      element.matches('.book-card .checkmark') ? ReadingList.toggleRead(event, ReadingList.renderReadingListArray()) : null;
    });

    document.addEventListener('submit', event => {
      const element = event.target;
      element.matches('.new-book-form') ? BookFormModal.addNewBook(event, document.getElementById('title-value').value, document.getElementById('author-value').value, document.getElementById('pages-value').value, document.getElementById('read-value').checked, ReadingList.renderReadingListArray()) : null;
    });
  }

  return {
    renderApp
  };
})();

export { App };
