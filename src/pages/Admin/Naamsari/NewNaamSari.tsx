import { Image } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_GET_URL, imgFolders } from "../../../Services/Api";
import "../../../Assets/scss/NewNaamSari.scss";
import ImagePopup from "../../../Common/ImagePopup/ImagePopup";
import Person from "../../Consultant/ProjectCreate/PersonAdd/Person";
import PageHeader from "../../../Components/Common/PageHeader/PageHeader";

interface Props {
  type: "owner" | "houseOwner";
}

const NewNaamSari = ({ type = "owner" }: Props) => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [imgsrc, setImgsrc] = useState("");
  const landNaamsari = JSON.parse(localStorage.getItem("landNaamsari") ?? "");

  // useEffect(() => {
  //   return () => {};
  // }, []);

  // function onViewCitizenS(imgsrc: string) {
  //   setImgsrc(IMG_GET_URL + `/${imgFolders.citizenship}/` + imgsrc);
  //   setModal(true);
  // }
  // function onViewPhoto(imgsrc: string) {
  //   setImgsrc(IMG_GET_URL + `/${imgFolders.person}/` + imgsrc);
  //   setModal(true);
  // }

  const Owner = landNaamsari?.[type];
  return (
    <div className="NewNaamSari">
      <ImagePopup
        open={modal}
        imgSrc={imgsrc}
        onCancel={() => setModal(false)}
      />
      <PageHeader title="Naam Sari" subTitle="Add new Land Owner Details" />
      <div className="Content">
        <div className="OldDetails">
          {landNaamsari ? (
            <div>
              <h2>Old Details:</h2>
              <div className="idDetails">
                Project Id: <b>{params.pid}</b>
                &nbsp;&nbsp;&nbsp; Land Id: <b>{params.landid}</b>
              </div>
              <div className="landownerdiv">
                <Image
                  width={120}
                  src={
                    IMG_GET_URL +
                    `/${imgFolders.person}/` +
                    Owner?.photoFileName
                  }
                />
                {/* <MyAvatar
                    src={
                      IMG_GET_URL +
                      `/${imgFolders.person}/` +
                      Owner?.photoFileName
                    }
                  /> */}

                <div className="textContent">
                  <div>
                    <div>
                      <b>Name: </b> {Owner?.nameEng}
                    </div>
                    <div>
                      <b>Phone: </b> {Owner?.primaryPhone}
                    </div>
                    <div>
                      <b>Citizenship No: </b> {Owner?.citizenshipNo}
                    </div>
                    <div>
                      <b>View Citizenship: </b>
                      <Image
                        width={60}
                        src={
                          IMG_GET_URL +
                          `/${imgFolders.citizenship}/` +
                          Owner?.photoFileName
                        }
                      />
                    </div>
                    <div>
                      <b>Gender: </b> {Owner?.gender}
                    </div>
                    <div>
                      <b>Father name: </b> {Owner?.fatherNameEng}
                    </div>
                    <div>
                      <b>Grand Father name: </b> {Owner?.grandfatherNameEng}
                    </div>
                  </div>
                  <div>
                    <div>
                      <b>नाम: </b> {Owner?.nameNep}
                    </div>
                    <div>
                      <b>Email: </b> {Owner?.email}
                    </div>
                    <div>
                      <b>Citizenship Issue Date: </b> {Owner?.citizenIssueDate}
                    </div>
                    <div>
                      <b>Citizenship Issue District: </b>{" "}
                      {Owner?.citizenIssueDist}
                    </div>
                    <div>
                      <b>Marital Status: </b> {Owner?.maritalStatus}
                    </div>
                    <div>
                      <b>बुवाको नाम: </b> {Owner?.fatherNameNep}
                    </div>
                    <div>
                      <b>हजुर बुवाको नाम: </b> {Owner?.grandfatherNameNep}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <h2 className="newowner">Add New Owner:</h2>
        <Person
          key={1}
          pId={params.pid ?? ""}
          addPersonUrl={
            `/land/perma/change/${
              type === "owner" ? "land" : "home"
            }owner?id=` + params.landid
          }
        />
      </div>
    </div>
  );
};

export default NewNaamSari;
