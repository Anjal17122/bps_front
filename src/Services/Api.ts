import Axios from "axios";
import {
  ResponseMessageType,
  showToastResponse,
  showToastError,
} from "./helper";
import { setSTyp } from "./CreateProjectService";
import { getToken } from "./UserService";
import { dispatch } from "../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../Store/StoreViewProject/types";

const BASE_FROM_ENV: string =
  window.globalConfig.baseUrl || "https://bpsapi.addon.com.np";

export const BASE_URL = BASE_FROM_ENV;
// export const BASE_URL = "http://192.168.1.87:5000";
// "https://naksapass-api.panautimun.gov.np";
// "https://developer-api-bps.hamrokarobar.com";
// "https://api-bps.navya.com.np"; //latest test
// "https://bpsapi.addon.com.np";
// "https://naksapass-api.mandandeupurmun.gov.np";
// latest test
// "http://localhost:5000";
// "https://bpsdigi.navya.com.np";
// "http://192.168.1.74:5100";

// "https://api-naksapass-gokarneshwormun.navya.com.np";
// "https://naksapass-api.ichchhakamanamun.gov.np";
// "https://naksapass-api.shahidlakhanmun.gov.np";
// "https://bps-bardibas-api.addon.com.np";
// "https://bps-gokarneshwormun.addon.com.np";
// "https://naksapass-api.dhunibeshimun.gov.np";
// "https://naksapass-api.nagarjunmun.gov.np";

// export const IMAGE_URL = "https://bpsbucketaddon.s3.ap-south-1.amazonaws.com";
// export const IMAGE_URL = BASE_URL + "/files"; // s3 link

export const WEBSOCKET_URL = "wss://127.0.0.1:" + "8080";

export const DIGI_SIGN_UPLOAD_URL =
  BASE_URL + "/images/digitalsignatureupload?dir=";

export const IMG_SAVE_URL = BASE_URL + "/images/save"; // local link

// file name must be unique to be saved
export const DRAWINGS_URL = (dir: string, filename: string): string =>
  BASE_URL + "/images/unique" + `?dir=${dir}&filename=${filename}`; // local link

export const UPLOAD_FLOOR_RATE = BASE_URL + "/floor/rate/save";

export const UPLOAD_URL = (dirname: string, filename: string) =>
  BASE_URL + `/file/replace?dir=${dirname}&filename=${filename}`;

// export const DOWNLOAD_URL = BASE_URL + "/files/download/";

export const IMG_GET_URL = BASE_URL + "/images";
// "https://bpsbucketaddon.s3.ap-south-1.amazonaws.com";
export const PDF_URL = BASE_URL + "/images/pdf"; //local pdf

export const NEW_DW_URL = "https://bpsbucketaddon.s3.ap-south-1.amazonaws.com";
// export const NEW_DW_URL = "https://bpsgokarneshwor.s3.ap-south-1.amazonaws.com";

export const MUCHULKA_DW = IMG_GET_URL + "/muchulka/";
export const MUCHULKA_PDF = PDF_URL + "/muchulka/";
export const PERSON_URL = IMG_GET_URL + "/person/";

export const NAPI_DW = IMG_GET_URL + "/napi/";
export const NAPI_PDF = PDF_URL + "/napi/";

export const PROJECT_IMAGES = IMG_GET_URL + "/temp/";

export const MAP_API = "AIzaSyAy5-VOmSjCBdyf0RjaEa3asNCuAwnUKFw";

