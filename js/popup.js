import {isEscEvent} from './utils.js'

const POPUP_SUCCESS_TEMPLATE = document.querySelector('#success');
const POPUP_ERROR_TEMPLATE = document.querySelector('#error');
const MAIN_BLOCK = document.querySelector('main');

const onPopupEscKeydown = function(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupClick = function() {
  closePopup();
}

const openPopup = function(node, parent = MAIN_BLOCK) {
  const popup = node.content.cloneNode(true);
  parent.appendChild(popup);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

const closePopup = function(elem, parent = MAIN_BLOCK) {
  const lastChild = parent.lastElementChild;
  parent.removeChild(lastChild);
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupClick);
};

// openPopup(POPUP_SUCCESS_TEMPLATE);
openPopup(POPUP_ERROR_TEMPLATE);

// closePopup('success');
// closePopup('#error');

export {openPopup, closePopup}
