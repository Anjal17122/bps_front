import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { OnDeskProjects } from "../../../../../Services/ProjectService";

export const ApproveStatus = ({ x }: { x: OnDeskProjects }) => {
  return (
    <div className="ApproveStatus">
      {x.projectStatus1 === "APPROVED" ? (
        <div>
          All Approved <CheckCircleFilled style={{ color: "#52c41a" }} />
        </div>
      ) : (
        <div className="AppDepart">
          <Tooltip title="Registration">
            <div className="insideDiv">
              <span>Reg </span>
              {x.registration ? (
                <CheckCircleFilled style={{ color: "#52c41a" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "#fc5c9c" }} />
              )}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </Tooltip>
          {/* <Tooltip title="Technical">
              <div className="insideDiv">
                <span>technical </span>
                {x.technical ? (
                  <CheckCircleFilled style={{ color: "#52c41a" }} />
                ) : (
                  <CloseCircleOutlined style={{ color: "#fc5c9c" }} />
                )}{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </Tooltip> */}
          <Tooltip title="Technical">
            <div className="insideDiv">
              <span>Eng </span>
              {x.engineer ? (
                <CheckCircleFilled style={{ color: "#52c41a" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "#fc5c9c" }} />
              )}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </Tooltip>
          <Tooltip title="Technical">
            <div className="insideDiv">
              <span>Tech </span>
              {x.technicalDepartment ? (
                <CheckCircleFilled style={{ color: "#52c41a" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "#fc5c9c" }} />
              )}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </Tooltip>

          <Tooltip title="Ward">
            <div className="insideDiv">
              <span>Ward </span>
              {x.ward ? (
                <CheckCircleFilled style={{ color: "#52c41a" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "#fc5c9c" }} />
              )}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </Tooltip>
          <Tooltip title="Revenue">
            <div className="insideDiv">
              <span>Rev </span>
              {x.revenue ? (
                <CheckCircleFilled style={{ color: "#52c41a" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "#fc5c9c" }} />
              )}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </Tooltip>
          <Tooltip title="Ward Technical">
            <div className="insideDiv">
              <span>W. T. </span>
              {x.wardTechnical ? (
                <CheckCircleFilled style={{ color: "#52c41a" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "#fc5c9c" }} />
              )}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </Tooltip>
          <Tooltip title="Sub Engineer">
            <div className="insideDiv">
              <span>Sub E.</span>
              {x.subEngineer ? (
                <CheckCircleFilled style={{ color: "#52c41a" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "#fc5c9c" }} />
              )}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </Tooltip>
          <Tooltip title="Revenue">
            <div className="insideDiv">
              <span>Napi </span>
              {x.napi ? (
                <CheckCircleFilled style={{ color: "#52c41a" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "#fc5c9c" }} />
              )}
            </div>
          </Tooltip>
          <Tooltip title="Executive">
            <div className="insideDiv">
              <span>Exec </span>
              {x.executive ? (
                <CheckCircleFilled style={{ color: "#52c41a" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "#fc5c9c" }} />
              )}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
};
