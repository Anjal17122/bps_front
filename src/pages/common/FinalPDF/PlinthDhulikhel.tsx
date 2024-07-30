import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../Assets/Images/resizednepgov.png";
import { imgFolders, IMG_GET_URL } from "../../../Services/Api";
import { municipalityDetails } from "../../../constants/constants";
import { PDFBodyType } from "./PDFtypes";
import { ConvertToNepali } from "../../../constants/NumberConverter";
import { Underline } from "./AbhilekhikaranPDFDesign/FinalPDFAbhilekhikaranDesign";
import { findHiAndLow, underline } from "./helper";
import {
  direction,
  landscape,
} from "../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import DhulikhelLogo from "../../../Assets/Images/dhulikhel_logo_png.png";
import DhulikhelMapdanda, { MapdandaType } from "./DhulikhelMapdanda";
import { GetMapdandaBody } from "../../../Services/MapdandaService";

interface Props {
  data: {
    chalanino: string;
    patrasankhya: string;
    projectType: string;
    buildingPurpose: string;
  };
  pdfData: PDFBodyType;
  pid?: string;
  mapdandaPid: GetMapdandaBody | undefined;
}

const PlinthDhulikhel = ({ data, pdfData, pid, mapdandaPid }: Props) => {
  Font.register({
    family: "Noto",
    src: Noto,
  });
  Font.register({
    family: "NotoMedium",
    src: NotoMedium,
  });

  // const border = {
  //   width: 110,
  //   border: "1px solid black",
  //   padding: "5px 3px 3px 3px",
  //   marginTop: -1,
  //   marginRight: -1,
  // };

  function checkIfHighTension() {
    if (
      pdfData.charkillas
        .map((charkilla) => charkilla.landscapeType)
        .includes("High Tension Line")
    ) {
      return "भएको";
    } else {
      return "-";
    }
  }
  function checkIfRiver() {
    if (
      pdfData.charkillas
        .map((charkilla) => charkilla.landscapeType)
        .includes("River")
    ) {
      return "भएको";
    } else {
      return "-";
    }
  }

  const kittaNo = underline(ConvertToNepali(pdfData.kittaNo));
  const landArea = underline(
    ConvertToNepali((Number(pdfData.landAreaSqft) * 10.764).toFixed(2))
  );
  const landAddress = underline(
    ConvertToNepali(pdfData.wardName)?.replace("Ward ", "")
  );
  const totalFloorArea = ConvertToNepali(
    pdfData.floors
      .reduce((a, b) => a + b.ncT + b.countable + b.nCNT + b.other + b.prev, 0)
      .toFixed(2)
  );

  const setback = (): string => {
    const regex = /[1-9]/;
    const data = pdfData.charkillas
      .map((charkilla) => {
        if (regex.test(charkilla?.actualSetBack ?? "")) {
          const compass =
            direction.find((direct) => direct.value === charkilla.direction)
              ?.nepali ?? "";
          return (
            `(${compass}) ` +
            landscape.find((myLand) => myLand.value === charkilla.landscapeType)
              ?.nepali +
            ` ${charkilla.actualSetBack}`
          );
        } else {
          return null;
        }
      })
      .filter((item) => item !== null)
      .join();
    return data;
  };

  const stSetback = (): string => {
    const regex = /[1-9]/;
    const data = pdfData.charkillas
      .map((charkilla) => {
        if (regex.test(charkilla?.standardSetBack ?? "")) {
          const compass =
            direction.find((direct) => direct.value === charkilla.direction)
              ?.nepali ?? "";
          return (
            `(${compass}) ` +
            landscape.find((myLand) => myLand.value === charkilla.landscapeType)
              ?.nepali +
            ` ${charkilla.standardSetBack}`
          );
        } else {
          return null;
        }
      })
      .filter((item) => item !== null)
      .join();
    return data;
  };

  const groundCoverage = (): string => {
    const myFloor = pdfData.floors.find((floor) => floor.name === "जमिन तल्ला");
    if (!myFloor) {
      return "-";
    } else {
      const myTotal = (
        myFloor.countable +
        myFloor.ncT +
        myFloor.nCNT +
        myFloor.other +
        myFloor.prev
      ).toString();
      return ConvertToNepali(myTotal) ?? "-";
    }
  };

  const myFloors = () => {
    const floors = pdfData.floors.length - 1;
    const { highest, lowest } = findHiAndLow(pdfData.floors);
    if (highest || lowest) {
      if (lowest / highest < 0.8) {
        return floors + 0.5;
      } else {
        return floors + 1;
      }
    } else {
      return 0;
    }
  };

  const name = underline(pdfData.houseOwnersName ?? pdfData.landOwnersName);
  const buildingType = underline(
    pdfData.buildingStructureType.includes("Frame")
      ? "RCC Frame Structure"
      : pdfData.buildingStructureType
  );
  const mapdanda: MapdandaType = {
    row: pdfData.row,
    groundCoverage: groundCoverage(),
    actualSetback: setback(),
    checkIfHighTension: checkIfHighTension(),
    checkIfRiver: checkIfRiver(),
    myFloors: myFloors(),
    stSetback: stSetback(),
    totalFloorArea: pdfData.floorAreaStandard,
    groundCoverageStandard: pdfData.groundCoverageStandard,
    floorAreaStandard: pdfData.floorAreaStandard,
    far: pdfData.far,
  };

  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontWeight: 400,
          fontFamily: "Noto",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 11,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            height: 100,
            width: "80%",
            paddingBottom: 4,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ paddingTop: 10 }}>
            <Image src={GovLogo} style={{ width: 60, height: "auto" }} />
          </View>
          <View
            style={{
              width: 400,
              color: "red",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
              display: "flex",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 22 }}>
              {municipalityDetails.letterheadTitle}
            </Text>
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              {municipalityDetails.letterheadType}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                marginLeft: -10,
              }}
            >
              {municipalityDetails.letterheadAddress1}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                marginLeft: -7,
              }}
            >
              {municipalityDetails.letterheadAddress2}
            </Text>
          </View>
          <View style={{ width: 60, paddingRight: 40, paddingTop: 5 }}>
            <Image src={DhulikhelLogo} style={{ width: 60, height: 70 }} />
          </View>
        </View>
        <View
          style={{
            marginTop: -20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 40,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          <Text> मिति : {ConvertToNepali(pdfData.date)}</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: -20,
            paddingLeft: 50,
          }}
        >
          <Text style={{ paddingBottom: 4, marginTop: 10 }}>
            पत्र संख्या : {ConvertToNepali(pdfData.patraSankhya)}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {/* {nepalify.format(data.chalanino, nepalifyOptions)} */}
            </Text>
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            चलानी नं : {ConvertToNepali(pdfData.chalaniNo)}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {/* {nepalify.format(data.patrasankhya, nepalifyOptions)} */}
            </Text>
          </Text>
        </View>
        <View>
          <Text
            style={{
              marginTop: -10,
              fontSize: 18,
              fontFamily: "NotoMedium",
              // textDecoration: "underline",
              paddingTop: -5,
              paddingBottom: 4,
            }}
          >
            {/* eslint-disable-next-line no-irregular-whitespace */}
            अस्थायी नक्सा पास प्रमाण-पत्र​
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: -10,
            paddingRight: 30,
            paddingBottom: 0,
          }}
        >
          <View
            style={{
              paddingTop: 10,
              paddingLeft: 50,
              display: "flex",
              flexDirection: "column",
              width: 300,
              height: 50,
            }}
          >
            <Text>
              श्री : &nbsp;&nbsp;&nbsp;&nbsp;
              {name}
            </Text>
            <br />
            <Text>
              ठेगाना:{" "}
              <Text style={Underline}>
                {municipalityDetails.name}, {landAddress}
              </Text>
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            {(pdfData.homeOwners ?? pdfData.landOwners).map((owner) => {
              const imgUrl =
                IMG_GET_URL +
                `/${imgFolders.person}/${owner.owner.photoFileName}`;
              console.log({ imgUrl });
              return (
                <Image
                  key={owner.id}
                  src={{
                    uri: imgUrl,
                    method: "GET",
                    headers: "",
                    body: "",
                  }}
                  style={{
                    width: 60,
                    height: 70,
                    marginRight: 5,
                    border: "1.5px solid black",
                  }}
                />
              );
            })}
          </View>
        </View>

        <View></View>
        <View
          style={{ paddingLeft: 50, paddingRight: 40, textAlign: "justify" }}
        >
          <Text>महोदय,</Text>
          <Text>
            तपाईको धु.न.पा. साविक {pdfData.sabik ?? "...."} हाल वडा नं.{" "}
            {landAddress} कित्ता नं. {kittaNo} क्षेत्रफल {landArea} वर्ग फिट टोल{" "}
            {underline(pdfData.toleNep)} को जग्गामा नक्सा बमोजिम कायम गरी{" "}
            {underline("भवन")} बनाउन पाउँ भन्‍ने नक्सा दरखास्त परेकोले
            प्राविधिकबाट निरिक्षण गर्दा तपसिलमा लेखिए बमोजिमको तपाईको नाउँमा
            बनाउँन {underline("भवन")} को लागि यो नक्सा निम्न उल्लेखित शर्त
            बमोजिम नक्सा पास प्रमाण पत्र र स्वीकृत नक्सा प्रति समेत यसै साथमा
            दिने काम भएको छ । नक्सा पात्र भन्‍दा फेर बदल नहुने गरी तथा
            मापदण्डलाई आँच आउने गरी निर्माण कार्य गरेमा सम्पन्न प्रमाण पत्र दिन
            कार्यालय बाध्य हुने छैन ।
          </Text>
        </View>
        <View
          style={{
            paddingTop: 3,
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text>तपसिल</Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 13,
              fontFamily: "NotoMedium",
            }}
          >
            प्राविधिक प्रतिवेदनको सारांश
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            paddingTop: 5,
            justifyContent: "flex-start",
            paddingLeft: 60,
          }}
        >
          <Text>
            १{")"} &nbsp; भवनको किसिम (प्रयोग): &nbsp;
            <Text style={{ fontSize: 10, ...Underline }}>
              {data.buildingPurpose}
            </Text>
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            २{")"} &nbsp; भवनको किसिम (बनावट): {buildingType}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ३{")"} &nbsp; साइटप्लान अनुसार जग्गाको क्षेत्रफल (sq.ft.) {landArea}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ४{")"} &nbsp; पुरानो भइराखेको घरले चर्चेको क्षेत्रफल
          </Text>
          <DhulikhelMapdanda mapdandaPid={mapdandaPid} pid={pid} />
        </View>
        <View style={{ paddingTop: 8, width: "100%", paddingLeft: 70 }}>
          <Text>
            (ज) घरको (मिटर): लम्बाई{" "}
            {underline(ConvertToNepali(pdfData?.landLength))} &nbsp;&nbsp;&nbsp;
            चौडाई {underline(ConvertToNepali(pdfData?.landWidth))},
            &nbsp;&nbsp;&nbsp; उचाई
            {underline(ConvertToNepali(pdfData?.landHeight))}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingLeft: 60,
            paddingTop: 5,
          }}
        >
          <Text>
            ५{")"} &nbsp; अन्य {":"}- निर्माण प्रकार {underline("नयाँ घर")}
          </Text>
        </View>

        <CertificateFooter />
      </Page>
    </Document>
  );
};

export default PlinthDhulikhel;

export function CertificateFooter() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 25,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingTop: 5,
          justifyContent: "flex-start",
          paddingLeft: 80,
          paddingRight: 40,
        }}
      >
        <Text></Text>
      </View>
      <View>
        <Text></Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingTop: 35,
          paddingLeft: 80,
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>..............................</Text>
          <Text style={{ width: 140 }}>अमिन/सर्वेक्षक</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>.....................</Text>
          <Text style={{ width: 140 }}>अ.सब-इन्जिनियर</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>.....................</Text>
          {/* eslint-disable-next-line no-irregular-whitespace */}
          <Text style={{ width: 140 }}>इन्जिनियर​</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>.....................</Text>
          <Text style={{ width: 140 }}>स्वीकृत गर्ने</Text>
        </View>
      </View>
    </View>
  );
}
