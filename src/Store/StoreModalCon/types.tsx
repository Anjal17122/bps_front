export enum AcMCon {
  setAddRevisionModal = "setAddRevisionModal",
  setUploadProjectImages = "setUploadProjectImages",
  setviewProjectImages = "setviewProjectImages",
  setviewNoticeRemarks = "setviewNoticeRemarks",
  setuploadAutoCad = "setuploadAutoCad",
  setViewComments = "setViewComments",
  setplinthModalCon = "setplinthModalCon",
  setRevisionDetails = "setRevisionDetails",
  setAgreementModalCon = "setAgreementModalCon",
}

export type ActionsPage = { type: AcMCon; payload: boolean };

export type ModalState = {
  uploadAutoCad: boolean;
  addRevisionModal: boolean;
  UploadProjectImages: boolean;
  viewProjectImages: boolean;
  viewNoticeRemarks: boolean;
  viewComments: boolean;
  plinthModalCon: boolean;
  revisionDetails: boolean;
  agreementModalCon: boolean;
  // noticeMuchulkaRemarks: boolean;
  // muchulkaViewNotice: boolean;
  // approvedPlinthModal: boolean;
  // revisionViewDetails: boolean;
  // revisionStatusModal: boolean;
  // plinthPopover: boolean;
};
