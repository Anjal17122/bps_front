import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { SanitationType } from "../../Services/SanitationService";
import "./PDFTable.scss";
interface Props {
  data: SanitationType | undefined;
  projectId: string;
}

const PDFsanitation = ({ data, projectId }: Props) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <React.Fragment>
      <Button type="primary" onClick={handlePrint}>
        <DownloadOutlined /> PDF
      </Button>
      <div style={{ display: "none" }}>
        <div ref={componentRef} className="MyProjectPDFs">
          <div style={{ height: "90vh", padding: "40px 80px" }}>
            <p>
              Project Id: <span>{projectId}</span>
            </p>
            <p
              style={{
                marginBottom: "20px",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
              <span>Sanitation</span>
            </p>
            <table className="PDFTable">
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th className="title">Title</th>
                  <th className="maindata">As per submitted design</th>
                  <th className="remarks">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="title">
                    Residential Building Design capacity (Nos)
                  </td>
                  <td className="maindata">{data?.capacity}</td>
                  <td className="remarks">{data?.capacityRemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">
                    Residential Building Water Consumption per capita per day as
                    per submitted design (Lt)
                  </td>
                  <td className="maindata">{data?.waterPerDay}</td>
                  <td className="remarks">{data?.waterPerDayRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Residential Building Water Storage capacity
                  </td>
                  <td className="maindata">{data?.waterCap}</td>
                  <td className="remarks">{data?.waterCapRemark}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFsanitation;
