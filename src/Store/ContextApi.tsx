import React, { createContext } from "react";
import { MappedAreaCat } from "../pages/SuperAdmin/FloorRate/FloorRate";
import { CommonType } from "../Services/AddressService";
import { FaqTyp } from "../Services/AdminService";
import {
  Land,
  LargeProjectType,
  OnDeskProjects,
  sN,
} from "../Services/ProjectService";
import { FloorListBody, FloorRateBody } from "../Services/SuperAdminService";
import {
  ApprovedUsers,
  getAddresses,
  UnapprovedUsers,
  UserToVerify,
} from "../Services/UserService";
import { CharKilla } from "../Services/PDFService";

export enum ActionType {
  getProject = "getProject",
  setNavType = "setNavType",
  setDownload = "setDownload",
  setFaq = "setFaq",
  setAddress = "setAddress",
  viewUser = "viewUser",
  setEditLogData = "setEditLogData",
  setNaamSariPid = "setNaamSariPid",
  setNaamSariModal = "setNaamSariModal",
  setNaamsariLand = "setNaamsariLand",
  setNaamSariSearch = "setNaamSariSearch",
  getUnapprovedUsers = "getUnapprovedUsers",
  getApprovedUsers = "getApprovedUsers",
  getDisabledUsers = "getDisabledUsers",
  setSelectedAddress = "setSelectedAddress",
  setProviPerma = "setProviPerma",
  setDistPerma = "setDistPerma",
  setMunisPerma = "setMunisPerma",
  setWardsPerma = "setWardsPerma",
  setProviTemp = "setProviTemp",
  setDistTemp = "setDistTemp",
  setMunisTemp = "setMunisTemp",
  setWardsTemp = "setWardsTemp",
  setFloorData = "setFloorData",
  setFloorCat = "setFloorCat",
  setBuildingCat = "setBuildingCat",
  setAreaCat = "setAreaCat",
  setStoreySearch = "setStoreySearch",
  resetAll = "resetAll",
  setSameTempAndPermaAdd = "setSameTempAndPermaAdd",
}

const initialAddresses: selectedAddresses = {
  province: "",
  district: "",
  muni: "",
  ward: "",
  chhetra: "",
  subChhetra: "",
  provinceTemp: "",
  districtTemp: "",
  muniTemp: "",
  wardTemp: "",
  chhetraTemp: "",
  subChhetraTemp: "",
};

export interface IState {
  selectedAddress: selectedAddresses;
  project: LargeProjectType;
  navType: boolean;
  download: { description: string; title: string; id: number };
  faq: FaqTyp;
  address: getAddresses;
  user: UserToVerify;
  editLogData: any;
  naamsariPid: string;
  naamsariModal: boolean;
  landNaamsari: Land;
  naamSariSearch: any[];
  unapprovedUsers: UnapprovedUsers[] | undefined;
  approvedUsers: ApprovedUsers[] | undefined;
  disabledUsers: ApprovedUsers[] | undefined;
  provincePerma: CommonType[];
  districtsPerma: CommonType[];
  munisPerma: CommonType[];
  wardsPerma: CommonType[];
  districtsTemp: CommonType[];
  munisTemp: CommonType[];
  wardsTemp: CommonType[];
  floorCat: FloorListBody[] | undefined;
  areaCat: MappedAreaCat[] | undefined;
  buildingCat: MappedAreaCat[] | undefined;
  floorRate: FloorRateBody[] | undefined;
  storeySearch: OnDeskProjects[];
  sameTempAndPermaAdd: boolean;
}

export interface IAction {
  type: ActionType;
  payload: any;
}

const largeProj = JSON.parse(localStorage.getItem("adminViewProject") || "{}");
const landNaamsari = JSON.parse(localStorage.getItem("landNaamsari") || "{}");

