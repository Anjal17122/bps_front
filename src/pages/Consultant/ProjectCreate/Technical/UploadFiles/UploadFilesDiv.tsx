import { message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FilesUploaded,
  getFileUploads,
} from "../../../../../Services/CreateProjectService";

import CreateUploadFiles from "./CreateUploadFiles";
import EditUploads from "./EditUploads";

const UploadFilesDiv = () => {
  const params = useParams();

  const [files, setFiles] = useState<FilesUploaded[]>();
  const [loading, setLoading] = useState(true);

  const onUploadSuccess = () => {
    window.location.reload();
  };

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    getFileUploads(
      params.tempId ?? params.pid ?? "0",
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/file/perma?id="
        : "/file/by/project?id="
    ).then((res) => {
      setLoading(false);
      setFiles(res.data);
    });
    return () => {
      setLoading(true);
      setFiles(undefined);
    };
  }, []);

  const uploadDelSuccess = (id: number) => {
    messageApi.success("File Deleted!");

    const init = [...(files || [])];
    const filtered = init.filter((data) => data.id !== id);
    setFiles(filtered);
  };

  return (
    <Spin spinning={loading}>
      {contextHolder}
      {files?.length ? (
        <EditUploads
          onUploadSuccess={onUploadSuccess}
          uploadDelSuccess={uploadDelSuccess}
          data={files}
          projectId={NewId(params.tempId || "", params.pid ?? "0")}
        />
      ) : (
        <CreateUploadFiles
          onUploadSuccess={onUploadSuccess}
          files={files}
          pid={NewId(params.tempId || "", params.pid ?? "0")}
        />
      )}
    </Spin>
  );
};

export default UploadFilesDiv;

export const NewId = (tempId: string, pid: string): string => {
  if (tempId) {
    if (tempId !== "null") {
      return tempId;
    } else {
      return pid;
    }
  } else {
    return pid;
  }
};
