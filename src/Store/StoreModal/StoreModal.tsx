import { createStore } from "react-hooks-global-state";
import { AcModal, ActionsPage, ModalState } from "./types";

const reducer = (state: ModalState, action: ActionsPage): ModalState => {
  switch (action.type) {
    case AcModal.setMuchulkaNoticeModal:
      return { ...state, muchulkaNoticeModal: action.payload };
    case AcModal.setNoticeMuchulkaRemarks:
      return { ...state, noticeMuchulkaRemarks: action.payload };
    case AcModal.setMuchulkaViewNotice:
      return { ...state, muchulkaViewNotice: action.payload };

    case AcModal.setApprovedPlinthModal:
      return { ...state, approvedPlinthModal: action.payload };

    case AcModal.setrevisionViewDetails:
      return { ...state, revisionViewDetails: action.payload };

    case AcModal.setrevisionStatusModal:
      return { ...state, revisionStatusModal: action.payload };
    case AcModal.setPlinthPopover:
      return { ...state, plinthPopover: action.payload };

    case AcModal.setViewDrawingsModal:
      return { ...state, viewDrawingsModal: action.payload };

    case AcModal.setModalGenerateNaamsari:
      return { ...state, modalGenerateNaamsari: action.payload };

    default:
      return state;
  }
};

const initialState: ModalState = {
  muchulkaNoticeModal: false,
  noticeMuchulkaRemarks: false,
  muchulkaViewNotice: false,
  approvedPlinthModal: false,
  revisionViewDetails: false,
  revisionStatusModal: false,
  plinthPopover: false,
  viewDrawingsModal: false,
  modalGenerateNaamsari: false,
};

export const {
  dispatch: dispatchModal,
  getState,
  useStoreState,
} = createStore(reducer, initialState);

export function useStoreModal() {
  const muchulkaNoticeModal = useStoreState("muchulkaNoticeModal");
  const noticeMuchulkaRemarks = useStoreState("noticeMuchulkaRemarks");
  const muchulkaViewNotice = useStoreState("muchulkaViewNotice");
  const approvedPlinthModal = useStoreState("approvedPlinthModal");
  const revisionViewDetails = useStoreState("revisionViewDetails");
  const revisionStatusModal = useStoreState("revisionStatusModal");
  const plinthPopover = useStoreState("plinthPopover");
  const viewDrawingsModal = useStoreState("viewDrawingsModal");
  const modalGenerateNaamsari = useStoreState("modalGenerateNaamsari");
  return {
    noticeMuchulkaRemarks,
    muchulkaNoticeModal,
    muchulkaViewNotice,
    revisionViewDetails,
    approvedPlinthModal,
    revisionStatusModal,
    plinthPopover,
    viewDrawingsModal,
    modalGenerateNaamsari,
  };
}
