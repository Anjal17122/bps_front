import { Button } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { sN } from "../../Services/ProjectService";
import "./PDFcharkilla.scss";
import "./PDFfloor.scss";

import "../../Assets/scss/TableFloor.scss";
import { DownloadOutlined } from "@ant-design/icons";
import { LandsWithOwner } from "../../Services/CreateProjectService";

interface Props {
  data: LandsWithOwner[] | null;
  projectId: sN;
}

const PDFcharkilla = ({ data, projectId }: Props) => {
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
        <div ref={componentRef} className="ProjectPDFs">
          <div style={{ height: "90vh", padding: "40px 80px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Project Id: {projectId}</div>
            </div>
            <div>
              <h2>Charkilla Details:</h2>
              <div
                className="FloorTableCover"
                style={{ boxShadow: "none", borderTop: "none", marginTop: 15 }}
              >
                <table
                  className="FloorTable"
                  id="PDFfloor"
                  style={{ width: "auto" }}
                >
                  <thead>
                    <tr className="header">
                      <th>ID</th>
                      <th>Direction</th>
                      <th>Kitta No.</th>
                      <th>
                        Landscape
                        <br />
                        Type
                      </th>
                      {/* <th>Land ID</th> */}
                      <th>
                        Name <br /> (Nepali)
                      </th>
                      <th>
                        Actual <br /> Setback
                      </th>
                      <th>
                        Standard <br />
                        Setback
                      </th>
                      <th>Width</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item) => (
                      <React.Fragment key={item.id}>
                        {item.charKillas.map((charkilla, index: number) => (
                          <tr key={charkilla.id}>
                            <td>{index + 1}</td>
                            <td>{charkilla?.direction}</td>
                            <td>{charkilla?.landscapeType}</td>
                            <td>{charkilla?.nameNep}</td>
                            {/* <td>{charkilla.landId}</td> */}
                            <td>{charkilla?.kittaNo}</td>
                            <td>{charkilla?.actualSetBack}</td>
                            <td>{charkilla?.standardSetBack}</td>
                            <td>{charkilla.width}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFcharkilla;
