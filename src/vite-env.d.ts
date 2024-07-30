/// <reference types="vite/client" />
export {};

interface munType {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  letterheadTitle: string;
  letterheadType: string;
  letterheadAddress1: string;
  letterheadAddress2: string;
  district: string;
  baseUrl: string;
  drawingSignP1?: string;
  drawingSignP2?: string;
  drawingSignP3?: string;
  drawingSignP4?: string;
  province?: string;
  landingPageImage?: string;
  myDomain?: string;
  subengineer?: string;
  preparedBy?: string;
  engineer?: string;
  approvedBy?: string;
}

declare global {
  interface Window {
    globalConfig: munType;
  }
}
