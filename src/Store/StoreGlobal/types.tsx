import { LargeProjectType } from "../../Services/ProjectService";

export enum AcG {
  setDisableButton = "setDisableButton",
  setProjectData = "setProjectData",
  setLoginModal = "setLoginModal",
}

export type ActionsPage =
  | { type: AcG.setDisableButton; payload: boolean }
  | { type: AcG.setLoginModal; payload: boolean }
  | { type: AcG.setProjectData; payload: null | LargeProjectType };

export type GlobalState = {
  disabled: boolean;
  projectData: null | LargeProjectType;
  loginModal: boolean;
};
