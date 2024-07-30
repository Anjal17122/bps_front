import { Button, Popconfirm } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RollingLoading from "../../../Common/Loading/RollingLoading";
import {
  addNoticeFile,
  delNotice,
  delNoticeFile,
  getNotices,
  NoticeBody,
} from "../../../Services/AdminService";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import { IMG_SAVE_URL, imgFolders, IMG_GET_URL } from "../../../Services/Api";
import { getToken } from "../../../Services/UserService";
import { copyImage } from "../../../Services/AddressService";
import PageHeaderExtra from "../../../Components/Common/PageHeader/PageHeaderExtra";

const Notice = () => {
  const [notice, setNotice] = useState<NoticeBody[]>([]);
  const [sub, setSub] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const history = useNavigate();

  const { dispatch } = useContext(MyStore);

  useEffect(() => {
    getNotices().then((res) => setNotice(res.data));
    return () => setNotice([]);
  }, []);

  function onEdit(x: NoticeBody) {
    dispatch({
      type: ActionType.setDownload,
      payload: { description: x.description, title: x.title, id: x.id },
    });
    history("/admin/notice/edit/" + x.id);
  }

  const props = {
    name: "image",
    action: IMG_SAVE_URL,
    headers: {
      authorization: getToken(),
    },
    beforeUpload: (file: RcFile) => {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp";
      if (!isJpgOrPng) {
        messageApi.error("You can only upload JPG/PNG/WEBP file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        messageApi.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  };

  function onUpload(info: UploadChangeParam<UploadFile>, id: number) {
    // if (info.file.status !== "uploading") {
    // }
    if (info.file.status === "done") {
      addNoticeFile(
        {
          fileName: info.file.response.imageName,
          noticeId: id,
          title: info.file.name,
        },
        setSub
      );
      copyImage(
        [{ fileName: info.file.response.message, dir: imgFolders.notice }],
        setSub
      );
      // .then(() => {
      //   messageApi.success(`${info.file.name} file uploaded successfully`);
      // });
    } else if (info.file.status === "error") {
      messageApi.error(`${info.file.name} file upload failed.`);
    }
  }

  function ondel(id: number, arrInd: number) {
    const init = [...notice];
    const dw = init[arrInd];
    const newElem = dw.noticeDetails.filter((x) => x.id !== id);
    dw.noticeDetails = newElem;
    init[arrInd] = dw;

    delNoticeFile(id, setSub).then(() => {
      setNotice(init);
    });
  }

  function onDelDw(id: number, arrInd: number) {
    const init = [...notice];
    init.splice(arrInd, 1);

    delNotice(id, setSub).then(() => {
      setNotice(init);
    });
  }

  return (
    <div>
      {contextHolder}
      <PageHeaderExtra
        title="सूचना पाटी"
        subTitle="घर नक्सा शाखाबाट प्रदान हुने सेवाहरु सम्बन्धि सूचनाहरु"
        extra={[
          <Link key={1} to="/admin/notice/add">
            <Button type="primary">Add Notice</Button>
          </Link>,
        ]}
      />
      <div className="uploadFWrapper">
        {notice.length ? (
          notice.map((notic, arrInd) => (
            <div className="UploadDiv" key={notic.id}>
              <div className="NoticeCard">
                {notic.noticeDetails.length ? (
                  // ? JSON.stringify(IMAGE_URL + x.noticeDetails[0].fileName)
                  <img
                    // src={
                    //   IMAGE_URL + x.noticeDetails[0].fileName
                    // }
                    src={IMG_GET_URL + "/" + notic.noticeDetails[0].fileName}
                    alt=""
                    height="80px"
                    width="auto"
                  />
                ) : null}
                <div className="NoticeTitle">
                  <b>{notic.title}</b>
                  <span>{notic.description}</span>
                </div>
                <div>
                  <button
                    className="NoStyleBtnSm"
                    onClick={() => onEdit(notic)}
                  >
                    Edit
                  </button>
                  <Popconfirm
                    title="Are you sure to delete ?"
                    onConfirm={() => onDelDw(notic.id, arrInd)}
                    onCancel={() => message.error("Cancelled")}
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
                    onUpload(info, notic.id)
                  }
                  {...props}
                >
                  <button className="NoStyleBtnSm">Upload</button>
                </Upload>
              </div>
              <>
                {notic.noticeDetails.map((noti) => (
                  <div className="DownloadList" key={noti.id}>
                    <div>{noti.title}</div>
                    <div>
                      <button className="NoStyleBtnSm">
                        <DownloadOutlined />
                      </button>
                      <Popconfirm
                        title="Are you sure to delete ?"
                        onConfirm={() => ondel(noti.id, arrInd)}
                        onCancel={() => message.error("Cancelled")}
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

export default Notice;
