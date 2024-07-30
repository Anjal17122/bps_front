import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  CriticalBeamtyp,
  FloorTypArc,
  FoundationTyp,
  GeneralType,
  MaterialsAndLoadingBody,
  NBC105typ,
  NBC106typ,
  OpeningDetailsTyp,
  SlabDesignTyp,
} from "../../Services/StructuralService";
import "./PDFTable.scss";

interface Props {
  general: GeneralType | undefined;
  materialsAndLoading: MaterialsAndLoadingBody | undefined;
  seismicParameters: NBC105typ | undefined;
  safetyConsideration: NBC106typ | undefined;
  projectId: string;
  foundation: FoundationTyp | undefined;
  beamDesign: CriticalBeamtyp | undefined;
  columnDesign: CriticalBeamtyp | undefined;
  slabDesign: SlabDesignTyp | undefined;
  floor: FloorTypArc | undefined;
  openingDetails: OpeningDetailsTyp | undefined;
}

const PDFstructural = ({
  general,
  projectId,
  materialsAndLoading,
  seismicParameters,
  safetyConsideration,
  foundation,
  beamDesign,
  columnDesign,
  slabDesign,
  floor,
  openingDetails,
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
              <span>Structural</span>
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
                  <td>1</td>
                  <td className="title">Building Structure </td>
                  <td className="maindata">{general?.bstype}</td>
                  <td className="remarks">{general?.bstypeRemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">Design Philosophy</td>
                  <td className="maindata">{general?.designPhilosophy}</td>
                  <td className="remarks">{general?.designPhilosophyRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Number of storey applied for permit (in Nos.)
                  </td>
                  <td className="maindata">{general?.nosforPermit}</td>
                  <td className="remarks">{general?.nosforPermitRemark}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    Provision for further extension considered or not
                  </td>
                  <td className="maindata">{general?.provfurExt}</td>
                  <td className="remarks">{general?.provfurExtRemark}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">
                    Number of storeys considered in Structural design (in Nos.)
                  </td>
                  <td className="maindata">{general?.noOfStdes}</td>
                  <td className="remarks">{general?.noOfStdesRemark}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">
                    If Computer Aided Design (CAD) is used, please state the
                    name of the Software package
                  </td>
                  <td className="maindata">{general?.CADisUse}</td>
                  <td className="remarks">{general?.CADisUseRemark}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">
                    Total height (h) of structure with extension (in m)
                  </td>
                  <td className="maindata">{general?.totalHext}</td>
                  <td className="remarks">{general?.totalHextRemark}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="title">
                    Whether sample design calculations of foundations, columns,
                    beams and slabs are submitted
                  </td>
                  <td className="maindata">{general?.isFCBSsub}</td>
                  <td className="remarks">{general?.isFCBSsubRemark}</td>
                </tr>
                <tr>
                  <td colSpan={4}></td>
                </tr>
                <tr>
                  <td colSpan={4} className="heading">
                    Materials and Loading
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
                    Materials to be used in structure (tick the listed materials
                    that will be used in structural element
                  </td>
                  <td className="maindata">{materialsAndLoading?.matUsed}</td>
                  <td className="remarks">
                    {materialsAndLoading?.matUsedRemark}
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">
                    Specify the design unit weight of materials: RCC (in kN/m3)
                  </td>
                  <td className="maindata">{materialsAndLoading?.RCCkNm3}</td>
                  <td className="remarks">
                    {materialsAndLoading?.RCCkNm3Remark}
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Occupancy Load (Uniformly Distributed load in kN/m2) for
                    Rooms and Kitchen
                  </td>
                  <td className="maindata">
                    {materialsAndLoading?.occLoadkNm2}
                  </td>
                  <td className="remarks">
                    {materialsAndLoading?.occLoadkNm2Remark}
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    Occupancy Load (Uniformly Distributed load in KN/m2) for
                    Corridors, Staircase, Store
                  </td>
                  <td className="maindata">
                    {materialsAndLoading?.occLoadCSS}
                  </td>
                  <td className="remarks">
                    {materialsAndLoading?.occLoadCSSRemark}
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">
                    Occupancy Load (Uniformly Distributed load in KN/m2) for
                    Balcony
                  </td>
                  <td className="maindata">{materialsAndLoading?.KNm2Bal}</td>
                  <td className="remarks">
                    {materialsAndLoading?.KNm2BalRemark}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ height: "95vh", padding: "60px 90px 150px 100px" }}>
            <p>
              Project Id: <span>{projectId}</span>
            </p>
            <h3>Seismic Parameters Results</h3>
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
                  <td>1</td>
                  <td className="title">
                    Method adopted for eathquake resistant design
                  </td>
                  <td className="maindata">{seismicParameters?.ERD}</td>
                  <td className="remarks">{seismicParameters?.ERDRemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">Adopted Code for Seismic Design</td>
                  <td className="maindata">{seismicParameters?.ACSeisDes}</td>
                  <td className="remarks">
                    {seismicParameters?.ACSeisDesRemark}
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">Subsoil category</td>
                  <td className="maindata">{seismicParameters?.subsoil}</td>
                  <td className="remarks">
                    {seismicParameters?.subsoilRemark}
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">Seismic Weight (W) (in kN)</td>
                  <td className="maindata">{seismicParameters?.seisWinkN}</td>
                  <td className="remarks">
                    {seismicParameters?.seisWinkNRemark}
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">
                    Fundamental Time Period of the building along X (Tx) (in
                    Seconds)
                  </td>
                  <td className="maindata">{seismicParameters?.funTPXTxSec}</td>
                  <td className="remarks">
                    {seismicParameters?.funTPXTxSecRemark}
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">
                    Basic Seismic Coefficient Along X (C)
                  </td>
                  <td className="maindata">{seismicParameters?.BSCXC}</td>
                  <td className="remarks">{seismicParameters?.BSCXCRemark}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">
                    Basic Seismic Coefficient Along Y(C)
                  </td>
                  <td className="maindata">{seismicParameters?.BSCYC}</td>
                  <td className="remarks">{seismicParameters?.BSCYCRemark}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="title">Seismic zoning factor (Z)</td>
                  <td className="maindata">{seismicParameters?.BSCYC}</td>
                  <td className="remarks">{seismicParameters?.BSCYCRemark}</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td className="title">Importance Factor (I)</td>
                  <td className="maindata">{seismicParameters?.ImpFacI}</td>
                  <td className="remarks">
                    {seismicParameters?.ImpFacIRemark}
                  </td>
                </tr>
                <tr>
                  <td>10</td>
                  <td className="title">
                    Spectral acceleration coefficient Along X (Sa/g)
                  </td>
                  <td className="maindata">{seismicParameters?.SpecACXSag}</td>
                  <td className="remarks">
                    {seismicParameters?.SpecACXSagRemark}
                  </td>
                </tr>
                <tr>
                  <td>11</td>
                  <td className="title">
                    Design Horizontal Seismic Coefficient Along X (Cd)
                  </td>
                  <td className="maindata">{seismicParameters?.DesXCd}</td>
                  <td className="remarks">{seismicParameters?.DesXCdRemark}</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td className="title">
                    Design Horizontal Seismic Coefficient Along X (Ah)
                  </td>
                  <td className="maindata">{seismicParameters?.DesXAh}</td>
                  <td className="remarks">{seismicParameters?.DesXAhRemark}</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td className="title">
                    Spectral acceleration coefficient Along Y (Sa/g)
                  </td>
                  <td className="maindata">{seismicParameters?.SpecACYSag}</td>
                  <td className="remarks">
                    {seismicParameters?.SpecACYSagRemark}
                  </td>
                </tr>
                <tr>
                  <td>14</td>
                  <td className="title">
                    Design Horizontal Seismic Coefficient Along Y (Cd)
                  </td>
                  <td className="maindata">{seismicParameters?.DesXCd}</td>
                  <td className="remarks">{seismicParameters?.DesXCdRemark}</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td className="title">
                    Design Horizontal Seismic Coefficient Along Y (Ah)
                  </td>
                  <td className="maindata">{seismicParameters?.DesYAh}</td>
                  <td className="remarks">{seismicParameters?.DesYAhRemark}</td>
                </tr>
                <tr>
                  <td>16</td>
                  <td className="title">
                    Base Shear(VB) for Seismic Coefficient Along X
                  </td>
                  <td className="maindata">{seismicParameters?.BaseVBX}</td>
                  <td className="remarks">
                    {seismicParameters?.BaseVBXRemark}
                  </td>
                </tr>
                <tr>
                  <td>17</td>
                  <td className="title">
                    Base Shear(VB) for Seismic Coefficient Along Y
                  </td>
                  <td className="maindata">{seismicParameters?.BaseVBY}</td>
                  <td className="remarks">
                    {seismicParameters?.BaseVBYRemark}
                  </td>
                </tr>
                <tr>
                  <td>18</td>
                  <td className="title">Maximum Inter-Storey Drift</td>
                  <td className="maindata">{seismicParameters?.maxISD}</td>
                  <td className="remarks">{seismicParameters?.maxISDRemark}</td>
                </tr>
                <tr>
                  <td>19</td>
                  <td className="title">
                    Corresponding Storey height for Maximum Inter-Storey Drift
                    (h)
                  </td>
                  <td className="maindata">{seismicParameters?.corrMaxISDh}</td>
                  <td className="remarks">
                    {seismicParameters?.corrMaxISDhRemark}
                  </td>
                </tr>
                <tr>
                  <td>20</td>
                  <td className="title">Maximum Inter-Storey Drift Ratio</td>
                  <td className="maindata">{seismicParameters?.maxISDR}</td>
                  <td className="remarks">
                    {seismicParameters?.maxISDRRemark}
                  </td>
                </tr>
                <tr>
                  <td>21</td>
                  <td className="title">Availability of soil test report</td>
                  <td className="maindata">{seismicParameters?.soilTest}</td>
                  <td className="remarks">
                    {seismicParameters?.soilTestRemark}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ height: "95vh", padding: "60px 90px 150px 100px" }}>
            <p>
              Project Id: <span>{projectId}</span>
            </p>
            <h3>Safety Consideration</h3>
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
                  <td>1</td>
                  <td className="title">
                    Have you considered fire safety requirement?
                  </td>
                  <td className="maindata">
                    {safetyConsideration?.fireSafety}
                  </td>
                  <td className="remarks">
                    {safetyConsideration?.fireSafetyRemark}
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">
                    Whether distance of construction site from toe/beginning of
                    downward slope is within 50m?
                  </td>
                  <td className="maindata">{safetyConsideration?.toe50m}</td>
                  <td className="remarks">
                    {safetyConsideration?.toe50mRemark}
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Whether distance of construction site from river bank is
                    within 50m?
                  </td>
                  <td className="maindata">{safetyConsideration?.river50m}</td>
                  <td className="remarks">
                    {safetyConsideration?.river50mRemark}
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    Are you sure that all safety measures will be fulfilled in
                    the construction site as per this code?
                  </td>
                  <td className="maindata">
                    {safetyConsideration?.safetyCode}
                  </td>
                  <td className="remarks">
                    {safetyConsideration?.safetyCodeRemark}
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">Safety wares use</td>
                  <td className="maindata">
                    {safetyConsideration?.SafetyWares}
                  </td>
                  <td className="remarks">
                    {safetyConsideration?.SafetyWaresRemark}
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">Concrete grade in structure</td>
                  <td className="maindata">{safetyConsideration?.conGrade}</td>
                  <td className="remarks">
                    {safetyConsideration?.conGradeRemark}
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">Reinforcement Steel Grade</td>
                  <td className="maindata">{safetyConsideration?.reinSteel}</td>
                  <td className="remarks">
                    {safetyConsideration?.reinSteelRemark}
                  </td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="title">Snowfall type or condition</td>
                  <td className="maindata">{safetyConsideration?.snowType}</td>
                  <td className="remarks">
                    {safetyConsideration?.snowTypeRemark}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ height: 20 }}></td>
                </tr>
                <tr>
                  <td colSpan={4} className="heading">
                    Foundation
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td className="title">Grade of Concrete</td>
                  <td className="maindata">{foundation?.conGrade}</td>
                  <td className="remarks">{foundation?.conGradeRemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">Type of Foundations</td>
                  <td className="maindata">{foundation?.type}</td>
                  <td className="remarks">{foundation?.typeRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Depth of foundation from ground level to the bottom of
                    footing (in m)
                  </td>
                  <td className="maindata">{foundation?.depthGm}</td>
                  <td className="remarks">{foundation?.depthGmRemark}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    Minimum percentage of reinforcement provided
                  </td>
                  <td className="maindata">{foundation?.minPerRein}</td>
                  <td className="remarks">{foundation?.minPerReinRemark}</td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ height: 20 }}></td>
                </tr>
                <tr>
                  <td colSpan={4} className="heading">
                    Beam Design
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td className="title">Grade of Concrete</td>
                  <td className="maindata">{beamDesign?.conGrade}</td>
                  <td className="remarks">{beamDesign?.conGradeRemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">Effective depth of beam (d) (in mm)</td>
                  <td className="maindata">{beamDesign?.depthBeamMM}</td>
                  <td className="remarks">{beamDesign?.depthBeamMMRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">Critical span (L) (in mm)</td>
                  <td className="maindata">{beamDesign?.criticalLmm}</td>
                  <td className="remarks">{beamDesign?.criticalLmmRemark}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">Support condition</td>
                  <td className="maindata">{beamDesign?.support}</td>
                  <td className="remarks">{beamDesign?.supportRemark}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">Basic (L/d) ratio</td>
                  <td className="maindata">{beamDesign?.basicLD}</td>
                  <td className="remarks">{beamDesign?.basicLDRemark}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">
                    Calculated Critical Span to effective depth ratio (L/d)
                  </td>
                  <td className="maindata">{beamDesign?.calCriSpan}</td>
                  <td className="remarks">{beamDesign?.calCriSpanRemark}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">
                    Minimum percentage of reinforcement provided
                  </td>
                  <td className="maindata">{beamDesign?.minPerRein}</td>
                  <td className="remarks">{beamDesign?.minPerReinRemark}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ height: "95vh", padding: "60px 90px 150px 100px" }}>
            <p>
              Project Id: <span>{projectId}</span>
            </p>
            <h3>Column Design</h3>
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
                  <td>1</td>
                  <td className="title">Grade of Concrete</td>
                  <td className="maindata">{columnDesign?.conGrade}</td>
                  <td className="remarks">{columnDesign?.conGradeRemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">Critical column length</td>
                  <td className="maindata">{columnDesign?.cricolLen}</td>
                  <td className="remarks">{columnDesign?.cricolLenRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">Minimum size of column (in mm)</td>
                  <td className="maindata">{columnDesign?.minColmm}</td>
                  <td className="remarks">{columnDesign?.minColmmRemark}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    Short column effect considered or not
                  </td>
                  <td className="maindata">
                    {columnDesign?.minColmm} x {columnDesign?.minColmm2}
                  </td>
                  <td className="remarks">{columnDesign?.minColmmRemark}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">
                    Minimum area of longitudinal reinforcement provided (%)
                  </td>
                  <td className="maindata">{columnDesign?.minLongit}</td>
                  <td className="remarks">{columnDesign?.minLongitRemark}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">
                    Whether sample design calculations of foundations, columns,
                    beams and slabs are submitted
                  </td>
                  <td className="maindata">{columnDesign?.isFCBSsub}</td>
                  <td className="remarks">{columnDesign?.isFCBSsubRemark}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">
                    Minimum percentage of reinforcement provided
                  </td>
                  <td className="maindata">{columnDesign?.minPerRein}</td>
                  <td className="remarks">{columnDesign?.minPerReinRemark}</td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ height: 20 }}></td>
                </tr>
                <tr>
                  <td colSpan={4} className="heading">
                    Slab Design
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td className="title">Grade of Concrete</td>
                  <td className="maindata">{slabDesign?.conGrade}</td>
                  <td className="remarks">{slabDesign?.conGradeRemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">Boundary Condition of Slab</td>
                  <td className="maindata">{slabDesign?.ConSlab}</td>
                  <td className="remarks">{slabDesign?.ConSlabRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Short Span of Critical Slab Panel (L) (in mm)
                  </td>
                  <td className="maindata">{slabDesign?.sSpanLmm}</td>
                  <td className="remarks">{slabDesign?.sSpanLmmRemark}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    Effective Thickness of Slab (d) (in mm)
                  </td>
                  <td className="maindata">{slabDesign?.ETSlabDmm}</td>
                  <td className="remarks">{slabDesign?.ETSlabDmmRemark}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">
                    Calculated short span to effective depth ratio (L/d) for
                    corresponding slab
                  </td>
                  <td className="maindata">{slabDesign?.EDRLd}</td>
                  <td className="remarks">{slabDesign?.EDRLdRemark}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">Basic (L/d) ratio</td>
                  <td className="maindata">{slabDesign?.BasicLdRatio}</td>
                  <td className="remarks">{slabDesign?.BasicLdRatioRemark}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">
                    Required modification factor for tension reinforcement
                  </td>
                  <td className="maindata">{slabDesign?.ReqMod}</td>
                  <td className="remarks">{slabDesign?.ReqModRemark}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="title">
                    Required Tension Reinforcement (Ast) Percentage (%) for
                    short span bottom reinforcement
                  </td>
                  <td className="maindata">{slabDesign?.reqTRAst}</td>
                  <td className="remarks">{slabDesign?.reqTRAstRemark}</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td className="title">
                    Provided Tension Reinforcement (Ast) Percentage (%) for
                    short span bottom reinforcement
                  </td>
                  <td className="maindata">{slabDesign?.proTRAst}</td>
                  <td className="remarks">{slabDesign?.proTRAstRemark}</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td className="title">
                    Actual Modification factor for tension reinforcement
                  </td>
                  <td className="maindata">{slabDesign?.actualMod}</td>
                  <td className="remarks">{slabDesign?.actualModRemark}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ height: "95vh", padding: "60px 90px 150px 100px" }}>
            <p>
              Project Id: <span>{projectId}</span>
            </p>
            <h3>Floor</h3>
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
                  <td>1</td>
                  <td className="title">Ground Floor - Wall height (in m)</td>
                  <td className="maindata">{floor?.gfloorM}</td>
                  <td className="remarks">{floor?.gfloorMRemark}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">
                    Ground Floor - Wall thickness (in mm)
                  </td>
                  <td className="maindata">{floor?.gFloorMM}</td>
                  <td className="remarks">{floor?.gFloorMMRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Ground Floor - Maximum Length between cross wall (in m)
                  </td>
                  <td className="maindata">{floor?.maxLenCrossm}</td>
                  <td className="remarks">{floor?.maxLenCrossmRemark}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">First Floor - Wall height (in m)</td>
                  <td className="maindata">{floor?.OfloorWalM}</td>
                  <td className="remarks">{floor?.OfloorWalMRemark}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">
                    First Floor - Wall thickness (in mm)
                  </td>
                  <td className="maindata">{floor?.OfloorWalMM}</td>
                  <td className="remarks">{floor?.OfloorWalMMRemark}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">
                    First Floor - Maximum Length between cross wall (in m)
                  </td>
                  <td className="maindata">{floor?.OCrossM}</td>
                  <td className="remarks">{floor?.OCrossMRemark}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="title">Second Floor - Wall height (in m)</td>
                  <td className="maindata">{floor?.TWallM}</td>
                  <td className="remarks">{floor?.TWallMRemark}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="title">
                    Second Floor - Wall thickness (in mm)
                  </td>
                  <td className="maindata">{floor?.TWallTmm}</td>
                  <td className="remarks">{floor?.TWallTmmRemark}</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td className="title">
                    Second Floor - Maximum Length between cross wall (in m)
                  </td>
                  <td className="maindata">{floor?.TCrossM}</td>
                  <td className="remarks">{floor?.TCrossMRemark}</td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ height: 20 }}></td>
                </tr>
                <tr>
                  <td colSpan={4} className="heading">
                    Opening Details
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td className="title">
                    Least distance from inside corner (in mm)
                  </td>
                  <td className="maindata">{openingDetails?.leastDisMM}</td>
                  <td className="remarks">
                    {openingDetails?.leastDisMMRemark}
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="title">
                    Maximum percentage of opening in any wall with respect to
                    its length
                  </td>
                  <td className="maindata">{openingDetails?.maxPerOp}</td>
                  <td className="remarks">{openingDetails?.maxPerOpRemark}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="title">
                    Does the Vertical distance between two opening less than 600
                    mm or 1/2 of width of smaller opening?
                  </td>
                  <td className="maindata">{openingDetails?.dis600mm12}</td>
                  <td className="remarks">
                    {openingDetails?.dis600mm12Remark}
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="title">
                    Does the horizontal distance between any two opening less
                    than 600 mm or 1/2 of height of shorter opening?
                  </td>
                  <td className="maindata">{openingDetails?.horDis60012}</td>
                  <td className="remarks">
                    {openingDetails?.horDis60012Remark}
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="title">Thickness of lintel band(mm)</td>
                  <td className="maindata">{openingDetails?.lintelThick}</td>
                  <td className="remarks">
                    {openingDetails?.lintelThickRemark}
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="title">Thickness of sill band(mm)</td>
                  <td className="maindata">{openingDetails?.sillBand}</td>
                  <td className="remarks">{openingDetails?.sillBandRemark}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PDFstructural;
