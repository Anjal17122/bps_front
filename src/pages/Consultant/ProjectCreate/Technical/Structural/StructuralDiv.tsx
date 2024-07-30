import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Tabs, TabsProps, message } from "antd";
import General from "./General";
import NBC104 from "./NBC104";
import NBC105 from "./NBC105";
import NBC106_114 from "./NBC106_114";
import SlabDesign from "./SlabDesign";
import CriticalBeam from "./CriticalBeam";
import Foundation from "./Foundation";
import Floor from "./Floor";
import OpeningDetails from "./OpeningDetails";
import GeneralEdit from "./GeneralEdit";
import NBC104edit from "./NBC104edit";
import NBC105edit from "./NBC105edit";
import NBC106114edit from "./NBC106_114edit";
import SlabDesignEdit from "./SlabDesignEdit";
import CriticalBeamEdit from "./CriticalBeamEdit";
import FoundationEdit from "./FoundationEdit";
import FloorEdit from "./FloorEdit";
import OpeningDetailsEdit from "./OpeningDetailsEdit";
import {
  FloorTypArc,
  MaterialsAndLoadingBody,
  SlabDesignTyp,
  CriticalBeamtyp,
  OpeningDetailsTyp,
  FoundationTyp,
  NBC105typ,
  GeneralType,
  NBC106typ,
  getStructural,
  postStructural,
  putStructural,
} from "../../../../../Services/StructuralService";
import TableButton from "../../../../../Common/TableButton/TableButton";
import PDFstructural from "../../../../../Common/ProjectPDFs/PDFstructural";
import { checkIfFilled } from "../BuildingByLaws/BuildingByLaws";
import ColumnDesign from "./ColumnDesign";
import ColumnDesignEdit from "./ColumnDesignEdit";
import { NewId } from "../UploadFiles/UploadFilesDiv";

