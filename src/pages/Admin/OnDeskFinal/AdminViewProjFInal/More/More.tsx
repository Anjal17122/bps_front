import {
  DownloadOutlined,
  EyeOutlined,
  FileImageFilled,
  FileMarkdownOutlined,
  MessageFilled,
  FileOutlined,
  MenuOutlined,
  MessageOutlined,
  ProfileOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Tooltip } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { OnDeskProjects } from "../../../../../Services/ProjectService";
import { dispatch } from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import {
  imgFolders,
  IMG_GET_URL,
  MUCHULKA_DW,
  MUCHULKA_PDF,
  PDF_URL,
} from "../../../../../Services/Api";
import { checkIfPDF } from "../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { Link } from "react-router-dom";
import { TabTy } from "../types/typesAdminViewProj";
import { revenueViewAllowedDeparts } from "../../../../../constants/helper";
import { dispatchModal } from "../../../../../Store/StoreModal/StoreModal";
import { AcModal } from "../../../../../Store/StoreModal/types";
import { municipalityDetails } from "../../../../../constants/constants";
import { dispatchModalCon } from "../../../../../Store/StoreModalCon/StoreModalCon";
import { AcMCon } from "../../../../../Store/StoreModalCon/types";

type Props = {
  project: OnDeskProjects;
  type?: TabTy;
};

