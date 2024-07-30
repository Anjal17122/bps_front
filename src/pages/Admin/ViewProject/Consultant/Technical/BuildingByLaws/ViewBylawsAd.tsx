import React, { useContext } from "react";
import { MyStore } from "../../../../../../Store/ContextApi";
import RollingLoading from "../../../../../../Common/Loading/RollingLoading";
import GoBackToProjects from "../../GoBackToProjects";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import { useParams } from "react-router-dom";
import AdByLawsFooter from "../../../../../../Components/Admin/Footers/AdByLawsFooter";
import {
  BuildingAreaTyp,
  LandareaTyp,
} from "../../../../../Consultant/ProjectCreate/Technical/BuildingByLaws/ByLawsData";
import { Tabs, TabsProps } from "antd";
import FloorAreaEdit from "./FloorAreaEdit";
import LandDataEdit from "./LandDataEdit";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import PDFbuildingByLaws from "../../../../../../Common/ProjectPDFs/PDFbuildingByLaws";

interface Props {
  admin?: boolean;
}

const ViewBylawsAd = ({ admin = false }: Props) => {
  const { state } = useContext(MyStore);
  const building = state.project.buildingByLaws
    ? JSON.parse(state.project.buildingByLaws.buildingData)
    : null;
  const land = state.project.buildingByLaws
    ? JSON.parse(state.project.buildingByLaws.landData)
    : null;

  const params = useParams();
  const pid: string = params.pid ?? "";

  //       prev: `/user/viewproject/floor/${props.match.params.pid}`,
  //       next: `/user/viewproject/architectural/${props.match.params.pid}`,

  return (
    <div>
      {localStorage.getItem("role") === "ROLE_Consultant" ? null : (
        <AdByLawsFooter pid={pid} />
      )}
      <ViewProjectHeader
        id={pid}
        step="Step 7: "
        title="By Laws"
        prev={
          admin
            ? `/admin/viewproject/floor/${pid}`
            : `/user/viewproject/floor/${pid}`
        }
        next={
          admin
            ? `/admin/viewproject/architectural/${pid}`
            : `/user/viewproject/architectural/${pid}`
        }
      />

      <div className="CenterForm10">
        {building || land ? (
          <>
            <PDFbuildingByLaws
              data={{
                buildingArea: building as BuildingAreaTyp,
                landArea: land as LandareaTyp,
              }}
            />
            <BylawsCommon building={building} land={land} />
          </>
        ) : (
          <GoBackToProjects />
        )}
      </div>
    </div>
  );
};

export function checkIfFilled(test: boolean) {
  if (test) {
    return <CheckCircleFilled style={{ color: "#52c41a" }} />;
  } else {
    return <CloseCircleOutlined />;
  }
}
export default ViewBylawsAd;

interface MyProps {
  building: BuildingAreaTyp;
  land: LandareaTyp;
}

export const BylawsCommon = ({ building, land }: MyProps) => {
  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: `Building Data`,
      children: <FloorAreaEdit data={building} />,
    },
    {
      key: "2",
      label: `Land Data`,
      children: <LandDataEdit data={land} />,
    },
  ];

  return (
    <div>
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
    </div>
  );
};
