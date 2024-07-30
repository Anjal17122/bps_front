import { useEffect, useState } from "react";
import { Modal, message } from "antd";
import {
  dispatchModal,
  useStoreModal,
} from "../../../../../../Store/StoreModal/StoreModal";
import useStoreViewProj, {
  dispatch,
} from "../../../../../../Store/StoreViewProject/StoreViewProj";
import { AcModal } from "../../../../../../Store/StoreModal/types";
import { Ac } from "../../../../../../Store/StoreViewProject/types";
import {
  GetRevisionById,
  GetRevisionByIdB,
} from "../../../OnDeskService/RevisionServiceAdmin/RevisionServiceAdmin";
import { checkIfPDF } from "../../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";
import {
  PDF_URL,
  imgFolders,
  IMG_GET_URL,
} from "../../../../../../Services/Api";

const ViewRevisionModalFinal = () => {
  const { revisionViewDetails } = useStoreModal();
  const { revisionId } = useStoreViewProj();
  const [revisionOne, setRevisionOne] = useState<GetRevisionByIdB>();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    GetRevisionById(revisionId, messageApi).then((res) => {
      setRevisionOne(res.data);
    });

    return () => {
      setRevisionOne(undefined);
    };
  }, []);

  return (
    <div>
      {contextHolder}
      <Modal
        bodyStyle={{ borderRadius: 16 }}
        open={revisionViewDetails}
        footer={false}
        maskClosable={true}
        onCancel={() => {
          dispatch({ type: Ac.setRevisionId, payload: 0 });
          dispatchModal({
            type: AcModal.setrevisionViewDetails,
            payload: false,
          });
        }}
        destroyOnClose={true}
      >
        <div>
          <h4>Remarks:</h4>
          <p>{revisionOne?.remarks}</p>
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
              {revisionOne?.docs?.map((revisionOn, index) => (
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
                    <button onClick={() => {}}>Del</button>
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

export default ViewRevisionModalFinal;
