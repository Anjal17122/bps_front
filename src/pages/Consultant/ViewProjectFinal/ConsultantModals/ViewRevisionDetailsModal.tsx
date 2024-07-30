import { Modal, message } from "antd";
import {
  GetRevisionByIdBody2,
  GetRevisionByIdFinal,
} from "../../../../Services/RevisionService";
import { checkIfPDF } from "../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import { imgFolders, IMG_GET_URL, PDF_URL } from "../../../../Services/Api";
import { useState, useEffect } from "react";
import {
  dispatchModalCon,
  useStoreModalCon,
} from "../../../../Store/StoreModalCon/StoreModalCon";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../Store/StoreViewProject/types";
import { AcMCon } from "../../../../Store/StoreModalCon/types";

const ViewRevisionDetailsModal = () => {
  const { revisionDetails } = useStoreModalCon();
  const { currentPid } = useStoreViewProj();
  const [revisionOne, setRevisionOne] = useState<GetRevisionByIdBody2>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GetRevisionByIdFinal(currentPid, messageApi).then((res) =>
      setRevisionOne(res)
    );
    return () => {
      setRevisionOne(undefined);
    };
  }, []);

  return (
    <div>
      <Modal
        bodyStyle={{ borderRadius: 16 }}
        open={revisionDetails}
        footer={false}
        maskClosable={true}
        onCancel={() => {
          dispatchModalCon({ type: AcMCon.setRevisionDetails, payload: false });
          dispatch({ type: Ac.setCurrentPid, payload: 0 });
        }}
        destroyOnClose={true}
      >
        {contextHolder}
        <div>
          <h4>Remarks:</h4>
          <p>{revisionOne?.data?.remarks}</p>
        </div>
        <div className="MyTableOuter">
          <table className="MyTable" style={{ minWidth: 400 }}>
            <thead>
              <tr>
                <th style={{ width: "20px" }}>S.N.</th>
                <th>File Type</th>
                <th>File</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {revisionOne?.data?.docs.map((revisionOn, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td> {revisionOn.fileType.documentType}</td>
                  <td>
                    <a
                      target={"_blank"}
                      rel="noreferrer noopener"
                      href={
                        checkIfPDF(revisionOn.filename)
                          ? PDF_URL +
                            "/" +
                            imgFolders.revision +
                            `/${revisionOn.filename}`
                          : IMG_GET_URL +
                            "/" +
                            imgFolders.revision +
                            `/${revisionOn.filename}`
                      }
                    >
                      {revisionOn.filename}
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        alert("in development");
                      }}
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default ViewRevisionDetailsModal;
