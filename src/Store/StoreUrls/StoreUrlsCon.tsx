import { createStore } from "react-hooks-global-state";
import { AcUrl, ActionsUrl, UrlState } from "./types";

const reducer = (state: UrlState, action: ActionsUrl) => {
  switch (action.type) {
    case AcUrl.setOnDeskUrl:
      return { ...state, OnDeskUrl: action.payload };
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
    default:
      return state;
  }
};

export const initialUrl: UrlState = {
  OnDeskUrl: "/project/perma/on/desk?page=",
  UnapprovedUrl: "/project/perma/pending?page=",
  NoticeUrl: "/project/perma/notice/published?page=",
  MuchulkaUrl: "/project/perma/muchulka?page=",
  ApprovedUrl: "/project/perma/approved?page=",
  ReturnedUrl: "/project/perma/return/admin?page=",
  RevisionUrl: "/project/perma/revision?page=",
};

export const initialState: UrlState = {
  OnDeskUrl: "/project/perma/on/desk?page=",
  UnapprovedUrl: "/project/perma/pending?page=",
  NoticeUrl: "/project/perma/notice/published?page=",
  MuchulkaUrl: "/project/perma/muchulka?page=",
  ApprovedUrl: "/project/perma/approved?page=",
  ReturnedUrl: "/project/perma/return/admin?page=",
  RevisionUrl: "/project/perma/revision?page=",
};

export const {
  dispatch: dispatchUrl,
  getState,
  useStoreState,
} = createStore(reducer, initialState);

export function useStoreUrl() {
  const OnDeskUrl = useStoreState("OnDeskUrl");
  const UnapprovedUrl = useStoreState("UnapprovedUrl");
  const NoticeUrl = useStoreState("NoticeUrl");
  const MuchulkaUrl = useStoreState("MuchulkaUrl");
  const ApprovedUrl = useStoreState("ApprovedUrl");
  const ReturnedUrl = useStoreState("ReturnedUrl");
  const RevisionUrl = useStoreState("RevisionUrl");

  return {
    OnDeskUrl,
    UnapprovedUrl,
    NoticeUrl,
    MuchulkaUrl,
    ApprovedUrl,
    ReturnedUrl,
    RevisionUrl,
  };
}
