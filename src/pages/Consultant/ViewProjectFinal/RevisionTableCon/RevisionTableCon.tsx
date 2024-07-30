import { Pagination, Tooltip, message } from "antd";
import {
  GETrevisionProjBOdy,
  GETrevisionsCon,
} from "../../../../Services/RevisionService";
import { MyQueriesCon } from "../../../../constants/MyQueries/MyQueries";
import { useQuery } from "@tanstack/react-query";
import {
  dispatchPage,
  useStorePage,
} from "../../../../Store/StorePagination/StorePagination";
import useStoreViewProj, {
  dispatch,
} from "../../../../Store/StoreViewProject/StoreViewProj";
import { dispatchModalCon } from "../../../../Store/StoreModalCon/StoreModalCon";
import { AcMCon } from "../../../../Store/StoreModalCon/types";
import { Ac } from "../../../../Store/StoreViewProject/types";
import { AcP } from "../../../../Store/StorePagination/types";
import MySkeleton from "../../../../Common/MySkeleton/MySkeleton";

type Props = {
    onViewProject: (id: number) => void;
};

const RevisionTableCon = ({ onViewProject }: Props) => {
  const { RevisionPageCon } = useStorePage();
  const { disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: revisions } = useQuery<
    GETrevisionProjBOdy,
    { message: string }
  >({
    queryKey: [MyQueriesCon.RevisionCon, RevisionPageCon],
    queryFn: () =>
      GETrevisionsCon(RevisionPageCon, messageApi).then((res) => res),

    retry: 2,
  });

  const ViewRevisionDetails = (revisionId: number) => {
    dispatchModalCon({ type: AcMCon.setRevisionDetails, payload: true });
    dispatch({ type: Ac.setCurrentPid, payload: revisionId });
  };

  return (
    <div className="MyTableOuter">
      {contextHolder}
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ fontSize: 13 }}>ID - Darta No.</th>
            <th>Applicant Name</th>
            <th>Project Type</th>
            <th>Project</th>
            <th>Revision</th>
            <th style={{ width: "20px" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {revisions?.data.map((project, index) => (
            <tr key={project.id}>
              <td style={{ width: 100 }}>
                {project.projectPermaDto.id}-
                <span style={{ color: "#22d1ee" }}>
                  {project.projectPermaDto.registrationNo}
                </span>
              </td>
              <td>{project.applicantName}</td>
              <td>{project.projectPermaDto.type}</td>
              <td>
                <Tooltip title="View Project">
                  <button
                    disabled={disabled}
                    className="NoStyleBtnSm"
                    onClick={() => {
                      localStorage.setItem(
                        "ProjectType",
                        project.projectPermaDto.type
                      );
                      onViewProject(project.project);
                    }}
                  >
                    View
                  </button>
                </Tooltip>
              </td>
              <td>
                <button
                  className="NoStyleBtnSm"
                  onClick={() => ViewRevisionDetails(project.id)}
                >
                  View
                </button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <MySkeleton /> : null}
      <Pagination
        current={RevisionPageCon + 1}
        disabled={disabled}
        onChange={(page) =>
          dispatchPage({ type: AcP.setRevisionPageCon, payload: page - 1 })
        }
        total={revisions?.total}
        showSizeChanger={false}
        style={{ background: "white", padding: 10 }}
      />
    </div>
  );
};

export default RevisionTableCon;
