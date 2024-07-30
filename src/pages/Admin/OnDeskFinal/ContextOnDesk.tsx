import React, { createContext } from "react";
import { TabTy } from "../OnDesk/AdminViewTypes";

export enum Actions {
  openNapiM = "openNapiM",
  closeNapiM = "closeNapiM",
  openTechnicalM = "openTechnicalM",
  closeTechnicalM = "closeTechnicalM",
  disableBtn = "disableButtons",
  enableBtn = "enableButtons",
  setSearch = "setSearch",
  closeAutocadM = "closeAutocadM",
  closeLogModal = "closeLogModal",
  closeImagesModal = "closeImagesModal",
  closeAdditionalDoc = "closeAdditionalDoc",
  muchulkaModal = "muchulkaModal",
}

type napiOrTechTyp = "napi" | "tech" | "ward" | null;

export interface ISonDesk {
  napiModal: boolean;
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
  muchulkaModal: boolean;
  technicalReportModal: boolean;
  logModal: boolean;
  currentPid: number;
  napiOrTech: napiOrTechTyp;
  technicalReportName: string;
  disabled: boolean;
  search: boolean;
  activeTab: TabTy;
}

type napiOpenPayload = {
  currentPid: number;
  napiModal: boolean;
  napiOrTech: napiOrTechTyp;
};

const initialState: ISonDesk = {
  disabled: false,
  napiModal: false,
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
  technicalReportModal: false,
  logModal: false,
  currentPid: 0,
  napiOrTech: null,
  technicalReportName: "",
  search: false,
  activeTab: "OnDesk",
  muchulkaModal: false,
};

const reducer: React.Reducer<ISonDesk, IAction> = (state, action) => {
  switch (action.type) {
    case Actions.openNapiM:
      return { ...state, ...action.payload };
    case Actions.closeNapiM:
      return { ...state, ...action.payload };
    case Actions.openTechnicalM:
      return { ...state, ...action.payload };
    case Actions.disableBtn:
      return { ...state, disabled: true };
    case Actions.enableBtn:
      return { ...state, disabled: false };
    case Actions.setSearch:
      return { ...state, search: true, activeTab: action.payload };
    case Actions.closeAutocadM:
      return { ...state, autocadModal: false, currentPid: 0 };
    case Actions.closeLogModal:
      return { ...state, logModal: false, currentPid: 0 };
    case Actions.closeAdditionalDoc:
      return { ...state, add: false, currentPid: 0 };
    case Actions.muchulkaModal:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const OndeskStore = createContext<{
  state: ISonDesk;
  dispatch: React.Dispatch<IAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function OnDeskProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <OndeskStore.Provider value={{ state, dispatch }}>
      {children}
    </OndeskStore.Provider>
  );
}

export function withOndesk(WrappedComponent: () => JSX.Element) {
  return function EnhancedComponent(props: object) {
    return (
      <OnDeskProvider>
        <WrappedComponent {...props} />
      </OnDeskProvider>
    );
  };
}

export type IAction =
  | {
      type: Actions.openNapiM;
      payload: napiOpenPayload;
    }
  | {
      type: Actions.closeNapiM;
      payload: napiOpenPayload;
    }
  | {
      type: Actions.openTechnicalM;
      payload: { technicalReportName: string; technicalReportModal: boolean };
    }
  | {
      type: Actions.closeTechnicalM;
      payload: { technicalReportName: string; technicalReportModal: boolean };
    }
  | {
      type: Actions.disableBtn;
    }
  | {
      type: Actions.setSearch;
      payload: TabTy;
    }
  | {
      type: Actions.enableBtn;
    }
  | {
      type: Actions.closeLogModal;
    }
  | {
      type: Actions.closeImagesModal;
    }
  | {
      type: Actions.closeAutocadM;
    }
  | {
      type: Actions.closeAdditionalDoc;
    }
  | {
      type: Actions.closeAutocadM;
    }
  | {
      type: Actions.closeAutocadM;
    }
  | {
      type: Actions.closeAutocadM;
    }
  | {
      type: Actions.closeAutocadM;
    }
  | {
      type: Actions.closeAutocadM;
    }
  | {
      type: Actions.muchulkaModal;
      payload: { currentPid: number; muchulkaModal: boolean };
    };

// import { createStore } from 'react-hooks-global-state';

// type Action =
//   | { type: 'increment' }
//   | { type: 'decrement' }
//   | { type: 'setFirstName'; firstName: string }
//   | { type: 'setLastName'; lastName: string }
//   | { type: 'setAge'; age: number };

// export const { dispatch, useStoreState } = createStore(
//   (state, action: Action) => {
//     switch (action.type) {
//       case 'increment': return {
//         ...state,
//         count: state.count + 1,
//       };
//       case 'decrement': return {
//         ...state,
//         count: state.count - 1,
//       };
//       case 'setFirstName': return {
//         ...state,
//         person: {
//           ...state.person,
//           firstName: action.firstName,
//         },
//       };
//       case 'setLastName': return {
//         ...state,
//         person: {
//           ...state.person,
//           lastName: action.lastName,
//         },
//       };
//       case 'setAge': return {
//         ...state,
//         person: {
//           ...state.person,
//           age: action.age,
//         },
//       };
//       default: return state;
//     }
//   },
//   {
//     count: 0,
//     person: {
//       age: 0,
//       firstName: '',
//       lastName: '',
//     },
//   },
// );

// //Use case
// // const {dispatch} = useContext(Store);

// // dispatch(Dispatches.setImageName(Actions.SET_IMAGENAME, info.file.response.name));

// //  <StoreProvider>
// //     <App />
// //   </StoreProvider>,
