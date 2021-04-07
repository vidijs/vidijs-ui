import {
  MODAL_RESET,
  MODAL_RECEIVE,
  MAINMENU_TOGGLE,
  SNACKBAR_RESET,
  SNACKBAR_RECEIVE,
  LOADING_RECEIVE,
} from '../actions/ui';

const initialState = {
  modalName: undefined,
  isMainMenuOpen: false,
  isLoading: false,
  snackBar: {
    isOpen: false,
  },
};

function resetModal(state) {
  return { ...state, modalName: null };
}

function resetSnackBar(state) {
  const snackBar = { isOpen: false };
  return { ...state, snackBar };
}

function setSnackBar(state, action) {
  const snackBar = { isOpen: true, ...action };
  return { ...state, snackBar };
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_RECEIVE:
      return { ...state, isLoading: action.isLoading };
    case SNACKBAR_RECEIVE:
      return setSnackBar(state, action);
    case SNACKBAR_RESET:
      return resetSnackBar(state);
    case MODAL_RESET:
      return resetModal(state);
    case MODAL_RECEIVE:
      return { ...state, modalName: action.modalName };
    case MAINMENU_TOGGLE:
      return { ...state, isMainMenuOpen: action.isMainMenuOpen };
    default:
      break;
  }
  return state;
}
