import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditSanitation from "./EditSanitation";
import CreateSanitation from "./CreateSanitation";
import {
  getSanitation,
  postSanitation,
  putSanitation,
  SanitationType,
} from "../../../../../Services/SanitationService";
import TableButton from "../../../../../Common/TableButton/TableButton";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import PDFsanitation from "../../../../../Common/ProjectPDFs/PDFsanitation";
import { NewId } from "../UploadFiles/UploadFilesDiv";

const SanitationDiv = () => {
  const params: { pid?: string; tempId?: string } = useParams();

  const [sanitation, setSanitation] = useState<SanitationType>();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    getSanitation(
      params.tempId ? params.tempId : params.pid ?? "0",
      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/sanitation/perma?id="
        : "/sanitation/project?id="
    ).then((res) => {
      setLoading(false);
      if (res.data) {
        const bdata = JSON.parse(res.data.underWaterTank);
        setSanitation(bdata);
      }
    });
    return () => {
      setLoading(true);
      setSanitation(undefined);
    };
  }, [params]);

  function onEdit(val: SanitationType) {
    putSanitation(
      {
        id: NewId(params.tempId || "", params.pid ?? "0"),
        projectId: NewId(params.tempId || "", params.pid ?? "0"),
        underWaterTank: JSON.stringify(val),
      },

      localStorage.getItem("isNotice") === "true" &&
        localStorage.getItem("isPerma") === "true"
        ? "/sanitation/perma"
        : "/sanitation"
    ).then((res) => {
      const bdata = JSON.parse(res.data.underWaterTank);
      setSanitation(bdata);
      setEdit(false);
    });
  }

  function onCreate(val: SanitationType) {
    postSanitation(
      {
        projectId: NewId(params.tempId || "", params.pid ?? "0"),
        underWaterTank: JSON.stringify(val),
      },
      messageApi
    ).then((res) => {
      const bdata = JSON.parse(res.data.underWaterTank);
      setSanitation(bdata);
      setEdit(false);
    });
  }

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
          <PDFsanitation data={sanitation} projectId={params.pid ?? "0"} />
        </div>
        {/* <CreatePDF pid={params.pid ?? "0"} /> */}

        <div className="TabWrapper">
          <div className="MyTableOuter">
            <table className="MyTable">
              <thead>
                <tr>
                  <th colSpan={3}>
                    <div className="thSteps">
                      <b>Floor Area </b>
                      {sanitation && !edit ? (
                        <CheckCircleFilled
                          style={{ color: "#52c41a", fontSize: 18 }}
                        />
                      ) : (
                        <CloseCircleOutlined style={{ fontSize: 18 }} />
                      )}
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
          {sanitation ? (
            <EditSanitation onSubmit={onEdit} data={sanitation} edit={edit} />
          ) : (
            <CreateSanitation onSubmit={onCreate} />
          )}
        </div>
      </div>
    </Spin>
  );
};

export default SanitationDiv;
