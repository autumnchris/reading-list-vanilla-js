import bgImage from '../assets/images/background-image.jpg';

class Header {
  // DOM methods
  renderHeader(location) {
    const header = document.createElement('header');
    header.innerHTML = `
      <div class="bg-image" style="background-image: url(${bgImage})"></div>
      <h1>Build Your Reading List</h1>
    `;
    document.querySelector(location).appendChild(header);
  }
}

export default Header;