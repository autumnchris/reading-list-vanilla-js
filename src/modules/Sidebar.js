class Sidebar {
  // DOM methods
  renderSidebar (location) {
    const sidebar = document.createElement('div');
    sidebar.classList.add('col', 'sidebar');
    sidebar.innerHTML = `
      <div class="button-group">
        <button type="button" class="button add-book-button"><span class="fas fa-plus" aria-hidden="true"></span> Add Book</button>
      </div>
    `;
    document.querySelector(location).appendChild(sidebar);
  }
}

export default Sidebar;