import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  BuildingAreaTyp,
  LandareaTyp,
} from "../../pages/Consultant/ProjectCreate/Technical/BuildingByLaws/ByLawsData";
import "./ProjectPDFs.scss";

interface Props {
  data: {
    buildingArea: BuildingAreaTyp;
    landArea: LandareaTyp;
  };
}

const PDFbuildingByLaws = ({ data }: Props) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <div ref={componentRef} className="ProjectPDFs">
          <div style={{ height: "90vh", padding: "40px 80px" }}>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "18pt",
              }}
            >
              <span
                style={{
                  fontSize: "16pt",
                  color: "#808080",
                }}
              >
                Project Id:
              </span>
              <span
                style={{
                  color: "#808080",
                }}
              >
                &nbsp;
              </span>
              <span>1515</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
              <span>Building By Laws</span>
            </p>
            <table
              cellPadding={0}
              cellSpacing={0}
              style={{
                marginRight: "9pt",
                marginLeft: "9pt",
                border: "0.75pt dotted #000000",
                borderCollapse: "collapse",
                float: "left",
              }}
            >
              <tbody>
                <tr style={{ height: "31.4pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        textAlign: "center",
                        fontSize: "14pt",
                      }}
                    >
                      <span>Building Data</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "35.75pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>S.N.</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Title</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        textAlign: "center",
                        fontSize: "11pt",
                      }}
                    >
                      <span>As per submitted design</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Remarks</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>1</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Nature of construction</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.nature}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.natureRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>2</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Land Use Zone</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.zone}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.zoneRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>3</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Land Use sub zone</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.subzone}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.subzoneRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>4</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Plinth Area (Sqm)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.plinthArea}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.plinthAreaRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>5</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Building Area (Sqm)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.buildingArea}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.buildingAreaRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>6</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>High Tension Line Classification (if any)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.highTClass}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.highTClassRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>7</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>High Tension Actual Setback (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.highTSetback}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.highTSetbackRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>8</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>River Name Classification (if any)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.riverClass}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.riverClassRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>9</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>River Bank Actual Setback (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.riverSetback}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data.buildingArea?.riverSetbackRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>&nbsp;</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "34.3pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        textAlign: "center",
                        fontSize: "14pt",
                      }}
                    >
                      <span>Land Data</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "35.65pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>S.N.</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Title</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        textAlign: "center",
                        fontSize: "11pt",
                      }}
                    >
                      <span>As per submitted design</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Remarks</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>1</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Actual plot area (in Sqm)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.actualSqm}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.actualSqmRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>2</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "10.5pt",
                      }}
                    >
                      <span>Actual plot area (in Ropani)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.actualRop}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.actualSqmRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>3</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Adopted Land Area (Ropani)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>
                        {data?.landArea?.adoptedRop
                          ? data?.landArea?.adoptedRop
                          : ""}
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.adoptedRopRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>4</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Floor Area Ratio (FAR)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>
                        {data?.landArea?.FAR ? data?.landArea?.FAR : ""}
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.FARRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>5</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Ground Coverage (in Sqm)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.coverageSqm}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.coverageSqmRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>6</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Ground Coverage (%)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.coveragePer}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.coveragePerRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>7</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Building Length (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.lengthM}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.lengthMRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>8</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Building Width (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.widthM}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.widthMRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "33.85pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>9</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>
                        Number of Storey (Nos) (Starting from ground floor
                        excluding basement and semi-basement)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.noOfStorey}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.noOfStoreyRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>10</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Building Height (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.buildingH}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.buildingHRemark}</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <br />
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "18pt",
              }}
            >
              <br />
            </p>
            <div style={{ clear: "both" }}>
              <br />
            </div>
            <p style={{ textAlign: "center" }}>1</p>
          </div>
          <div style={{ height: "90vh", padding: 80 }}>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "18pt",
              }}
            >
              <span
                style={{
                  fontSize: "16pt",
                  color: "#808080",
                }}
              >
                Project Id:
              </span>
              <span
                style={{
                  color: "#808080",
                }}
              >
                &nbsp;
              </span>
              <span>1515</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>Building By Laws</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
            </p>
            <table
              cellPadding={0}
              cellSpacing={0}
              style={{
                marginRight: "9pt",
                marginLeft: "9pt",
                border: "0.75pt dotted #000000",
                borderCollapse: "collapse",
                float: "left",
              }}
            >
              <tbody>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>11</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "223.2pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Road Width (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.roadWidthM}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.roadWidthMRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>12</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "223.2pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Cul de sac</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>
                        {data?.landArea?.CulDeSac
                          ? data?.landArea?.CulDeSac
                          : ""}
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.CulDeSacRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>13</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "223.2pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>ROW (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.rowM}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.rowMRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>14</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "223.2pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Front Setback (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.frontSetback}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.frontSetbackRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>15</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "223.2pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Rear Setback (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.rearSetback}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.rearSetbackRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>16</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "223.2pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Side Left Setback (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.leftSetback}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.leftSetbackRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>17</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "223.2pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Side Right Setback (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.rightSetback}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.rightSetbackRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>18</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "223.2pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Ceiling Height (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.ceilingH}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.ceilingHRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>19</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "223.2pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Parking Area (sq.m.)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "dotted",
                      borderWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.parkingArea}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "dotted",
                      borderBottomWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.parkingAreaRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>20</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "223.2pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>Drawing Scale (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "dotted",
                      borderRightWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.drawingScale}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "dotted",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "dotted",
                      borderLeftWidth: "0.75pt",
                      paddingRight: "5.03pt",
                      paddingLeft: "5.03pt",
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <p
                      style={{
                        marginTop: "0pt",
                        marginBottom: "0pt",
                        fontSize: "11pt",
                      }}
                    >
                      <span>{data?.landArea?.drawingScaleRemark}</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "250px",
                lineHeight: "normal",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
            </p>
            <p
              style={{
                marginTop: "200px",
                marginBottom: "10pt",
                textAlign: "center",
                lineHeight: "normal",
                fontSize: "12pt",
              }}
            >
              <span>2</span>
            </p>
            <div style={{ clear: "both" }}>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  textAlign: "center",
                  lineHeight: "normal",
                  fontSize: "10.5pt",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "0pt",
                  lineHeight: "normal",
                  fontSize: "10.5pt",
                }}
              >
                &nbsp;
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button type="primary" onClick={handlePrint}>
        <DownloadOutlined /> PDF
      </Button>
    </React.Fragment>
  );
};

export default PDFbuildingByLaws;
