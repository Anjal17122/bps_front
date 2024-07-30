import { Button, Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/es/form/Form";
import { CommonBody, FilesOnlyBody, GETdocBody, GETdocById, GETdocTypes } from "../../../Services/OldPermitService";

const FilesOnly = () => {
  const params = useParams();
  const [fileOnly, setFilesOnly] = useState<FilesOnlyBody[]>([]);
  const [data, setData] = useState<GETdocBody>();
  const [docTypes, setDocTypes] = useState<CommonBody[]>([]);

  const [submitting, setSubmitting] = useState(false);

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    GETdocById(params.id ?? "0").then((res) => setData(res.data));

    GETdocTypes().then((res) => setDocTypes(res.data));

    return () => {
      setData(undefined);
      setDocTypes([]);
    };
  }, []);

  useEffect(() => {
    GETfilesonly(params.id ?? "0").then((res) => {
      setFilesOnly(res?.data?.data ?? []);
    });

    return () => {
      setFilesOnly([]);
    };
  }, [reRender]);

  const handleFileSubmit = (vals: UploadFormVals, form: FormInstance<any>) => {
    if (vals.fileName?.[0]?.status !== "done")
      return message.error("Please wait until file uploads");

    setSubmitting(true);
    POSTfileonly({
      docId: params.id ?? "0",
      name: vals.fileName[0].response.message,
      documentType: { id: vals.docType[0] },
    })
      .then(() => {
        form.resetFields();
        setSubmitting(false);
        setReRender((prev) => !prev);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const history = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 20, top: -4 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => history(-1)}
          type="link"
        />
      </div>
      <div style={{ margin: "50px" }}>
        {data ? (
          <ViewDataEntryDiv currentData={data as GETDocBody} />
        ) : (
          <div>Loading... </div>
        )}
      </div>
      <Row
        gutter={10}
        style={{ backgroundColor: "white", marginBottom: 20, padding: 10 }}
      >
        <Col span={24}>
          <h1 style={{ paddingBottom: 5, fontSize: 18 }}>Uploader</h1>
        </Col>
        <Col span={24}>
          <UploadForm
            docTypes={docTypes}
            submitting={submitting}
            handleFileSubmit={handleFileSubmit}
          />
        </Col>
      </Row>
      <FilesOnlyTable
        fileOnly={fileOnly}
        onDeleteSuccess={() => setReRender((prev) => !prev)}
      />
    </div>
  );
};

export const toList = (
  data: CommonBody[]
): { label: string; value: string }[] =>
  data.map((x) => ({ label: x.name, value: x.id.toString() }));

export default FilesOnly;
