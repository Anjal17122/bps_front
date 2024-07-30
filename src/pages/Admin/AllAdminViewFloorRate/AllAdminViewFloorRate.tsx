import { useContext, useEffect } from "react";
import {
  GETareaCategory,
  GETbuildingCategory,
  GETfloorCategory,
  GETfloorRate,
} from "../../../Services/SuperAdminService";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import { Button, Table } from "antd";
import { PDF_FLOOR_RATE } from "../../../Services/Api";
import { getMappedAreaCat } from "../../SuperAdmin/FloorRate/FloorRate";
import CommonHeader from "../ProjectActionsAdmin/UploadCertificate/CommonHeader";

const AdminFloorRate = () => {
  const { state, dispatch } = useContext(MyStore);
  useEffect(() => {
    if (!state.floorCat) {
      GETareaCategory().then((res) => {
        const mappedAreaCat = getMappedAreaCat(res);
        dispatch({ payload: mappedAreaCat, type: ActionType.setAreaCat });
        GETbuildingCategory().then((res) => {
          const mappedData = getMappedAreaCat(res);
          dispatch({ payload: mappedData, type: ActionType.setBuildingCat });
          GETfloorCategory().then((res) => {
            dispatch({ payload: res.data, type: ActionType.setFloorCat });
            GETfloorRate().then((res) => {
              dispatch({ payload: res.data, type: ActionType.setFloorData });
            });
          });
        });
      });
    }
  }, []);

  const FloorRatecolumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Area",
      dataIndex: "areaCategoryName",
      key: "areaCategoryName",
    },
    {
      title: "Building",
      dataIndex: "buildingCategoryname",
      key: "buildingCategoryname",
    },
    {
      title: "Floor",
      dataIndex: "floorName",
      key: "floorName",
    },
    {
      title: "Rate(NRS)",
      dataIndex: "rate",
      key: "rate",
    },
  ];

  return (
    <>
      <CommonHeader></CommonHeader>
      <div className="CenterForm">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <b style={{ fontSize: 24, fontWeight: 500 }}>Floor Rate:</b>{" "}
          <a href={PDF_FLOOR_RATE} target={"_blank"} rel="noreferrer noopener">
            <Button type="link">view floor rate</Button>
          </a>
        </div>
        <Table
          rowKey={"id"}
          size="middle"
          columns={FloorRatecolumns}
          dataSource={state.floorRate}
        />
      </div>
    </>
  );
};

export default AdminFloorRate;
