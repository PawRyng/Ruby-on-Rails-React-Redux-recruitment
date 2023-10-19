import { LOGOUT, LOGIN } from "./AppTemplateActions";
import { OPEN_MODAL, CLOSE_MODAL } from "../modal/modalAction";

const initialState = {
  token: null,
  authenticated: false,
  isModalOpen: false, // Add modal state
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...initialState };
    case LOGIN:
      return {
        ...state,
        token: action.token,
        authenticated: true,
      };
    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    default:
      return state;
  }
};
