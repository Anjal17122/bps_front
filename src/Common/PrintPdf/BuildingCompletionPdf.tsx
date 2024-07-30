import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import Noto from "../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";

export function BuildingCompletionPdf() {
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
    },
    subHeading: {
      width: "100%",
      textAlign: "center",
      fontSize: 12,
      marginVertical: 5,
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
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>BUILDING COMPLETION REPORT</Text>
            <Text style={styles.subHeading}>(To be filled by designer)</Text>
            <Text style={styles.ol}>1.</Text>
            <View>
              <Text>
                a) Name of landowner:
                ............................................................
              </Text>
              <Text>
                b) Name of house owner:
                ........................................................
              </Text>
              <Text>
                c) Purpose of building (Resi/Comm etc):
                ...................................
              </Text>
              <Text>
                d) Address: ......................... Street Name: ..........
                House No.: ............
              </Text>
              <Text>
                e) Plot No.:
                ........................................................
              </Text>
              <Text>
                f) Plot area (i) in Ropani:
                ........................................... (ii) In Sq. Ft:
                ...........................................
              </Text>
              <Text>
                g) Zone: ................... F.A.R.:
                ...........................................
              </Text>
              <Text>
                h) Designer's Name: ...........................................
              </Text>
              <Text>
                i) Regd.No.: ...........................................
              </Text>
              <Text>j) Class: ...........................................</Text>

              <Text>
                k) Actual site plan area: - (i) In Ropani:
                ........................................... (ii) in Sq. Ft:
                ...........................................
              </Text>
              <Text>
                l) Actual ground coverage: - (i) in %:
                ........................................... (ii) in Sq. Ft:
                ...........................................
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
                  <Text style={styles.tableCell}>
                    Horizontal distance to be left
                  </Text>
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
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}></Text>
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
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}></Text>
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
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}></Text>
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
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={[styles.tableCol, { width: "27.5%" }]}>
                  <Text style={styles.tableCell}></Text>
                </View>
              </View>
            </View>
            <View>
              <Text>2. Floor Area</Text>
              <Text>
                Ground Floor: ................................... 1st:
                ................................... 2nd:
                ...................................
              </Text>
            </View>
            <View style={styles.ol}>
              <Text>3. Floor Area</Text>
              <View>
                <Text style={styles.li}>
                  a) Difference in floor area than Permitted Area:
                  ...................................
                </Text>
                <Text style={styles.li}>
                  b) Total permissible area: ...................................
                </Text>
                <Text style={styles.li}>
                  c) Actual built up floor area:
                  ...................................
                </Text>
              </View>
              <Text style={styles.li}>
                4. Permissible building height according to the rule:
                ...................................
              </Text>
              <Text style={styles.li}>
                5. Plinth area: ...................................
              </Text>
              <Text style={styles.li}>
                6. No. of storey: ...................................
              </Text>
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
            <Text style={{ fontStyle: "italic" }}>
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
            </View>
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
