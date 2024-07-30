import { createStore } from "react-hooks-global-state";
import { AcMCon, ActionsPage, ModalState } from "./types";

const reducer = (state: ModalState, action: ActionsPage): ModalState => {
  switch (action.type) {
    case AcMCon.setuploadAutoCad:
      return { ...state, uploadAutoCad: action.payload };
    case AcMCon.setViewComments:
      return { ...state, viewComments: action.payload };
    case AcMCon.setAddRevisionModal:
      return { ...state, addRevisionModal: action.payload };
    case AcMCon.setUploadProjectImages:
      return { ...state, UploadProjectImages: action.payload };
    case AcMCon.setviewProjectImages:
      return { ...state, viewProjectImages: action.payload };
    case AcMCon.setviewNoticeRemarks:
      return { ...state, viewNoticeRemarks: action.payload };
    case AcMCon.setplinthModalCon:
      return { ...state, plinthModalCon: action.payload };
    case AcMCon.setRevisionDetails:
      return { ...state, revisionDetails: action.payload };
    case AcMCon.setAgreementModalCon:
      return { ...state, agreementModalCon: action.payload };
    default:
      return state;
  }
};

const initialState: ModalState = {
  uploadAutoCad: false,
  addRevisionModal: false,
  UploadProjectImages: false,
  viewProjectImages: false,
  viewNoticeRemarks: false,
  viewComments: false,
  plinthModalCon: false,
  revisionDetails: false,
  agreementModalCon: false,
};

export const {
  dispatch: dispatchModalCon,
  getState,
  useStoreState,
} = createStore(reducer, initialState);

export function useStoreModalCon() {
  const uploadAutoCad = useStoreState("uploadAutoCad");
  const viewComments = useStoreState("viewComments");
  const addRevisionModal = useStoreState("addRevisionModal");
  const UploadProjectImages = useStoreState("UploadProjectImages");
  const viewProjectImages = useStoreState("viewProjectImages");
  const viewNoticeRemarks = useStoreState("viewNoticeRemarks");
  const plinthModalCon = useStoreState("plinthModalCon");
  const revisionDetails = useStoreState("revisionDetails");
  const agreementModalCon = useStoreState("agreementModalCon");

  return {
    uploadAutoCad,
    viewComments,
    plinthModalCon,
    viewNoticeRemarks,
    viewProjectImages,
    addRevisionModal,
    UploadProjectImages,
    revisionDetails,
    agreementModalCon,
  };
}
