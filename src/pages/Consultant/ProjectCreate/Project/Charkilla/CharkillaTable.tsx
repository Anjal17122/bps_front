import { message, Popconfirm } from "antd";
import { CharkillaType } from "../../../../../Services/CreateProjectService";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";

interface Props {
  data: CharkillaType[];
  delItem: (x: number) => void;

  // landId: number;
}

const CharkillaTable = ({ data, delItem }: Props) => {
  const { disabled } = useStoreGlobal();

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((x, i) => (
              <tr key={x.id}>
                <td style={{ width: "20px" }}>{i + 1}</td>
                <td>{x.direction}</td>
                <td>{x.side}</td>
                <td>{x.landscapeType}</td>
                <td>{x.nameEng}</td>
                <td>{x.nameNep}</td>
                <td>{x.kittaNo}</td>
                <td>{x.actualSetBack}</td>
                <td>{x.standardSetBack}</td>
                <td>{x.width}</td>
                <td>
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={() => delItem(x.id)}
                    onCancel={() => message.error("Delete Cancelled!")}
                  >
                    <button disabled={disabled} className="NoStyleBtnSm">
                      Remove
                    </button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CharkillaTable;
