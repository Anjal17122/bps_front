export interface NoticePublishValues {
  noticeProjectType: string[];
  patrasankhya: string;
  chalaninum: string;
  dateNep: string;
  uploadNotice?: UploadNotice[];
}

interface UploadNotice {
  uid: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  percent: number;
  originFileObj: OriginFileObj;
  status: string;
  response: Response;
}

interface Response {
  message: string;
}

interface OriginFileObj {
  uid: string;
}
