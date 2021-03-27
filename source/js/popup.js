import {isEscEvent} from './utils.js'

const MAIN_BLOCK = document.querySelector('main');
const POPUP_ZINDEX = '10000';

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup(MAIN_BLOCK);
  }
};

const onPopupClick = () => {
  closePopup(MAIN_BLOCK);
};

const openPopup = (node, parent, className = '.success') => {
  const cloneElement = node.content.cloneNode(true);
  const popup = cloneElement.querySelector(className);
  popup.style.zIndex = POPUP_ZINDEX;
  parent.appendChild(popup);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

const closePopup = (parent) => {
  const lastChild = parent.lastElementChild;
  parent.removeChild(lastChild);
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupClick);
};

export {openPopup, closePopup}
