import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../Assets/Images/resizednepgov.png";
import { imgFolders, IMG_GET_URL } from "../../../Services/Api";
import { municipalityDetails } from "../../../constants/constants";
import { PDFBodyType } from "./PDFtypes";
import { ConvertToNepali } from "../../../constants/NumberConverter";
import { findHiAndLow, underline } from "./helper";
import {
  direction,
  landscape,
} from "../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import DhulikhelLogo from "../../../Assets/Images/dhulikhel_logo_png.png";
import DhulikhelMapdanda from "./DhulikhelMapdanda";
import { GetMapdandaBody } from "../../../Services/MapdandaService";

export const border = {
  width: 200,
  border: "1px solid black",
  padding: "5px 4px 3px 3px",
  marginTop: -1,
  marginRight: -1,
};

export const borderNoPadding = {
  width: 200,
  border: "1px solid black",
  padding: "2px 4px 0 3px",
  marginTop: -1,
  marginRight: -1,
};
interface Props {
  data: {
    chalanino: string;
    patrasankhya: string;
    projectType: string;
    buildingPurpose: string;
  };
  pid?: string | number;
  mapdandaPid: GetMapdandaBody | undefined;
  pdfData: PDFBodyType;
}

const NirmanSampannaDhulikhel = ({ pdfData, pid, mapdandaPid }: Props) => {
  Font.register({
    family: "Noto",
    src: Noto,
  });
  Font.register({
    family: "NotoMedium",
    src: NotoMedium,
  });
  const directionOrder = ["East", "West", "North", "South"];
  const sortedCharkillas = pdfData.charkillas.sort((a, b) => {
    return (
      directionOrder.indexOf(a.direction) - directionOrder.indexOf(b.direction)
    );
  });
  1621526158;
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
  const nepaliNumAlphabet = ["क", "ख", "ग", "घ"];
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
      return ConvertToNepali(myTotal) ?? "";
    }
  };

  const myFloors = () => {
    const floors = pdfData.floors.length - 1;
    const { highest, lowest } = findHiAndLow(pdfData.floors);
    if (highest || lowest) {
      if (lowest / highest < 0.71) {
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
            निर्माण सम्पन्न प्रमाण-पत्र​
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: -15,
            paddingRight: 30,
            paddingBottom: 0,
          }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            {(pdfData.homeOwners ?? pdfData.landOwners).map((owner) => (
              <Image
                key={owner.id}
                src={{
                  uri:
                    IMG_GET_URL +
                    `/${imgFolders.person}/${owner.owner.photoFileName}`,
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
            ))}
          </View>
        </View>

        <View
          style={{
            paddingLeft: 50,
            paddingTop: 5,
            paddingRight: 40,
            textAlign: "justify",
          }}
        >
          <Text style={{ paddingBottom: 4 }}>
            श्री/श्रीमती/सुश्री {name}ले धुलिखेल नगरपालिका वडा नं {landAddress}{" "}
            मा निम्न बमोजिम &nbsp; {underline("भवन")} निर्माण कार्य पुरा भएको
            प्रमाणित गरिएको छ ।
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            १{")"} साबिक {pdfData.sabik ?? "...."} (साबिक), हालको वडा{" "}
            {landAddress} कित्ता नं. {kittaNo} क्षेत्रफल {landArea} वर्ग फिट
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            २{")"} चार किल्ला :{" "}
            {sortedCharkillas.map((charkilla, index) => (
              <Text
                key={charkilla.id}
                style={
                  {
                    // textDecoration: "underline",
                    // textDecorationStyle: "dotted",
                  }
                }
              >
                {pid == 53 ? "\n(" + nepaliNumAlphabet[index] + ") " : null}
                {
                  direction.find(
                    (direct) => direct.value === charkilla.direction
                  )?.nepaliFull
                }{" "}
                {charkilla.nameNep}{" "}
                {pid == 53
                  ? // ? "..............."
                    underline(ConvertToNepali(charkilla.side))
                  : underline(ConvertToNepali(charkilla.actualSetBack))}
              </Text>
            ))}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ३{")"} जग्गा धनीको नाम: {name}
          </Text>
          <Text style={{ paddingBottom: 4 }}>४{")"} घर धनीको नाम: </Text>
          <Text style={{ paddingBottom: 4 }}>
            ५{")"} निर्माणको किसिम {buildingType}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ६{")"} (क) नक्सा पास प्रमाण पत्र न{" "}
            {pdfData.plinthDate == null && pdfData.superStructureDate == null
              ? "................"
              : underline(ConvertToNepali(pdfData.patraSankhya))}{" "}
            मिति{" "}
            {pdfData.plinthDate == null && pdfData.superStructureDate == null
              ? ".................."
              : underline(ConvertToNepali(pdfData.superStructureDate))}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            (ख) नक्सा पास नगरी बनाएको भए नियमित गरिएको मिति{" "}
            {pid === 65 ? underline("२०४५") : "२०......"}
          </Text>

          <Text style={{ paddingBottom: 4 }}>
            ७{")"} भवनको प्रयोजन:{" "}
            {pid === 53 ? underline("Educational") : underline("आवाशिय")}
          </Text>

          {/* <Text>८ स्वीकृत उचाई फिट÷मिटर ....... निर्माण भएको उचाई फिट</Text> */}
          {/* <Text style={{ paddingBottom: 4 }}>
              १० घर बनाउने प्लटसंग जोडिएको प्रस्ताविक बाटो वा अन्य बाटोको लागी
              केन्द्र रेखाबाट छोड्नु पर्ने दुरी ...... छोडेको दुरी ......
            </Text>
            <Text style={{ paddingBottom: 4 }}>
              ११ बिजुलीको तार नजिक भएमा छोड्नु पर्ने दुरी ....... छोडेको दुरी
              ......... भोल्ट ........
            </Text>
            <Text style={{ paddingBottom: 4 }}>
              १२ नदि किनारा भएमा त्यसको लागि छोड्नु पर्ने दुरी ....... छोडेको दुरी
              ........ नदीको नाम ....
            </Text>
            <Text style={{ paddingBottom: 4 }}>
              १३ निकासा समन्धी (ढल वा सेफ्टी ट्यांकी ) .........
            </Text>
            <Text style={{ paddingBottom: 4 }}>
              १४ अन्य कुनै विवरण भए ........
            </Text> */}
          {/* फाटवालाको सहि स्थलगत निरीक्षण इन्जिनियर प्रमुक प्रसासकिय अधिकृत
            स्वीकृत गर्ने पेस गर्ने नाम .......... दर्जा ............. सहि
            ...... मिति (क) भूमिगत वा अर्धभूमिगत तल्ला (ख) जमिन तल्ला (ग) पहिलो
            तल्ला (घ) दोश्रो तल्ला (ङ) तेश्रो तल्ला (च) चौथो तल्ला (छ) पाचौ
            तल्ला (ज) अन्य पास नक्सा अनुसारको निर्माण भएको स्थिति लम्बाई चौडाई
            क्षेत्रफल */}
        </View>
        <div style={{ width: "480px" }}>
          <DhulikhelMapdanda mapdandaPid={mapdandaPid} pid={pid?.toString()} />
        </div>
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
            ८{")"} &nbsp; अन्य {":"}- निर्माण प्रकार {underline("नयाँ घर")}
          </Text>
        </View>

        <CertificateFooter />
      </Page>
    </Document>
  );
};

export default NirmanSampannaDhulikhel;

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
          <Text style={{ width: 140 }}>सब-इन्जिनियर</Text>
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
