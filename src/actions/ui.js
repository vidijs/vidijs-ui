export const MODAL_RESET = 'MODAL_RESET';
export const MODAL_RECEIVE = 'MODAL_RECEIVE';
export const MAINMENU_TOGGLE = 'MAINMENU_TOGGLE';
export const SNACKBAR_RESET = 'SNACKBAR_RESET';
export const SNACKBAR_RECEIVE = 'SNACKBAR_RECEIVE';
export const LOADING_RECEIVE = 'LOADING_RECEIVE';

export function closeModal() {
  return ({
    type: MODAL_RESET,
  });
}

export function openModal({ modalName }) {
  return {
    type: MODAL_RECEIVE,
    modalName,
  };
}
export function setLoading(isLoading = false) {
  return {
    type: LOADING_RECEIVE,
    isLoading,
  };
}

function setMainMenu(isMainMenuOpen) {
  return {
    type: MAINMENU_TOGGLE,
    isMainMenuOpen,
  };
}


export function toggleMainMenu() {
  return (dispatch, getState) => {
    const { isMainMenuOpen } = getState().ui;
    dispatch(setMainMenu(!isMainMenuOpen));
  };
}

export function closeSnackBar() {
  return ({
    type: SNACKBAR_RESET,
  });
}

export function openSnackBar({ ...props }) {
  return ({
    type: SNACKBAR_RECEIVE,
    ...props,
  });
}
