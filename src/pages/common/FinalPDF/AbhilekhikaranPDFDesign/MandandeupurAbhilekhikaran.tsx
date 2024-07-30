import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import { NoticePDFdata } from "../../../../Services/PDFService";
import { municipalityDetails } from "../../../../constants/constants";
import { Document, Font, Image, Page, Text, View } from "@react-pdf/renderer";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { imgFolders, IMG_GET_URL } from "../../../../Services/Api";
import { addSlash } from "./AbhilekhikaranHelper";
import { FloorRow } from "../PDFtypes";
import {
  checkSetback,
  getAddress,
  getHouseOwnerAndLandOwnerName,
} from "./mandandeupurHelper";
import { findHiAndLow, underline } from "../helper";
import {
  direction,
  landscape,
} from "../../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import { charkillaMapNotice } from "../NoticeDhulikhel/NoticeDesign15Final";

export const nepalifyOptions = {
  layout: "traditional",
};

interface Props {
  data: {
    chalanino: string;
    patrasankhya: string;
    date: string;
  };
  backendData: NoticePDFdata;
  floors: FloorRow[];
}
export const Underline: {
  textDecoration: "underline";
  textDecorationStyle: "dotted";
} = {
  textDecoration: "underline",
  textDecorationStyle: "dotted",
};

