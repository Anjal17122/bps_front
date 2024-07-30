import { Button, Table } from "antd";
import {
  DownloadOutlined,
  CaretUpOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PDF_URL, imgFolders, IMG_GET_URL } from "../../../../Services/Api";
import { GETNoticePublishBody } from "../../../../Services/NoticeTypeService";
import { checkIfPDF } from "../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { delSlash } from "../../../common/FinalPDF/AbhilekhikaranPDFDesign/AbhilekhikaranHelper";

export function NoticeTypesTable({
  noticePublish,
  projectId,
}: {
  noticePublish: GETNoticePublishBody[] | undefined;
  projectId: number;
}) {
  const columns = [
    {
      title: "ID",
      // dataIndex: "sn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "सुचनाको प्रकार",
      dataIndex: "noticeProjectType",
      key: "noticeProjectType",
    },
    {
      title: "पत्र संख्या",
      dataIndex: "patrasankhya",
      key: "patrasankhya",
    },
    {
      title: "चलानी न",
      dataIndex: "chalaninum",
      key: "chalaninum",
    },
    {
      title: "Publish Date",
      dataIndex: "dateNep",
      key: "dateNep",
    },
    {
      title: "Is Signed?",
      dataIndex: "noticeStatus",
      key: "noticeStatus",
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text: GETNoticePublishBody) =>
    //     text.noticeProjectType === "days21" ? (
    //       <>
    //         <a
    //           href={
    //             checkIfPDF(text.filename)
    //               ? PDF_URL + `/${imgFolders.notice}/${text.filename}`
    //               : IMG_GET_URL + `/${imgFolders.notice}/${text.filename}`
    //           }
    //           target={"_blank"}
    //         >
    //           <Button
    //             type="primary"
    //             size="small"
    //             icon={<DownloadOutlined />}
    //           ></Button>
    //         </a>
    //       </>
    //     ) : (
    //       <>
    //         <Link
    //           to={`/noticepdf/${projectId}/${text.chalaninum}/${
    //             text.patrasankhya
    //           }/${text.dateNep.substring(0, 10)}/${text.dateNep.substring(
    //             0,
    //             10
    //           )}`}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <Button
    //             type="primary"
    //             size="small"
    //             icon={<DownloadOutlined />}
    //           ></Button>
    //         </Link>
    //       </>
    //     ),
    // },
    {
      title: "Sign/View/Upload",
      key: "action",
      render: (text: GETNoticePublishBody) =>
        text.noticeProjectType === "days21" ? (
          <>
            <a
              href={
                checkIfPDF(text.filename ?? "")
                  ? PDF_URL + `/${imgFolders.notice}/${text.filename}`
                  : IMG_GET_URL + `/${imgFolders.notice}/${text.filename}`
              }
              target={"_blank"}
              rel="noreferrer noopener"
            >
              <Button
                type="primary"
                size="small"
                icon={<FormOutlined />}
              ></Button>
            </a>
          </>
        ) : (
          <>
            <Link
              to={`/upload/notice/${text.noticeProjectType}/${projectId}/${
                text.id
              }/null/null/${text.filename ? text.filename : "null"}/${delSlash(
                text.patrasankhya
              )}/${text.chalaninum === "" ? "empty" : text.chalaninum}/${
                text.dateNep
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="NoStyleBtnSm">
                <FormOutlined />
              </button>
            </Link>
          </>
        ),
    },
  ];
  return (
    <Table
      rowKey={"id"}
      size="small"
      columns={columns}
      dataSource={noticePublish}
    />
  );
}
