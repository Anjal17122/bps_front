import React, { useEffect, useState } from "react";
import {
  imgFolders,
  IMG_GET_URL,
  PDF_URL,
} from "../../../../../../Services/Api";
import { Land } from "../../../../../../Services/CreateProjectService";
import { EyeTwoTone } from "@ant-design/icons";
import ImagePopup from "../../../../../../Common/ImagePopup/ImagePopup";
import ViewLandLog from "../../../../../../Common/ViewLandLog/ViewLandLog";
import { ifCon } from "../ViewProject/ViewProject";
import MyAvatar from "../../../../../../Components/Common/Avatar/Avatar";
import { convertToRopani } from "../../../../../Consultant/ProjectCreate/Project/LandInfo/convertToRopani";
import { convertToBiggha } from "../../../../../Consultant/ProjectCreate/Project/LandInfo/convertToBiggha";
import { checkIfPDF } from "../../../../../Consultant/ProjectCreate/Project/LandInfo/LandCard";

interface Props {
  data: Land;
  pid: string;
}

const LandCard = ({ data, pid }: Props) => {
  const [ropani, setRopani] = useState({
    ropani: 0,
    aana: 0,
    paisa: 0,
    daam: 0,
  });

  const [biggha, setBiggha] = useState({ biggha: 0, kattha: 0, dhur: 0 });

  useEffect(() => {
    convertToBiggha(setBiggha, parseInt(data.ropani));
    convertToRopani(setRopani, parseInt(data.ropani));
    return () => {
      setRopani({
        ropani: 0,
        aana: 0,
        paisa: 0,
        daam: 0,
      });
      setBiggha({ biggha: 0, kattha: 0, dhur: 0 });
    };
  }, []);

  const [modal, setModal] = useState(false);
  const [imgsrc, setImgsrc] = useState("");

  function viewTraceNaksa(imgsrc: string) {
    setImgsrc(IMG_GET_URL + "/" + imgFolders.traceNaksa + "/" + imgsrc);
    setModal(true);
  }
  function viewTiroRasid(imgsrc: string) {
    setImgsrc(IMG_GET_URL + "/" + imgFolders.tiroRasid + "/" + imgsrc);
    setModal(true);
  }
  function onViewPhoto(imgsrc: string) {
    setImgsrc(IMG_GET_URL + "/" + imgFolders.lalpurja + "/" + imgsrc);
    setModal(true);
  }
  function viewCharkillaLetter(imgsrc: string) {
    setImgsrc(IMG_GET_URL + "/" + imgFolders.charkillaLetter + "/" + imgsrc);
    setModal(true);
  }
  return (
    <div className="LandInfodiv EditAddDiv">
      <ImagePopup
        open={modal}
        imgSrc={imgsrc}
        onCancel={() => {
          setModal(false);
          setImgsrc("");
        }}
      />
      <div className="paddAll20 hoverOnPoint">
        {checkIfPDF(data.landImageName) ? (
          <a
            target={"_blank"}
            rel="noreferrer noopener"
            href={
              PDF_URL + "/" + imgFolders.lalpurja + "/" + data.landImageName
            }
          >
            लालपुर्जा <EyeTwoTone style={{ fontSize: 14 }} />
          </a>
        ) : (
          <MyAvatar
            onClick={() => onViewPhoto(data.landImageName)}
            src={IMG_GET_URL + `/${imgFolders.lalpurja}/` + data.landImageName}
          />
        )}
        {ifCon() ? null : <ViewLandLog landId={data.id} />}
      </div>
      <div id="content">
        <div id="details">
          <span>
            <b>Map Sheet no: </b> {data.mapSheetNo}
          </span>
          <span>
            <b>Parcel Kitta No: </b> {data.landParcelNo}
          </span>
          <span>
            <b>Ward: </b> {data.wardName}
          </span>
          <span>
            <b>{"टोल​:"} </b> {data.toleNep}
          </span>
          <span>
            <b>Tole: </b> {data.toleEng}
          </span>
        </div>
        <div
          id="secondRow"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
            width: "60%",
          }}
        >
          <div>
            <span>View Trace Naksa</span> : &nbsp;&nbsp;
            {checkIfPDF(data.traceNaksa) ? (
              <a
                target={"_blank"}
                rel="noreferrer noopener"
                href={
                  PDF_URL + "/" + imgFolders.traceNaksa + "/" + data.traceNaksa
                }
              >
                <EyeTwoTone style={{ fontSize: 18 }} />
              </a>
            ) : (
              <span
                className="hoverOnPoint"
                onClick={() => viewTraceNaksa(data.traceNaksa)}
              >
                <EyeTwoTone style={{ fontSize: 18 }} />
              </span>
            )}
          </div>
          <div>
            <span>View तिरो तिरेको रसिद</span> : &nbsp;&nbsp;
            {checkIfPDF(data.tiroRasid) ? (
              <a
                target={"_blank"}
                rel="noreferrer noopener"
                href={
                  PDF_URL + "/" + imgFolders.tiroRasid + "/" + data.tiroRasid
                }
              >
                <EyeTwoTone style={{ fontSize: 18 }} />
              </a>
            ) : (
              <span
                className="hoverOnPoint"
                onClick={() => viewTiroRasid(data.tiroRasid)}
              >
                <EyeTwoTone style={{ fontSize: 18 }} />
              </span>
            )}
          </div>
          <div>
            <span>View Charkilla</span> : &nbsp;&nbsp;
            {checkIfPDF(data.charkillaLetter) ? (
              <a
                target={"_blank"}
                rel="noreferrer noopener"
                href={
                  PDF_URL +
                  "/" +
                  imgFolders.charkillaLetter +
                  "/" +
                  data.charkillaLetter
                }
              >
                <EyeTwoTone style={{ fontSize: 18 }} />
              </a>
            ) : (
              <span
                className="hoverOnPoint"
                onClick={() => viewCharkillaLetter(data.charkillaLetter)}
              >
                <EyeTwoTone style={{ fontSize: 18 }} />
              </span>
            )}
          </div>
          <div>
            <span>Square Meter:</span> &nbsp;&nbsp; <b>{data.ropani}</b>
          </div>
          <div>
            <span>साविक:</span> &nbsp;&nbsp; <b>{data?.sabik}</b>
          </div>
        </div>
        <div id="secondRow">
          <div id="areaWrapper">
            <div id="area">
              <h4>Area</h4>
            </div>
            <div id="details">
              <span>
                <b>Ropani: </b> {ropani.ropani}
              </span>
              <span>
                <b>Aana: </b> {ropani.aana}
              </span>

              <span>
                <b>Paisa: </b> {ropani.paisa}
              </span>
              <span>
                <b>Daam: </b> {ropani.daam}
              </span>
            </div>
            <div id="details">
              <span>
                <b>Biggha: </b> {biggha.biggha}
              </span>
              <span>
                <b>Kattha: </b> {biggha.kattha}
              </span>
              <span>
                <b>Dhur: </b> {biggha.dhur}
              </span>
            </div>
          </div>
          <div id="remarks">
            Remarks: <div>{data.remarks}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandCard;
