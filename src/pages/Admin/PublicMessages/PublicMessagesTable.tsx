import React from "react";
import { Help } from "../../../Services/AdminService";
import { DeleteTwoTone, EyeTwoTone } from "@ant-design/icons";

interface Props {
  data: Help[] | undefined;
  onDel: (id: number) => void;
  onStatus: (id: number, status: "SEEN" | "NOTSEEN", i: number) => void;
  onView: (data: Help) => void;
  loading: boolean;
}

const MessagesTable = ({ data, onDel, onStatus, onView, loading }: Props) => {
  return (
    <div>
      <div className="MyTableOuter">
        <table className="MyTable" style={{ minWidth: 760 }}>
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th style={{ width: "160px" }}>Seen Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((x, i) => (
                <tr key={x.id}>
                  <td>{i + 1}</td>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td>{x.phone}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {x.message
                      ? x.message.length > 50
                        ? x.message.substr(0, 50) + "..."
                        : x.message
                      : ""}{" "}
                    <button className="NoStyleBtnSm" onClick={() => onView(x)}>
                      <EyeTwoTone />
                    </button>
                  </td>
                  <td style={{ width: "160px" }}>
                    {x.status}{" "}
                    <button
                      disabled={loading}
                      style={{ marginLeft: 10 }}
                      className="NoStyleBtnSm"
                      onClick={() =>
                        onStatus(
                          x.id,
                          x.status === "SEEN" ? "NOTSEEN" : "SEEN",
                          i
                        )
                      }
                    >
                      Change
                    </button>
                  </td>
                  <td>
                    <button
                      className="NoStyleBtnSm"
                      onClick={() => onDel(x.id)}
                    >
                      <DeleteTwoTone />
                    </button>
                    <button className="NoStyleBtnSm" onClick={() => onView(x)}>
                      <EyeTwoTone />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Loading....</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesTable;
