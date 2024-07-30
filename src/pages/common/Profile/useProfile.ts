import { useQuery } from "@tanstack/react-query";
import { GetConsultantDocs, getSwikriti } from "../../../Services/UserService";
import { MessageInstance } from "antd/es/message/interface";
import { sN } from "../../../Services/ProjectService";

export const useSwikriti = (
  id: sN,
  messageApi: MessageInstance,
  enabled: boolean
): { swikritis: GetConsultantDocs[] | undefined; refetch: () => void } => {
  const { data: swikritis, refetch } = useQuery<GetConsultantDocs[]>({
    queryKey: ["swikriti", id],
    queryFn: () => getSwikriti(id, messageApi).then((res) => res.data),
    enabled: enabled,
  });

  return { swikritis, refetch };
};
