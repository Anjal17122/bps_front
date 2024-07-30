export enum AcUrl {
  setOnDeskUrl = "setOnDeskUrl",
  setAllUrl = "setAllUrl",
  setUnapprovedUrl = "setUnapprovedUrl",
  setNoticeUrl = "setNoticeUrl",
  setMuchulkaUrl = "setMuchulkaUrl",
  setApprovedUrl = "setApprovedUrl",
  setReturnedUrl = "setReturnedUrl",
  setRevisionUrl = "setRevisionUrl",
  setDigiSignUrl = "setDigiSignUrl",
  setNotSubmittedUrl = "setNotSubmittedUrl",
  setPlinthUrl = "setPlinthUrl",
  setSuperStructureUrl = "setSuperStructureUrl",
  setNirmanSampannaUrl = "setNirmanSampannaUrl",
}

export type ActionsUrl = { type: AcUrl; payload: string };

export type UrlState = {
  OnDeskUrl: string;
  AllUrl: string;
  UnapprovedUrl: string;
  NoticeUrl: string;
  MuchulkaUrl: string;
  ApprovedUrl: string;
  ReturnedUrl: string;
  RevisionUrl: string;
  DigitalSignUrl: string;
  NotSubmittedUrl: string;

  PlinthUrl: string;
  SuperStructureUrl: string;
  NirmanSampannaUrl: string;
};
