import { Button, Spin } from "antd";
import "./FloorCategories.scss";

import { PlusOutlined, ForwardFilled } from "@ant-design/icons";
import { FloorListBody } from "../../../Services/SuperAdminService";

interface Props {
  OpenFloorModal: () => void;
  floorList: FloorListBody[] | undefined;
}

const FloorCategories = ({ OpenFloorModal, floorList }: Props) => {
  return (
    <div className="FloorCategories">
      <div className="CategoryCard">
        <div className="RightTop">
          <Button icon={<PlusOutlined />} onClick={OpenFloorModal}></Button>
        </div>
        <h4>Floor Category</h4>
        <ul>
          {floorList ? (
            floorList.map((floor) => (
              <li key={floor.id}>
                <ForwardFilled style={{ color: "#FF8A00" }} />{" "}
                <span style={{ paddingLeft: 20 }}>{floor.name}</span>
              </li>
            ))
          ) : (
            <Spin />
          )}
        </ul>
      </div>
    </div>
  );
};

export default FloorCategories;
