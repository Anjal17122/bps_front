import React, { useContext } from "react";
import { useParams } from "react-router-dom";
// import StepsHeader from "../../../../Common/Headers/StepsHeader";
import { Tabs, TabsProps } from "antd";
import StaircaseEdit from "./StaircaseEdit";
import LiftsEdit from "./LiftsEdit";
import LightAndVentEdit from "./LightAndVentEdit";
import ExitEdit from "./ExitEdit";
import OtherEdit from "./OtherEdit";
import { MyStore } from "../../../../../../Store/ContextApi";
import GoBackToProjects from "../../GoBackToProjects";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import { ifCon } from "../../Project/ViewProject/ViewProject";
import AdArchitecturalFooter from "../../../../../../Components/Admin/Footers/AdArchitecturalFooter";
import PDFarchitectural from "../../../../../../Common/ProjectPDFs/PDFarchitectural";
import {
  Staircase,
  Exit,
  LightVent,
  Lift,
  ArchitecturalOther,
} from "../../../../../../Services/ArchitecturalService";

interface Props {
  admin?: boolean;
}

const ViewArchitecturalAd = ({ admin = false }: Props) => {
  const params = useParams();
  const pid: string = params.pid ?? "";

  const { state } = useContext(MyStore);
  const staircase = state.project.architecture
    ? JSON.parse(state.project.architecture.stairCase)
    : null;
  const exit = state.project.architecture
    ? JSON.parse(state.project.architecture.exit)
    : null;
  const light = state.project.architecture
    ? JSON.parse(state.project.architecture.lightVentilation)
    : null;
  const lifts = state.project.architecture
    ? JSON.parse(state.project.architecture.lift)
    : null;
  const other = state.project.architecture
    ? JSON.parse(state.project.architecture.other)
    : null;

  // const [staircase, setStaircase] = useState<Staircase>();
  // const [exit, setExit] = useState<Exit>();
  // const [light, setLight] = useState<LightVent>();
  // const [lifts, setLifts] = useState<Lift>();
  // const [other, setOther] = useState<ArchitecturalOther>();
  // const [edit, setEdit] = useState(false);

  return (
    <div>
      {ifCon() ? null : <AdArchitecturalFooter pid={pid} />}
      <ViewProjectHeader
        id={pid}
        step="Step 8: "
        title="Architectural"
        prev={
          admin
            ? `/admin/viewproject/bylaws/${pid}`
            : `/user/viewproject/bylaws/${pid}`
        }
        next={
          admin
            ? `/admin/viewproject/structural/${pid}`
            : `/user/viewproject/structural/${pid}`
        }
      />
      {/* <ViewProjectHeader
        id={pid}
        step="Step 8: "
        title="Architectural"
        prev={prev}
        next={next}
        // prev={`/admin/viewproject/bylaws/${pid}`}
        // next={`/admin/viewproject/structural/${pid}`}
      /> */}
      <div className="CenterForm10">
        {state.project.id ? (
          <>
            <PDFarchitectural
              data={{
                staircase: staircase as Staircase,
                exit: exit as Exit,
                lightAndVent: light as LightVent,
                lifts: lifts as Lift,
                other: other as ArchitecturalOther,
              }}
            />
            <ArchitecturalCommon
              staircase={staircase}
              exit={exit}
              light={light}
              lifts={lifts}
              other={other}
            />
          </>
        ) : (
          <GoBackToProjects />
        )}
      </div>
    </div>
  );
};

export default ViewArchitecturalAd;

interface MyProps {
  staircase: any;
  exit: any;
  light: any;
  lifts: any;
  other: any;
}

export const ArchitecturalCommon = ({
  staircase,
  exit,
  light,
  lifts,
  other,
}: MyProps) => {
  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: `Staircase`,
      children: <StaircaseEdit data={staircase} />,
    },
    {
      key: "2",
      label: `Exit`,
      children: <ExitEdit data={exit} />,
    },
    {
      key: "3",
      label: `Light and Ventilation`,
      children: <LightAndVentEdit data={light} />,
    },
    {
      key: "4",
      label: `Lifts`,
      children: <LiftsEdit data={lifts} />,
    },
    {
      key: "5",
      label: `Other`,
      children: <OtherEdit data={other} />,
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
                    <div className="title">Project Information:</div>{" "}
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
