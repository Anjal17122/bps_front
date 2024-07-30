import { useQuery } from "@tanstack/react-query";
import {
  CommonBody,
  PUToldPermit,
  getBuildingType,
  getHouseType,
  getOldPermitCon,
  getOldPermitId,
} from "../../../Services/OldPermitService";
import { MessageInstance } from "antd/es/message/interface";
import NepaliDate from "nepali-date-converter";
import { OldPermitValuesPut } from "./types";

export const useOldPermitCon = (messageApi: MessageInstance) => {
  const { data: oldPermitsCon, isLoading } = useQuery<PUToldPermit[]>({
    queryKey: ["GetOldPermitCon"],
    queryFn: () => getOldPermitCon(messageApi).then((res) => res.data),
  });

  return { oldPermitsCon, isLoading };
};

export const oldPermitAdmin = (messageApi: MessageInstance) => {
  const { data: oldPermitsAdmin, isLoading } = useQuery<PUToldPermit[]>({
    queryKey: ["GetOldPermitAdmin"],
    queryFn: () => getOldPermitCon(messageApi).then((res) => res.data),
  });

  return { oldPermitsAdmin, isLoading };
};

export const useBuildingType = (messageApi: MessageInstance) => {
  const { data: buildingType, isLoading } = useQuery<CommonBody[]>({
    queryKey: ["GetBuildingType"],
    queryFn: () => getBuildingType(messageApi).then((res) => res.data),
  });

  return { buildingType, isLoading };
};

export const useOldPermitId = (id: number, messageApi: MessageInstance) => {
  const {
    data: oldPermitId,
    isLoading,
    refetch,
  } = useQuery<PUToldPermit>({
    queryKey: ["GetOldPermitId", id],
    queryFn: () => getOldPermitId(id, messageApi).then((res) => res.data),
  });

  return { oldPermitId, isLoading, refetch };
};

export const useHouseType = (messageApi: MessageInstance) => {
  const { data: houseType, isLoading } = useQuery<CommonBody[]>({
    queryKey: ["GetHouseType"],
    queryFn: () => getHouseType(messageApi).then((res) => res.data),
  });
  return { houseType, isLoading };
};

export const convertToInitialOldPermit = (
  oldPermitId: PUToldPermit
): OldPermitValuesPut => {
  return {
    ...oldPermitId,
    floorDetails: JSON.parse(oldPermitId.floorDetails),
    ward: [oldPermitId.ward.id],
    houseType: [oldPermitId.houseType.id],
    buildingType: [oldPermitId.buildingType.id],
  };
};

export const InputDateValid = (name: string, label: string) => {
  return {
    required: false,
    name: name,
    label: label,
    rules: [
      () => ({
        validator(_: any, value: any) {
          const regEx = /^\d{4}-\d{2}-\d{2}$/;
          if (!value) return Promise.resolve();
          if (!value.match(regEx))
            return Promise.reject("Please input correct date format!");
          return Promise.resolve();
        },
      }),
    ],
  };
};

export const convertBStoAD = (date: string | undefined) => {
  if (date) {
    const year = Number(date.substring(0, 4));
    const month = Number(date.substring(5, 7));
    const day = Number(date.substring(8, 10));
    console.log({ year, month, day });

    const converted = new NepaliDate(year, month, day).toJsDate();
    return converted.toISOString().substring(0, 10);
  } else {
    return "";
  }
};
