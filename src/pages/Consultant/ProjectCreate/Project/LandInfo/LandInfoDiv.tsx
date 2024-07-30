import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NextDiv from "../../../../../Common/NextDiv/NextDiv";
import PDFland from "../../../../../Common/ProjectPDFs/PDFLand";
import TableButton from "../../../../../Common/TableButton/TableButton";
import {
  MyLands,
  getLands,
} from "../../../../../Services/CreateProjectService";
import { switchUrl } from "../Create/ViewCreate";
import LandCard from "./LandCard";

const LandInfoDiv = () => {
  const [lands, setLands] = useState<MyLands[]>([]);
  const [loading, setLoading] = useState(true);
  const params: { pid: string; tempId?: string } = useParams();

  useEffect(() => {
    getLands(
      switchUrl("/land/only?id=", "/land/perma/only?id="),
      params.pid
    ).then((res) => {
      setLoading(false);
      setLands(res.data);
    });
    return () => {
      setLoading(true);
      setLands([]);
    };
  }, [params.pid]);

  return (
    <div>
      <Spin spinning={loading}>
        <div className="CenterForm10" style={{ padding: "1%" }}>
          <div className="bluehead bgwhite" style={{ padding: "5px 2%" }}>
            <h1>Land Information</h1>
            <PDFland data={lands} projectId={params.pid} />
            <Link to={`/project/create/addlandinfo/${params.pid}`}>
              <TableButton bgColor="green" width="150px">
                Add Land
              </TableButton>
            </Link>
          </div>
          {lands.map((land) => (
            <LandCard data={land} key={land.id} pid={params.pid} />
          ))}
        </div>
        <NextDiv myurl={`/project/create/charkilla/${params.pid}`} />
      </Spin>
    </div>
  );
};

export default LandInfoDiv;
