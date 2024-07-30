import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";
import "./PDFTable.scss";
import {
  Earthing,
  maxCables,
  RatingNSizes,
  Testing,
} from "../../Services/ElectricalService";
import { DownloadOutlined } from "@ant-design/icons";

interface Props {
  projectId: string;
  rating: RatingNSizes | undefined;
  maxCables: maxCables | undefined;
  earthing: Earthing | undefined;
  testing: Testing | undefined;
}

const PDFelectrical = ({
  projectId,
  rating,
  maxCables,
  earthing,
  testing,
}: Props) => {
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
        <div ref={componentRef} className="MyProjectPDFs">
          <div style={{ height: "95vh", padding: "60px 90px 150px 100px" }}>
            <p>
              Project Id: <span>{projectId}</span>
            </p>
            <p
              style={{
                marginBottom: "20px",
                fontSize: "20pt",
              }}
            >
              <span>&nbsp;</span>
              <span>Electrical</span>
            </p>
            <table className="PDFTable">
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th className="title">Title</th>
                  <th className="maindata">As per submitted design</th>
                  <th className="remarks">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="heading">
                    RATING & SIZES
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td className="title">
                    Min. size of copper cable for light circuit (sq.mm)
                  </td>
                  <td className="maindata">{rating?.minLight}</td>
                  <td className="remarks">{rating?.minLightRemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">
                    Min. size of copper cable for power circuit (sq.mm)
                  </td>
                  <td className="maindata">{rating?.minPower}</td>
                  <td className="remarks">{rating?.minPowerRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Wattage of ordinary power socket (2pin) estimated as (watt)
                  </td>
                  <td className="maindata">{rating?.watt2}</td>
                  <td className="remarks">{rating?.watt2Remark}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    Wattage of power socket outlet (3pin) estimated as (watt)
                  </td>
                  <td className="maindata">{rating?.watt3}</td>
                  <td className="remarks">{rating?.watt3Remark}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">
                    Wall thickness of cast iron switch or regulators boxes for
                    upto (mm)
                  </td>
                  <td className="maindata">{rating?.wallCast}</td>
                  <td className="remarks">{rating?.wallCastRemark}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">
                    Wall thickness of mild steel sheet switch or regulators
                    boxes for upto 20cmX30cm (mm)
                  </td>
                  <td className="maindata">{rating?.wallMild}</td>
                  <td className="remarks">{rating?.wallMildRemark}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">
                    Wall thickness of mild steel sheet switch or regulators
                    boxes for above 20cmX30cm (mm)
                  </td>
                  <td className="maindata">{rating?.wall20x30}</td>
                  <td className="remarks">{rating?.wall20x30Remark}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="title">
                    Depth of the switch or regulator boxes (mm)
                  </td>
                  <td className="maindata">{rating?.depth}</td>
                  <td className="remarks">{rating?.depthRemark}</td>
                </tr>
                <tr>
                  <td colSpan={4}></td>
                </tr>
                <tr>
                  <td colSpan={4} className="heading">
                    MAX. NOS. OF CABLES IN A CONDUIT
                  </td>
                </tr>
                <tr>
                  <td>S.N.</td>
                  <td className="title">Title</td>
                  <td className="maindata">As per submitted design</td>
                  <td className="remarks">Remarks</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td className="title">
                    No. of 2.5 sq.mm cross-sectional area cable in 20mm dia
                    conduit (Nos. of cables)
                  </td>
                  <td className="maindata">{maxCables?.TcrosecA}</td>
                  <td className="remarks">{maxCables?.TcrosecARemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">
                    No. of 4 sq.mm cross-sectional area cable in 20mm dia
                    conduit (Nos. of cables)
                  </td>
                  <td className="maindata">{maxCables?.FcrosecA}</td>
                  <td className="remarks">{maxCables?.FcrosecARemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    No. of 6 sq.mm cross-sectional area cable in 20mm dia
                    conduit (Nos. of cables)
                  </td>
                  <td className="maindata">{maxCables?.ScroSecA}</td>
                  <td className="remarks">{maxCables?.ScroSecARemark}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    No. of 2.5 sq.mm cross-sectional area cable in 25mm dia
                    conduit (Nos. of cables)
                  </td>
                  <td className="maindata">{maxCables?.TcroSec25}</td>
                  <td className="remarks">{maxCables?.TcroSec25Remark}</td>
                </tr>
              </tbody>
            </table>
            <p style={{ textAlign: "center", height: 15 }}>1</p>
          </div>
          <div
            style={{
              height: "95vh",
              padding: "80px 90px 150px 100px",
              marginTop: 100,
            }}
          >
            <table className="PDFTable">
              <tbody>
                <tr>
                  <td>5</td>
                  <td className="title">
                    No. of 4 sq.mm cross-sectional area cable in 25mm dia
                    conduit (Nos. of cables)
                  </td>
                  <td className="maindata">{maxCables?.FcroSec25}</td>
                  <td className="remarks">{maxCables?.FcroSec25Remark}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">
                    No. of 6 sq.mm cross-sectional area cable in 25mm dia
                    conduit (Nos. of cables)
                  </td>
                  <td className="maindata">{maxCables?.ScroSec25}</td>
                  <td className="remarks">{maxCables?.ScroSec25Remark}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">
                    No. of 2.5 sq.mm cross-sectional area cable in 32mm dia
                    conduit (Nos. of cables)
                  </td>
                  <td className="maindata">{maxCables?.TcroSec32}</td>
                  <td className="remarks">{maxCables?.TcroSec32Remark}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="title">
                    No. of 4 sq.mm cross-sectional area cable in 32mm dia
                    conduit (Nos. of cables)
                  </td>
                  <td className="maindata">{maxCables?.FcroSec32}</td>
                  <td className="remarks">{maxCables?.FcroSec32Remark}</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td className="title">
                    No. of 6 sq.mm cross-sectional area cable in 32mm dia
                    conduit (Nos. of cables)
                  </td>
                  <td className="maindata">{maxCables?.ScroSec32}</td>
                  <td className="remarks">{maxCables?.ScroSec32Remark}</td>
                </tr>
                <tr>
                  <td colSpan={4}></td>
                </tr>
                <tr>
                  <td colSpan={4} className="heading">
                    EARTHING
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td className="title">
                    The value any earth system resistance unless otherwise
                    specified (ohm)
                  </td>
                  <td className="maindata">{earthing?.ESres}</td>
                  <td className="remarks">{earthing?.ESresRemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">
                    Diameter of electrodes of steel of galvanized iron (mm)
                  </td>
                  <td className="maindata">{earthing?.diaIron}</td>
                  <td className="remarks">{earthing?.diaIronRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Diameter of electrodes of copper (mm)
                  </td>
                  <td className="maindata">{earthing?.diaCopper}</td>
                  <td className="remarks">{earthing?.diaCopperRemark}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    Internal diameter of pipe electrodes of galvanized iron (mm)
                  </td>
                  <td className="maindata">{earthing?.intDiaGal}</td>
                  <td className="remarks">{earthing?.intDiaGalRemark}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">
                    Internal diameter of pipe electrodes of cast iron (mm)
                  </td>
                  <td className="maindata">{earthing?.intDiaCast}</td>
                  <td className="remarks">{earthing?.intDiaCastRemark}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">
                    The B17 length of the rod & pipe electrodes (mm)
                  </td>
                  <td className="maindata">{earthing?.B17}</td>
                  <td className="remarks">{earthing?.B17Remark}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">
                    Thickness of plate electrodes of galvanized iron or steel
                    (mm)
                  </td>
                  <td className="maindata">{earthing?.thickGal}</td>
                  <td className="remarks">{earthing?.thickGalRemark}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="title">
                    Thickness of plate electrodes of copper (mm)
                  </td>
                  <td className="maindata">{earthing?.thickCop}</td>
                  <td className="remarks">{earthing?.thickCopRemark}</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td className="title">
                    Size of plate electrodes or galvanized iron or steel or
                    copper (mm)
                  </td>
                  <td className="maindata">{earthing?.sizeGal}</td>
                  <td className="remarks">{earthing?.sizeGalRemark}</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td className="title">
                    Depth of the top edge of plate electrodes buried from ground
                    (mm)
                  </td>
                  <td className="maindata">{earthing?.depth}</td>
                  <td className="remarks">{earthing?.depthRemark}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style={{
              height: "95vh",
              padding: "80px 90px 150px 100px",
              marginTop: 100,
            }}
          >
            <table className="PDFTable">
              <tbody>
                <tr>
                  <td colSpan={4} className="heading">
                    TESTING
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td className="title">
                    Number of points on the circuit (Nos.)
                  </td>
                  <td className="maindata">{testing?.noOfPoint}</td>
                  <td className="remarks">{testing?.noOfPointRemark}</td>
                </tr>
                <tr>
                  <td>2 </td>
                  <td className="title">
                    Insulation resistance (Mohm) between earth and the whole
                    system of conductor or any section of
                  </td>
                  <td className="maindata">{testing?.insulEarth}</td>
                  <td className="remarks">{testing?.insulEarthRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Insulation resistance (Mohm) between the metallic case and
                    all live parts of each rheostat, appliance and sign when
                    they are disconnected
                  </td>
                  <td className="maindata">{testing?.insulLive}</td>
                  <td className="remarks">{testing?.insulLiveRemark}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    Insulation resistance (Mohm) between all the conductors
                    connected to one pole or phase conductor and all the
                    conductor connected to the middle wire or to the normal or
                    to the other pole of the phase conductor
                  </td>
                  <td className="maindata">{testing?.insulConduct}</td>
                  <td className="remarks">{testing?.insulConductRemark}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">Working voltage (V)</td>
                  <td className="maindata">{testing?.workVol}</td>
                  <td className="remarks">{testing?.workVolRemark}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">
                    The applied dc voltage (Volt) of meggering
                  </td>
                  <td className="maindata">{testing?.dcVol}</td>
                  <td className="remarks">{testing?.dcVolRemark}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">
                    Each switch is placed in phase or Neutral?
                  </td>
                  <td className="maindata">{testing?.eachSwitch}</td>
                  <td className="remarks">{testing?.eachSwitchRemark}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFelectrical;
