import { useQuery } from "@tanstack/react-query";
import { GETonDeskAll } from "../../../../../Services/AdminViewProjService/AdminViewProjService";
import { ResOnDesk } from "../../../../../Services/ProjectService";
import {
  dispatchPage,
  useStorePage,
} from "../../../../../Store/StorePagination/StorePagination";
import { useStoreUrl } from "../../../../../Store/StoreUrls/StoreUrls";
import useStoreViewProj, {
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { MyQueries } from "../../../../../constants/MyQueries/MyQueries";
import { size } from "../../../../../constants/constants";
import { Pagination, Tooltip, message } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { calculateDays } from "../helper/helperAdminViewP";
import { AcP } from "../../../../../Store/StorePagination/types";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import MySkeleton from "../../../../../Common/MySkeleton/MySkeleton";
import { dispatchModalCon } from "../../../../../Store/StoreModalCon/StoreModalCon";
import { AcMCon } from "../../../../../Store/StoreModalCon/types";

type Props = {
  onViewProject: (id: number) => void;
};

const ReturnedTableFinal = ({ onViewProject }: Props) => {
  const { ReturnedPage } = useStorePage();
  const { disabled } = useStoreViewProj();
  const { ReturnedUrl } = useStoreUrl();
  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: returnedProjects } = useQuery<
    ResOnDesk,
    { message: string }
  >({
    queryKey: [MyQueries.Returned, ReturnedUrl, ReturnedPage],
    queryFn: () =>
      GETonDeskAll(
        ReturnedUrl + `${ReturnedPage}&size=${size}`,
        messageApi
      ).then((res) => res),

    retry: 2,
  });
  return (
    <div className="MyTableOuter">
      {contextHolder}
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: 110 }}>Id - Darta No.</th>
            <th>Applicant Name</th>
            <th>Project Type</th>
            <th>Submitted Date</th>
            <th>Project</th>
            <th>Current Desk</th>
            <th style={{ width: "20px" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {returnedProjects?.data?.map((project) => (
            <tr key={project.id}>
              <td style={{ width: "20px" }}>
                {project.id}-
                <span style={{ color: "#22d1ee" }}>
                  {project.registrationNo}
                </span>
              </td>
              {/* <td>{x.rasidNo}</td> */}
              <td>{project.applicantName}</td>
              <td className="ProjectInfo">{project.type}</td>

              <td style={{ fontSize: 13 }}>
                {project.creationDate?.substr(0, 10)} (
                {project.creationDate
                  ? calculateDays(project.creationDate) + " days"
                  : null}
                )
              </td>
              {/* {localStorage.getItem("role") === "ROLE_Revenue" ||
              "ROLE_Registration" ? null : (
                <td>
                  <MyPopconfirm
                    disabled={submit}
                    onConfirm={() => approveByOne(x.id, index)}
                    button="Approve"
                  />
                </td>
              )} */}
              <td>
                <div style={{ display: "flex" }}>
                  <Tooltip title="View Project">
                    <button
                      disabled={disabled}
                      className="NoStyleBtnSm"
                      onClick={() => onViewProject(project.id)}
                    >
                      View
                    </button>
                  </Tooltip>
                  <Tooltip title="Project Transfer Log">
                    <button
                      disabled={disabled}
                      className="NoStyleBtnSm"
                      onClick={() =>
                        dispatch({
                          type: Ac.setprojTransferModal,
                          payload: {
                            projTransferModal: true,
                            currentPid: project.id,
                          },
                        })
                      }
                    >
                      <SwapOutlined />
                    </button>
                  </Tooltip>
                </div>
              </td>

              {/* <td>
                <div style={{ display: "flex" }}>
                  <Cascader
                    placeholder="Select..."
                    style={{ width: 100 }}
                    options={userTypes}
                    value={value}
                    onChange={onSendToChange}
                  />
                  <MyPopconfirm
                    disabled={submit}
                    onConfirm={() => onSendProject(x.id)}
                    button="Send"
                  />
                </div>
              </td> */}
              <td>{project.projectStatus2}</td>
              <td>
                <button
                  className="NoStyleBtnSm"
                  disabled={disabled}
                  onClick={() => {
                    dispatchModalCon({
                      type: AcMCon.setViewComments,
                      payload: true,
                    });
                    dispatch({
                      type: Ac.setCurrentPid,
                      payload: project.id,
                    });
                  }}
                >
                  Comment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={ReturnedPage + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setReturnedPage, payload: page - 1 })
        }
        total={returnedProjects?.total ?? 100}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default ReturnedTableFinal;
