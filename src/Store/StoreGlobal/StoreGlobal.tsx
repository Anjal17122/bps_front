import { createStore } from "react-hooks-global-state";
import { AcG, ActionsPage, GlobalState } from "./types";

const reducer = (state: GlobalState, action: ActionsPage): GlobalState => {
  switch (action.type) {
    case AcG.setDisableButton:
      return { ...state, disabled: action.payload };
    case AcG.setProjectData:
      return { ...state, projectData: action.payload };
    case AcG.setLoginModal:
      return { ...state, loginModal: action.payload };
    default:
      return state;
  }
};

const initialState: GlobalState = {
  disabled: false,
  projectData: null,
  loginModal: false,
};

export const {
  dispatch: dispatchGlobal,
  getState,
  useStoreState,
} = createStore(reducer, initialState);

export function useStoreGlobal() {
  const disabled = useStoreState("disabled");
  const projectData = useStoreState("projectData");
  const loginModal = useStoreState("loginModal");

  return {
    loginModal,
    projectData,
    disabled,
  };
}
