import React from "react";
import EditLogs from "./EditLogs";

interface Props {
  data: any[];
  onView: (data: any) => void;
  style?: object;
}

const LogsDiv = ({ data, onView, style }: Props) => {
  return (
    <>
      {data ? (
        // <div style={{ padding: 20, width: 600 }}>
        <div className="BlueWrapper" style={style}>
          <EditLogs onView={onView} data={data} myclass="LogTable BigShadow" />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default LogsDiv;
