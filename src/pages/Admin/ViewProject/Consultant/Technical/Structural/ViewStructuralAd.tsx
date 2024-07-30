import React, { useContext, useEffect, useState } from "react";
// import StepsHeader from "../../../../Common/Headers/StepsHeader";
import { Tabs, TabsProps } from "antd";
import GeneralEdit from "./GeneralEdit";
import NBC104edit from "./NBC104edit";
import NBC105edit from "./NBC105edit";
import NBC106114edit from "./NBC106_114edit";
import SlabDesignEdit from "./SlabDesignEdit";
import CriticalBeamEdit from "./CriticalBeamEdit";
import FoundationEdit from "./FoundationEdit";
import FloorEdit from "./FloorEdit";
import OpeningDetailsEdit from "./OpeningDetailsEdit";
import { MyStore } from "../../../../../../Store/ContextApi";
import GoBackToProjects from "../../GoBackToProjects";
import ColumnDesignEdit from "./ColumnDesignEdit";
import ViewProjectHeader from "../../../../../../Common/Headers/ViewProjectHeader";
import { ifCon } from "../../Project/ViewProject/ViewProject";
import AdStructuralFooter from "../../../../../../Components/Admin/Footers/AdStructuralFooter";
import { useParams } from "react-router-dom";
import PDFstructural from "../../../../../../Common/ProjectPDFs/PDFstructural";

interface Props {
  admin?: boolean;
}

const ViewStructuralAd = ({ admin = false }: Props) => {
  const params = useParams();
  const pid: string = params.pid ?? "";

  const { state } = useContext(MyStore);

  // const [general, setGeneral] = useState<Generaltyp>();
  // const [nbc101, setNbc101] = useState<NBC101104typ>();
  // const [nbc105, setNbc105] = useState<NBC105typ>();
  // const [nbc106, setNbc106] = useState<NBC106typ>();
  // const [slab, setSlab] = useState<SlabDesignTyp>();
  // const [beam, setBeam] = useState<CriticalBeamtyp>();
  // const [foundation, setFoundation] = useState<FoundationTyp>();
  // const [floor, setFloor] = useState<FloorTypArc>();
  // const [openingDetails, setOpeningDetails] = useState<OpeningDetailsTyp>();
  // const [edit, setEdit] = useState(false);

  return (
    <div>
      {ifCon() ? null : <AdStructuralFooter pid={pid} />}
      {/* <ProjectNavAdmin
        id={pid}
        step="Step 9: "
        title="Structural"
        prev={`/admin/viewproject/architectural/${pid}`}
        next={`/admin/viewproject/electrical/${pid}`}
      /> */}
      <ViewProjectHeader
        id={pid}
        step="Step 9: "
        title="Structural"
        prev={
          admin
            ? `/admin/viewproject/architectural/${pid}`
            : `/user/viewproject/architectural/${pid}`
        }
        next={
          admin
            ? `/admin/viewproject/electrical/${pid}`
            : `/user/viewproject/electrical/${pid}`
        }
      />
      <div className="CenterForm5">
        {state.project.id ? (
          <>
            <PDFstructural
              beamDesign={JSON.parse(state.project.structure.criticalBeam)}
              columnDesign={JSON.parse(state.project.structure.columnDesign)}
              floor={JSON.parse(state.project.structure.floor)}
              foundation={JSON.parse(state.project.structure.foundation)}
              openingDetails={JSON.parse(
                state.project.structure.openingDetails
              )}
              safetyConsideration={JSON.parse(
                state.project.structure.nbc106_114
              )}
              seismicParameters={JSON.parse(state.project.structure.nbc105)}
              slabDesign={JSON.parse(state.project.structure.slabDesign)}
              general={JSON.parse(state.project.structure.general)}
              projectId={params.pid ?? "0"}
              materialsAndLoading={JSON.parse(
                state.project.structure.nbc101_104
              )}
            />
            <StructuralCommon structure={state.project.structure} />
          </>
        ) : (
          <GoBackToProjects />
        )}
      </div>
    </div>
  );
};

export default ViewStructuralAd;

interface MyProps {
  structure: any;
}

export const StructuralCommon = ({ structure }: MyProps) => {
  const general = structure ? JSON.parse(structure.general) : null;
  const nbc105 = structure ? JSON.parse(structure.nbc105) : null;
  const nbc101 = structure ? JSON.parse(structure.nbc101_104) : null;
  const nbc106 = structure ? JSON.parse(structure.nbc106_114) : null;
  const slab = structure ? JSON.parse(structure.slabDesign) : null;
  const beam = structure ? JSON.parse(structure.criticalBeam) : null;
  const foundation = structure ? JSON.parse(structure.foundation) : null;
  const floor = structure ? JSON.parse(structure.floor) : null;
  const openingDetails = structure
    ? JSON.parse(structure.openingDetails)
    : null;
  const column = structure ? JSON.parse(structure.columnDesign) : null;

  const [alltabs, setAlltabs] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    function onGeneralChange() {
      if (general?.bstype[0] === "Load Bearing") {
        setAlltabs(1);
      } else if (general?.bstype[0] === "Frame Structure") {
        setAlltabs(0);
      } else if (general?.bstype[0] === "Other") {
        setAlltabs(2);
      }
    }
    onGeneralChange();
    return () => {
      setAlltabs(0);
    };
  }, [general?.bstype]);

  const items = (): TabsProps["items"] => {
    const common = [
      {
        key: "1",
        label: `General`,
        children: <GeneralEdit data={general} />,
      },
      {
        key: "2",
        label: `Materials and Loading`,
        children: <NBC104edit data={nbc101} />,
      },
      {
        key: "3",
        label: `Seismic Parameters Results`,
        children: <NBC105edit data={nbc105} />,
      },
      {
        key: "4",
        label: `Safety Consideration `,
        children: <NBC106114edit data={nbc106} />,
      },
      {
        key: "5",
        label: `Foundation`,
        children: <FoundationEdit data={foundation} />,
      },
    ];

    const additionalTabs = [
      {
        key: "6",
        label: `Beam Design`,
        children: <CriticalBeamEdit data={beam} />,
      },
      {
        key: "7",
        label: `Column Design`,
        children: <ColumnDesignEdit data={column} />,
      },
      {
        key: "8",
        label: `Slab Design`,
        children: <SlabDesignEdit data={slab} />,
      },
    ];
    const tab1 = [
      {
        key: "9",
        label: `Floor`,
        children: <FloorEdit data={floor} />,
      },
      {
        key: "10",
        label: `Opening Details `,
        children: <OpeningDetailsEdit data={openingDetails} />,
      },
    ];
    if (alltabs === 1) {
      return [...common, ...tab1];
    } else if (alltabs === 0) {
      return [...common, ...additionalTabs];
    } else if (alltabs === 2) {
      return [...common, ...additionalTabs, ...tab1];
    } else {
      return common;
    }
  };

  return (
    <div className="TabWrapper">
      <div className="MyTableOuter">
        <table className="MyTable">
          <thead>
            <tr>
              <th colSpan={3}>
                <div className="thSteps">Project Information:</div>
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
  );
};
