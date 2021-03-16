import {isEscEvent} from './utils.js'

const MAIN_BLOCK = document.querySelector('main');

const onPopupEscKeydown = function(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup(MAIN_BLOCK);
  }
};

const onPopupClick = function() {
  closePopup(MAIN_BLOCK);
}

const openPopup = function(node, parent, className = '.success') {
  const cloneElement = node.content.cloneNode(true);
  const popup = cloneElement.querySelector(className);
  popup.style.zIndex = 10000;
  parent.appendChild(popup);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

const closePopup = function(parent) {
  const lastChild = parent.lastElementChild;
  parent.removeChild(lastChild);
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupClick);
};

export {openPopup, closePopup}
