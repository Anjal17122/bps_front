import axios from "axios";
import { BASE_URL, myHeaders } from "../../../../Services/Api";
import { Ac } from "../../../../Store/StoreViewProject/types";
import { checkIfError } from "../TypeGuards/TypeGuards";
import { dispatch } from "../../../../Store/StoreViewProject/StoreViewProj";
import { MessageInstance } from "antd/es/message/interface";

export interface ApiMessage {
  message: string;
}

export interface ResType<T> {
  data: { data: T; message: string };
}

export type ResGet<R> = {
  data: R;
  message: string;
};

class ApiService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // GET start
  public async get<R>(url: string, messageApi: MessageInstance): Promise<R> {
    dispatch({ type: Ac.disableBtn, payload: true });
    try {
      const res = await axios.get<R>(this.baseUrl + url, myHeaders());
      dispatch({ type: Ac.disableBtn, payload: false });
      return res.data;
    } catch (error: unknown) {
      dispatch({ type: Ac.disableBtn, payload: false });
      throw checkIfError(error, messageApi);
    }
  }

  public async getWmsgNoBody<T>(url: string, messageApi: MessageInstance) {
    dispatch({ type: Ac.disableBtn, payload: true });
    try {
      const res = await axios.get<{ data: T; message: string }>(
        this.baseUrl + url,
        myHeaders()
      );
      dispatch({ type: Ac.disableBtn, payload: false });
      messageApi.success(res.data.message);
    } catch (error: unknown) {
      dispatch({ type: Ac.disableBtn, payload: false });
      checkIfError(error, messageApi);
    }
  }

  async getWmsgWbody<T extends ApiMessage>(
    url: string,
    messageApi: MessageInstance
  ) {
    dispatch({ type: Ac.disableBtn, payload: true });

    try {
      const res = await axios.get<T>(this.baseUrl + url, myHeaders());

      dispatch({ type: Ac.disableBtn, payload: false });
      messageApi.success(res.data.message);
      return res.data;
    } catch (error: unknown) {
      dispatch({ type: Ac.disableBtn, payload: false });
      throw checkIfError(error, messageApi);
    }
  }

  // GET end

  //POST start
  public async post<R, B>(url: string, body: B, messageApi: MessageInstance) {
    dispatch({ type: Ac.disableBtn, payload: true });
    try {
      const res = await axios.post<B, ResType<R>>(
        this.baseUrl + url,
        body,
        myHeaders()
      );
      dispatch({ type: Ac.disableBtn, payload: false });
      messageApi.success(res.data.message);
    } catch (error: unknown) {
      dispatch({ type: Ac.disableBtn, payload: false });
      throw checkIfError(error, messageApi);
    }
  }

  public async postWres<R, B>(
    url: string,
    body: B,
    messageApi: MessageInstance
  ) {
    dispatch({ type: Ac.disableBtn, payload: true });
    try {
      const res = await axios.post<B, ResType<R>>(
        this.baseUrl + url,
        body,
        myHeaders()
      );
      dispatch({ type: Ac.disableBtn, payload: false });
      messageApi.success(res.data.message);
      return res.data;
    } catch (error: unknown) {
      dispatch({ type: Ac.disableBtn, payload: false });
      throw checkIfError(error, messageApi);
    }
  }

  //Put Start

  public async put<T, B>(url: string, body: B, messageApi: MessageInstance) {
    dispatch({ type: Ac.disableBtn, payload: true });
    try {
      const res = await axios.put<{ data: T; message: string }>(
        this.baseUrl + url,
        body,
        myHeaders()
      );
      dispatch({ type: Ac.disableBtn, payload: false });
      messageApi.success(res.data.message);
    } catch (error: unknown) {
      dispatch({ type: Ac.disableBtn, payload: false });
      throw checkIfError(error, messageApi);
    }
  }
  public async putWRes<R, B>(
    url: string,
    body: B,
    messageApi: MessageInstance
  ) {
    dispatch({ type: Ac.disableBtn, payload: true });
    try {
      const res = await axios.put<B, ResType<R>>(
        this.baseUrl + url,
        body,
        myHeaders()
      );
      dispatch({ type: Ac.disableBtn, payload: false });
      messageApi.success(res.data.message);
      return res.data;
    } catch (error: unknown) {
      dispatch({ type: Ac.disableBtn, payload: false });
      throw checkIfError(error, messageApi);
    }
  }

  async putNoBody<R>(url: string, messageApi: MessageInstance): Promise<R> {
    dispatch({ type: Ac.disableBtn, payload: true });
    try {
      const res = await axios.put(this.baseUrl + url, {}, myHeaders());
      messageApi.success(res.data.message);
      return res.data;
    } catch (error) {
      throw checkIfError(error, messageApi);
    }
  }

  // DEL start
  public async delNoRes<T>(url: string, messageApi: MessageInstance) {
    dispatch({ type: Ac.disableBtn, payload: true });
    try {
      const res = await axios.delete<{ data: T; message: string }>(
        this.baseUrl + url,
        myHeaders()
      );
      dispatch({ type: Ac.disableBtn, payload: false });
      messageApi.success(res.data.message);
    } catch (error: unknown) {
      dispatch({ type: Ac.disableBtn, payload: false });
      throw checkIfError(error, messageApi);
    }
  }
  /**
   * patchNoBody
   */
  public async patchNoBody<R>(url: string, messageApi: MessageInstance) {
    dispatch({ type: Ac.disableBtn, payload: true });
    try {
      const res = await axios.patch<{ data: R; message: string }>(
        this.baseUrl + url,
        {},
        myHeaders()
      );
      dispatch({ type: Ac.disableBtn, payload: false });
      messageApi.success(res.data.message);
    } catch (error: unknown) {
      dispatch({ type: Ac.disableBtn, payload: false });
      throw checkIfError(error, messageApi);
    }
  }
  //PATCH
  public async patch<B>(url: string, body: B, messageApi: MessageInstance) {
    dispatch({ type: Ac.disableBtn, payload: true });
    try {
      const res = await axios.patch(this.baseUrl + url, body, myHeaders());
      dispatch({ type: Ac.disableBtn, payload: false });
      messageApi.success(res.data.message);
    } catch (error: unknown) {
      dispatch({ type: Ac.disableBtn, payload: false });
      throw checkIfError(error, messageApi);
    }
  }
}

export const MyApi = new ApiService(BASE_URL);
export default ApiService;
