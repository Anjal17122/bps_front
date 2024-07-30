import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  ArchitecturalOther,
  Exit,
  Lift,
  LightVent,
  Staircase,
} from "../../Services/ArchitecturalService";

interface Props {
  data: {
    staircase: Staircase;
    exit: Exit;
    lightAndVent: LightVent;
    lifts: Lift;
    other: ArchitecturalOther;
  };
}

const PDFarchitectural = ({ data }: Props) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <React.Fragment>
      <Button type="primary" onClick={handlePrint}>
        <DownloadOutlined /> PDF
      </Button>
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
              <span>Architectural</span>
            </p>
            <table
              cellPadding={0}
              cellSpacing={0}
              style={{
                marginRight: "9pt",
                marginLeft: "9pt",
                border: "0.75pt solid #000000",
                borderCollapse: "collapse",
                float: "left",
              }}
            >
              <tbody>
                <tr style={{ height: "26.9pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderBottomStyle: "solid",
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
                      <span>Staircase</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "30.95pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                      borderStyle: "solid",
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
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                      <span>ARCHITECTURAL BUILDING PURPOSE</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.staircase?.bPur}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.staircase?.bPurRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                        Min. Tread of Staircase excluding nosing (in mm)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.staircase?.minTread}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.staircase?.minTreadRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                      <span>Riser of Staircase (in mm)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.staircase?.riser}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.staircase?.riserRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                        Clear width of Staircase - Residential (in mm)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.staircase?.clwidStair}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.staircase?.clwidStairRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                      <span>Height of Handrail (mm)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.staircase?.handrail}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.staircase?.handrailRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                      <span>Max. no. of riser per flight (Nos)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.staircase?.maxRiser}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.staircase?.maxRiserRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "34.1pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                        Max. head room under staircase from the nosing of the
                        road (mm)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.staircase?.maxHeadRoom}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.staircase?.maxHeadRoomRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "9.85pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                <tr style={{ height: "22.9pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>Exit</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "35.65pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                      borderStyle: "solid",
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
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                        Max. travel distance to exit point in each floor (m)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.exit?.maxTravel}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.exit?.maxTravelRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                      <span>Min. width of exit door including frame (mm)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.exit?.minWidthExit}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.exit?.minWidthExitRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                      <span>Min. Height of exit door including frame (mm)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.exit?.minHExit}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.exit?.minHExitRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "35.45pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                        Shutter opening of exit door to staircase &amp; public
                        passage
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.exit?.shutterOpen}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.exit?.shutterOpenRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                      <span>Total width of exit door (mm)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.exit?.widExit}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.exit?.widExitRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "14.75pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                <tr style={{ height: "31.85pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>Light and Ventilation</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "31.4pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                      borderStyle: "solid",
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
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                <tr style={{ height: "22.4pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                        Total Floor Area of Largest Habitable room (sq. m.)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.lightAndVent?.tfaRoom}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.lightAndVent?.tfaRoomRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                        Min. opening area of window for lighting largest
                        habitable room from external wall (sq.m)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.lightAndVent?.moaWin}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.lightAndVent?.moaWinRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "35.9pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      borderStyle: "solid",
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
                        Min. opening area of natural ventilator for largest
                        habitable room from external wall (sq.m)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.lightAndVent?.MOAvent}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.lightAndVent?.MOAventRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "35.9pt" }}>
                  <td
                    style={{
                      width: "19.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
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
                      <span>4</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "225.7pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderLeftStyle: "solid",
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
                      <span>
                        Min. size of ventilator for water closets and bathroom
                        (sq.m)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderLeftStyle: "solid",
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
                      <span>{data?.lightAndVent?.minVent}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
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
                      <span>{data?.lightAndVent?.minVentRemark}</span>
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
                1
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
          <div style={{ height: "90vh", padding: "80px" }}>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                lineHeight: "115%",
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
                lineHeight: "115%",
                fontSize: "18pt",
              }}
            >
              <span>Architectural</span>
            </p>
            <table
              cellPadding={0}
              cellSpacing={0}
              style={{
                marginRight: "9pt",
                marginLeft: "9pt",
                border: "0.75pt solid #000000",
                borderCollapse: "collapse",
                float: "left",
              }}
            >
              <tbody>
                <tr style={{ height: "31.25pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderBottomStyle: "solid",
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
                      <span>Lifts</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "30.95pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "223.2pt",
                      borderStyle: "solid",
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
                      borderStyle: "solid",
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
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "21.6pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "223.2pt",
                      borderStyle: "solid",
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
                      <span>Total Height of the Building (m)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.lifts?.totHbuild}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.lifts?.totHbuildRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "223.2pt",
                      borderStyle: "solid",
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
                      <span>Provision of Lift</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.lifts?.liftPro}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.lifts?.liftProRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "223.2pt",
                      borderStyle: "solid",
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
                      <span>No. of Lift per bank (Nos)</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.lifts?.liftPBank}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.lifts?.liftPBankRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                <tr style={{ height: "29.6pt" }}>
                  <td
                    colSpan={4}
                    style={{
                      width: "468pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>Other</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "30.05pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "223.2pt",
                      borderStyle: "solid",
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
                      borderStyle: "solid",
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
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "21.6pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "223.2pt",
                      borderStyle: "solid",
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
                      <span>Provision of fire escape and fire safety</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.other?.provFire}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.other?.provFireRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "21.6pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "223.2pt",
                      borderStyle: "solid",
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
                        Height of parapet wall &amp; balcony handrail (mm)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.other?.HparapetWall}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.other?.HparapetWallRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "43.1pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "223.2pt",
                      borderStyle: "solid",
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
                        Is there a provision of separate entrance for disabled
                        people next to the primary entrance of a building?
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.other?.SepEnt}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.other?.SepEntRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "43.1pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      width: "223.2pt",
                      borderStyle: "solid",
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
                        Max. gradient for wheel chair ramp at entrance of
                        building
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderStyle: "solid",
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
                      <span>{data?.other?.maxWheel}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
                      borderBottomStyle: "solid",
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
                      <span>{data?.other?.maxWheelRemark}</span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "37.25pt" }}>
                  <td
                    style={{
                      width: "21.6pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
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
                      width: "223.2pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
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
                        Min. width of wheel chair ramp at entrance of building
                        (mm)
                      </span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "101.7pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderRightStyle: "solid",
                      borderRightWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
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
                      <span>{data?.other?.minWheel}</span>
                    </p>
                  </td>
                  <td
                    style={{
                      width: "89.1pt",
                      borderTopStyle: "solid",
                      borderTopWidth: "0.75pt",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "0.75pt",
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
                      <span>{data?.other?.minWheelRemark}</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style={{ marginTop: "0pt", marginBottom: "10pt" }}>
              <span>&nbsp;</span>
            </p>
            <p style={{ marginTop: "0pt", marginBottom: "10pt" }}>
              <span>&nbsp;</span>
            </p>
            <p style={{ marginTop: "0pt", marginBottom: "10pt" }}>
              <span>&nbsp;</span>
            </p>
            <p style={{ marginTop: "0pt", marginBottom: "10pt" }}>
              <span>&nbsp;</span>
            </p>
            <p style={{ marginTop: "0pt", marginBottom: "10pt" }}>
              <span>&nbsp;</span>
            </p>
            <p style={{ marginTop: "0pt", marginBottom: "10pt" }}>
              <span>&nbsp;</span>
            </p>
            <p style={{ marginTop: "0pt", marginBottom: "10pt" }}>
              <span>&nbsp;</span>
            </p>
            <p style={{ marginTop: "0pt", marginBottom: "10pt" }}>
              <span>&nbsp;</span>
            </p>
            <p
              style={{
                marginTop: "0pt",
                marginBottom: "10pt",
                textAlign: "center",
              }}
            >
              <span>2</span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFarchitectural;
