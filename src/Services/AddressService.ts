import { MessageInstance } from "antd/es/message/interface";
import { BASE_URL, get, postNoRes } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { Address, sN } from "./ProjectService";
import ApiService from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";

const MyApi = new ApiService(BASE_URL);

export interface AddressBody {
  wardId: sN;
  municipalityId: sN;
  districtId: sN;
  provinceId: sN;
  type: sN;
  toleNep: string;
  toleEng: string;
}

export interface PutAddress {
  id: string;
  addresses: [
    {
      id: sN;
      provinceId: sN;
      districtId: sN;
      municipalityId: sN;
      wardId: sN;
      type: sN;
      toleNep: string;
      toleEng: string;
    }
  ];
}

export interface CommonType {
  id: number;
  name: string;
}
export interface CommonArrRes {
  data: CommonType[];
  message: string;
}

const getProvinces = async () => {
  return get<CommonArrRes>("/province/all");
};

export const getDistrictsAll = async () => {
  return get<CommonArrRes>("/district/all");
};

const getDistricts = async (params: { id: string }) => {
  return get<CommonArrRes>("/district/province", params);
};

const getMunis = async (p: { provinceid: sN; districtid: sN }) => {
  return get<CommonArrRes>("/municipality/district", p);
};

const getWards = async (params: {
  provinceid: sN;
  districtid: sN;
  municipalityid: sN;
}) => {
  return get<CommonArrRes>("/ward/municipality", params);
};
// ?provinceid=${pid}&districtid=${did}&municipalityid=${mid}
// let token: string;
export const getWardsForLand = () => get<CommonArrRes>("/ward/fix");
export const getAddress = (
  url: "/address/perma?id=" | "/address?id=",
  id: sN
) => get<ResGetAddress>(url + id);

interface ResGetAddress {
  data: Address;
  message: string;
}

export const copyImage = async (
  b: {
    fileName: string;
    dir: string;
  }[],
  setS: setSTyp
) => {
  return postNoRes("/copy/image/mul", b, setS);
  // return post("/files/copy", b, setS);
};

export const copyImageFinal = async (
  b: {
    fileName: string;
    dir: string;
  }[],
  messageApi: MessageInstance
) => {
  return MyApi.post("/copy/image/mul", b, messageApi);
  // return post("/files/copy", b, setS);
};

export const editAddressPerma = (
  body: PutAddress,
  messageApi: MessageInstance
) => MyApi.put("/person/perma/address", body, messageApi);
export const editAddress = (body: PutAddress, messageApi: MessageInstance) =>
  MyApi.put("/person/address", body, messageApi);

export { getProvinces, getDistricts, getMunis, getWards };
