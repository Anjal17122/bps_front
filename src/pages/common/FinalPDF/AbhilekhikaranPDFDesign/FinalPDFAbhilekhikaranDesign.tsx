import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import { NoticePDFdata } from "../../../../Services/PDFService";
import { municipalityDetails } from "../../../../constants/constants";
import { Document, Font, Image, Page, Text, View } from "@react-pdf/renderer";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { imgFolders, IMG_GET_URL } from "../../../../Services/Api";
import { addSlash } from "./AbhilekhikaranHelper";
import { FloorRow } from "../PDFtypes";

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

const FinalPDFAbhilekhikaranDesign = ({ data, backendData, floors }: Props) => {
  // Register font

  Font.register({
    family: "Noto",
    src: Noto,
  });
  const sabikLand =
    backendData?.lands.length > 1 ? backendData?.lands[0]?.sabik : null;

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

  const permaAdd = backendData.applicant?.addresses.filter(
    (addr) => addr.type === "PERMANENT"
  );

  const groundFloorArea = () => {
    const gfloor = floors.filter((floor) => floor.name == "जमिन तल्ला");
    return gfloor.length ? gfloor[0]?.ncT ?? 0 : 0;
  };

  const area = ConvertToNepali(
    backendData.lands
      .map((land) => land.ropani)
      ?.toString()
      .replace(/[\]"]+/g, "")
  );

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
            <Text style={Underline}>
              {sabikLand ? "साबिक " + sabikLand : null}{" "}
            </Text>
            &nbsp;
            <Text style={Underline}> {municipalityDetails.province}</Text>&nbsp;
            प्रदेश <Text style={Underline}>{municipalityDetails.district}</Text>
            &nbsp; जिल्ला&nbsp;
            <Text style={Underline}>{municipalityDetails.letterheadTitle}</Text>
            &nbsp; वडा नं{" "}
            <Text style={Underline}>
              {ConvertToNepali(permaAdd[0]?.ward?.name)} {permaAdd[0]?.toleNep}
            </Text>{" "}
            टोलमा स्थाई बसोबास भइ हाल लुम्बिनी प्रदेश रुपन्देही जिल्ला बुटवल
            उपमहानगरपालिका वडा नं १७ मोतिपुर टोलमा बसोबास गर्ने श्रीकृष्ण खनालले
            साबिक {sabikLand} र हाल कित्ता नं&nbsp;
            <Text style={Underline}>{ConvertToNepali(kittaNo)}</Text> सिट नं
            २(ख) को क्षेत्रफल <Text style={Underline}>{area} sq. m.</Text> वर्ग
            मिटर को जग्गामा जमिन तल्लाको&nbsp;
            <Text style={Underline}>{ConvertToNepali(groundFloorArea())}</Text>
            &nbsp; वर्ग फिट र तल्ला संख्या&nbsp;
            <Text style={Underline}>{ConvertToNepali(floors.length)}</Text> भएको
            घरको अभिलेखिकरण तथा नक्सा प्रमाणीकरण गरि पाउँ भनि दिएको निवेदन
            समेतको आधारमा जाँचबुझ गरि भवन अभिलेखीकरण तथा नक्सा प्रमाणीकरण
            प्रमाणपत्र प्रदान गरिएको छ |
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
              color: "red",
              fontSize: 15,
            }}
          >
            चार किल्ला:
          </Text>
        </View>
        {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            paddingLeft: 60,
            fontSize: 11,
          }}
        >
          <Text style={{ width: 75 }}>सि नं:</Text>
          <Text style={{ width: 75 }}>कि नं:</Text>
          <Text style={{ width: 75 }}>पूर्व:</Text>
          <Text style={{ width: 75 }}>पश्चिम:</Text>
          <Text style={{ width: 75 }}>उत्तर:</Text>
          <Text style={{ width: 75 }}>दक्षिण:</Text>
        </View> */}
        {charkillaMapNotice(backendData, kittaNo)}
        <View
          style={{
            position: "absolute",
            bottom: 100,
            flexDirection: "row",
            alignItems: "flex-start",
            width: "100%",
            paddingTop: 30,
            justifyContent: "flex-start",
            paddingLeft: 70,
          }}
        >
          <View style={{ paddingRight: 80 }}>
            <Text style={{ paddingBottom: 10, color: "red" }}>तयार गर्ने:</Text>
            <Text style={{ paddingBottom: 10 }}>
              नाम:
              {window.globalConfig.hasOwnProperty("subengineer") ? (
                <Text style={Underline}>{window.globalConfig.subengineer}</Text>
              ) : (
                ".................................."
              )}
            </Text>
            <Text style={{ paddingBottom: 15 }}>
              {"पद​:"}
              {window.globalConfig.hasOwnProperty("preparedBy") ? (
                <Text style={Underline}> {window.globalConfig.preparedBy}</Text>
              ) : (
                ".................................."
              )}
            </Text>
            <Text style={{ paddingBottom: 10 }}>
              सहि: ..................................
            </Text>
            <Text style={{ paddingBottom: 10 }}>
              मिति: ..................................
            </Text>
          </View>
          <View>
            <Text style={{ paddingBottom: 10, color: "red" }}>
              स्विक्रित​ गर्ने:
            </Text>
            <Text style={{ paddingBottom: 10 }}>
              नाम:
              {window.globalConfig.hasOwnProperty("engineer") ? (
                <Text style={Underline}> {window.globalConfig.engineer} </Text>
              ) : (
                ".................................."
              )}
            </Text>
            <Text style={{ paddingBottom: 15 }}>
              {"पद​:"}
              {window.globalConfig.hasOwnProperty("approvedBy") ? (
                <Text style={Underline}>{window.globalConfig.approvedBy}</Text>
              ) : (
                ".................................."
              )}
            </Text>
            <Text style={{ paddingBottom: 10 }}>
              सहि: ..................................
            </Text>
            <Text style={{ paddingBottom: 10 }}>
              मिति: ..................................
            </Text>
          </View>
        </View>
        {window.globalConfig.hasOwnProperty("chandrapur") ? (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: 10,
              color: "red",
              fontSize: 11,
              textAlign: "center",
              borderTop: "1px solid red",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              &quot;सफा र सभ्य चन्द्रपुर, हाम्रो चन्द्रपुर राम्रो
              चन्द्रपुर&quot;
            </Text>
            <Text>www.chandrapurmun.gov.np</Text>
            <Text>Email:{municipalityDetails.email}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

export default FinalPDFAbhilekhikaranDesign;

export const charkillaMapNotice = (data: NoticePDFdata, kittaNo: string) => {
  const Charkillas = data.lands.map((landddd) => landddd.charKillas).flat();

  const _getName = (direction: "East" | "West" | "North" | "South"): string => {
    const oneKilla = Charkillas.filter(
      (charkill) => charkill.direction === direction
    );
    return oneKilla.length
      ? oneKilla[0].landscapeType === "Road"
        ? "बाटो"
        : oneKilla[0].nameNep
      : "";
  };

  return (
    <>
      <View style={{ paddingBottom: 7, fontSize: 10, flexDirection: "row" }}>
        <Text style={{ width: 70, paddingRight: 8 }}>कि नं:</Text>
        <Text style={{ width: 90, paddingRight: 8 }}>पूर्व:</Text>
        <Text style={{ width: 90, paddingRight: 8 }}>पश्चिम:</Text>
        <Text style={{ width: 90, paddingRight: 8 }}>उत्तर:</Text>
        <Text style={{ width: 90, paddingRight: 8 }}>दक्षिण:</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 10, width: 70, paddingRight: 8 }}>
          {ConvertToNepali(kittaNo)}
        </Text>
        <Text style={{ fontSize: 10, width: 90, paddingRight: 8 }}>
          {_getName("East")}
        </Text>
        <Text style={{ fontSize: 10, width: 90, paddingRight: 8 }}>
          {_getName("West")}
        </Text>
        <Text style={{ fontSize: 10, width: 90, paddingRight: 8 }}>
          {_getName("North")}
        </Text>
        <Text style={{ fontSize: 10, width: 90, paddingRight: 8 }}>
          {_getName("South")}
        </Text>
      </View>
    </>
  );
};
