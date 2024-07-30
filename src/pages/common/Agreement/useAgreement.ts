import { useQuery } from "@tanstack/react-query";
import { MessageInstance } from "antd/es/message/interface";
import { sN } from "../../../Services/ProjectService";
import {
  GetAgreementPdfDataBody,
  getAgreementFile,
  getAgreementFileBody,
  getAgreementPdfData,
} from "../../../Services/AgreementService";

export const useAgreementPdf = (
  id: sN,
  messageApi: MessageInstance
): {
  agreementPdf: GetAgreementPdfDataBody | undefined;
  refetch: () => void;
} => {
  const { data: agreementPdf, refetch } = useQuery<GetAgreementPdfDataBody>({
    queryKey: ["agreementPdfData", id],
    queryFn: () => getAgreementPdfData(id, messageApi).then((res) => res.data),
  });

  return { agreementPdf, refetch };
};

export const useAgreementFile = (
  id: sN,
  messageApi: MessageInstance
): {
  agreementFile: getAgreementFileBody | undefined;
  refetch: () => void;
} => {
  const { data: agreementFile, refetch } = useQuery<getAgreementFileBody>({
    queryKey: ["agreementFile", id],
    queryFn: () => getAgreementFile(id, messageApi).then((res) => res.data),
  });

  return { agreementFile, refetch };
};
