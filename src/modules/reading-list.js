const ReadingList = (() => {

  function renderReadingListArray(readingList) {

    if (readingList) {
      renderReadingListContent(readingList);
      localStorage.setItem('readingList', JSON.stringify(readingList));
    }
    return JSON.parse(localStorage.getItem('readingList')) || [];
  }

  function renderReadingListContent(readingList) {

    if (readingList.length === 0) {
      document.querySelector('.reading-list-content').innerHTML = `<p class="message info-message"><span class="fa fa-info-circle fa-lg fa-fw"></span> You currently have no books in your reading list. Click the Add Book button to get started.</p>`;
    }
    else {
      document.querySelector('.reading-list-content').innerHTML = readingList.sort((a, b) => a.titleValue.toLowerCase().localeCompare(b.titleValue.toLowerCase())).map((book, index) => {
        return `<div class="book-card">
          <div class="row">
            <div class="title">${book.titleValue}</div>
            <button type="button" class="button delete-book-button" data-index="${index}" aria-label="delete book" title="Delete">
              <span class="fa fa-trash-alt fa-sm delete-icon"></span>
            </button>
          </div>
          <div class="row">
            <div class="book-info author"><span class="book-info-label">by</span> ${book.authorValue}</div>
            <div class="book-info pages"><span class="book-info-label">Pages</span> ${book.pagesValue}</div>
            <form>
              <div class="form-group">
                <label class="check-label" for="read-${index}">Read
                  <input type="checkbox" data-index="${index}" name="readValue" tabindex="-1" id="read-${index}" ${book.readValue ? 'checked' : ''} />
                  <span class="checkmark" tabindex="0"></span>
                </label>
              </div>
            </form>
          </div>
        </div>`
      }).join('');
    }
  }

  function deleteBook(event, readingList) {

    if (confirm('Are you sure you want to remove this book from your reading list?')) {
      readingList.splice(event.target.dataset.index, 1);
      renderReadingListArray(readingList);
    }
  }

  function toggleRead(event, readingList) {

    if (!event.target.matches('input[type=checkbox]')) return;
    readingList[event.target.dataset.index].readValue = !readingList[event.target.dataset.index].readValue;
    renderReadingListArray(readingList);
  }

  return {
    renderReadingListArray,
    renderReadingListContent,
    deleteBook,
    toggleRead
  };
})();

export { ReadingList };
