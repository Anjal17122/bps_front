import { useEffect, useState } from "react";
import { imgFolders, IMG_GET_URL } from "../../Services/Api";
import { LandLog } from "../../Services/LogsService/LogsService";
import "../../Assets/scss/ViewLandLog.scss";
import MyAvatar from "../../Components/Common/Avatar/Avatar";
import { convertToRopani } from "../../pages/Consultant/ProjectCreate/Project/LandInfo/convertToRopani";
import { convertToBiggha } from "../../pages/Consultant/ProjectCreate/Project/LandInfo/convertToBiggha";

interface Props {
  data: LandLog;
}

const LandLogCard = ({ data }: Props) => {
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
  return (
    <div
      className="LandInfodiv EditAddDiv"
      style={{ backgroundColor: "rgb(250, 250, 250)" }}
    >
      <div className="paddAll20">
        <MyAvatar
          src={IMG_GET_URL + `/${imgFolders.lalpurja}/` + data.landImageName}
        />
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
            <b>ToleNep: </b> {data.toleNep}
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
            <MyAvatar
              src={IMG_GET_URL + `/${imgFolders.traceNaksa}/` + data.traceNaksa}
            />
            <span>Trace Naksa</span>
          </div>
          <div>
            <MyAvatar
              src={IMG_GET_URL + `/${imgFolders.tiroRasid}/` + data.tiroRasid}
            />
            <span>तिरो तिरेको रसिद</span>
          </div>
          <div>
            <MyAvatar
              src={
                IMG_GET_URL +
                `/${imgFolders.charkillaLetter}/` +
                data.charkillaLetter
              }
            />
            <span>Charkilla Letter</span>
          </div>
        </div>
        <div id="secondRow">
          <div id="areaWrapper">
            <div id="area">
              <h4>Square Meter: {data.ropani}</h4>
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

export default LandLogCard;
