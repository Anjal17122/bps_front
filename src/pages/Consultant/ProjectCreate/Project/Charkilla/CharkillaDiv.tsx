import { Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PDFcharkilla from "../../../../../Common/ProjectPDFs/PDFcharkilla";
import TableButton from "../../../../../Common/TableButton/TableButton";
import {
  LandAndCharkilla,
  getLandsWithCharKilla,
  delCharkilla,
} from "../../../../../Services/CreateProjectService";
import { switchUrl } from "../Create/ViewCreate";
import CharkillaTable from "./CharkillaTable";

const CharkillaDiv = () => {
  const params = useParams<{ pid: string; tempId?: string }>();

  const [landIds, setLandIds] = useState<LandAndCharkilla[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getLandsWithCharKilla(
      params.pid ?? "0",
      switchUrl("/land/project?id=", "/land/perma/owner?id=")
    ).then((res) => {
      setLoading(false);
      setLandIds(res.data);
    });
    return () => {
      setLoading(true);
      setLandIds([]);
    };
  }, [params.pid]);

  const delItem = (id: number) => {
    // alert(id);
    delCharkilla(
      id,
      messageApi,
      localStorage.getItem("isPerma") === "true"
        ? "/charkilla/perma"
        : "/charkilla"
    ).then(() => {
      const arr = [...landIds];
      arr.map((land) => {
        land.charKillas = land.charKillas.filter((x) => x.id !== id);
        return land;
      });
      setLandIds(arr);
    });
  };
  return (
    <div>
      {contextHolder}
      <PDFcharkilla projectId={params.pid ?? "0"} data={landIds} />
      <Spin spinning={loading}>
        <div className="CenterForm10">
          {landIds.map((x) => (
            <div
              key={x.id}
              className="marginAll20 withShadow"
              style={{ background: "white" }}
            >
              <div className="bluehead" style={{ padding: "5px 2%" }}>
                <h2>Kitta No: {x.landParcelNo}</h2>
                <div>
                  <Link to={`/project/create/addcharkilla/${x.id}`}>
                    <TableButton bgColor="green" width="150px">
                      Add Charkilla
                    </TableButton>
                  </Link>
                </div>
              </div>
              <CharkillaTable
                data={x.charKillas}
                delItem={(id) => delItem(id)}
              />
            </div>
          ))}
          <div className="flexEnd nextDiv">
            <Link to={`/project/create/landowners/${params.pid}`}>
              <TableButton bgColor="blue">Next {">>"} </TableButton>
            </Link>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default CharkillaDiv;
