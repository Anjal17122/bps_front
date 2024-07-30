import { Button, Col, Row, Spin, Table, TabsProps, message } from "antd";
import { useContext, useEffect, useState } from "react";
import {
  DELfloorData,
  FloorListBody,
  FloorRateBody,
  GETareaCategory,
  GETbuildingCategory,
  GETfloorCategory,
  GETfloorRate,
  ResAreaCatsBody,
} from "../../../Services/SuperAdminService";
import { OrderedListOutlined, DollarOutlined } from "@ant-design/icons";
import EditFloorDataModal from "./EditFloorDataModal";
import AddFloorRateModal from "./AddFloorRateModal";
import { Tabs } from "antd";
import "../../../Assets/scss/ViewUsers.scss";
import AreaCategories from "./AreaCategories";
import AddFloorCategory from "./AddFloorCategory";
import FloorCategories from "./FloorCategories";
import BuildingCategories from "./BuildingCategories";
import AddBuildingCategory from "./AddBuildingCategory";
import { PlusOutlined } from "@ant-design/icons";
import AddAreaCategory from "./AddAreaCategory";
import { ActionType, MyStore } from "../../../Store/ContextApi";
import MyPopconfirm from "../../../Common/Popconfirm/MyPopconfirm";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";

// export interface FloorDataTable {
//   key: number;
//   id: number;
//   sn: number;
//   name: string;
//   rate: string;
// }

export interface MappedAreaCat {
  id: number;
  name: string;
  parentId: number;
  level: number;
  status?: string;
  deleted: boolean;
  children?: Kid4[];
  label: string;
  value: string;
}

interface Kid4 {
  id: number;
  name: string;
  parentId: number;
  level: number;
  status?: string;
  deleted: boolean;
  children: Kid3[];
  label: string;
  value: string;
}

interface Kid3 {
  id: number;
  name: string;
  parentId: number;
  level: number;
  status?: string;
  deleted: boolean;
  children: Kid2[];
  label: string;
  value: string;
}

interface Kid2 {
  id: number;
  name: string;
  parentId: number;
  level: number;
  status?: string;
  deleted: boolean;
  children: Kid[];
  label: string;
  value: string;
}

interface Kid {
  id: number;
  name: string;
  parentId: number;
  level: number;
  status?: string;
  deleted: boolean;
  label: string;
  value: string;
}

