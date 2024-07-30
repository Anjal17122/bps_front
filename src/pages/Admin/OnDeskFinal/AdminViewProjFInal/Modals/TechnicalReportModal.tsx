import { EyeTwoTone } from "@ant-design/icons";
import { Image, Modal } from "antd";
import { imgFolders, IMG_GET_URL, PDF_URL } from "../../../../../Services/Api";
import { checkIfPDF } from "../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import {
  useStoreViewProj,
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";

const TechnicalReportModal = () => {
  const { technicalReportModal, technicalReportName } = useStoreViewProj();
  return (
    <Modal
      className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      open={technicalReportModal}
      footer={false}
      maskClosable={true}
      width={400}
      onCancel={() =>
        dispatch({
          type: Ac.closeTechnicalM,
          payload: { technicalReportModal: false, technicalReportName: "" },
        })
      }
      destroyOnClose={true}
      title={"View Technical Report"}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 150,
        }}
      >
        {checkIfPDF(technicalReportName) ? (
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={
              PDF_URL +
              "/" +
              imgFolders.techincal_committee_report +
              "/" +
              technicalReportName
            }
          >
            View Pdf <EyeTwoTone style={{ fontSize: 14 }} />
          </a>
        ) : (
          <Image
            src={
              IMG_GET_URL +
              `/${imgFolders.techincal_committee_report}/` +
              technicalReportName
            }
          />
        )}
      </div>
    </Modal>
  );
};

export default TechnicalReportModal;
