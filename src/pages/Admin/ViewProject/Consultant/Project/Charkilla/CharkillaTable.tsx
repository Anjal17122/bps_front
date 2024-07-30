import React from "react";
import { CharkillaType } from "../../../../../../Services/CreateProjectService";
// import { CharkillaType } from "../../../../Services/CreateProjectService";

interface Props {
  data: CharkillaType[];
  // delItem: (x: number) => void;
  // disabled: boolean;
  // landId: number;
}

const CharkillaTable = ({ data }: Props) => {
  return (
    <div className="paddAll20">
      <div className="MyTableOuter">
        <table className="MyTable">
          <thead>
            <tr>
              <th style={{ width: "20px" }}>S.N.</th>
              <th>Direction</th>
              <th>Side</th>
              <th>Landscape Type</th>
              <th>Name</th>
              <th>नाम</th>
              <th>Kitta No.</th>
              <th>Actual setback</th>
              <th>Standard setback</th>
              <th>Width</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((dat, i) => (
              <tr key={dat.id}>
                <td style={{ width: "20px" }}>{i + 1}</td>
                <td>{dat.direction}</td>
                <td>{dat.side}</td>
                <td>{dat.landscapeType}</td>
                <td>{dat.nameEng}</td>
                <td>{dat.nameNep}</td>
                <td>{dat.kittaNo}</td>
                <td>{dat.actualSetBack}</td>
                <td>{dat.standardSetBack}</td>
                <td>{dat.width}</td>
                {/* <td>
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={() => delItem(x.id)}
                    onCancel={() => message.error("Delete Cancelled!")}
                  >
                    <button disabled={disabled} className="NoStyleBtnSm">
                      Remove
                    </button>
                  </Popconfirm>
                  ,
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CharkillaTable;