const FloorData = () => {
  // const [floorData, setFloorData] = useState<FloorRateBody[]>();

  // const [floorCategory, setFloorCategory] =
  //   useState<POSTbuildingCategoryBody[]>();

  const [currentFloor, setCurrentFloor] = useState<FloorRateBody>();

  // const [areaCats, setAreaCats] = useState<MappedAreaCat[]>();

  // const [buildingCat, setBuildingCat] = useState<FloorListBody[]>();

  // const [floorCat, setFloorCat] = useState<FloorListBody[]>();

  const [openFloor, setOpenFloor] = useState(false);

  const [openBuilding, setOpenBuilding] = useState(false);

  const [openArea, setOpenArea] = useState(false);

  const [editModal, setEditModal] = useState(false);

  const { state, dispatch } = useContext(MyStore);
  const [messageApi, contextHolder] = message.useMessage();
  const { disabled } = useStoreGlobal();

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

    return () => {};
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
      title: "Rate (NRS)",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Action",
      key: "action",
      render: (rowData: FloorRateBody) => (
        <>
          {/* <Button
            type={"link"}
            size="middle"
            style={{ padding: 0 }}
            onClick={() => {
              onEditFloorData(rowData);
            }}
          >
            Edit
          </Button> */}
          {/* <Divider type="vertical"></Divider> */}
          <MyPopconfirm
            disabled={disabled}
            onConfirm={() => OnDeleteFloorRate(rowData)}
            button={"Delete"}
            type="link"
            size="middle"
          />
        </>
      ),
    },
  ];

  const OnEditFloorSuccess = (data: FloorRateBody) => {
    const init = [...(state.floorRate || [])];
    const currentIndex = init.findIndex((floor) => floor.id === data.id);
    init[currentIndex] = data;
    dispatch({ payload: init, type: ActionType.setFloorData });
    setEditModal(false);
    setCurrentFloor(undefined);
  };

  const [addFloor, setAddFloor] = useState(false);

  const OnPOSTsuccess = () => {
    GETfloorRate().then((res) => {
      dispatch({ payload: res.data, type: ActionType.setFloorData });

      // setFloorData(res.data);
    });
    setAddFloor(false);
  };

  // const onEditFloorData = (val: FloorRateBody) => {
  //   setEditModal(true);
  //   setCurrentFloor(val);
  // };

  const OnDeleteFloorRate = (data: FloorRateBody) => {
    DELfloorData(data.id, messageApi).then(() => {
      const init = [...(state.floorRate || [])];
      const afterDel = init.filter((myInit) => myInit.id !== data.id);
      dispatch({ payload: afterDel, type: ActionType.setFloorData });
      // setFloorData(afterDel);
    });
  };

  const OpenFloorModal = () => {
    if (!openFloor) {
      setOpenFloor(true);
    }
  };

  const OpenBuildingCatModal = () => {
    if (!openBuilding) {
      setOpenBuilding(true);
    }
  };

  const OpenAreaAddModal = () => {
    if (!openArea) {
      setOpenArea(true);
    }
  };

  const onFloorCategorySuccess = (body: FloorListBody) => {
    const init = [...(state.floorCat || [])];
    init.push(body);
    dispatch({ payload: init, type: ActionType.setFloorCat });

    // setFloorCat(init);
    setOpenFloor(false);
  };
  const onAddBuildingCatSuccess = (body: MappedAreaCat) => {
    const init = [...(state.buildingCat || [])];
    init.push(body);
    dispatch({ payload: init, type: ActionType.setBuildingCat });

    // setBuildingCat(init);
    setOpenBuilding(false);
  };

  const onPostAreaSucccess = () => {
    GETareaCategory().then((res) => {
      const mappedAreaCat = getMappedAreaCat(res);
      dispatch({ payload: mappedAreaCat, type: ActionType.setAreaCat });
      // const initAreaCat = [
      //   ...res.data.map((area) => ({
      //     ...area,
      //     value: area.id.toString(),
      //     label: area.name,
      //   })),
      // ];

      // const kid = (p: any, c: any) => {
      //   if (p.hasOwnProperty("children")) {
      //     p.children.push(c);
      //   } else {
      //     p.children = [c];
      //   }
      // };

      // for (let i = 0; i < initAreaCat.length - 1; i++) {
      //   const a = initAreaCat[i];
      //   for (let j = i + 1; j < initAreaCat.length; j++) {
      //     const b = initAreaCat[j];
      //     if (a.id === b.parentId) {
      //       kid(a, b);
      //     } else if (b.id === a.parentId) {
      //       kid(b, a);
      //     }
      //   }
      // }

      // const mappedAreaCat = initAreaCat.filter(
      //   (x: { parentId: any }) => !x.parentId
      // );

      // setAreaCats(mappedAreaCat as any);
    });
  };

  const onPostBuildingSucccess = () => {
    GETbuildingCategory().then((res) => {
      const mappedAreaCat = getMappedAreaCat(res);
      dispatch({ payload: mappedAreaCat, type: ActionType.setBuildingCat });
    });
  };

  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: (
        <span>
          <OrderedListOutlined />
          Area Category
        </span>
      ),
      children: (
        <AreaCategories
          onPostAreaCatSuccess={onPostAreaSucccess}
          OpenAreaAddModal={OpenAreaAddModal}
          areaCats={state.areaCat}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <OrderedListOutlined />
          Building Category
        </span>
      ),
      children: (
        <BuildingCategories
          OpenBuildingCatModal={OpenBuildingCatModal}
          buildingCats={state.buildingCat}
          onPostBuildingCatSuccess={onPostBuildingSucccess}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <OrderedListOutlined />
          Floor List
        </span>
      ),
      children: (
        <FloorCategories
          OpenFloorModal={OpenFloorModal}
          floorList={state.floorCat}
        />
      ),
    },
    {
      key: "4",
      label: (
        <span>
          <DollarOutlined />
          Floor Rate
        </span>
      ),
      children: (
        <div>
          <div style={{ textAlign: "right", paddingBottom: 20 }}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              ghost
              onClick={() => setAddFloor(true)}
            >
              Floor Rate
            </Button>
          </div>
          <Spin spinning={!state.floorRate}>
            <Table
              key={"id"}
              size="middle"
              columns={FloorRatecolumns}
              dataSource={state.floorRate}
            />
          </Spin>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <EditFloorDataModal
        OnEditFloorSuccess={OnEditFloorSuccess}
        isVisible={editModal}
        currentFloor={currentFloor}
        onClose={() => {
          setEditModal(false);
          setCurrentFloor(undefined);
        }}
      />

      <AddFloorRateModal
        areaCategorys={state.areaCat}
        buildingCategorys={state.buildingCat}
        floorCats={state.floorCat}
        OnPOSTsuccess={OnPOSTsuccess}
        isVisible={addFloor}
        onClose={() => {
          setAddFloor(false);
        }}
      />
      <AddFloorCategory
        isVisible={openFloor}
        OnPOSTsuccess={onFloorCategorySuccess}
        onClose={() => setOpenFloor(false)}
      />

      <AddBuildingCategory
        isVisible={openBuilding}
        OnPOSTsuccess={onAddBuildingCatSuccess}
        onClose={() => setOpenBuilding(false)}
      />
      <AddAreaCategory
        isVisible={openArea}
        onClose={() => setOpenArea(false)}
        OnPOSTsuccess={onPostAreaSucccess}
      />

      <PageHeader title="Floor Rate List" subTitle="Floor Rate as per data" />
      <Row justify="center">
        <Col
          className="TabsDiv"
          xs={24}
          sm={24}
          md={18}
          lg={16}
          xl={14}
          xxl={12}
          style={{
            padding: "2%",
            margin: "2%",
            backgroundColor: "white",
            borderTop: "3px solid rgb(35, 168, 221)",
            boxShadow: "0 1px 4px rgba(0, 21, 41, 0.25)",
          }}
        >
          <Tabs
            defaultActiveKey="0"
            className="UsersTab"
            items={items()}
          ></Tabs>
        </Col>
      </Row>
    </>
  );
};

export default FloorData;

export function getMappedAreaCat(res: ResAreaCatsBody) {
  const initAreaCat = [
    ...res.data.map((area) => ({
      ...area,
      value: area.id.toString(),
      label: area.name,
    })),
  ];

  const kid = (p: any, c: any) => {
    if (p.hasOwnProperty("children")) {
      p.children.push(c);
    } else {
      p.children = [c];
    }
  };

  for (let i = 0; i < initAreaCat.length - 1; i++) {
    const a = initAreaCat[i];

    for (let j = i + 1; j < initAreaCat.length; j++) {
      const b = initAreaCat[j];
      if (a.id === b.parentId) {
        kid(a, b);
      } else if (b.id === a.parentId) {
        kid(b, a);
      }
    }
  }

  const mappedAreaCat = initAreaCat.filter(
    (x: { parentId: any }) => !x.parentId
  );
  return mappedAreaCat;
}
