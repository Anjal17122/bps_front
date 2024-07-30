import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Tabs, TabsProps, message } from "antd";
import StaircaseCreate from "./StaircaseCreate";
import LightAndVentCreate from "./LightAndVentCreate";
import LiftsCreate from "./LiftsCreate";
import OtherCreate from "./OtherCreate";
import ExitCreate from "./ExitCreate";
import StaircaseEdit from "./StaircaseEdit";
import LiftsEdit from "./LiftsEdit";
import LightAndVentEdit from "./LightAndVentEdit";
import ExitEdit from "./ExitEdit";
import OtherEdit from "./OtherEdit";
import PDFarchitectural from "../../../../../Common/ProjectPDFs/PDFarchitectural";
import TableButton from "../../../../../Common/TableButton/TableButton";
import {
  Staircase,
  Exit,
  LightVent,
  Lift,
  ArchitecturalOther,
  getArchitectural,
  ArchitecturalPost,
  postArchitectural,
  putArchitectural,
  ArchitecturalPut,
  ArchitecturalGet,
} from "../../../../../Services/ArchitecturalService";
import {
  ProjectOnly,
  getProjectOnly,
} from "../../../../../Services/TechnicalService";
import { switchUrl } from "../../Project/Create/ViewCreate";
import { checkIfFilled } from "../BuildingByLaws/BuildingByLaws";
import { NewId } from "../UploadFiles/UploadFilesDiv";

const ArchitecturalDiv = () => {
  const params: { pid?: string; tempId?: string } = useParams();

  const [staircase, setStaircase] = useState<Staircase>();
  const [exit, setExit] = useState<Exit>();
  const [light, setLight] = useState<LightVent>();
  const [lifts, setLifts] = useState<Lift>();
  const [other, setOther] = useState<ArchitecturalOther>();
  const [edit, setEdit] = useState(false);
  const [project, setProject] = useState<ProjectOnly>();
  const [loading, setLoading] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getArchitectural(
      params.tempId ? params.tempId : params.pid ?? "0",
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/architecture/perma?id="
        : "/architecture/project?id="
    ).then((res) => {
      setLoading(false);
      if (res.data) {
        const staircase = JSON.parse(res.data.stairCase);
        const exit = JSON.parse(res.data.exit);
        const light = JSON.parse(res.data.lightVentilation);
        const lift = JSON.parse(res.data.lift);
        const other = JSON.parse(res.data.other);
        setStaircase(staircase);
        setExit(exit);
        setLight(light);
        setLifts(lift);
        setOther(other);
      }
    });
    getProjectOnly(
      params.tempId ? params.tempId : params.pid ?? "0",
      switchUrl("/project/only?id=", "/project/perma/only?id=")
    ).then((res) => {
      // setLoading(false);
      setProject(res.data);
    });
    return () => {
      setLoading(true);
      setStaircase(undefined);
      setExit(undefined);
      setLight(undefined);
      setLifts(undefined);
      setOther(undefined);
    };
  }, [params]);

  function onCreate(
    link: string,
    val: ArchitecturalPost,
    setS: any,
    name: keyof ArchitecturalPost
  ) {
    const body = {
      projectId: NewId(params.tempId || "", params.pid ?? "0"),
      [name]: JSON.stringify(val),
    };
    postArchitectural(body, link, messageApi).then((res) => {
      const bdata = JSON.parse(res.data[name]);
      setS(bdata);
      setEdit(false);
    });
  }

  function onEdit(
    link: string,
    val: string,
    setS: any,
    name: keyof ArchitecturalGet
  ) {
    const body: ArchitecturalPut = {
      id: NewId(params.tempId || "", params.pid ?? "0"),
      projectId: NewId(params.tempId || "", params.pid ?? "0"),
      [name]: JSON.stringify(val) ?? "",
    };
    putArchitectural(body, link, messageApi).then((res) => {
      const bdata = JSON.parse(res.data[name]);
      setS(bdata);
      setEdit(false);
    });
  }

  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: (
        <div>Staircase {checkIfFilled(staircase && !edit ? true : false)}</div>
      ),
      children: (
        <div>
          {staircase ? (
            <StaircaseEdit
              onSubmit={(val) =>
                localStorage.getItem("isNotice") === "true" &&
                localStorage.getItem("isPerma") === "true"
                  ? onEdit(
                      "/architecture/perma/staircase",
                      val,
                      setStaircase,
                      "stairCase"
                    )
                  : onCreate("/architecture", val, setStaircase, "stairCase")
              }
              data={staircase}
              edit={edit}
            />
          ) : (
            <StaircaseCreate
              project={project}
              onSubmit={(val) =>
                localStorage.getItem("isNotice") === "true" &&
                localStorage.getItem("isPerma") === "true"
                  ? onEdit(
                      "/architecture/perma/staircase",
                      val,
                      setStaircase,
                      "stairCase"
                    )
                  : onCreate("/architecture", val, setStaircase, "stairCase")
              }
            />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: <div>Exit {checkIfFilled(exit && !edit ? true : false)}</div>,
      children: (
        <div>
          {exit ? (
            <ExitEdit
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/architecture/perma/exit"
                    : "/architecture/exit",
                  val,
                  setExit,
                  "exit"
                )
              }
              data={exit}
              edit={edit}
            />
          ) : (
            <ExitCreate
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/architecture/perma/exit"
                    : "/architecture/exit",
                  val,
                  setExit,
                  "exit"
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
          Light and Ventilation {checkIfFilled(light && !edit ? true : false)}
        </div>
      ),
      children: (
        <div>
          {light ? (
            <LightAndVentEdit
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/architecture/perma/light"
                    : "/architecture/lightandventilation",
                  val,
                  setLight,
                  "lightVentilation"
                )
              }
              data={light}
              edit={edit}
            />
          ) : (
            <LightAndVentCreate
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/architecture/perma/light"
                    : "/architecture/lightandventilation",
                  val,
                  setLight,
                  "lightVentilation"
                )
              }
            />
          )}
        </div>
      ),
    },
    {
      key: "4",
      label: <div>Lifts {checkIfFilled(lifts && !edit ? true : false)}</div>,
      children: (
        <div>
          {lifts ? (
            <LiftsEdit
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/architecture/perma/lift"
                    : "/architecture/lifts",
                  val,
                  setLight,
                  "lift"
                )
              }
              data={lifts}
              edit={edit}
            />
          ) : (
            <LiftsCreate
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/architecture/perma/lift"
                    : "/architecture/lifts",
                  val,
                  setLifts,
                  "lift"
                )
              }
            />
          )}
        </div>
      ),
    },
    {
      key: "5",
      label: <div>Other {checkIfFilled(other && !edit ? true : false)}</div>,
      children: (
        <div>
          {other ? (
            <OtherEdit
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/architecture/perma/other"
                    : "/architecture/other",
                  val,
                  setLight,
                  "other"
                )
              }
              data={other}
              edit={edit}
            />
          ) : (
            <OtherCreate
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/architecture/perma/other"
                    : "/architecture/other",
                  val,
                  setOther,
                  "other"
                )
              }
            />
          )}
        </div>
      ),
    },
  ];
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

          <PDFarchitectural
            data={{
              staircase: staircase as Staircase,
              exit: exit as Exit,
              lightAndVent: light as LightVent,
              lifts: lifts as Lift,
              other: other as ArchitecturalOther,
            }}
          />
        </div>
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
    </Spin>
  );
};

export default ArchitecturalDiv;
