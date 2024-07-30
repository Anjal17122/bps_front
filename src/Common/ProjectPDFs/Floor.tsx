import { Descriptions } from "antd";
import React from "react";

interface FloorDetail {
  floorDetail: string;
  projectId: number;
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

const Floor = () => {
  const data: FloorDetail = {
    floorDetail:
      '[{"id":12,"name":"Basement2","other":0,"prev":0,"nCNT":1,"ncT":1,"countable":1},{"id":14,"name":"Semi Basement","other":0,"prev":0,"nCNT":2,"ncT":2,"countable":2},{"id":15,"name":"Ground Floor","other":0,"prev":0,"nCNT":1,"ncT":1,"countable":2}]',
    projectId: 5053,
  };

  const newData: FloorDetailType[] = JSON.parse(data.floorDetail);

  return (
    <div style={{ height: "90vh", padding: "40px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Project Id: {1}</div>
      </div>
      <div>
        <Descriptions
          size="middle"
          title="Applicant Details"
          layout="horizontal"
          bordered
        >
          {newData.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Descriptions.Item label="Floor Level: " span={1}>
                  {item?.name}
                </Descriptions.Item>
                <Descriptions.Item label="NCNT: " span={1}>
                  {item?.nCNT}
                </Descriptions.Item>
                <Descriptions.Item label="NCT: " span={1}>
                  {item?.ncT}
                </Descriptions.Item>
              </React.Fragment>
            );
          })}
        </Descriptions>
      </div>
    </div>
  );
};

export default Floor;
