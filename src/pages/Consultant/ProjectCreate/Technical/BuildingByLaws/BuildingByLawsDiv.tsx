import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Spin, Tabs, TabsProps } from "antd";
import FloorAreaEdit from "./FloorAreaEdit";
import LandDataCreate from "./LandDataCreate";
import { CheckCircleFilled } from "@ant-design/icons";
import {
  getByLaws,
  putLandArea,
  putByLaws,
} from "../../../../../Services/TechnicalService";
import { BuildingAreaTyp, LandareaTyp } from "./ByLawsData";
import TableButton from "../../../../../Common/TableButton/TableButton";
import FloorAreaCreate from "./FloorAreaCreate";
import LandDataEdit from "./LandDataEdit";
import PDFbuildingByLaws from "../../../../../Common/ProjectPDFs/PDFbuildingByLaws";
import { NewId } from "../UploadFiles/UploadFilesDiv";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";

const BuildingByLawsDiv = () => {
  const params: { pid?: string; tempId?: string } = useParams();

  const [building, setBuilding] = useState<BuildingAreaTyp>();
  const [land, setLand] = useState<LandareaTyp>();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const { disabled } = useStoreGlobal();

  useEffect(() => {
    getByLaws(
      (params.tempId ? params.tempId : params.pid) ?? "0",
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/buildingbylaws/perma?id="
        : "/buildingbylaws/by/project?id="
    ).then((res) => {
      setLoading(false);
      if (res.data) {
        const bdata = JSON.parse(res.data.buildingData);
        const land = JSON.parse(res.data.landData);
        setBuilding(bdata);
        setLand(land);
      }
    });
    return () => {
      setLoading(true);
      setBuilding(undefined);
    };
  }, [params]);

  // function callback(key: any) {
  // }

  function onCreateBuilding(val: any) {
    // alert("onCreate Building");

    putByLaws(
      {
        projectId: (params.tempId ? params.tempId : params.pid) ?? "0",
        buildingData: JSON.stringify(val),
      },
      messageApi,
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/buildingbylaws/perma/building"
        : "/buildingbylaws/building"
    ).then((res) => {
      const bdata = JSON.parse(res.data.buildingData);
      setBuilding(bdata);
      setEdit(false);
    });
  }

  function onLandEdit(val: any) {
    if (val.coveragePer > 70) {
      return messageApi.error("Ground coverage should be less than 70%");
    }

    putLandArea(
      {
        id: NewId(params.tempId || "0", params.pid ?? "0"),
        projectId: NewId(params.tempId || "", params.pid ?? "0"),
        landData: JSON.stringify(val),
      },
      messageApi,
      localStorage.getItem("isPerma") === "true"
        ? "/buildingbylaws/perma/land"
        : "/buildingbylaws/land"
    ).then((res) => {
      const land = JSON.parse(res.data.landData);
      setLand(land);
      setEdit(false);
    });
  }

  function onEditBuilding(val: any) {
    putByLaws(
      {
        id: NewId(params.tempId ?? "", params.pid ?? "0"),
        projectId: NewId(params.tempId ?? "", params.pid ?? "0"),
        buildingData: JSON.stringify(val),
      },
      messageApi,
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/buildingbylaws/perma/building"
        : "/buildingbylaws/building"
    ).then((res) => {
      const land = JSON.parse(res.data.buildingData);
      setBuilding(land);
      setEdit(false);
    });
  }
  // const dwBuildingByLawsPDF = () => {
  //   const body = { data: buildingByLawsHtml };
  //   axios.post(BASE_URL + "/create/html/download", body);
  // };

  // const isPerma = localStorage.getItem("isPerma");

  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: (
        <div>
          Building Data{" "}
          {building && !edit ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : null}
        </div>
      ),
      children: (
        <div>
          {building ? (
            <FloorAreaEdit
              data={building}
              onSubmit={
                localStorage.getItem("isPerma") === "true"
                  ? onEditBuilding
                  : onCreateBuilding
              }
              edit={edit}
              submitting={disabled}
            />
          ) : (
            <FloorAreaCreate
              onSubmit={
                localStorage.getItem("isPerma") === "true"
                  ? onCreateBuilding
                  : onEditBuilding
              }
              submitting={disabled}
            />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          Land Data{" "}
          {land && !edit ? (
            <CheckCircleFilled style={{ color: "#52c41a" }} />
          ) : null}
        </div>
      ),
      children: (
        <div>
          {land ? (
            <LandDataEdit
              buildingArea={building?.buildingArea || 0}
              data={land}
              onSubmit={onLandEdit}
              edit={edit}
              submitting={disabled}
            />
          ) : (
            <LandDataCreate
              buildingArea={
                typeof building?.buildingArea === "string"
                  ? parseInt(building?.buildingArea)
                  : building?.buildingArea || 0
              }
              onSubmit={onLandEdit}
              submitting={disabled}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="CenterForm5">
      {contextHolder}
      <div>
        <TableButton
          bgColor={edit ? "red" : "green"}
          onClick={() => setEdit(!edit)}
        >
          {edit ? "Cancel Edit" : "Edit"}
        </TableButton>
        <PDFbuildingByLaws
          data={{
            buildingArea: building as BuildingAreaTyp,
            landArea: land as LandareaTyp,
          }}
        />
      </div>
      <Spin spinning={loading}>
        <div className="TabWrapper">
          <div className="MyTableOuter">
            <table className="MyTable">
              <thead>
                <tr>
                  <th colSpan={3}>
                    <div className="thSteps">
                      <div className="title"> Project Information:</div>{" "}
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Building Element</th>
                  <th className="width80">As per submitted design</th>
                  <th className="width80">Remarks</th>
                </tr>
              </thead>
            </table>
          </div>
          <Tabs type="card" items={items()}></Tabs>
        </div>
      </Spin>
    </div>
  );
};

export default BuildingByLawsDiv;
