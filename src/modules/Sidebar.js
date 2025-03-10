import getReadingList from '../utils/getReadingList';

class Sidebar {
  // DOM methods
  renderReadingListStats(location) {
    const readingListStats = document.createElement('div');
    readingListStats.classList.add('reading-list-stats');
    readingListStats.innerHTML = `
      <div class="stat"><span class="stat-label">Books</span> ${[...getReadingList()].length}</div>
      <div class="stat"><span class="stat-label">Read</span> ${[...getReadingList()].filter(book => book.read).length}</div>
      <div class="stat"><span class="stat-label">Unread</span> ${[...getReadingList()].filter(book => !book.read).length}</div>
    `;
    document.querySelector(location).appendChild(readingListStats);
  }

  removeReadingListStats(location) {
    const readingListStats = document.querySelector(`${location} .reading-list-stats`);
    readingListStats ? document.querySelector(location).removeChild(readingListStats) : null;
  }

  renderSidebar(location) {
    const sidebar = document.createElement('aside');
    sidebar.classList.add('col', 'sidebar');
    sidebar.innerHTML = `
      <div class="button-group">
        <button type="button" class="button add-book-button"><span class="icon fa-solid fa-plus" aria-hidden="true"></span> Add Book</button>
      </div>
    `;
    document.querySelector(location).appendChild(sidebar);
    this.renderReadingListStats('.sidebar')
  }
}

export default Sidebar;