const MandandeupurAbhilekhikaran = ({ data, backendData, floors }: Props) => {
  // Register font

  Font.register({
    family: "Noto",
    src: Noto,
  });

  const names = getHouseOwnerAndLandOwnerName(backendData);

  const tempAdd = getAddress(backendData, "CURRENT");
  const permaAdd = getAddress(backendData, "PERMANENT");

  const sabikLand =
    backendData?.lands?.length > 0 ? backendData?.lands[0]?.sabik : null;
  console.log({ sabikLand: backendData.lands[0].sabik });

  const chalaniNo = ConvertToNepali(addSlash(data.chalanino));
  const patraSankhya = ConvertToNepali(addSlash(data.patrasankhya));

  const pubDate = ConvertToNepali(data.date);
  const landOwners = backendData?.lands
    .map((lannnddd) => lannnddd.landOwner)
    .flat();

  // const wardNo = ConvertToNepali(extractNum(backendData.lands[0].wardName));
  const kittaNo = ConvertToNepali(
    backendData.lands
      .map((land) => land.landParcelNo)
      ?.toString()
      .replace(/[\]"]+/g, "")
  );
  const mapsheetNo = ConvertToNepali(
    backendData.lands
      .map((land) => land.mapSheetNo)
      ?.toString()
      .replace(/[\]"]+/g, "")
  );
  // const permaAdd = backendData.applicant?.addresses.filter(
  //   (addr) => addr.type === "PERMANENT"
  // );

  const groundFloorArea = () => {
    const gfloor = floors.filter((floor) => floor.name == "जमिन तल्ला");
    let area;
    if (gfloor.length) {
      area = gfloor[0]?.countable ?? 0;
    } else {
      area = 0;
    }
    return area;
  };

  const area = ConvertToNepali(
    backendData.lands
      .map((land) => land.ropani)
      ?.toString()
      .replace(/[\]"]+/g, "")
  );

  const myFloors = () => {
    const myfloor = floors.length - 1;
    const { highest, lowest } = findHiAndLow(floors);
    if (highest || lowest) {
      if (lowest / highest < 0.84) {
        return myfloor + 0.5;
      } else {
        return myfloor + 1;
      }
    } else {
      return 0;
    }
  };

  const charkillas = backendData?.lands
    ?.map((landddd) => landddd.charKillas)
    .flat();

  const getSetback = (): string => {
    const filtered = charkillas.filter(
      (item) =>
        parseFloat(item?.standardSetBack ?? "0") >
        parseFloat(item?.actualSetBack ?? "0")
    );
    const data = filtered.map(
      (item) =>
        ` ${
          direction.find((direct) => direct.value === item.direction)
            ?.nepaliFull ?? ""
        } ${
          landscape.find((data) => data.value === item.landscapeType)?.nepali ??
          ""
        }: ${ConvertToNepali(
          (
            parseFloat(item?.standardSetBack ?? "0") -
            parseFloat(item?.actualSetBack ?? "0")
          )
            .toFixed(2)
            .replaceAll(".00", "")
        )} ${item.actualSetBack?.replace(/[0-9]/g, "")} `
    );
    return JSON.stringify(data).replaceAll(/[\\[\]"]+/g, "");
  };

  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Noto",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 12,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingBottom: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 25,
          }}
        >
          <View>
            <Image src={GovLogo} style={{ width: 80, height: "auto" }} />
          </View>
          <View
            style={{
              color: "red",

              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text style={{ width: 350, textAlign: "center", fontSize: 24 }}>
              {municipalityDetails.letterheadTitle}
            </Text>
            <Text
              style={{
                width: 350,
                textAlign: "center",
                fontSize: 16,
                marginLeft: 0,
              }}
            >
              {municipalityDetails.letterheadType}
            </Text>
            <Text style={{ width: 350, textAlign: "center", fontSize: 16 }}>
              {municipalityDetails.letterheadAddress1}
            </Text>
            <Text style={{ width: 350, textAlign: "center", fontSize: 16 }}>
              {municipalityDetails.letterheadAddress2}
            </Text>
          </View>
          <View style={{ width: 80 }}></View>
        </View>

        <View
          style={{
            paddingTop: 20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 40,
          }}
        >
          <Text style={{ marginTop: -30 }}>मिति : {pubDate}</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: -30,
            paddingLeft: 50,
          }}
        >
          <Text style={{ paddingBottom: 4 }}>
            नक्सा नं : .....................
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            ></Text>
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            पत्र संख्या : {patraSankhya}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            ></Text>
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            चलानी नं : {chalaniNo}
            <Text></Text>
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: -35,
            paddingRight: 40,
            paddingBottom: 10,
          }}
        >
          {landOwners.map((landowne) => (
            <Image
              key={landowne.id}
              src={{
                uri:
                  IMG_GET_URL +
                  `/${imgFolders.person}/${landowne.owner.photoFileName}`,
                method: "GET",
                headers: "",
                body: "",
              }}
              style={{
                // transform: "rotate(90deg)",
                width: 60,
                height: 60,
                marginRight: 10,
                border: "1.5px solid black",
              }}
            />
          ))}
        </View>
        <View>
          <Text
            style={{
              paddingBottom: 20,
              paddingTop: 20,
              fontSize: 20,
              color: "red",
              textDecoration: "underline",
            }}
          >
            भवन अभिलेखिकरण तथा नक्सा प्रमाणीकरण प्रमाणपत्र
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 60,
            paddingRight: 60,
            lineHeight: 1.7,
            textAlign: "justify",
          }}
        >
          <Text>
            {underline(permaAdd.province)} {underline(permaAdd.district)} &nbsp;
            {underline(permaAdd.municipality)} &nbsp; वडा नं{" "}
            {underline(ConvertToNepali(permaAdd.ward))}{" "}
            {underline(permaAdd.tole)}
            टोलमा स्थाई बसोबास भइ हाल {underline(tempAdd.province)}{" "}
            {underline(tempAdd.district)} {underline(tempAdd.municipality)} वडा
            नं {underline(ConvertToNepali(tempAdd.ward))},{" "}
            {underline(tempAdd.tole)} टोलमा बसोबास गर्ने {underline(names)}ले
            साबिक {underline(sabikLand ?? "")}, कित्ता नं&nbsp;
            {underline(ConvertToNepali(kittaNo))} सिट नं{" "}
            {underline(ConvertToNepali(mapsheetNo))} को क्षेत्रफल{" "}
            {underline(area)} वर्ग मिटर को जग्गामा जमिन तल्लाको&nbsp;
            {underline(ConvertToNepali(groundFloorArea()))}
            &nbsp; वर्ग फिट र तल्ला संख्या&nbsp;
            {underline(ConvertToNepali(myFloors()))} भएको घरको अभिलेखिकरण तथा
            नक्सा प्रमाणीकरण गरि पाउँ भनि दिएको निवेदन समेतको आधारमा जाँचबुझ गरि{" "}
            {municipalityDetails.letterheadTitle} भवन निर्माण प्रमाणीकरण
            कार्यविधि २०७५ बमोजिम भवन अभिलेखीकरण तथा नक्सा प्रमाणीकरण प्रमाणपत्र
            प्रदान गरिएको छ |
          </Text>
        </View>
        <View
          style={{
            paddingTop: "10px",
            width: "100%",
            justifyContent: "flex-start",
            paddingLeft: 60,
          }}
        >
          <Text
            style={{
              paddingLeft: -40,
              textAlign: "center",
              paddingBottom: 10,
              // color: "red",
              fontSize: 15,
            }}
          >
            चार किल्ला:
          </Text>
        </View>
        {charkillaMapNotice(backendData, 11)}

        {checkSetback(charkillas) ? null : (
          <View
            style={{
              paddingTop: "20px",
              width: "100%",
              // justifyContent: "flex-start",
              paddingLeft: 60,
            }}
          >
            <Text
              style={{
                fontSize: 13,
              }}
            >
              कैफियत:
            </Text>
            <Text style={{ paddingLeft: 10, paddingRight: 60, fontSize: 12 }}>
              यस न. पा. बाट जारी भएको शहरी योजना तथा भवन निर्माण मापदण्ड अनुरूप
              सडकको केन्द्र बाट​ (सेट ब्याक​ सहित​) {underline(getSetback())}
              दूरी नपुगेको
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            paddingTop: 35,
            paddingLeft: 80,
            position: "absolute",
            bottom: 25,
            fontSize: 11,
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text>..............................</Text>
            <Text style={{ width: 140 }}>पेश गर्ने </Text>
            <Text style={{ width: 140 }}>अमिन/सर्वेक्षक</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text>.....................</Text>
            <Text style={{ width: 140 }}>जाँ{"च"}​ गर्ने</Text>
            <Text style={{ width: 140 }}>सब-इन्जिनियर</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text>.....................</Text>
            <Text style={{ width: 140, display: "flex", flexDirection: "row" }}>
              (शाखा प्रमु{"ख"}​)
            </Text>
            <Text style={{ width: 140, display: "flex", flexDirection: "row" }}>
              इन्जिनिय{"र"}​
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text>.....................</Text>
            <Text style={{ width: 140 }}>स्वीकृत गर्ने</Text>
            <Text style={{ width: 140 }}>(प्रमुख)</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MandandeupurAbhilekhikaran;
