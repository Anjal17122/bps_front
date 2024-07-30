export interface POSTRasidBody {
  discount: string;
  fine: string;
  total: string;
  projectId: number;
  rasidNo: string;
  rasidDate: string;
  fileName: string;
  amount: number;
  remarks: string;
}

export interface FloorRow {
  id?: number;
  countable: number;
  nCNT: number;
  name: string;
  ncT: number;
  other: number;
  prev: number;
  rate?: number;
  total?: number;
}

export type TabTy =
  | "OnDesk"
  | "Unapproved"
  | "Notice"
  | "Muchulka"
  | "Approved"
  | "Returned"
  | "Revision";
