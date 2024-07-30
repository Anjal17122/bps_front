import { Modal } from "antd";
import React from "react";
import {
  PDF_URL,
  imgFolders,
  IMG_GET_URL,
} from "../../../../../../Services/Api";
import { GetRevisionByProjectIdBody } from "../../../../../../Services/RevisionService";
import { checkIfPDF } from "../../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  revisionsOnDrawings: GetRevisionByProjectIdBody[] | undefined;
};

const RevisionDetailsFromDrawings = ({
  isVisible,
  onClose,
  revisionsOnDrawings,
}: Props) => {
  return (
    <Modal
      bodyStyle={{ borderRadius: 16 }}
      open={isVisible}
      footer={false}
      maskClosable={true}
      onCancel={onClose}
      destroyOnClose={true}
    >
      {revisionsOnDrawings?.map((revision) => (
        <div className="PurpleCard" key={revision.id}>
          <div>
            <h4>Remarks:</h4>
            <p>{revision?.remarks}</p>
          </div>
          <div className="MyTableOuter">
            <table className="MyTable" style={{ minWidth: 400, fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ width: "20px" }}>S.N.</th>
                  <th>File Type</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {revision.docs.map((revDocs, index) => (
                  <tr key={revDocs.filename}>
                    <td>{index + 1}</td>
                    <td> {revDocs?.fileType?.documentType}</td>
                    <td>
                      <a
                        target={"_blank"}
                        rel="noreferrer noopener"
                        href={
                          checkIfPDF(revDocs?.filename)
                            ? PDF_URL +
                              "/" +
                              imgFolders.revision +
                              `/${revDocs?.filename}`
                            : IMG_GET_URL +
                              "/" +
                              imgFolders.revision +
                              `/${revDocs?.filename}`
                        }
                      >
                        {revDocs?.filename}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </Modal>
  );
};

export default RevisionDetailsFromDrawings;
