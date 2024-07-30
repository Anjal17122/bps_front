import { useContext } from "react";
import { Tabs, TabsProps } from "antd";
import RatingAndSizesEdit from "./RatingAndSizesEdit";
import CABLESINACONDUITedit from "./CABLESINACONDUITedit";
import EARTHINGedit from "./EARTHINGedit";
import TESTINGedit from "./TESTINGedit";
import { MyStore } from "../../../../../../Store/ContextApi";
import GoBackToProjects from "../../GoBackToProjects";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import { ifCon } from "../../Project/ViewProject/ViewProject";
import AdElectricalFooter from "../../../../../../Components/Admin/Footers/AdElectricalFooter";
import { useParams } from "react-router-dom";
import PDFelectrical from "../../../../../../Common/ProjectPDFs/PDFelectrical";

interface Props {
  admin?: boolean;
}

const ViewElectricalAd = ({ admin = false }: Props) => {
  const { state } = useContext(MyStore);

  const rating = state.project.electrical
    ? JSON.parse(state.project.electrical.ratingSize)
    : null;
  const maxCables = state.project.electrical
    ? JSON.parse(state.project.electrical.conductorsInCable)
    : null;
  const earthing = state.project.electrical
    ? JSON.parse(state.project.electrical.earthing)
    : null;
  const testing = state.project.electrical
    ? JSON.parse(state.project.electrical.testing)
    : null;

  const params = useParams();
  const pid: string = params.pid ?? "";

  return (
    <div>
      {ifCon() ? null : <AdElectricalFooter pid={pid} />}
      {/* <ProjectNavAdmin
        id={pid}
        step="Step 10: "
        title="Electrical"
        prev={`/admin/viewproject/structural/${pid}`}
        next={`/admin/viewproject/sanitation/${pid}`}
      />
        <StepsHeader
        id={pid}
        step="Step 10: "
        title="Electrical"
        prev={`/project/create/structural/${pid}`}
        next={`/project/create/sanitation/${pid}`}
      /> */}
      <ViewProjectHeader
        id={pid}
        step="Step 10: "
        title="Electrical"
        prev={
          admin
            ? `/admin/viewproject/structural/${pid}`
            : `/user/viewproject/structural/${pid}`
        }
        next={
          admin
            ? `/admin/viewproject/sanitation/${pid}`
            : `/user/viewproject/sanitation/${pid}`
        }
      />
      <div className="CenterForm10">
        {state.project.id ? (
          <>
            <PDFelectrical
              projectId={params.pid ?? "0"}
              rating={rating}
              maxCables={maxCables}
              earthing={earthing}
              testing={testing}
            />
            <ElectricalCommon
              rating={rating}
              maxCables={maxCables}
              earthing={earthing}
              testing={testing}
            />
          </>
        ) : (
          <GoBackToProjects />
        )}
      </div>
    </div>
  );
};

export default ViewElectricalAd;

interface MyProps {
  rating: any;
  maxCables: any;
  earthing: any;
  testing: any;
}

export const ElectricalCommon = ({
  rating,
  maxCables,
  earthing,
  testing,
}: MyProps) => {
  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: `RATING & SIZES`,
      children: <RatingAndSizesEdit data={rating} />,
    },
    {
      key: "2",
      label: `MAX. NOS. OF CABLES IN A CONDUIT`,
      children: <CABLESINACONDUITedit data={maxCables} />,
    },
    {
      key: "3",
      label: `EARTHING`,
      children: <EARTHINGedit data={earthing} />,
    },
    {
      key: "4",
      label: `Testing`,
      children: <TESTINGedit data={testing} />,
    },
  ];

  return (
    <div>
      <div className="TabWrapper">
        <div className="MyTableOuter">
          <table className="MyTable">
            <thead>
              <tr>
                <th>
                  <div className="thSteps">
                    <div className="title">Building Element:</div>{" "}
                  </div>
                </th>
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
