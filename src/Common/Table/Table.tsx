import React from "react";
import Tbtn from "../TableButton/TableButton";

const MyTable = () => {
  return (
    <div>
      <div className="MyTableOuter">
        <table className="MyTable">
          <thead>
            <tr>
              <th style={{ width: "20px" }}>S.N.</th>
              <th>Organization</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: "20px" }}>Status</th>
              <th style={{ width: "20px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "20px" }}>1</td>
              <td>Test Content</td>
              <td>Test Content</td>
              <td>Test Content</td>
              <td>
                <Tbtn bgColor="blue">Enable</Tbtn>
              </td>
              <td style={{ width: "20px" }}>
                <button className="NoColorButton">view detail</button>
              </td>
            </tr>
            <tr>
              <td style={{ width: "20px" }}>2</td>
              <td>Test Content</td>
              <td>Test Content</td>
              <td>Test Content</td>
              <td>
                <Tbtn bgColor="red">Disable</Tbtn>
              </td>
              <td style={{ width: "20px" }}>
                <button className="NoColorButton">view detail</button>
              </td>
            </tr>
            <tr>
              <td style={{ width: "20px" }}>3</td>
              <td>Test Content</td>
              <td>Test Content</td>
              <td>Test Content</td>
              <td>
                <Tbtn bgColor="black">Blacklisted</Tbtn>
              </td>
              <td style={{ width: "20px" }}>
                <button className="NoColorButton">view detail</button>
              </td>
            </tr>
            <tr>
              <td style={{ width: "20px" }}>4</td>
              <td>Test Content</td>
              <td>Test Content</td>
              <td>Test Content</td>
              <td>
                <Tbtn bgColor="yellow">Not Verified</Tbtn>
              </td>
              <td style={{ width: "20px" }}>
                <button className="NoColorButton">view detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTable;
