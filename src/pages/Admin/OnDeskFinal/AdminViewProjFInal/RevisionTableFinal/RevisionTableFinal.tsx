import { useQuery } from "@tanstack/react-query";
import {
  dispatchPage,
  useStorePage,
} from "../../../../../Store/StorePagination/StorePagination";
import useStoreViewProj, {
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { MyQueries } from "../../../../../constants/MyQueries/MyQueries";
import { size } from "../../../../../constants/constants";
import {
  GETrevisionProjAdmin,
  GETrevisionProjBOdy,
} from "../../OnDeskService/RevisionServiceAdmin/RevisionServiceAdmin";
import { Pagination, Tooltip, message } from "antd";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { dispatchModal } from "../../../../../Store/StoreModal/StoreModal";
import { AcModal } from "../../../../../Store/StoreModal/types";
import MySkeleton from "../../../../../Common/MySkeleton/MySkeleton";
import { AcP } from "../../../../../Store/StorePagination/types";

type Props = {
  onViewProject: (id: number) => void;
};
const RevisionTableFinal = ({ onViewProject }: Props) => {
  const { RevisionPage } = useStorePage();
  const { disabled } = useStoreViewProj();

  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading, data: revisions } = useQuery<
    GETrevisionProjBOdy,
    { message: string }
  >({
    queryKey: [MyQueries.Revision, RevisionPage],
    queryFn: () =>
      GETrevisionProjAdmin(RevisionPage, size, messageApi).then((res) => res),

    retry: 2,
  });

  return (
    <div>
      <div className="MyTableOuter">
        {contextHolder}
        <table className="MyTable">
          <thead>
            <tr>
              <th style={{ fontSize: 13 }}>ID - Darta No.</th>
              <th>Applicant Name</th>
              <th>Project Type</th>
              <th>Revision</th>
              <th>Action</th>
              <th>Revenue</th>
              <th>Project</th>

              <th style={{ width: "20px" }}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {revisions?.data.map((revision) => (
              <tr key={revision.id}>
                <td style={{ width: 100 }}>
                  {revision.projectPermaDto.id}-
                  <span style={{ color: "#22d1ee" }}>
                    {revision.projectPermaDto.registrationNo}
                  </span>
                </td>
                <td>{revision.applicantName}</td>
                <td className="ProjectInfo">{revision.projectPermaDto.type}</td>
                <td>
                  <button
                    className="NoStyleBtnSm"
                    onClick={() => {
                      dispatch({
                        type: Ac.setRevisionId,
                        payload: revision.id,
                      });
                      dispatchModal({
                        type: AcModal.setrevisionViewDetails,
                        payload: true,
                      });
                    }}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    className="GreenBorderBtn"
                    onClick={() => {
                      dispatchModal({
                        type: AcModal.setrevisionStatusModal,
                        payload: true,
                      });
                      dispatch({
                        type: Ac.setRevisionId,
                        payload: revision.id,
                      });
                      // GETrevisionStatus(project.id, setSubmit).then((res) => {
                      //   setCurrentRId(project.id);
                      //   setRevisionStatusData(res.data);
                      //   setRevisionStatusMisOpen(true);
                      // });
                    }}
                  >
                    Status
                  </button>
                </td>
                <td>
                  <button
                    className="NoStyleBtnSm"
                    onClick={() => {
                      // dispatch({type: Ac.setcurrentPid, payload: project.id})
                      dispatch({
                        type: Ac.setRevenueModal,
                        payload: {
                          revenueModal: true,
                          currentPid: revision.projectPermaDto.id,
                        },
                      });
                    }}
                  >
                    view
                  </button>
                </td>
                <td>
                  <div style={{ display: "flex" }}>
                    <Tooltip title="View Project">
                      <button
                        disabled={disabled}
                        className="NoStyleBtnSm"
                        onClick={() => {
                          onViewProject(revision.projectPermaDto.id);
                        }}
                      >
                        View
                      </button>
                    </Tooltip>
                  </div>
                </td>

                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading ? <MySkeleton /> : null}
        <Pagination
          current={RevisionPage + 1}
          disabled={disabled}
          onChange={(page) =>
            dispatchPage({ type: AcP.setRevisionPage, payload: page - 1 })
          }
          total={revisions?.total ?? 100}
          showSizeChanger={false}
          style={{ background: "white", padding: 10 }}
        />
      </div>
    </div>
  );
};

export default RevisionTableFinal;
