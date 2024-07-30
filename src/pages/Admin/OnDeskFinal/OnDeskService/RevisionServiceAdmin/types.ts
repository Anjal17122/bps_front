import { sN } from "../../../../../Services/ProjectService";

export interface POSTrevisionBody {
  remarks: string;
  project: sN;
  docs: Doc[];
}

interface Doc {
  filename: string;
  fileType: sN;
}

export interface ResGETrevisionStatus {
  data: ResGETrevisionStatusBody[];
  message: string;
}

export interface ResGETrevisionStatusBody {
  id: number;
  revisionId: number;
  approvedBy: number;
  approvedDate: string;
  role: string;
}
