import { Button, Modal, Spin, Tooltip } from "antd";
import * as React from "react";
import { useReactToPrint } from "react-to-print";
import { DownloadOutlined } from "@ant-design/icons";
import { CertData, getPlinthCert } from "../../Services/PlinthService";
import { useState } from "react";
import "../../Assets/scss/PrintPlinthCert.scss";
import PDFSuperStCert from "./PDFSuperStCert";

const PrintPlinthCert = ({ pid }: { pid: number }) => {
  const [plinthCert, setPlinthCert] = useState<CertData>();
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef<(() => void) | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    setLoading(false);
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    setLoading(true);
    setText("Loading new text...");

    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      getPlinthCert(pid, setLoading).then((res) => {
        setText("New, Updated Text!");
        setPlinthCert(res.data);
        resolve();
        setLoading(true);
      });
    });
  }, [setLoading, setText, pid]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Plinth Certificate",
    onBeforeGetContent: handleOnBeforeGetContent,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [text]);

  return (
    <>
      <Tooltip title="Download SuperStructure Certificate">
        <Button
          loading={loading}
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handlePrint}
        />
      </Tooltip>
      {/* <Spin spinning={loading}> */}
      <Modal
        open={plinthCert ? true : false}
        width={"auto"}
        footer={null}
        onCancel={() => setPlinthCert(undefined)}
        title={false}
        centered={true}
      >
        <Spin spinning={loading}>
          <div ref={componentRef} className="PrintPlinthCert">
            {plinthCert ? <PDFSuperStCert plinthdata={plinthCert} /> : null}
          </div>
        </Spin>
      </Modal>
      {/* </Spin> */}
    </>
  );
};

export default PrintPlinthCert;
