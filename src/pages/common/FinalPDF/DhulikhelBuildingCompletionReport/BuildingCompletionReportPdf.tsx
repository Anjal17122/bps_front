import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import React from "react";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import { BuildingReportPdfDataType } from "./BuildingCompletionReportService";
import { Underline } from "../AbhilekhikaranPDFDesign/FinalPDFAbhilekhikaranDesign";
import { findHiAndLow, underline } from "../helper";
import { FloorRow } from "../PDFtypes";

type data = { pdfData: BuildingReportPdfDataType };
type floor = { id: number; name: string; total: string };

export function BuildingCompletionReportPdf({ pdfData }: data) {
  Font.register({ family: "Noto", src: Noto });
  Font.register({ family: "NotoMedium", src: NotoMedium });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      alignItems: "center",
      fontSize: 11,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    heading: {
      width: "100%",
      backgroundColor: "#000",
      textAlign: "center",
      fontSize: 14,
      fontWeight: "bold",
      fontFamily: "Noto",
    },
    subHeading: {
      width: "100%",
      textAlign: "center",
      fontSize: 12,
      marginVertical: 5,
      fontFamily: "NotoMedium",
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      marginTop: 2,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
    },
    ol: {
      marginVertical: 10,
    },
    li: {
      marginVertical: 5,
    },
    textRight: {
      textAlign: "right",
    },
    textCenter: {
      textAlign: "center",
    },
  });

  const FloorData: floor[] = JSON.parse(pdfData.floorDetail ?? "{}");

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>BUILDING COMPLETION REPORT</Text>
            <Text style={styles.subHeading}>(To be filled by designer)</Text>
            <Text style={styles.ol}>1.</Text>
            <View style={{ fontFamily: "Noto" }}>
              <Text style={{ fontFamily: "Noto" }}>
                a) Name of landowner: {underline(pdfData.landOwnerName)}
              </Text>
              <Text style={{ fontFamily: "Noto" }}>
                b) Name of house owner:
                {underline(pdfData.houseOwnerName)}
              </Text>
              <Text style={{ fontFamily: "Noto" }}>
                c) Purpose of building (Resi/Comm etc):
                {underline(pdfData.buildingPurpose)}
              </Text>
              <Text style={{ fontFamily: "Noto" }}>
                d) Address: {underline(pdfData.address)}
              </Text>
              <Text style={{ fontFamily: "Noto" }}>
                e) Plot No.: {underline(pdfData.plotNo)}
              </Text>
              <Text style={{ fontFamily: "Noto" }}>
                f) Plot area (i) in Ropani:
                {underline(pdfData.plotAreaRopani)} (ii) In Sq. Ft:
                {underline(pdfData.plotAreaSqFt)}
              </Text>
              <Text style={{ fontFamily: "Noto" }}>
                g) Zone: {underline(pdfData.zone)} F.A.R.:{" "}
                {underline(pdfData.far)}
              </Text>
              <Text style={{ fontFamily: "Noto" }}>
                h) Designer's Name: {underline(pdfData.designerName)}
              </Text>
              <Text style={{ fontFamily: "Noto" }}>
                i) Regd.No.: {pdfData.regdNo}
              </Text>
              <Text style={{ fontFamily: "Noto" }}>
                j) Class: {underline(pdfData.classs)}
              </Text>

              <Text>
                k) Actual site plan area: - (i) In Ropani:
                {underline(pdfData.plotAreaRopani)} (ii) in Sq. Ft:
                {underline(pdfData.plotAreaRopani)}
              </Text>
              <Text>
                l) Actual ground coverage: - (i) in %:
                {underline(pdfData.groundCoverateP)} (ii) in Sq. Ft:
                {underline(pdfData.groundCoverageSqFt)}
              </Text>
            </View>
            <Text style={{ marginTop: 10, textDecoration: "underline" }}>
              Table No. 1
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, { width: "5%" }]}>
                  <Text style={styles.tableCell}>S.N.</Text>
                </View>
                <View style={[styles.tableCol, { width: "40%" }]}>
                  <Text style={styles.tableCell}>Co-ordinate</Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}>Actual In Site</Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}>Remarks</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, { width: "5%" }]}>
                  <Text style={styles.tableCell}>1.</Text>
                </View>
                <View style={[styles.tableCol, { width: "40%" }]}>
                  <Text style={styles.tableCell}>
                    R.O.W. (From center line of adjacent existing road)
                  </Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}>{pdfData.row}</Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}>{pdfData.rowRemarks}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, { width: "5%" }]}>
                  <Text style={styles.tableCell}>2.</Text>
                </View>
                <View style={[styles.tableCol, { width: "40%" }]}>
                  <Text style={styles.tableCell}>Set back</Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}>{pdfData.setBack}</Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}>{pdfData.setBackRemarks}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, { width: "5%" }]}>
                  <Text style={styles.tableCell}>3.</Text>
                </View>
                <View style={[styles.tableCol, { width: "40%" }]}>
                  <Text style={styles.tableCell}>River Bank</Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}>{pdfData.riverBank}</Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}>
                    {pdfData.riverBankRemarks}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, { width: "5%" }]}>
                  <Text style={styles.tableCell}>4.</Text>
                </View>
                <View style={[styles.tableCol, { width: "40%" }]}>
                  <Text style={styles.tableCell}>KV Electric Line</Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}>{pdfData.electricLine}</Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}>
                    {pdfData.electricLineRemarks}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text>2. Floor Area</Text>
            </View>
            <View
              style={{
                paddingLeft: 70,
                height: "auto",
                flexWrap: "wrap",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {FloorData.map((floor, index) => {
                return (
                  <View key={floor.id} style={{ width: 220, height: "14px" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          width: 10,
                        }}
                      >
                        {index + 1}.
                      </Text>
                      <Text style={{ fontSize: 10, width: 70 }}>
                        {floor.name}
                      </Text>
                      <Text
                        style={{
                          width: 80,
                          fontSize: 10,
                          textDecoration: "underline",
                          textDecorationStyle: "dotted",
                          fontFamily: "Noto",
                        }}
                      >
                        {floor.total} &nbsp;बर्गफुट
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View
              style={{
                width: "72%",
                flexDirection: "row",
              }}
            >
              <Text style={{ width: 80 }}>Total Floor Area: </Text>
              <Text
                style={{
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  fontFamily: "Noto",
                }}
              >
                {pdfData.totalFloorArea}
                &nbsp;बर्गफुट
              </Text>
            </View>
            <View style={styles.ol}>
              <Text>3. Floor Area</Text>
              <View>
                <Text style={styles.li}>
                  a) Difference in floor area than Permitted Area:
                  {pdfData.floorAreaDifference}
                </Text>
                <Text style={styles.li}>
                  b) Total permissible area: {pdfData.permissibleArea}
                </Text>
                <Text style={styles.li}>
                  c) Actual built up floor area:
                  {pdfData.actualFloorArea}
                </Text>
              </View>
              <Text style={styles.li}>
                4. Permissible building height according to the rule:
                {pdfData.buildingHeight}
              </Text>
              <Text style={styles.li}>
                5. Plinth area: {pdfData.plinthArea}
              </Text>
              <Text style={styles.li}>6. No. of storey: {pdfData.storey}</Text>
              <Text style={styles.li}>7. Remarks:</Text>
              <View>
                <Text style={styles.li}>
                  a) Comment if the construction is different than the building
                  permit: ...................................
                </Text>
                <Text style={styles.li}>
                  b) Special Report of all construction activities in the same
                  plot: ...................................
                </Text>
              </View>
            </View>
            <Text>
              I certify that, the constructed building does not differ from the
              prevailing building by laws and is as per the permitted building
              drawings.
            </Text>
            {/* <Text style={{ fontStyle: "italic" }}>
              (Note: Separate page can be used for comment and sketch)
            </Text>
            <Text style={styles.textRight}>
              ..............................................
            </Text>
            <Text style={styles.textRight}>
              <strong>Designer's Signature</strong>
            </Text>
            <View>
              <Text style={styles.textCenter}>
                <strong>For Official Use</strong>
              </Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, { width: "70%" }]}>
                    <Text style={styles.tableCell}>Reported/Received</Text>
                    <Text style={styles.tableCell}>
                      Name:
                      ............................................................
                    </Text>
                    <Text style={styles.tableCell}>
                      Designation:
                      ............................................................
                    </Text>
                    <Text style={styles.tableCell}>
                      Date:
                      ............................................................
                    </Text>
                    <Text style={styles.tableCell}>
                      Remarks:
                      ............................................................
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tableCol,
                      { width: "30%", position: "relative" },
                    ]}
                  >
                    <View
                      style={{ position: "absolute", bottom: 0, width: "100%" }}
                    >
                      <Text style={styles.textCenter}>
                        ............................................................
                      </Text>
                      <Text style={styles.textCenter}>
                        <strong>Signature</strong>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View> */}
            {/* <BuildingReportFooter /> */}
          </View>
        </Page>
      </Document>

      {/* <p>
            I Certify that, the constructed building does not differ from the
            prevailing building by laws and is as the permitted building drawings.
          </p>
          <p style={{ textAlign: "left", fontStyle: "italic" }}>
            (Note: Separate page can be used for comment and sketch)
          </p>
          <p style={{ textAlign: "right" }}>
            <>..............................................</>
          </p>
          <p style={{ textAlign: "right" }}>
            <strong>Designer's Signature</strong>
          </p>
          <hr style={{ height: 2 }} />
          <p style={{ textAlign: "center" }}>
            <strong>For Official Use</strong>
          </p>
          <table style={{ width: "1016px" }}>
            <tbody>
              <tr style={{ height: "64.8px" }}>
                <td style={{ width: "594.2px", height: "128.8px" }} rowSpan={2}>
                  <p>Reported/Received</p>
                  <p>Name:...............................................</p>
                  <p>Designation: .......................................</p>
                  <p>Date:.................................................</p>
                  <p>Remarks:...........................................</p>
                </td>
                <td
                  style={{
                    position: "relative",
                    width: "594.2px",
                    height: "128.8px",
                  }}
                >
                  <div style={{ position: "absolute", bottom: 0 }}>
                    <p style={{ textAlign: "center" }}>
                      <>
                        ............................................................
                      </>
                    </p>
                    <p style={{ textAlign: "center" }}>
                      <strong>Signature</strong>
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table> */}
    </>
  );
}

export function BuildingReportFooter() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 25,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingTop: 5,
          justifyContent: "flex-start",
          paddingLeft: 80,
          paddingRight: 40,
        }}
      >
        <Text></Text>
      </View>
      <View>
        <Text></Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          width: "100%",
          marginTop: -5,
          justifyContent: "flex-end",
          paddingRight: 80,
        }}
      >
        <Text>..........................................</Text>
        <Text>नक्शावाला/ निजको वारेस</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 35,
          paddingLeft: 80,
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>.....................</Text>
          <Text style={{ width: 140 }}>स्वीकृत गर्ने</Text>
        </View>
      </View>
    </View>
  );
}
