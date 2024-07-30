import React from "react";
import { createContext } from "react";

// interface ProjContextTyp {
//   sub: boolean;
//   projTransferModal: boolean;
//   autocadModal: boolean;
//   revenueModal: boolean;
//   noticePubModal: boolean;
//   additionalDocsModal: boolean;
//   imagesModal: boolean;
//   viewRemarksModal: boolean;
//   commentsBySectionModal: boolean;
//   addDartaModal: boolean;
//   viewNoticesModal: boolean;
//   muchulkaRemarksModal: boolean;
//   plinthModal: boolean;
//   revisionModal: boolean;
//   setProjTransferModal: setSTyp | undefined;
//   setAutocadModal: setSTyp | undefined;
//   setRevenueModal: setSTyp | undefined;
//   setNoticePubModal: setSTyp | undefined;
//   setAdditionalDocsModal: setSTyp | undefined;
//   setImagesModal: setSTyp | undefined;
//   setViewRemarksModal: setSTyp | undefined;
//   setCommentsBySectionModal: setSTyp | undefined;
//   setAddDartaModal: setSTyp | undefined;
//   setViewNoticesModal: setSTyp | undefined;
//   setMuchulkaRemarksModal: setSTyp | undefined;
//   setPlinthModal: setSTyp | undefined;
//   setRevisionModal: setSTyp | undefined;
//   setS: setSTyp | undefined;
// }

// export const ProjContext = createContext<ProjContextTyp>({
//   sub: false,
//   projTransferModal: false,
//   autocadModal: false,
//   revenueModal: false,
//   noticePubModal: false,
//   additionalDocsModal: false,
//   imagesModal: false,
//   viewRemarksModal: false,
//   commentsBySectionModal: false,
//   addDartaModal: false,
//   viewNoticesModal: false,
//   muchulkaRemarksModal: false,
//   plinthModal: false,
//   revisionModal: false,
//   setProjTransferModal: undefined,
//   setAutocadModal: undefined,
//   setRevenueModal: undefined,
//   setNoticePubModal: undefined,
//   setAdditionalDocsModal: undefined,
//   setImagesModal: undefined,
//   setViewRemarksModal: undefined,
//   setCommentsBySectionModal: undefined,
//   setAddDartaModal: undefined,
//   setViewNoticesModal: undefined,
//   setMuchulkaRemarksModal: undefined,
//   setPlinthModal: undefined,
//   setRevisionModal: undefined,
//   setS: undefined,
// });

const initState: IProjState = {
  sub: false,
  projTransferModal: false,
  autocadModal: false,
  revenueModal: false,
  noticePubModal: false,
  additionalDocsModal: false,
  imagesModal: false,
  viewRemarksModal: false,
  commentsBySectionModal: false,
  addDartaModal: false,
  viewNoticesModal: false,
  muchulkaRemarksModal: false,
  plinthModal: false,
  revisionModal: false,
  napiModal: false,
  currentPid: 0,
  napiOrTech: "",
};

export enum ProjActionType {
  setsub = "setsub",
  setprojTransferModal = "setprojTransferModal",
  setautocadModal = "setautocadModal",
  setrevenueModal = "setrevenueModal",
  setnoticePubModal = "setnoticePubModal",
  setadditionalDocsModal = "setadditionalDocsModal",
  setimagesModal = "setimagesModal",
  setviewRemarksModal = "setviewRemarksModal",
  setcommentsBySectionModal = "setcommentsBySectionModal",
  setaddDartaModal = "setaddDartaModal",
  setviewNoticesModal = "setviewNoticesModal",
  setmuchulkaRemarksModal = "setmuchulkaRemarksModal",
  setplinthModal = "setplinthModal",
  setrevisionModal = "setrevisionModal",
  setnapiModal = "setnapiModal",
  setcurrentPid = "setcurrentPid",
  setnapiOrTech = "setnapiOrTech",
}

export interface IProjState {
  sub: boolean;
  projTransferModal: boolean;
  autocadModal: boolean;
  revenueModal: boolean;
  noticePubModal: boolean;
  additionalDocsModal: boolean;
  imagesModal: boolean;
  viewRemarksModal: boolean;
  commentsBySectionModal: boolean;
  addDartaModal: boolean;
  viewNoticesModal: boolean;
  muchulkaRemarksModal: boolean;
  plinthModal: boolean;
  revisionModal: boolean;
  napiModal: boolean;
  currentPid: number;
  napiOrTech: "napi" | "tech" | "" | "ward";
}

export interface IProjAction {
  type: ProjActionType;
  payload: any;
}

const reducer: React.Reducer<IProjState, IProjAction> = (state, action) => {
  switch (action.type) {
    case ProjActionType.setsub:
      return { ...state, sub: action.payload };
    case ProjActionType.setprojTransferModal:
      return { ...state, projTransferModal: action.payload };
    case ProjActionType.setautocadModal:
      return { ...state, setautocadModal: action.payload };
    case ProjActionType.setrevenueModal:
      return { ...state, revenueModal: action.payload };
    case ProjActionType.setnoticePubModal:
      return { ...state, noticePubModal: action.payload };
    case ProjActionType.setadditionalDocsModal:
      return { ...state, additionalDocsModal: action.payload };
    case ProjActionType.setimagesModal:
      return { ...state, imagesModal: action.payload };
    case ProjActionType.setviewRemarksModal:
      return { ...state, viewRemarksModal: action.payload };
    case ProjActionType.setcommentsBySectionModal:
      return { ...state, commentsBySectionModal: action.payload };
    case ProjActionType.setaddDartaModal:
      return { ...state, addDartaModal: action.payload };
    case ProjActionType.setviewNoticesModal:
      return { ...state, viewNoticesModal: action.payload };
    case ProjActionType.setmuchulkaRemarksModal:
      return { ...state, muchulkaRemarksModal: action.payload };
    case ProjActionType.setplinthModal:
      return { ...state, plinthModal: action.payload };
    case ProjActionType.setrevisionModal:
      return { ...state, revisionModal: action.payload };
    case ProjActionType.setnapiModal:
      return { ...state, napiModal: action.payload };
    case ProjActionType.setcurrentPid:
      return { ...state, currentPid: action.payload };
    case ProjActionType.setnapiOrTech:
      return { ...state, napiOrTech: action.payload };
    default:
      return state;
  }
};

export const MyProjStore = createContext<{
  state: IProjState;
  dispatch: React.Dispatch<IProjAction>;
}>({
  state: initState,
  dispatch: () => null,
});

export function ProjStoreProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initState);
  return (
    <MyProjStore.Provider value={{ state, dispatch }}>
      {children}
    </MyProjStore.Provider>
  );
}
