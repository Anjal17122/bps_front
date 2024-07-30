import { MessageInstance } from "antd/es/message/interface";
import { MyApi } from "../pages/Admin/OnDeskFinal/OnDeskService/OnDeskApiService";
import { PostNewMuchulkaDataBody } from "../pages/Admin/OnDeskFinal/AdminViewProjFInal/Modals/NewMuchulkaModal";
import { sN } from "./ProjectService";
import { CharkillaType } from "./CreateProjectService";
import { CharKilla } from "./PDFService";

export const postNewMuchulka = (
  body: PostNewMuchulkaDataBody,
  messageApi: MessageInstance
) => MyApi.post(`/muchulka`, body, messageApi);

export const postSarjiminMuchulka = (
  body: PostSarjiminMuchulkaDataBody,
  messageApi: MessageInstance
) => MyApi.post(`/sarjamin/muchulka`, body, messageApi);

export const getSarjiminMuchulka = (pid: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGetNewMuchulka>(
    `/sarjamin/muchulka/by/project?projectId=${pid}`,
    messageApi
  );

export const getCharkillaPid = (pid: sN, messageApi: MessageInstance) =>
  MyApi.get<{ data: CharKilla[]; message: string }>(
    `/charkilla/perma/project?id=${pid}`,
    messageApi
  );

export const getNewMuchulka = (pid: sN, messageApi: MessageInstance) =>
  MyApi.get<ResGetNewMuchulka>(
    `/muchulka/by/project?projectId=${pid}`,
    messageApi
  );

export interface ResGetNewMuchulka {
  data: GetNewMuchulkaBody;
  message: string;
}

export interface GetNewMuchulkaBody {
  id: number;
  date: string;
  time: string;
  remarks: string;
  projectId: number;
  witnesses: WitnessGet[];
}

export interface WitnessGet {
  id: number;
  ward: number;
  name: string;
  dateOfBirth: string;
  citizenshipPhoto: string;
  projectId: number;
  muchulkaFormId: number;
  direction: string;
  kittaNo: string;
}

interface Muchulka {
  date: string;
  projectId: number;
  remarks: string;
  time: string;
}

interface Witness {
  // citizenshipPhoto: string;
  dateOfBirth: string;
  direction: string;
  kittaNo: string;
  name: string;
}

export interface PostSarjiminMuchulkaDataBody {
  muchulka: Muchulka;
  witnesses: Witness[];
}
