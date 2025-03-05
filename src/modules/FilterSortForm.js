class FilterSortForm {
  // DOM methods
  renderFilterSortForm(location, filterSortFormData) {
    const filterSortForm = document.createElement('form');
    filterSortForm.classList.add('filter-sort-form');
    filterSortForm.setAttribute('novalidate', 'true');
    filterSortForm.innerHTML = `
      <div class="row row-search">
        <div class="form-group">
          <label for="search-value">Filter by Keyword</label>
          <input type="text" name="searchValue" class="search-value" value="${filterSortFormData.searchValue}" placeholder="Find a book..." id="search-value" autoComplete="off" autocapitalize="off" />
        </div>
      </div>
      <div class="row row-select">
        <div class="form-group">
          <label for="filter-read-value">Filter by Read Status</label>
          <div class="select-wrapper">
            <select name="filterReadValue" id="filter-read-value" autoComplete="off">
              <option value="all" ${filterSortFormData.filterReadValue === 'all' ? 'selected' : ''}>All</option>
              <option value="read" ${filterSortFormData.filterReadValue === 'read' ? 'selected' : ''}>Read</option>
              <option value="unread" ${filterSortFormData.filterReadValue === 'unread' ? 'selected' : ''}>Unread</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="sort-value">Order by</label>
          <div class="select-wrapper">
            <select name="sortValue" id="sort-value" autoComplete="off">
              <option value="title" ${filterSortFormData.sortValue === 'title' ? 'selected' : ''}>Title</option>
              <option value="first-name" ${filterSortFormData.sortValue === 'first-name' ? 'selected' : ''}>Author: First Name</option>
              <option value="last-name" ${filterSortFormData.sortValue === 'last-name' ? 'selected' : ''}>Author: Last Name</option>
              <option value="pages-least" ${filterSortFormData.sortValue === 'pages-least' ? 'selected' : ''}>Pages: Least to Greatest</option>
              <option value="pages-greatest" ${filterSortFormData.sortValue === 'pages-greatest' ? 'selected' : ''}>Pages: Greatest to Least</option>
            </select>
          </div>
        </div>
      </div>
    `;

    document.querySelector(location).appendChild(filterSortForm);
  }
}

export default FilterSortForm;