const StructuralDiv = () => {
  const params: { pid?: string; tempId?: string } = useParams();

  const [general, setGeneral] = useState<GeneralType>();
  const [nbc101, setNbc101] = useState<MaterialsAndLoadingBody>();
  const [nbc105, setNbc105] = useState<NBC105typ>();
  const [nbc106, setNbc106] = useState<NBC106typ>();
  const [slab, setSlab] = useState<SlabDesignTyp>();
  const [beam, setBeam] = useState<CriticalBeamtyp>();
  const [column, setColumn] = useState<CriticalBeamtyp>();
  const [foundation, setFoundation] = useState<FoundationTyp>();
  const [floor, setFloor] = useState<FloorTypArc>();
  const [openingDetails, setOpeningDetails] = useState<OpeningDetailsTyp>();
  const [edit, setEdit] = useState(false);
  const [alltabs, setAlltabs] = useState<0 | 1 | 2>(0);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getStructural(
      params.tempId ? params.tempId : params.pid ?? "0",
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/structure/perma?id="
        : "/structure/project?id="
    ).then((res) => {
      setLoading(false);
      if (res.data) {
        const mygeneral = JSON.parse(res.data.general);
        const mynbc101_104 = JSON.parse(res.data.nbc101_104);
        const mynbc105 = JSON.parse(res.data.nbc105);
        const mynbc106_114 = JSON.parse(res.data.nbc106_114);
        const myslabDesign = JSON.parse(res.data.slabDesign);
        const mycriticalBeam = JSON.parse(res.data.criticalBeam);
        const myfoundation = JSON.parse(res.data.foundation);
        const myfloor = JSON.parse(res.data.floor);
        const myopeningDetails = JSON.parse(res.data.openingDetails);
        const mycolumn = JSON.parse(res.data.columnDesign);
        setGeneral(mygeneral);
        setNbc101(mynbc101_104);
        setNbc105(mynbc105);
        setNbc106(mynbc106_114);
        setSlab(myslabDesign);
        setBeam(mycriticalBeam);
        setFoundation(myfoundation);
        setFloor(myfloor);
        setOpeningDetails(myopeningDetails);
        setColumn(mycolumn);

        if (mygeneral.bstype[0] === "Load Bearing") {
          setAlltabs(1);
        } else if (mygeneral.bstype[0] === "Frame Structure") {
          setAlltabs(0);
        } else if (mygeneral.bstype[0] === "Other") {
          setAlltabs(2);
        }
      }
    });
    return () => {
      setLoading(true);
      setGeneral(undefined);
      setNbc101(undefined);
      setNbc105(undefined);
      setNbc106(undefined);
      setSlab(undefined);
      setBeam(undefined);
      setFoundation(undefined);
      setFloor(undefined);
      setOpeningDetails(undefined);
      setColumn(undefined);
    };
  }, [params]);

  function onCreate(link: string, val: any, setS: any, name: string) {
    const body = {
      projectId: NewId(params.tempId || "", params.pid ?? "0"),
      [name]: JSON.stringify(val),
    };

    postStructural(body, link, messageApi).then((res: any) => {
      const bdata = JSON.parse(res.data[name]);
      setS(bdata);
      setEdit(false);
    });
  }

  function onEdit(
    link: string,
    val: NBC106typ | CriticalBeamtyp | NBC105typ,
    setS: any,
    name: string
  ) {
    const body = {
      id: NewId(params.tempId || "", params.pid ?? "0"),
      projectId: NewId(params.tempId || "", params.pid ?? "0"),
      [name]: JSON.stringify(val),
    };
    // console.log(body);
    putStructural(body, link).then((res) => {
      const bdata = JSON.parse(res.data[name]);
      setS(bdata);
      setEdit(false);
    });
  }

  function onGeneralChange(val: string[]) {
    if (val[0] === "Load Bearing") {
      setAlltabs(1);
    } else if (val[0] === "Frame Structure") {
      setAlltabs(0);
    } else if (val[0] === "Other") {
      setAlltabs(2);
    }
  }

  const items = (): TabsProps["items"] => {
    const common = [
      {
        key: "1",
        label: (
          <div>General {checkIfFilled(general && !edit ? true : false)}</div>
        ),
        children: (
          <div>
            {general ? (
              <GeneralEdit
                onSubmit={(val) =>
                  localStorage.getItem("isNotice") === "true" &&
                  localStorage.getItem("isPerma") === "true"
                    ? onEdit(
                        "/structure/perma/general",
                        val,
                        setGeneral,
                        "general"
                      )
                    : onCreate("/structure", val, setGeneral, "general")
                }
                data={general}
                edit={edit}
                onGeneralChange={onGeneralChange}
              />
            ) : (
              <General
                onGeneralChange={onGeneralChange}
                onSubmit={(val) =>
                  localStorage.getItem("isNotice") === "true" &&
                  localStorage.getItem("isPerma") === "true"
                    ? onEdit(
                        "/structure/perma/general",
                        val,
                        setGeneral,
                        "general"
                      )
                    : onCreate("/structure", val, setGeneral, "general")
                }
              />
            )}
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div>
            Materials and Loading{" "}
            {checkIfFilled(nbc101 && !edit ? true : false)}
          </div>
        ),
        children: (
          <div>
            {nbc101 ? (
              <NBC104edit
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/101"
                      : "/structure/nbc101",
                    val,
                    setNbc101,
                    "nbc101_104"
                  )
                }
                data={nbc101}
                edit={edit}
              />
            ) : (
              <NBC104
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/101"
                      : "/structure/nbc101",
                    val,
                    setNbc101,
                    "nbc101_104"
                  )
                }
              />
            )}
          </div>
        ),
      },
      {
        key: "3",
        label: (
          <div>
            Seismic Parameters Results{" "}
            {checkIfFilled(nbc105 && !edit ? true : false)}
          </div>
        ),
        children: (
          <div>
            {nbc105 ? (
              <NBC105edit
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/105"
                      : "/structure/nbc105",
                    val,
                    setNbc105,
                    "nbc105"
                  )
                }
                data={nbc105}
                edit={edit}
              />
            ) : (
              <NBC105
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/105"
                      : "/structure/nbc105",
                    val,
                    setNbc105,
                    "nbc105"
                  )
                }
              />
            )}
          </div>
        ),
      },
      {
        key: "4",
        label: (
          <div>
            Safety Consideration {checkIfFilled(nbc106 && !edit ? true : false)}
          </div>
        ),
        children: (
          <div>
            {nbc106 ? (
              <NBC106114edit
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/106"
                      : "/structure/nbc106",
                    val,
                    setNbc106,
                    "nbc106_114"
                  )
                }
                data={nbc106}
                edit={edit}
              />
            ) : (
              <NBC106_114
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/106"
                      : "/structure/nbc106",
                    val,
                    setNbc106,
                    "nbc106_114"
                  )
                }
              />
            )}
          </div>
        ),
      },
      {
        key: "5",
        label: (
          <div>
            Foundation {checkIfFilled(foundation && !edit ? true : false)}
          </div>
        ),
        children: (
          <div>
            {foundation ? (
              <FoundationEdit
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/foundation"
                      : "/structure/foundation",
                    val,
                    setFoundation,
                    "foundation"
                  )
                }
                data={foundation}
                edit={edit}
              />
            ) : (
              <Foundation
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/foundation"
                      : "/structure/foundation",
                    val,
                    setFoundation,
                    "foundation"
                  )
                }
              />
            )}
          </div>
        ),
      },
    ];

    const tab0 = [
      {
        key: "6",
        label: (
          <div>Beam Design {checkIfFilled(beam && !edit ? true : false)}</div>
        ),
        children: (
          <div>
            {beam ? (
              <CriticalBeamEdit
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/beam"
                      : "/structure/beam",
                    val,
                    setBeam,
                    "criticalBeam"
                  )
                }
                data={beam}
                edit={edit}
              />
            ) : (
              <CriticalBeam
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/beam"
                      : "/structure/beam",
                    val,
                    setBeam,
                    "criticalBeam"
                  )
                }
              />
            )}
          </div>
        ),
      },
      {
        key: "7",
        label: (
          <div>
            Column Design {checkIfFilled(column && !edit ? true : false)}
          </div>
        ),
        children: (
          <div>
            {column ? (
              <ColumnDesignEdit
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/columndesign"
                      : "/structure/columndesign",
                    val,
                    setColumn,
                    "columnDesign"
                  )
                }
                data={column}
                edit={edit}
              />
            ) : (
              <ColumnDesign
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/columndesign"
                      : "/structure/columndesign",
                    val,
                    setColumn,
                    "columnDesign"
                  )
                }
              />
            )}
          </div>
        ),
      },
      {
        key: "8",
        label: (
          <div>Slab Design {checkIfFilled(slab && !edit ? true : false)}</div>
        ),
        children: (
          <div>
            {slab ? (
              <SlabDesignEdit
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/slab"
                      : "/structure/slab",
                    val,
                    setSlab,
                    "slabDesign"
                  )
                }
                data={slab}
                edit={edit}
              />
            ) : (
              <SlabDesign
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/slab"
                      : "/structure/slab",
                    val,
                    setSlab,
                    "slabDesign"
                  )
                }
              />
            )}
          </div>
        ),
      },
    ];

    const tab1 = [
      {
        key: "9",
        label: <div>Floor {checkIfFilled(floor && !edit ? true : false)}</div>,
        children: (
          <div>
            {floor ? (
              <FloorEdit
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/floor"
                      : "/structure/floor",
                    val,
                    setFloor,
                    "floor"
                  )
                }
                data={floor}
                edit={edit}
              />
            ) : (
              <Floor
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/floor"
                      : "/structure/floor",
                    val,
                    setFloor,
                    "floor"
                  )
                }
              />
            )}
          </div>
        ),
      },
      {
        key: "10",
        label: (
          <div>
            Opening Details{" "}
            {checkIfFilled(openingDetails && !edit ? true : false)}
          </div>
        ),
        children: (
          <div>
            {openingDetails ? (
              <OpeningDetailsEdit
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/opening"
                      : "/structure/openingdetails",
                    val,
                    setOpeningDetails,
                    "openingDetails"
                  )
                }
                data={openingDetails}
                edit={edit}
              />
            ) : (
              <OpeningDetails
                onSubmit={(val) =>
                  onEdit(
                    localStorage.getItem("isNotice") === "true" &&
                      localStorage.getItem("isPerma") === "true"
                      ? "/structure/perma/opening"
                      : "/structure/openingdetails",
                    val,
                    setOpeningDetails,
                    "openingDetails"
                  )
                }
              />
            )}
          </div>
        ),
      },
    ];

    if (alltabs === 0) {
      return [...common, ...tab0];
    } else if (alltabs === 1) {
      return [...common, ...tab1];
    } else if (alltabs === 2) {
      return [...common, ...tab0, ...tab1];
    } else {
      return common;
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="CenterForm5">
        {contextHolder}
        <div>
          <TableButton
            bgColor={edit ? "red" : "green"}
            onClick={() => setEdit(!edit)}
          >
            {edit ? "Cancel Edit" : "Edit"}
          </TableButton>
          <PDFstructural
            general={general}
            projectId={params.pid ?? "0"}
            materialsAndLoading={nbc101}
            seismicParameters={nbc105}
            safetyConsideration={nbc106}
            foundation={foundation}
            beamDesign={beam}
            columnDesign={column}
            slabDesign={slab}
            floor={floor}
            openingDetails={openingDetails}
          />
        </div>
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
      </div>
    </Spin>
  );
};

export default StructuralDiv;