const initialState: IState = {
  selectedAddress: initialAddresses,
  project: largeProj as LargeProjectType,
  navType: false,
  download: { description: "", title: "", id: 0 },
  faq: {} as FaqTyp,
  address: {} as getAddresses,
  user: {} as UserToVerify,
  editLogData: {} as any,
  naamsariPid: "",
  naamsariModal: false,
  landNaamsari: landNaamsari as Land,
  naamSariSearch: [],
  unapprovedUsers: undefined,
  approvedUsers: undefined,
  disabledUsers: undefined,
  provincePerma: [],
  districtsPerma: [],
  munisPerma: [],
  wardsPerma: [],
  // provinceTemp: [],
  districtsTemp: [],
  munisTemp: [],
  wardsTemp: [],
  floorCat: undefined,
  areaCat: undefined,
  buildingCat: undefined,
  floorRate: undefined,
  storeySearch: [],
  sameTempAndPermaAdd: false,
};

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.getProject:
      return { ...state, project: action.payload };
    case ActionType.setNavType:
      return { ...state, navType: action.payload };
    case ActionType.setDownload:
      return { ...state, download: action.payload };
    case ActionType.setFaq:
      return { ...state, faq: action.payload };
    case ActionType.setAddress:
      return { ...state, address: action.payload };
    case ActionType.viewUser:
      return { ...state, user: action.payload };
    case ActionType.setEditLogData:
      return { ...state, editLogData: action.payload };
    case ActionType.setNaamSariPid:
      return { ...state, naamsariPid: action.payload };
    case ActionType.setNaamSariModal:
      return { ...state, naamsariModal: action.payload };
    case ActionType.setNaamsariLand:
      return { ...state, landNaamsari: action.payload };
    case ActionType.setNaamSariSearch:
      return { ...state, naamSariSearch: action.payload };
    case ActionType.getUnapprovedUsers:
      return { ...state, unapprovedUsers: action.payload };
    case ActionType.getDisabledUsers:
      return { ...state, disabledUsers: action.payload };
    case ActionType.getApprovedUsers:
      return { ...state, approvedUsers: action.payload };
    case ActionType.setSelectedAddress:
      return {
        ...state,
        selectedAddress: {
          ...state.selectedAddress,
          [action.payload.type]: action.payload.value,
        },
      };
    case ActionType.setProviPerma:
      return { ...state, provincePerma: action.payload };
    case ActionType.setDistPerma:
      return { ...state, districtsPerma: action.payload };
    case ActionType.setMunisPerma:
      return { ...state, munisPerma: action.payload };
    case ActionType.setWardsPerma:
      return { ...state, wardsPerma: action.payload };
    case ActionType.setDistTemp:
      return { ...state, districtsTemp: action.payload };
    case ActionType.setMunisTemp:
      return { ...state, munisTemp: action.payload };
    case ActionType.setWardsTemp:
      return { ...state, wardsTemp: action.payload };
    case ActionType.setAreaCat:
      return { ...state, areaCat: action.payload };
    case ActionType.setBuildingCat:
      return { ...state, buildingCat: action.payload };
    case ActionType.setFloorCat:
      return { ...state, floorCat: action.payload };
    case ActionType.setFloorData:
      return { ...state, floorRate: action.payload };
    case ActionType.setStoreySearch:
      return { ...state, storeySearch: action.payload };
    case ActionType.setSameTempAndPermaAdd:
      return { ...state, sameTempAndPermaAdd: action.payload };
    case ActionType.resetAll:
      return { ...initialState };
    default:
      return state;
  }
};

export const MyStore = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function StoreProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <MyStore.Provider value={{ state, dispatch }}>{children}</MyStore.Provider>
  );
}
//Use case
// const {dispatch} = useContext(Store);

// dispatch(Dispatches.setImageName(Actions.SET_IMAGE_NAME, info.file.response.name));

//  <StoreProvider>
//     <App />
//   </StoreProvider>,

interface selectedAddresses {
  province: sN;
  district: sN;
  muni: sN;
  ward: sN;
  chhetra: sN;
  subChhetra: sN;
  provinceTemp: sN;
  districtTemp: sN;
  muniTemp: sN;
  wardTemp: sN;
  chhetraTemp: sN;
  subChhetraTemp: sN;
}

interface Owner {
  id: number;
  nameNep: string;
  nameEng: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  photoFileName: string;
  citizenshipNo: string;
  citizenshipFileName: string;
  citizenIssueDist: string;
  citizenIssueDate: string;
  fatherNameNep: string;
  fatherNameEng: string;
  grandfatherNameNep: string;
  grandfatherNameEng: string;
  gender: string;
  maritalStatus: string;
  personRole?: string;
  address: any[];
}

export interface LandNaamsari {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana?: string;
  paisa?: string;
  daam?: string;
  remarks: string;
  wardName: string;
  toleNep: string;
  toleEng: string;
  landImageName: string;
  traceNaksa: string;
  tiroRasid: string;
  owner: Owner;
  houseOwner?: Owner;
  charKillas: CharKilla[];
  projectId: number;
  charkillaLetter: string;
  address?: string;
}
