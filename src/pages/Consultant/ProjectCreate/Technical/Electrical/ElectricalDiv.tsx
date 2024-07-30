import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsProps, message } from "antd";
import RatingAndSizesCreate from "./RatingAndSizesCreate";
import CABLESINACONDUITcreate from "./CABLESINACONDUITcreate";
import EARTHINGcreate from "./EARTHINGcreate";
import TESTINGcreate from "./TESTINGcreate";
import RatingAndSizesEdit from "./RatingAndSizesEdit";
import CABLESINACONDUITedit from "./CABLESINACONDUITedit";
import EARTHINGedit from "./EARTHINGedit";
import TESTINGedit from "./TESTINGedit";
import {
  Earthing,
  ElectricalType,
  getElectrical,
  maxCables as maxCablesType,
  postElectrical,
  putElectrical,
  RatingNSizes,
  Testing,
} from "../../../../../Services/ElectricalService";
import TableButton from "../../../../../Common/TableButton/TableButton";
import PDFelectrical from "../../../../../Common/ProjectPDFs/PDFelectrical";
import { checkIfFilled } from "../BuildingByLaws/BuildingByLaws";
import { NewId } from "../UploadFiles/UploadFilesDiv";
import { useStoreGlobal } from "../../../../../Store/StoreGlobal/StoreGlobal";

const ElectricalDiv = () => {
  const params: { pid?: string; tempId?: string } = useParams();

  const [rating, setRating] = useState<RatingNSizes>();
  const [maxCables, setMaxCables] = useState<maxCablesType>();
  const [earthing, setEarthing] = useState<Earthing>();
  const [testing, setTesting] = useState<Testing>();
  const [edit, setEdit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { disabled } = useStoreGlobal();

  useEffect(() => {
    getElectrical(
      params.tempId ? params.tempId : params.pid ?? "0",
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/electrical/perma?id="
        : "/electrical/project?id="
    ).then((res) => {
      if (res.data) {
        const ratingSize = JSON.parse(res.data.ratingSize);
        const conductors = JSON.parse(res.data.conductorsInCable);
        const earth = JSON.parse(res.data.earthing);
        const test = JSON.parse(res.data.testing);
        setRating(ratingSize);
        setMaxCables(conductors);
        setEarthing(earth);
        setTesting(test);
      }
    });
    return () => {
      setRating(undefined);
      setMaxCables(undefined);
      setEarthing(undefined);
      setTesting(undefined);
    };
  }, [params]);

  function onCreate(
    link: string,
    val: string,
    setS: any,
    name: keyof ElectricalType
  ) {
    const body = {
      projectId: NewId(params.tempId || "", params.pid ?? "0"),
      [name]: JSON.stringify(val),
    };
    postElectrical(body, messageApi, link).then((res) => {
      const bdata = JSON.parse(res.data[name]);
      setS(bdata);
      setEdit(false);
    });
  }
  function onEdit(
    link: string,
    val: string,
    setS: any,
    name: keyof ElectricalType
  ) {
    const body = {
      projectId: NewId(params.tempId || "", params.pid ?? "0"),
      id: NewId(params.tempId || "", params.pid ?? "0"),
      [name]: JSON.stringify(val),
    };
    putElectrical(body, link).then((res) => {
      const bdata = JSON.parse(res.data[name]);
      setS(bdata);
      setEdit(false);
    });
  }

  const items = (): TabsProps["items"] => [
    {
      key: "1",
      label: (
        <div>
          RATING & SIZES {checkIfFilled(rating && !edit ? true : false)}
        </div>
      ),
      children: (
        <div>
          {rating ? (
            <RatingAndSizesEdit
              onSubmit={(val) =>
                localStorage.getItem("isNotice") === "true" &&
                localStorage.getItem("isPerma") === "true"
                  ? onEdit(
                      "/electrical/perma/rating",
                      val,
                      setRating,
                      "ratingSize"
                    )
                  : onCreate("/electrical", val, setRating, "ratingSize")
              }
              data={rating}
              edit={edit}
              submitting={disabled}
            />
          ) : (
            <RatingAndSizesCreate
              onSubmit={(val) =>
                localStorage.getItem("isNotice") === "true" &&
                localStorage.getItem("isPerma") === "true"
                  ? onEdit(
                      "/electrical/perma/rating",
                      val,
                      setRating,
                      "ratingSize"
                    )
                  : onCreate("/electrical", val, setRating, "ratingSize")
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
          MAX. NOS. OF CABLES IN A CONDUIT{" "}
          {checkIfFilled(maxCables && !edit ? true : false)}
        </div>
      ),
      children: (
        <div>
          {maxCables ? (
            <CABLESINACONDUITedit
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/electrical/perma/cables"
                    : "/electrical/cables",
                  val,
                  setMaxCables,
                  "conductorsInCable"
                )
              }
              data={maxCables}
              edit={edit}
              submitting={disabled}
            />
          ) : (
            <CABLESINACONDUITcreate
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/electrical/perma/cables"
                    : "/electrical/cables",
                  val,
                  setMaxCables,
                  "conductorsInCable"
                )
              }
              submitting={disabled}
            />
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>EARTHING {checkIfFilled(earthing && !edit ? true : false)}</div>
      ),
      children: (
        <div>
          {earthing ? (
            <EARTHINGedit
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/electrical/perma/earthing"
                    : "/electrical/earthing",
                  val,
                  setEarthing,
                  "earthing"
                )
              }
              data={earthing}
              edit={edit}
              submitting={disabled}
            />
          ) : (
            <EARTHINGcreate
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/electrical/perma/earthing"
                    : "/electrical/earthing",
                  val,
                  setEarthing,
                  "earthing"
                )
              }
              submitting={disabled}
            />
          )}
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div>Testing {checkIfFilled(testing && !edit ? true : false)}</div>
      ),
      children: (
        <div>
          {testing ? (
            <TESTINGedit
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/electrical/perma/testing"
                    : "/electrical/testing",
                  val,
                  setTesting,
                  "testing"
                )
              }
              data={testing}
              edit={edit}
              submitting={disabled}
            />
          ) : (
            <TESTINGcreate
              onSubmit={(val) =>
                onEdit(
                  localStorage.getItem("isNotice") === "true" &&
                    localStorage.getItem("isPerma") === "true"
                    ? "/electrical/perma/testing"
                    : "/electrical/testing",
                  val,
                  setTesting,
                  "testing"
                )
              }
              submitting={disabled}
            />
          )}
        </div>
      ),
    },
  ];
  return (
    // <Spin spinning={loading}>
    <div className="CenterForm5">
      {contextHolder}
      <div style={{ display: "flex" }}>
        <TableButton
          bgColor={edit ? "red" : "green"}
          onClick={() => setEdit(!edit)}
        >
          {edit ? "Cancel Edit" : "Edit"}
        </TableButton>
        <PDFelectrical
          projectId={params.pid ?? "0"}
          rating={rating}
          maxCables={maxCables}
          earthing={earthing}
          testing={testing}
        />
      </div>
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
    // </Spin>
  );
};

export default ElectricalDiv;
