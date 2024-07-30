import { useQuery } from "@tanstack/react-query";
import { MessageInstance } from "antd/es/message/interface";
import {
  GetMapdandaBody,
  getMapdanda,
} from "../../../Services/MapdandaService";

export const useMapdandaPid = (
  pid: number,
  messageApi: MessageInstance,
  enabled: boolean
) => {
  const {
    data: mapdandaPid,
    isLoading,
    refetch,
  } = useQuery<GetMapdandaBody>({
    queryKey: ["GetOldPermitCon", pid],
    queryFn: () => getMapdanda(pid, messageApi).then((res) => res.data),
    enabled,
  });

  return { mapdandaPid, isLoading, refetch };
};
