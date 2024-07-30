import { projectTypes } from "../../constants/typesGlobal";
import { TabTy } from "../../pages/Admin/OnDeskFinal/AdminViewProjFInal/common/types";

export enum Ac {
  setFinalApprover = "setFinalApprover",
  openNapiM = "openNapiM",
  closeNapiM = "closeNapiM",
  openTechnicalM = "openTechnicalM",
  closeTechnicalM = "closeTechnicalM",
  disableBtn = "disableBtn",
  setSearch = "setSearch",
  setAutoCadModal = "setAutoCadModal",
  closeLogModal = "closeLogModal",
  setImagesModal = "setImagesModal",
  closeAdditionalDoc = "closeAdditionalDoc",
  muchulkaModal = "muchulkaModal",
  setprojTransferModal = "setprojTransferModal",
  setNapiOrTech = "setNapiOrTech",
  setCurrentPid = "setCurrentPid",
  setNoticePubModal = "setNoticePubModal",
  setRevenueModal = "setRevenueModal",
  setAdditionalDocModal = "setAdditionalDocModal",
  setSignedDrawingsModal = "setSignedDrawingsModal",
  setCommentsModal = "setCommentsModal",
  setAddDartaNoModal = "setAddDartaNoModal",
  setRevisionId = "setRevisionId",
  setPlinthData = "setPlinthData",
  setNewMuchulka = "setNewMuchulka",
  setSarjiminMuchulka = "setSarjiminMuchulka",
  setIsMuchulka = "setIsMuchulka",
}

export type napiOrTechTyp = "napi" | "tech" | "ward" | "";

export type ActionViewProj =
  | { type: Ac.setFinalApprover; payload: FinalApprovers }
  | {
      type: Ac.openNapiM;
      payload: napiOpenPayload;
    }
  | {
      type: Ac.closeNapiM;
      payload: napiOpenPayload;
    }
  | {
      type: Ac.openTechnicalM;
      payload: { technicalReportName: string; technicalReportModal: boolean };
    }
  | {
      type: Ac.closeTechnicalM;
      payload: { technicalReportName: string; technicalReportModal: boolean };
    }
  | {
      type: Ac.setSearch;
      payload: TabTy;
    }
  | {
      type: Ac.disableBtn;
      payload: boolean;
    }
  | {
      type: Ac.closeLogModal;
    }
  | {
      type: Ac.setImagesModal;
      payload: { imagesModal: boolean; currentPid: number };
    }
  | {
      type: Ac.setAutoCadModal;
      payload: { autocadModal: boolean; currentPid: number };
    }
  | {
      type: Ac.closeAdditionalDoc;
    }
  | {
      type: Ac.setNapiOrTech;
      payload: {
        napiOrTech: napiOrTechTyp;
        napiModal: boolean;
        currentPid: number;
      };
    }
  | {
      type: Ac.setCurrentPid;
      payload: number;
    }
  | {
      type: Ac.setRevenueModal;
      payload: { revenueModal: boolean; currentPid: number };
    }
  | {
      type: Ac.setAdditionalDocModal;
      payload: { additionalDocsModal: boolean; currentPid: number };
    }
  | {
      type: Ac.setSignedDrawingsModal;
      payload: { signedDrawingsModal: boolean; currentPid: number };
    }
  | {
      type: Ac.setCommentsModal;
      payload: { commentsModal: boolean; currentPid: number };
    }
  | {
      type: Ac.muchulkaModal;
      payload: { currentPid: number; muchulkaModal: boolean };
    }
  | {
      type: Ac.setNoticePubModal;
      payload: {
        currentPid: number;
        noticePubModal: boolean;
        projCreationDate: string;
      };
    }
  | {
      type: Ac.setprojTransferModal;
      payload: { projTransferModal: boolean; currentPid: number };
    }
  | {
      type: Ac.setAddDartaNoModal;
      payload: { currentPid: number; addDartaNoModal: boolean };
    }
  | {
      type: Ac.setRevisionId;
      payload: number;
    }
  | {
      type: Ac.setPlinthData;
      payload: {
        currentPid: number;
        plinthData: null | {
          projectType: string;
          buildingPurpose: string;
        };
        applicantName: string;
      };
    }
  | {
      type: Ac.setNewMuchulka;
      payload: boolean;
    }
  | {
      type: Ac.setSarjiminMuchulka;
      payload: boolean;
    }
  | {
      type: Ac.setIsMuchulka;
      payload: boolean;
    };

type FinalApprovers =
  | "REGISTRATION"
  | "TECHNICAL_DEPARTMENT"
  | "TECHNICAL"
  | "EXECUTIVE"
  | "WARD"
  | "REVENUE"
  | "NAPI"
  | "WARD_TECHNICAL"
  | "SUB_ENGINEER"
  | "ASST_SUB_ENGINEER";

export interface StateOnD {
  disabled: boolean;
  napiModal: boolean;
  projTransferModal: boolean;
  autocadModal: boolean;
  revenueModal: boolean;
  noticePubModal: boolean;
  additionalDocsModal: boolean;
  imagesModal: boolean;
  viewRemarksModal: boolean;
  commentsBySectionModal: boolean;
  viewNoticesModal: boolean;
  muchulkaRemarksModal: boolean;
  plinthModal: boolean;
  revisionModal: boolean;
  technicalReportModal: boolean;
  logModal: boolean;
  muchulkaModal: boolean;
  currentPid: number;
  search: boolean;
  signedDrawingsModal: boolean;
  technicalReportName: string;
  projCreationDate: string;
  napiOrTech: napiOrTechTyp;
  activeTab: TabTy;
  finalApprover: FinalApprovers;
  commentsModal: boolean;
  addDartaNoModal: boolean;
  revisionId: number;
  plinthData: null | { projectType: projectTypes; buildingPurpose: string };
  newMuchulka: boolean;
  sarjiminMuchulka: boolean;
  isMuchulka: boolean;
  applicantName: string;
}

type napiOpenPayload = {
  currentPid: number;
  napiModal: boolean;
  napiOrTech: napiOrTechTyp;
};

// interface RootObject {
//   finalApprover: string;
//   disabled: boolean;
//   napiModal: boolean;
//   projTransferModal: boolean;
//   autocadModal: boolean;
//   revenueModal: boolean;
//   noticePubModal: boolean;
//   additionalDocsModal: boolean;
//   imagesModal: boolean;
//   viewRemarksModal: boolean;
//   commentsBySectionModal: boolean;
//   viewNoticesModal: boolean;
//   muchulkaRemarksModal: boolean;
//   plinthModal: boolean;
//   revisionModal: boolean;
//   technicalReportModal: boolean;
//   logModal: boolean;
//   currentPid: number;
//   napiOrTech: napiOrTechTyp;
//   technicalReportName: string;
//   search: boolean;
//   activeTab: string;
//   muchulkaModal: boolean;
//   projCreationDate: string;
// }
