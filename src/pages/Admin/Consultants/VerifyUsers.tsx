import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserToVerify } from "../../../Services/UserService";
import { ActionType, MyStore } from "../../../Store/ContextApi";

interface Props {
  users: UserToVerify[];
}

const VerifyUsers = ({ users }: Props) => {
  const { dispatch } = useContext(MyStore);
  return (
    <div className="MyTableOuter">
      <table className="MyTable">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th style={{ width: "150px" }}>View/Verify Consultant</th>
          </tr>
        </thead>
        <tbody>
          {users.map((x) => (
            <tr key={x.id}>
              <td style={{ width: "20px" }}>{x.id}</td>
              <td>{x.organization ? x.organization?.name : x.nameEng}</td>
              <td>{x.email}</td>
              <td>{x.primaryPhone}</td>
              <td style={{ width: "20px" }}>
                <Link to="/admin/view/user">
                  <button
                    className="NoStyleBtnSm"
                    onClick={() =>
                      dispatch({ type: ActionType.viewUser, payload: x })
                    }
                  >
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerifyUsers;
