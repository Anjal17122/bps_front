export interface POSTnoticePublishBody {
  chalaninum: string;
  dateEng: string;
  dateNep: string;
  filename?: string;
  noticeProjectType: string;
  noticeStatus: string;
  patrasankhya: string;
  projectId: number;
}
export interface ResGETNoticePublishBody {
  data: GETNoticePublishBody[];
  message: string;
}

export interface GETNoticePublishBody extends POSTnoticePublishBody {
  id: number;
  creationDate: string;
}

export interface ResRemarksList {
  data: RemarksList[];
  message: string;
}

export interface RemarksList {
  id: number;
  date: string;
  remarks: string;
  userId: number;
  remarksFile?: string;
}
