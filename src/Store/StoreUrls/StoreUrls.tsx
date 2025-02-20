import { createStore } from "react-hooks-global-state";
import { AcUrl, ActionsUrl, UrlState } from "./types";

const reducer = (state: UrlState, action: ActionsUrl): UrlState => {
  switch (action.type) {
    case AcUrl.setOnDeskUrl:
      return { ...state, OnDeskUrl: action.payload };
    case AcUrl.setAllUrl:
      return { ...state, AllUrl: action.payload };
    case AcUrl.setUnapprovedUrl:
      return { ...state, UnapprovedUrl: action.payload };
    case AcUrl.setNoticeUrl:
      return { ...state, NoticeUrl: action.payload };
    case AcUrl.setMuchulkaUrl:
      return { ...state, MuchulkaUrl: action.payload };
    case AcUrl.setApprovedUrl:
      return { ...state, ApprovedUrl: action.payload };
    case AcUrl.setReturnedUrl:
      return { ...state, ReturnedUrl: action.payload };
    case AcUrl.setRevisionUrl:
      return { ...state, RevisionUrl: action.payload };
    case AcUrl.setRevisionUrl:
      return { ...state, RevisionUrl: action.payload };
    case AcUrl.setNotSubmittedUrl:
      return { ...state, NotSubmittedUrl: action.payload };

    case AcUrl.setPlinthUrl:
      return { ...state, PlinthUrl: action.payload };
    case AcUrl.setSuperStructureUrl:
      return { ...state, SuperStructureUrl: action.payload };
    case AcUrl.setNirmanSampannaUrl:
      return { ...state, NirmanSampannaUrl: action.payload };
    default:
      return state;
  }
};

export const initialUrl: UrlState = {
  OnDeskUrl: "/project/perma/on/desk?page=",
  AllUrl: "/project/perma/all?page=",
  UnapprovedUrl: "/project/perma/pending?page=",
  NoticeUrl: "/project/perma/notice/published?page=",
  MuchulkaUrl: "/project/perma/muchulka?page=",
  ApprovedUrl: "/project/perma/approved?page=",
  ReturnedUrl: "/project/perma/return/admin?page=",
  RevisionUrl: "/project/perma/revision?page=",
  DigitalSignUrl: "/project/perma/for/sign?page=",

  NotSubmittedUrl: "/project/own?page=",
  PlinthUrl: "/project/perma/by/projectstatus?status=PLINTH&page=",
  SuperStructureUrl:
    "/project/perma/by/projectstatus?status=SUPERSTRUCTURE&page=",
  NirmanSampannaUrl:
    "/project/perma/by/projectstatus?status=NIRMANSAMPANNA&page=",
};

export const initialState: UrlState = {
  OnDeskUrl: "/project/perma/on/desk?page=",
  AllUrl: "/project/perma/all?page=",
  UnapprovedUrl: "/project/perma/pending?page=",
  NoticeUrl: "/project/perma/notice/published?page=",
  MuchulkaUrl: "/project/perma/muchulka?page=",
  ApprovedUrl: "/project/perma/approved?page=",
  ReturnedUrl: "/project/perma/return/admin?page=",
  RevisionUrl: "/project/perma/revision?page=",
  DigitalSignUrl: "/project/perma/for/sign?page=",

  NotSubmittedUrl: "/project/own?page=",

  PlinthUrl: "/project/perma/by/projectstatus?status=PLINTH&page=",
  SuperStructureUrl:
    "/project/perma/by/projectstatus?status=SUPERSTRUCTURE&page=",
  NirmanSampannaUrl:
    "/project/perma/by/projectstatus?status=NIRMANSAMPANNA&page=",
};

export const {
  dispatch: dispatchUrl,
  getState,
  useStoreState,
} = createStore(reducer, initialState);

export function useStoreUrl() {
  const OnDeskUrl = useStoreState("OnDeskUrl");
  const AllUrl = useStoreState("AllUrl");
  const UnapprovedUrl = useStoreState("UnapprovedUrl");
  const NoticeUrl = useStoreState("NoticeUrl");
  const MuchulkaUrl = useStoreState("MuchulkaUrl");
  const ApprovedUrl = useStoreState("ApprovedUrl");
  const ReturnedUrl = useStoreState("ReturnedUrl");
  const RevisionUrl = useStoreState("RevisionUrl");
  const DigitalSignUrl = useStoreState("DigitalSignUrl");

  const PlinthUrl = useStoreState("PlinthUrl");
  const SuperStructureUrl = useStoreState("SuperStructureUrl");
  const NirmanSampannaUrl = useStoreState("NirmanSampannaUrl");
  const NotSubmittedUrl = useStoreState("NotSubmittedUrl");

  return {
    OnDeskUrl,
    AllUrl,
    UnapprovedUrl,
    NoticeUrl,
    MuchulkaUrl,
    ApprovedUrl,
    ReturnedUrl,
    RevisionUrl,
    DigitalSignUrl,
    NotSubmittedUrl,

    PlinthUrl,
    SuperStructureUrl,
    NirmanSampannaUrl,
  };
}
