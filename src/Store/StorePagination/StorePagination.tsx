import { createStore } from "react-hooks-global-state";
import { AcP, ActionsPage, PageState } from "./types";

const reducer = (state: PageState, action: ActionsPage): PageState => {
  switch (action.type) {
    case AcP.setOnDeskPage:
      return { ...state, OnDeskPage: action.payload };
    case AcP.setAllPage:
      return { ...state, AllPage: action.payload };
    case AcP.setUnapprovedPage:
      return { ...state, UnapprovedPage: action.payload };
    case AcP.setNoticePage:
      return { ...state, NoticePage: action.payload };
    case AcP.setMuchulkaPage:
      return { ...state, MuchulkaPage: action.payload };
    case AcP.setApprovedPage:
      return { ...state, ApprovedPage: action.payload };
    case AcP.setReturnedPage:
      return { ...state, ReturnedPage: action.payload };

    case AcP.setRevisionPage:
      return { ...state, RevisionPage: action.payload };
    case AcP.setDigiSignPage:
      return { ...state, DigiSignPage: action.payload };

    case AcP.setPlinthPage:
      return { ...state, PlinthPage: action.payload };
    case AcP.setSuperStructurePage:
      return { ...state, SuperStructurePage: action.payload };
    case AcP.setNirmanSampannaPage:
      return { ...state, NirmanSampannaPage: action.payload };

    // consultant
    case AcP.setNotSubmittedPage:
      return { ...state, NotSubmittedPage: action.payload };
    case AcP.setSubmittedPage:
      return { ...state, SubmittedPage: action.payload };
    case AcP.setNoticePageCon:
      return { ...state, NoticePageCon: action.payload };
    case AcP.setMuchulkaPageCon:
      return { ...state, MuchulkaPageCon: action.payload };
    case AcP.setApprovedPageCon:
      return { ...state, ApprovedPageCon: action.payload };
    case AcP.setReturnedPageCon:
      return { ...state, ReturnedPageCon: action.payload };
    case AcP.setRevisionPageCon:
      return { ...state, RevisionPageCon: action.payload };
    default:
      return state;
  }
};

const initialState: PageState = {
  OnDeskPage: 0,
  AllPage: 0,
  UnapprovedPage: 0,
  NoticePage: 0,
  MuchulkaPage: 0,
  ApprovedPage: 0,
  ReturnedPage: 0,
  RevisionPage: 0,
  PlinthPage: 0,
  SuperStructurePage: 0,
  NirmanSampannaPage: 0,
  DigiSignPage: 0,
  //consultant
  NotSubmittedPage: 0,
  SubmittedPage: 0,
  NoticePageCon: 0,
  MuchulkaPageCon: 0,
  ApprovedPageCon: 0,
  ReturnedPageCon: 0,
  RevisionPageCon: 0,
};

export const {
  dispatch: dispatchPage,
  getState,
  useStoreState,
} = createStore(reducer, initialState);

export function useStorePage() {
  const OnDeskPage = useStoreState("OnDeskPage");
  const AllPage = useStoreState("AllPage");
  const UnapprovedPage = useStoreState("UnapprovedPage");
  const NoticePage = useStoreState("NoticePage");
  const MuchulkaPage = useStoreState("MuchulkaPage");
  const ApprovedPage = useStoreState("ApprovedPage");
  const ReturnedPage = useStoreState("ReturnedPage");
  const RevisionPage = useStoreState("RevisionPage");
  const DigiSignPage = useStoreState("DigiSignPage");
  const NotSubmittedPage = useStoreState("NotSubmittedPage");
  const PlinthPage = useStoreState("PlinthPage");
  const SuperStructurePage = useStoreState("SuperStructurePage");
  const NirmanSampannaPage = useStoreState("NirmanSampannaPage");
  //
  const SubmittedPage = useStoreState("SubmittedPage");
  const NoticePageCon = useStoreState("NoticePageCon");
  const MuchulkaPageCon = useStoreState("MuchulkaPageCon");
  const ApprovedPageCon = useStoreState("ApprovedPageCon");
  const ReturnedPageCon = useStoreState("ReturnedPageCon");
  const RevisionPageCon = useStoreState("RevisionPageCon");

  return {
    OnDeskPage,
    AllPage,
    UnapprovedPage,
    NoticePage,
    MuchulkaPage,
    ApprovedPage,
    ReturnedPage,
    DigiSignPage,
    RevisionPage,
    NotSubmittedPage,
    PlinthPage,
    SuperStructurePage,
    NirmanSampannaPage,

    SubmittedPage,
    NoticePageCon,
    MuchulkaPageCon,
    ApprovedPageCon,
    ReturnedPageCon,
    RevisionPageCon,
  };
}
