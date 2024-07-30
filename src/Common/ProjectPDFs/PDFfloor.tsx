import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { sN } from "../../Services/ProjectService";
import "./PDFfloor.scss";

interface Props {
  data: string;
  projectId: sN;
}

interface FloorDetailType {
  id: number;
  name: string;
  other: number;
  prev: number;
  nCNT: number;
  ncT: number;
  countable: number;
}

const PDFfloor = ({ data, projectId }: Props) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const newData: FloorDetailType[] = JSON.parse(data);
  return (
    <React.Fragment>
      <Button type="primary" onClick={handlePrint}>
        <DownloadOutlined /> PDF
      </Button>
      {/* <div> */}
      <div style={{ display: "none" }}>
        <div ref={componentRef} className="ProjectPDFs">
          <div style={{ height: "90vh", padding: "40px 80px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Project Id: {projectId}</div>
            </div>
            <Title level={2}>Design Floor </Title>
            <div
              className="FloorTableCover"
              style={{ boxShadow: "none", borderTop: "none" }}
            >
              <table
                className="FloorTable"
                id="PDFfloor"
                style={{ width: "auto" }}
              >
                <thead>
                  <tr className="header">
                    <th>S.N.</th>
                    <th>Floor</th>
                    <th>
                      Other
                      <br /> Building
                    </th>
                    <th>
                      Previous
                      <br />
                      permitted
                      <br /> Story
                    </th>
                    <th>
                      Far Non
                      <br /> Countable <br /> (Non Taxable)
                    </th>
                    <th>
                      Far Non <br /> Countable <br /> (Taxable)
                    </th>
                    <th>
                      Far <br /> Countable
                    </th>
                    <th>
                      Total <br /> (Taxable)
                    </th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {newData.map((floor, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{floor?.name}</td>
                      <td>{floor?.other}</td>
                      <td>{floor?.prev}</td>
                      <td>{floor?.nCNT}</td>
                      <td>{floor?.ncT}</td>
                      <td>{floor?.countable}</td>
                      <td>{floor.ncT + floor.countable}</td>
                      <td>
                        {floor.ncT +
                          floor.countable +
                          floor.nCNT +
                          floor.prev +
                          floor.other}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFfloor;
