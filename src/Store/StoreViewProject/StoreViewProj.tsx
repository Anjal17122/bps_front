import { useQueryClient } from "@tanstack/react-query";
import { createStore } from "react-hooks-global-state";
import { OnDeskProjects } from "../../Services/ProjectService";
import { useStorePage } from "../StorePagination/StorePagination";
import { Ac, ActionViewProj, StateOnD } from "./types";

const reducer = (state: StateOnD, action: ActionViewProj): StateOnD => {
  switch (action.type) {
    case Ac.openNapiM:
      return { ...state, ...action.payload };
    case Ac.closeNapiM:
      return { ...state, ...action.payload };
    case Ac.openTechnicalM:
      return { ...state, ...action.payload };
    case Ac.disableBtn:
      return { ...state, disabled: action.payload };
    case Ac.setSearch:
      return { ...state, search: true, activeTab: action.payload };
    case Ac.setAutoCadModal:
      return { ...state, ...action.payload };
    case Ac.closeLogModal:
      return { ...state, logModal: false, currentPid: 0 };
    case Ac.closeAdditionalDoc:
      return { ...state, additionalDocsModal: false, currentPid: 0 };
    case Ac.muchulkaModal:
      return { ...state, ...action.payload };
    case Ac.setFinalApprover:
      return { ...state, finalApprover: action.payload };
    case Ac.setprojTransferModal:
      return { ...state, ...action.payload };
    case Ac.setNapiOrTech:
      return { ...state, ...action.payload };
    case Ac.setCurrentPid:
      return { ...state, currentPid: action.payload };
    case Ac.setNoticePubModal:
      return { ...state, ...action.payload };
    case Ac.setRevenueModal:
      return { ...state, ...action.payload };
    case Ac.setImagesModal:
      return { ...state, ...action.payload };
    case Ac.setSignedDrawingsModal:
      return { ...state, ...action.payload };
    case Ac.setCommentsModal:
      return { ...state, ...action.payload };
    case Ac.setAddDartaNoModal:
      return { ...state, ...action.payload };
    case Ac.setRevisionId:
      return { ...state, revisionId: action.payload };
    case Ac.setPlinthData:
      return { ...state, ...action.payload };
    case Ac.setAdditionalDocModal:
      return { ...state, ...action.payload };
    case Ac.setNewMuchulka:
      return { ...state, newMuchulka: action.payload };
    case Ac.setSarjiminMuchulka:
      return { ...state, sarjiminMuchulka: action.payload };
    case Ac.setIsMuchulka:
      return { ...state, isMuchulka: action.payload };
    default:
      return state;
  }
};
const initialState: StateOnD = {
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
  viewNoticesModal: false,
  muchulkaRemarksModal: false,
  plinthModal: false,
  revisionModal: false,
  technicalReportModal: false,
  logModal: false,
  muchulkaModal: false,
  search: false,
  signedDrawingsModal: false,
  commentsModal: false,
  currentPid: 0,
  revisionId: 0,
  napiOrTech: "",
  technicalReportName: "",
  finalApprover: "TECHNICAL",
  activeTab: "OnDesk",
  projCreationDate: "",
  addDartaNoModal: false,
  plinthData: null,
  newMuchulka: false,
  sarjiminMuchulka: false,
  isMuchulka: false,
  applicantName: "na",
};

export const { dispatch, getState, useStoreState } = createStore(
  reducer,
  initialState
);

export function useStoreViewProj() {
  const finalApprover = useStoreState("finalApprover");
  const disabled = useStoreState("disabled");
  const napiModal = useStoreState("napiModal");
  const projTransferModal = useStoreState("projTransferModal");
  const autocadModal = useStoreState("autocadModal");
  const revenueModal = useStoreState("revenueModal");
  const noticePubModal = useStoreState("noticePubModal");
  const additionalDocsModal = useStoreState("additionalDocsModal");
  const imagesModal = useStoreState("imagesModal");
  const viewRemarksModal = useStoreState("viewRemarksModal");
  const commentsModal = useStoreState("commentsModal");
  const commentsBySectionModal = useStoreState("commentsBySectionModal");
  const viewNoticesModal = useStoreState("viewNoticesModal");
  const muchulkaRemarksModal = useStoreState("muchulkaRemarksModal");
  const plinthModal = useStoreState("plinthModal");
  const revisionModal = useStoreState("revisionModal");
  const technicalReportModal = useStoreState("technicalReportModal");
  const logModal = useStoreState("logModal");
  const currentPid = useStoreState("currentPid");
  const napiOrTech = useStoreState("napiOrTech");
  const technicalReportName = useStoreState("technicalReportName");
  const search = useStoreState("search");
  const activeTab = useStoreState("activeTab");
  const muchulkaModal = useStoreState("muchulkaModal");
  const signedDrawingsModal = useStoreState("signedDrawingsModal");
  const addDartaNoModal = useStoreState("addDartaNoModal");
  const revisionId = useStoreState("revisionId");
  const plinthData = useStoreState("plinthData");

  const newMuchulka = useStoreState("newMuchulka");
  const sarjiminMuchulka = useStoreState("sarjiminMuchulka");
  const isMuchulka = useStoreState("isMuchulka");
  const applicantName = useStoreState("applicantName");

  return {
    plinthData,
    revisionId,
    commentsModal,
    finalApprover,
    disabled,
    napiModal,
    projTransferModal,
    autocadModal,
    revenueModal,
    noticePubModal,
    additionalDocsModal,
    imagesModal,
    viewRemarksModal,
    commentsBySectionModal,
    viewNoticesModal,
    muchulkaRemarksModal,
    plinthModal,
    revisionModal,
    technicalReportModal,
    logModal,
    currentPid,
    napiOrTech,
    technicalReportName,
    search,
    activeTab,
    muchulkaModal,
    signedDrawingsModal,
    addDartaNoModal,
    newMuchulka,
    sarjiminMuchulka,
    isMuchulka,
    applicantName,
  };
}

export const delProjById = () => {
  const queryClient = useQueryClient();
  const { OnDeskPage } = useStorePage();
  const { currentPid } = useStoreViewProj();
  const onDeskData: OnDeskProjects[] | undefined = queryClient.getQueryData([
    "OnDesk",
    OnDeskPage,
  ]);
  const updatedArray = onDeskData?.filter((proj) => proj.id !== currentPid);
  queryClient.setQueriesData(["OnDesk", OnDeskPage], updatedArray);
};

export default useStoreViewProj;
