export enum AcP {
  setOnDeskPage = "setOnDeskPage",
  setAllPage = "setAllPage",
  setUnapprovedPage = "setUnapprovedPage",
  setNoticePage = "setNoticePage",
  setMuchulkaPage = "setMuchulkaPage",
  setApprovedPage = "setApprovedPage",
  setReturnedPage = "setReturnedPage",
  setRevisionPage = "setRevisionPage",
  setPlinthPage = "setPlinthPage",
  setSuperStructurePage = "setSuperStructurePage",
  setNirmanSampannaPage = "setNirmanSampannaPage",
  setDigiSignPage = "setDigiSignPage",
  //consultant
  setNotSubmittedPage = "setNotSubmittedPage",
  setSubmittedPage = "setSubmittedPage",
  setNoticePageCon = "setNoticePageCon",
  setMuchulkaPageCon = "setMuchulkaPageCon",
  setApprovedPageCon = "setApprovedPageCon",
  setReturnedPageCon = "setReturnedPageCon",
  setRevisionPageCon = "setRevisionPageCon",
}

export type ActionsPage = { type: AcP; payload: number };

export type PageState = {
  DigiSignPage: number;
  OnDeskPage: number;
  AllPage: number;
  UnapprovedPage: number;
  NoticePage: number;
  MuchulkaPage: number;
  ApprovedPage: number;
  ReturnedPage: number;
  RevisionPage: number;
  PlinthPage: number;
  SuperStructurePage: number;
  NirmanSampannaPage: number;

  NotSubmittedPage: number;
  SubmittedPage: number;
  NoticePageCon: number;
  MuchulkaPageCon: number;
  ApprovedPageCon: number;
  ReturnedPageCon: number;
  RevisionPageCon: number;
};
