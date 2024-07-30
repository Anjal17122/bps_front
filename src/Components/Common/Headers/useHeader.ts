import { useQuery } from "@tanstack/react-query";
import { MessageInstance } from "antd/es/message/interface";
import {
  getConCertificateNotification,
  getConCertificateNotificationBody,
} from "../../../Services/UserService";
import {
  GETSignedProjects,
  GETsubmittedProjs,
  OnDeskProjects,
} from "../../../Services/ProjectService";

export const useConNotification = (messageApi: MessageInstance) => {
  const {
    data: conNotification,
    isLoading,
    refetch,
  } = useQuery<getConCertificateNotificationBody[]>({
    queryKey: ["GetOldPermitCon"],
    queryFn: () =>
      getConCertificateNotification(messageApi).then((res) => res.data),
  });

  return { conNotification, isLoading, refetch };
};

export const useConSubmittedP = (messageApi: MessageInstance) => {
  const {
    data: conSubmittedP,
    isLoading,
    refetch,
  } = useQuery<OnDeskProjects[]>({
    queryKey: ["ConSubmittedP"],
    queryFn: () =>
      GETsubmittedProjs(0, messageApi, 1000).then((res) => res.data),
  });

  return { conSubmittedP, isLoading, refetch };
};

export const useConSignedP = (messageApi: MessageInstance) => {
  const {
    data: conSignedP,
    isLoading,
    refetch,
  } = useQuery<OnDeskProjects[]>({
    queryKey: ["ConSignedP"],
    queryFn: () =>
      GETSignedProjects(0, messageApi, 1000).then((res) => res.data),
  });

  return { conSignedP, isLoading, refetch };
};