export const imgFolders = {
  temp: "temp",
  person: "person",
  necCert: "nec",
  citizenship: "citizenship",
  orgLogo: "logo",
  companyReg: "reg",
  companyPAN: "pan",
  companyTaxCl: "tax", 
  lalpurja: "lalpurja",
  tiroRasid: "tiroRasid",
  traceNaksa: "traceNaksa",
  charkilla: "charkilla",
  ARCHITECTURAL: "architectural",
  STRUCTURAL: "structural",
  ELECTRICAL: "electrical",
  SANITATION: "sanitation",
  ANALYSISFILE: "analysisfile",
  ANALYSISREPORT: "analysisreport",
  downloads: "downloads",
  notice: "notice",
  charkillaLetter: "charkillaLetter",
  plinthCert: "plinthcert",
  plinth: "plinth",
  superstructure: "superstructure",
  remarks: "remarks",
  techincal_committee_report: "techincal_committee_report",
  rasid: "rasid",
  additionalDocuments: "additionalDocuments",
  wardFile: "wardFile",
  autocad: "autocad",
  floorrate: "floorrate",
  muchulka: "muchulka",
  manjurinama: "manjurinama",
  revision: "revision",
  drawings: "drawings",
  notice15: "notice-15",
  notice7: "notice-7",
  notice21: "notice-21",
  consultantDetail: "consultantDetail",
  agreement: "agreement",
};

export const PDF_FLOOR_RATE =
  PDF_URL + `/${imgFolders.floorrate}/` + "floor_rate.pdf";
// export const FILE_URL = BASE_URL + "/public/images/save";
// export const BASE_IMG = BASE_URL + "/images";
// export const VIEW_PUB_URL = BASE_URL + "/images/public/";

const generateHeaders = (headers?: any) => ({
  Authorization: getToken(),
  ...headers,
});

export const myHeaders = () => ({ headers: { Authorization: getToken() } });

const postWres = async <T extends ResponseMessageType>(
  relativeUrl: string,
  data: any,
  setSubmitting: setSTyp,
  param?: any
) => {
  setSubmitting(true);
  try {
    const response = await Axios.post<T>(BASE_URL + relativeUrl, data, {
      headers: generateHeaders(),
    });

    showToastResponse(response.data);

    setSubmitting(false);
    return response.data as T;
  } catch (error) {
    setSubmitting(false);
    throw showToastError(error);
  }
};

export const putWres = async <T extends ResponseMessageType>(
  relativeUrl: string,
  data: any
) => {
  dispatch({ type: Ac.disableBtn, payload: true });
  try {
    const response = await Axios.put<T>(BASE_URL + relativeUrl, data, {
      headers: generateHeaders(),
    });
    showToastResponse(response.data as ResponseMessageType);
    dispatch({ type: Ac.disableBtn, payload: false });
    return response.data as T;
  } catch (error) {
    dispatch({ type: Ac.disableBtn, payload: false });
    throw showToastError(error);
  }
};

const post = async <T>(
  relativeUrl: string,
  data: any,
  setSubmitting: setSTyp,
  param?: any,
  headers?: any
) => {
  setSubmitting(true);
  try {
    const response = await Axios.post<ResponseMessageType>(
      BASE_URL + relativeUrl,
      data,
      {
        headers: generateHeaders(headers),
      }
    );

    showToastResponse(response.data);
    setSubmitting(false);
    return response.data.data as T;
  } catch (error: any) {
    setSubmitting(false);
    throw showToastError(error);
  }
};
// export const postNoSub = async <T>(relativeUrl: string, data: any) => {
//   try {
//     const response = await Axios.post<T>(BASE_URL + relativeUrl, data, {
//       headers: generateHeaders(),
//     });
//     return response.data;
//   } catch (error: any) {
//     throw message.error(error.message);
//   }
// };

export const postNoRes = async <T>(
  relativeUrl: string,
  data: any,
  setSubmitting: setSTyp,
  param?: any,
  headers?: any
) => {
  setSubmitting(true);
  try {
    const response = await Axios.post<ResponseMessageType>(
      BASE_URL + relativeUrl,
      data,
      {
        headers: generateHeaders(headers),
      }
    );

    setSubmitting(false);
    return response as T;
  } catch (error) {
    setSubmitting(false);
    throw showToastError(error);
  }
  // loading(false)
};

