import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GETplinthPDF } from "../../../../Services/PDFService";
import { MuchulkaPDFdata } from "../PDFtypes";
import {
  isNagarjun,
  mapMuchulkaData,
} from "../../../../constants/CommonFunctions";
import { Document, PDFViewer, Page, Text, View } from "@react-pdf/renderer";
import NewMuchulkaNagarjung from "./NewMuchulkaNagarjung";
import { getNewMuchulka } from "../../../../Services/NewMuchulkaService";

const NewMuchulkaPDF = () => {
  const params = useParams<{
    pid: string;
  }>();

  const [pdfData, setPdfData] = useState<MuchulkaPDFdata>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const pid = params.pid ?? "0";
    GETplinthPDF(pid, messageApi).then((res) => {
      getNewMuchulka(pid, messageApi).then(({ data }) => {
        const PDFdata = mapMuchulkaData(res, data);
        setPdfData(PDFdata);
      });
    });

    return () => {
      setPdfData(undefined);
    };
  }, [params.pid ?? "0"]);
  return (
    <div>
      {contextHolder}
      {pdfData ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          {isNagarjun() ? (
            <NewMuchulkaNagarjung pdfData={pdfData} />
          ) : (
            <Document>
              <Page size="A4">
                <View>
                  <Text>No Data</Text>{" "}
                </View>
              </Page>
            </Document>
          )}
        </PDFViewer>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default NewMuchulkaPDF;
