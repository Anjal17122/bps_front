import { sN } from "../Services/ProjectService";

export type projectTypes =
  | "Vacant Land"
  | "Old & Demolish Building"
  | "Plinth Extension"
  | "Boundary Wall & Construction"
  | "Storey Addition"
  | "Facade Change"
  | "Roof Change"
  | "Super Structure Permit"
  | "Application for Complition"
  | "Already Build Building"
  | "DPC Renew"
  | string;

export type SingleValueType = sN[];
