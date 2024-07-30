export interface AutocadVal {
  fileTypeId: string[];
  upload: Upload[];
}

interface Upload {
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
