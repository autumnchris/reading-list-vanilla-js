class InfoMessage {
  // DOM methods
  renderInfoMessage(message, location) {
    const infoMessage = document.createElement('p');
    infoMessage.classList.add('message', 'info-message');
    infoMessage.innerHTML = `<span class="fa fa-info-circle fa-lg fa-fw" aria-hidden="true"></span> ${message}`;
    document.querySelector(location).appendChild(infoMessage);
  }
}

export default InfoMessage;