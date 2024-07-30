import { Button, Popconfirm } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RollingLoading from "../../../Common/Loading/RollingLoading";
import {
  addDownloadFile,
  delDownload,
  delDownloadFile,
  DownloadsBody,
  getDownloads,
} from "../../../Services/AdminService";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import {
  IMG_SAVE_URL,
  imgFolders,
  IMG_GET_URL,
  PDF_URL,
} from "../../../Services/Api";
import { getToken } from "../../../Services/UserService";
import { copyImage } from "../../../Services/AddressService";
import { checkIfPDF } from "../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import PageHeaderExtra from "../../../Components/Common/PageHeader/PageHeaderExtra";

const Downloads = () => {
  const [downloads, setDownloads] = useState<DownloadsBody[]>([]);
  const [sub, setSub] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { dispatch } = useContext(MyStore);

  const history = useNavigate();

  useEffect(() => {
    getDownloads().then((res) => setDownloads(res.data));
    return () => setDownloads([]);
  }, []);

  function onEdit(x: DownloadsBody) {
    dispatch({
      type: ActionType.setDownload,
      payload: { description: x.description, title: x.title, id: x.id },
    });
    history("/admin/downloads/edit/" + x.id);
  }

  const props = {
    name: "file",
    action: IMG_SAVE_URL,
    headers: {
      authorization: getToken(),
    },
  };

  function onUpload(info: UploadChangeParam<UploadFile>, id: number) {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      addDownloadFile(
        {
          fileName: info.file.response.message,
          publicFileId: id,
          title: info.file.name,
        },
        setSub
      );
      copyImage(
        [{ fileName: info.file.response.message, dir: "downloads" }],
        setSub
      );
    } else if (info.file.status === "error") {
      messageApi.error(`${info.file.name} file upload failed.`);
    }
  }

  function ondel(id: number, arrInd: number) {
    const init = [...downloads];
    const dw = init[arrInd];
    const newElem = dw.publicFileDetails.filter((x) => x.id !== id);
    dw.publicFileDetails = newElem;
    init[arrInd] = dw;

    delDownloadFile(id, setSub).then(() => {
      setDownloads(init);
    });
  }

  function onDelDw(id: number, arrInd: number) {
    const init = [...downloads];
    init.splice(arrInd, 1);

    delDownload(id, setSub).then(() => {
      setDownloads(init);
    });
  }

  return (
    <div>
      {contextHolder}
      <PageHeaderExtra
        title="डाउनलोड पृष्ठ"
        subTitle="घर नक्सा शाखा सम्बन्धि डाउनलोडहरु"
        extra={[
          <Link key={1} to="/admin/downloads/add">
            <Button type="primary">Add Download</Button>
          </Link>,
        ]}
      />
      <div className="uploadFWrapper">
        {downloads.length ? (
          downloads.map((x, arrInd) => (
            <div className="UploadDiv" key={x.id}>
              <div className="uploadFiles">
                <div>
                  <b>{x.title}</b>
                  <span>{x.description}</span>
                </div>
                <div>
                  <button className="NoStyleBtnSm" onClick={() => onEdit(x)}>
                    Edit
                  </button>
                  <Popconfirm
                    title="Are you sure to delete ?"
                    onConfirm={() => onDelDw(x.id, arrInd)}
                    onCancel={() => messageApi.error("Cancelled")}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button disabled={sub} className="NoStyleBtnSm">
                      Del
                    </button>
                  </Popconfirm>
                </div>
              </div>
              <div>
                <Upload
                  onChange={(info: UploadChangeParam<UploadFile>) =>
                    onUpload(info, x.id)
                  }
                  {...props}
                >
                  <button className="NoStyleBtnSm">Upload</button>
                </Upload>
              </div>
              <>
                {x.publicFileDetails.map((y) => (
                  <div className="DownloadList" key={y.id}>
                    <div>{y.title}</div>
                    <div>
                      <a
                        rel="noopener noreferrer"
                        href={
                          checkIfPDF(y.fileName)
                            ? PDF_URL
                            : IMG_GET_URL +
                              `/${imgFolders.downloads}/${y.fileName}`
                        }
                        target="_blank"
                      >
                        <button className="NoStyleBtnSm">
                          <DownloadOutlined />
                        </button>
                      </a>
                      <Popconfirm
                        title="Are you sure to delete ?"
                        onConfirm={() => ondel(y.id, arrInd)}
                        onCancel={() => messageApi.error("Cancelled")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className="NoStyleBtnSm" disabled={sub}>
                          <DeleteOutlined />
                        </button>
                      </Popconfirm>
                    </div>
                  </div>
                ))}
              </>
            </div>
          ))
        ) : (
          <RollingLoading height="40vh" />
        )}
      </div>
    </div>
  );
};

export default Downloads;