const More = ({ project, type = "OnDesk" }: Props) => {
  const muchulkaOrNotice = () => {
    if (municipalityDetails.address1 === "धुलिखेल, काभ्रेपलाञ्चोक") {
      return false;
    } else if (project.type === "Already Build Building") {
      return true;
    } else {
      return false;
    }
  };

  const MoreItems = (): ItemType[] => {
    const _commonItems: ItemType[] = [
      // Upload Muchulka or Publish Notice
      {
        key: "1",
        label: muchulkaOrNotice() ? (
          <div
            onClick={() =>
              dispatch({
                type: Ac.muchulkaModal,
                payload: {
                  currentPid: project.id,
                  muchulkaModal: true,
                },
              })
            }
          >
            <FileOutlined style={{ color: "#F4801A" }} /> &nbsp;
            <span style={{ color: "#F4801A" }}>Muchulka Upload</span>
          </div>
        ) : (
          <div
            onClick={() =>
              dispatch({
                type: Ac.setNoticePubModal,
                payload: {
                  currentPid: project.id,
                  noticePubModal: true,
                  projCreationDate: project.creationDate,
                },
              })
            }
          >
            <FileOutlined /> &nbsp; सुचना निकाल्नुहोस
          </div>
        ),
      },
      {
        key: "agreement",
        label: (
          <div
            onClick={() => {
              dispatchModalCon({
                type: AcMCon.setAgreementModalCon,
                payload: true,
              });
              dispatch({ type: Ac.setCurrentPid, payload: project.id });
            }}
          >
            <ProfileOutlined style={{ color: "green" }} /> &nbsp; Agreement
          </div>
        ),
      },

      {
        key: "2001",
        label: (
          <div
            onClick={() => {
              dispatchModal({
                type: AcModal.setNoticeMuchulkaRemarks,
                payload: true,
              });
              dispatch({
                type: Ac.setCurrentPid,
                payload: project.id,
              });
            }}
          >
            <EyeOutlined /> &nbsp; Muchulka Remarks
          </div>
        ),
      },

      // View Muchulka
      {
        key: "2",
        label: (
          <div>
            {project.muchulka ? (
              <a
                href={
                  (checkIfPDF(project.muchulka) ? MUCHULKA_PDF : MUCHULKA_DW) +
                  project.muchulka
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                <EyeOutlined /> &nbsp; Muchulka view
              </a>
            ) : (
              <span>
                <EyeOutlined /> &nbsp; Muchulka: not uploaded
              </span>
            )}
          </div>
        ),
      },

      // View Revenue / Upload Bill
      revenueViewAllowedDeparts()
        ? {
            key: "4",
            label: (
              <div
                onClick={() =>
                  dispatch({
                    type: Ac.setRevenueModal,
                    payload: {
                      currentPid: project.id,
                      revenueModal: true,
                    },
                  })
                }
              >
                <EyeOutlined /> &nbsp; Revenue Add
              </div>
            ),
          }
        : null,
      // view Napi File
      {
        key: "5",
        label: (
          <div>
            {project.napiFile ? (
              <a
                href={
                  IMG_GET_URL +
                  (checkIfPDF(project.napiFile)
                    ? "/pdf/napi/" + project.napiFile
                    : "/napi/" + project.napiFile)
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flexSpaceBC">
                  <span>
                    <ProfileOutlined /> &nbsp; Napi
                  </span>
                  <DownloadOutlined />
                </div>
              </a>
            ) : (
              <div>Napi: No Data</div>
            )}
          </div>
        ),
      },
      // View Ward File
      {
        key: "6",
        label: (
          <div>
            {project.wardFile ? (
              <a
                href={IMG_GET_URL + "/ward/" + project.wardFile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flexSpaceBC">
                  <span>
                    <ProfileOutlined /> &nbsp; Ward File
                  </span>
                  <DownloadOutlined />
                </div>
              </a>
            ) : (
              <span style={{ fontSize: 12 }}>
                <DownloadOutlined /> Ward File: No Data
              </span>
            )}
          </div>
        ),
      },
      // View Messages between admins /departments
      {
        key: "7",
        label: (
          <div>
            <Link
              to={`/admin/messages/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <MessageOutlined /> &nbsp; Messages
              </span>
            </Link>
          </div>
        ),
      },
      // View Additional Documents
      {
        key: "21",
        label: (
          <div
            onClick={() =>
              dispatch({
                type: Ac.setAdditionalDocModal,
                payload: {
                  currentPid: project.id,
                  additionalDocsModal: true,
                },
              })
            }
          >
            <FileOutlined style={{ color: "#5A54F9" }} /> &nbsp;
            <Tooltip title="Additional Documents Needed">
              <span style={{ color: "#5A54F9" }}>+ Additional Documents</span>
            </Tooltip>
          </div>
        ),
      },
      // View / Upload Autocad files
      {
        key: "8",
        label: (
          <div
            onClick={() =>
              dispatch({
                type: Ac.setAutoCadModal,
                payload: {
                  currentPid: project.id,
                  autocadModal: true,
                },
              })
            }
          >
            <EyeOutlined /> &nbsp; AutoCad Files
          </div>
        ),
      },
      // Upload / view images
      {
        key: "9",
        label: (
          <div
            onClick={() =>
              dispatch({
                type: Ac.setImagesModal,
                payload: {
                  currentPid: project.id,
                  imagesModal: true,
                },
              })
            }
          >
            <FileImageFilled /> &nbsp; Images
          </div>
        ),
      },
      {
        key: "10",
        label: (
          <div
            onClick={() =>
              dispatch({
                type: Ac.setCommentsModal,
                payload: {
                  currentPid: project.id,
                  commentsModal: true,
                },
              })
            }
          >
            <MessageFilled /> &nbsp; Comments
          </div>
        ),
      },
      localStorage.getItem("role") === "ROLE_Technical_Department"
        ? {
            key: "11",
            label: (
              <a
                href={
                  checkIfPDF(project.technicalDeptFile ?? "")
                    ? PDF_URL +
                      "/" +
                      imgFolders.techincal_committee_report +
                      "/" +
                      project.technicalDeptFile
                    : IMG_GET_URL +
                      `/${imgFolders.techincal_committee_report}/` +
                      project.technicalDeptFile
                }
                target={"_blank"}
                rel="noreferrer noopener"
              >
                <FileMarkdownOutlined /> &nbsp; Technical File
              </a>
            ),
          }
        : null,
    ];
    const UnapprovedAdd = [
      {
        key: "12",
        label: (
          <div
            onClick={() =>
              dispatch({
                type: Ac.setAddDartaNoModal,
                payload: {
                  currentPid: project.id,
                  addDartaNoModal: true,
                },
              })
            }
          >
            <PlusOutlined /> &nbsp; Darta No
          </div>
        ),
      },
      {
        key: "13",
        label: (
          <div
            onClick={() => {
              dispatchModal({
                type: AcModal.setMuchulkaNoticeModal,
                payload: true,
              });
              dispatch({
                type: Ac.setCurrentPid,
                payload: project.id,
              });
            }}
          >
            <EyeOutlined /> &nbsp; Notice Details
          </div>
        ),
      },
    ];
    const NoticeMore = [
      {
        key: "13",
        label: (
          <div
            onClick={() =>
              dispatch({
                type: Ac.setAddDartaNoModal,
                payload: {
                  currentPid: project.id,
                  addDartaNoModal: true,
                },
              })
            }
          >
            <PlusOutlined />
            &nbsp; Darta No
          </div>
        ),
      },
      {
        key: "14",
        label: (
          <>
            <EyeOutlined /> Muchulka:{" "}
            {project.muchulka ? (
              <a
                href={
                  (checkIfPDF(project.muchulka) ? MUCHULKA_PDF : MUCHULKA_DW) +
                  project.muchulka
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button icon={<EyeOutlined />} size="small"></Button>
              </a>
            ) : (
              <span style={{ color: "#0dd3ff" }}>No Data</span>
            )}
          </>
        ),
      },
      // View Additional Documents
      {
        key: "3",
        label: (
          <div
            onClick={() =>
              dispatch({
                type: Ac.setAdditionalDocModal,
                payload: {
                  currentPid: project.id,
                  additionalDocsModal: true,
                },
              })
            }
          >
            <FileOutlined style={{ color: "#5A54F9" }} /> &nbsp;
            <Tooltip title="Additional Documents Needed">
              <span style={{ color: "#5A54F9" }}>+ Additional Documents</span>
            </Tooltip>
          </div>
        ),
      },
    ];
    if (type === "OnDesk") {
      return _commonItems;
    } else if (type === "Notice") {
      return NoticeMore;
    } else {
      return [...UnapprovedAdd, ..._commonItems];
    }
  };

  return (
    <Dropdown
      overlayStyle={{
        background: "white",
        zIndex: 100,
        height: type === "Notice" ? "auto" : 200,
        border: "1px solid rgb(211, 211, 211)",
        fontSize: 12,
        overflowX: "hidden",
        overflowY: "auto",
        width: 230,
        boxShadow: "-5px 30px 197px 1800px rgba(0, 0, 0, 0.5)",
      }}
      placement="bottomRight"
      menu={{ items: MoreItems() }}
      trigger={["click"]}
    >
      <Button icon={<MenuOutlined />} type="link"></Button>
    </Dropdown>
  );
};

export default More;
