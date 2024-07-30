import { useQuery } from "@tanstack/react-query";
import {
  ManjurinamaBody,
  getManjurinama,
} from "../../../../../Services/CreateProjectService";
import { sN } from "../../../../../Services/ProjectService";

export const useManjurinama = (currentPid: sN) => {
  const { data: manjurinama, isLoading } = useQuery<ManjurinamaBody>({
    queryKey: ["GetCertLogs", currentPid],
    queryFn: () => getManjurinama(currentPid).then((res) => res.data),
    retry: 1,
  });

  return { manjurinama, isLoading };
};
