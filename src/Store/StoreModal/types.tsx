export enum AcModal {
  setMuchulkaNoticeModal = "setMuchulkaNoticeModal",
  setNoticeMuchulkaRemarks = "setNoticeMuchulkaRemarks",
  setMuchulkaViewNotice = "setMuchulkaViewNotice",
  setApprovedPlinthModal = "setApprovedPlinthModal",
  setrevisionViewDetails = "setrevisionViewDetails",
  setrevisionStatusModal = "setrevisionStatusModal",
  setPlinthPopover = "setPlinthPopover",
  setViewDrawingsModal = "setViewDrawingsModal",
  setModalGenerateNaamsari = "setModalGenerateNaamsari",
}

export type ActionsPage = { type: AcModal; payload: boolean };

export type ModalState = {
  muchulkaNoticeModal: boolean;
  noticeMuchulkaRemarks: boolean;
  muchulkaViewNotice: boolean;
  approvedPlinthModal: boolean;
  revisionViewDetails: boolean;
  revisionStatusModal: boolean;
  plinthPopover: boolean;
  viewDrawingsModal: boolean;
  modalGenerateNaamsari: boolean;
};