const put = async (
  relativeUrl: string,
  data: any,
  setS: setSTyp,
  param?: any
) => {
  setS(true);
  try {
    const response = await Axios.put<ResponseMessageType>(
      BASE_URL + relativeUrl,
      data,
      {
        headers: generateHeaders(),
      }
    );

    setS(false);
    showToastResponse(response.data);
  } catch (error) {
    setS(false);
    throw showToastError(error);
  }
};

export const putNoSub = async (relativeUrl: string, data: any) => {
  try {
    const response = await Axios.put<ResponseMessageType>(
      BASE_URL + relativeUrl,
      data,
      {
        headers: generateHeaders(),
      }
    );

    showToastResponse(response.data);
  } catch (error) {
    throw showToastError(error);
  }
};

const del = async (relativeUrl: string, id: number, setS: setSTyp) => {
  setS(true);
  try {
    const resp = await Axios.delete<ResponseMessageType>(
      BASE_URL + relativeUrl,
      {
        params: {
          id,
        },
        headers: generateHeaders(),
      }
    );
    setS(false);
    showToastResponse(resp.data);
  } catch (e) {
    setS(false);
    throw showToastError(e);
  }
};

export const delParam = async (relativeUrl: string, setS: setSTyp) => {
  setS(true);
  try {
    const resp = await Axios.delete<ResponseMessageType>(
      BASE_URL + relativeUrl,
      {
        headers: generateHeaders(),
      }
    );
    setS(false);
    showToastResponse(resp.data);
  } catch (e) {
    setS(false);
    throw showToastError(e);
  }
};

export const delWParam = async (relativeUrl: string, setS: setSTyp) => {
  setS(true);
  try {
    const resp = await Axios.delete<ResponseMessageType>(
      BASE_URL + relativeUrl,
      {
        headers: generateHeaders(),
      }
    );
    setS(false);
    showToastResponse(resp.data);
  } catch (e) {
    setS(false);
    throw showToastError(e);
  }
};

const customDel = async (relativeUrl: string) => {
  try {
    const resp = await Axios.delete<ResponseMessageType>(
      BASE_URL + relativeUrl,
      {
        headers: generateHeaders(),
      }
    );
    showToastResponse(resp.data);
  } catch (e) {
    throw showToastError(e);
  }
};

const get = async <T>(relativeUrl: string, params?: object) => {
  try {
    const resp = await Axios.get<T>(BASE_URL + relativeUrl, {
      headers: generateHeaders(),
      params,
    });

    return resp.data;
  } catch (error) {
    throw showToastError(error);
  }
};

export const getWLoad = async <T>(
  relativeUrl: string,
  setSt: setSTyp,
  params?: any
) => {
  try {
    setSt(true);
    const resp = await Axios.get<T>(BASE_URL + relativeUrl, {
      headers: generateHeaders(),
      params,
    });

    setSt(false);
    return resp.data;
  } catch (error: any) {
    setSt(false);
    throw showToastError(error);
  }
};

const getWSub = async <T>(relativeUrl: string, setS: setSTyp, params?: any) => {
  setS(true);
  try {
    const resp = await Axios.get<T>(BASE_URL + relativeUrl, {
      params,
      headers: generateHeaders(),
    });
    setS(false);
    return resp.data;
  } catch (error: any) {
    setS(false);
    throw showToastError(error);
  }
};

export const postNoSub = async <T>(relativeUrl: string, data: any) => {
  try {
    const response = await Axios.post<T>(BASE_URL + relativeUrl, data, {
      headers: generateHeaders(),
    });
    return response.data;
  } catch (error) {
    throw showToastError(error);
  }
};

export const patchWSub = async <T>(
  relativeUrl: string,
  body: any,
  setSt: setSTyp,
  params?: any
) => {
  try {
    setSt(true);
    const resp = await Axios.patch<T>(BASE_URL + relativeUrl, body, {
      headers: generateHeaders(),
      params,
    });

    setSt(false);
    return resp.data;
  } catch (error: any) {
    setSt(false);
    throw showToastError(error);
  }
};

export { postWres, post, put, del, get, getWSub, customDel };
