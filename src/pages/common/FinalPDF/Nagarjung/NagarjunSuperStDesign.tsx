import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import { imgFolders, IMG_GET_URL } from "../../../../Services/Api";
import { municipalityDetails } from "../../../../constants/constants";
import { PDFBodyType } from "../PDFtypes";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { landscape } from "../../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import { CharKilla } from "../../../../Services/PDFService";
import { findHiAndLow, underline } from "../helper";
import { RasidListType } from "../../../../Services/FloorService";
import { NagarjunFooter } from "./NagarjunPlinthDesign";
import { convertToFeet } from "../../../../constants/CommonFunctions";

interface Props {
  pdfData: PDFBodyType;
  rasidList: RasidListType[];
}

const NagarjunSuperStDesign = ({ pdfData, rasidList }: Props) => {
  Font.register({ family: "Noto", src: Noto });

  Font.register({ family: "NotoMedium", src: NotoMedium });

  const amount = ConvertToNepali(
    rasidList.map((rasid) => rasid.amount).reduce((a, b) => a + b, 0)
  );

  const rasidNo = rasidList.map((rasid) => rasid.rasidNo).join(", ");

  // GETfloorPerma(currentPid, messageApi).then((res) => {
  //   setRevenueData(JSON.parse(res.data.floorDetail));
  // });

  // const date = rasidList.map((rasid) => rasid.date).join(", ");

  const name = underline(
    pdfData.houseOwnersName ? pdfData.houseOwnersName : pdfData.landOwnersName
  );
  const mapSheetNo = underline(ConvertToNepali(pdfData.mapSheetNo));
  const landArea = underline(ConvertToNepali(pdfData.landArea));
  const kittaNo = underline(ConvertToNepali(pdfData.kittaNo));
  const wardNo = underline(ConvertToNepali(pdfData.wardNo));
  const roadWidth = underline(ConvertToNepali(pdfData.roadWidth));
  const roadActualSetback = underline(
    ConvertToNepali(pdfData.roadActualSetback)
  );
  const landActualSetback = underline(
    ConvertToNepali(pdfData.landActualSetback)
  );

  const eastKittaNo = underline(ConvertToNepali(pdfData.eastKittaNo));
  const westKittaNo = underline(ConvertToNepali(pdfData.westKittaNo));
  const northKittaNo = underline(ConvertToNepali(pdfData.northKittaNo));
  const southKittaNo = underline(ConvertToNepali(pdfData.southKittaNo));

  const totalSqFt = pdfData.floors
    .reduce((a, b) => a + b.ncT + b.countable + b.nCNT + b.other + b.prev, 0)
    .toFixed(2);

  const totalTaxable = pdfData.floors
    .reduce((a, b) => a + b.ncT + b.countable, 0)
    .toFixed(2);
  const landLength: number = parseFloat(pdfData?.landLength ?? 0);

  const landWidth = parseFloat(pdfData?.landWidth ?? 0);
  const landHeight = parseFloat(pdfData?.landHeight ?? 0);

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
  const sabik = underline(pdfData.sabik);
  const citizenshipNo = underline(ConvertToNepali(pdfData.citizenshipNo));
  const plinthDate = underline(ConvertToNepali(pdfData.plinthDate));
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
            paddingBottom: 1,
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
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              {municipalityDetails.letterheadTitle}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 24,
                fontFamily: "NotoMedium",
              }}
            >
              {municipalityDetails.letterheadType}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 13,
                marginLeft: -10,
                fontFamily: "NotoMedium",
              }}
            >
              {municipalityDetails.letterheadAddress1}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 13,
                marginLeft: -7,
                fontFamily: "NotoMedium",
              }}
            >
              {municipalityDetails.letterheadAddress2}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 13,
                marginLeft: -7,
                fontFamily: "NotoMedium",
              }}
            >
              (नक्शा शाखा)
            </Text>
          </View>
          <View style={{ width: 50 }}></View>
        </View>
        <View
          style={{
            marginTop: -50,
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
            marginTop: 10,
            paddingLeft: 50,
          }}
        >
          <Text style={{ paddingBottom: 1, marginTop: 0 }}>
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
          <Text>
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
        {pdfData.landOwners.length < 1 && pdfData.homeOwners.length < 1 ? (
          <View style={{ width: "100%", height: 50 }}></View>
        ) : null}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: -40,
            paddingRight: 20,
            paddingBottom: 10,
          }}
        >
          {(pdfData.landOwners.length
            ? pdfData.landOwners
            : pdfData.homeOwners
          ).map((landowne) => (
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
                // transform: "rotate",
                // transform: "rotate(90deg)",
                width: 70,
                height: 75,
                marginRight: 10,
                border: "1.5px solid black",
              }}
            />
          ))}
        </View>
        {/* <View style={{ alignItems: "center", width: "100%" }}> */}
        <View>
          <Text
            style={{
              fontSize: 16,
              marginTop: -5,
              fontFamily: "NotoMedium",
              alignItems: "center",
              display: "flex",
              backgroundColor: "pink",
              width: "100%",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            भवन निर्माण स्थायी इजाजत पत्र
          </Text>
          <Text
            style={{
              fontSize: 16,
              paddingTop: -5,

              fontFamily: "NotoMedium",
            }}
          >
            (प्लिन्थ लेवल माथि Superstructure को लागि)
          </Text>
        </View>
        {/* </View> */}
        <View
          style={{
            width: "100%",
            paddingLeft: 50,
            marginTop: -5,
            paddingBottom: 5,
          }}
        >
          <Text>
            श्री{" "}
            <Text
              style={{
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {pdfData.houseOwnersName || pdfData.landOwnersName}
            </Text>
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingLeft: 50,
            marginTop: -5,

            paddingBottom: 5,
          }}
        >
          <Text>
            नागार्जुन न. पा. वडा नं.{" "}
            {underline(ConvertToNepali(pdfData.wardNo))}
          </Text>
        </View>
        <View
          style={{ paddingLeft: 50, paddingRight: 40, textAlign: "justify" }}
        >
          <Text>
            उपरोक्त विषयमा तपाईको नाममा मालपोत कार्यालय कलंकीमा दर्ता प्रमाणित
            भएको यस नागार्जुन न.पा. वडा नं. {ConvertToNepali(pdfData.wardNo)} मा
            पर्ने तपशिलमा उल्लेखित कित्ता जग्गामा नक्शा बमोजिम मिति {plinthDate}{" "}
            मा अस्थायी स्वीकृति प्रदान गरिसकेको हुँदा यसै साथ संलग्न न.पा. को
            सम्पूर्ण नियम कानून पालना गर्ने शर्तहरु, वस्ती विकास/सहरी योजना तथा
            भवन निर्माण सम्बन्धी आधारभूत मार्गदर्शन २०७२ र उपत्यका विकास
            प्राधिकरणले तोकेको मापदण्ड अनुसार बाटोको लागि र अन्य प्रयोजनको लागि
            छाड्नु पर्ने जग्गा छोडी साँध सँधयारको जग्गा नघुसाई नक्शा बमोजिम
            निर्माण कार्य गर्न स्थानीय सरकार संचालन ऐन २०७४ को दफा ३३ वमोजिम यो
            भवन निर्माणको स्थायी इजाजत पत्र प्रदान गरिएको छ । निर्माण कार्य
            सम्पन्न भएपछि ३५ (पैतिस) दिन भित्र &quot;निर्माण सम्पन्न प्रमाण
            पत्र&quot; अनिवार्य रुपमा लिनु पर्नेछ ।
          </Text>
        </View>
        <View style={{ paddingTop: 3 }}>
          <Text
            style={{
              fontFamily: "NotoMedium",
              fontSize: 14,
              paddingTop: 5,
              marginLeft: -10,
            }}
          >
            तपशिल
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            paddingTop: 5,
            justifyContent: "flex-start",
            paddingLeft: 60,
            lineHeight: 1.5,
          }}
        >
          <Text>
            साबिक {sabik} &nbsp; सि. नं. {mapSheetNo} &nbsp; कि. नं. {kittaNo}{" "}
            &nbsp; क्षे.फ. {landArea} &nbsp; बर्गमिटर, हालको वडा नं. {wardNo}
          </Text>
          <Text>१. नयाँ घर </Text>
          {/* <Text>
            साबिक टोल {} हालको टोल {}
          </Text> */}
          {/* मिति {} */}
          <Text>
            &nbsp;&nbsp;&nbsp;&nbsp; निवेदकको ना.प. नं. &nbsp;{citizenshipNo},{" "}
            {pdfData.district}
          </Text>
          <Text>
            २. बाटोको सिमानाबाट नियमानुसार छाड्नुपर्ने दुरी
            {/* बन्ने घरको (मिटर): लम्बाई {ConvertToNepali(pdfData?.landLength)}{" "}
            , चौडाई {ConvertToNepali(pdfData?.landWidth)}, तल्ला कुल उचाई{" "}
            {ConvertToNepali(pdfData?.landHeight)} */}
          </Text>
          <Text style={{}}>
            &nbsp;&nbsp;&nbsp; क{")"} हाल भइरहेको बाटोको चौडाई {roadWidth}{" "}
            देखिन्छ ।{" "}
          </Text>
          <Text style={{}}>
            &nbsp;&nbsp;&nbsp; ख{")"} झ्याल राख्ने भए ५&apos;०&quot; अनिवर्य
            छोड्नु पर्नेछ ।
          </Text>
          <Text style={{}}>
            &nbsp;&nbsp;&nbsp; ग{")"} छाडेको दुरी {landActualSetback} फीट
            देखिन्छ ।{" "}
          </Text>
          <Text style={{}}>
            &nbsp;&nbsp;&nbsp; घ{")"} बाटो तर्फ ५&apos;०&quot; अनिवर्य छोड्नु
            पर्नेछ ।
          </Text>
          {/* <Text style={{ width: 210 }}>
            ङ{")"} विधुत लाइनको क्षमता ............. छाडेको दुरी ..........
          </Text> */}
          <Text>
            ३. अन्य
            {/* {pdfData?.landHeight} चौडाई {pdfData?.landHeight} तल्ला कुल उचाई
            {pdfData?.landHeight} */}
          </Text>
          <Text>
            ४. कैफियत ................
            {/* बाटोको सिमानाबाट नियमानुसार कम्तिमा छाड्नुपर्ने दुरी */}
          </Text>
          <Text>
            ५. घरको लम्बाई{" "}
            {underline(ConvertToNepali(convertToFeet(parseFloat(pdfData?.buildingLength))))}
            , &nbsp;चौडाई{" "}
            {underline(ConvertToNepali(convertToFeet(parseFloat(pdfData?.buildingWidth))))},
            &nbsp;कुल उचाई{" "}
            {underline(ConvertToNepali(convertToFeet(parseFloat(pdfData?.buildingHeight))))}
            , &nbsp;तल्ला {underline(ConvertToNepali(myFloors()))}
          </Text>
          <Text>६. स्थायी इजाजत गरिएको तल्ला:</Text>
        </View>
        <View
          style={{
            paddingLeft: 70,
            height: "auto",
            flexWrap: "wrap",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {pdfData.floors.map((floor, index) => {
            const total =
              floor.ncT +
              floor.countable +
              floor.nCNT +
              floor.other +
              floor.prev;

            return (
              <View key={floor.id} style={{ width: 220, height: "14px" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 10,
                      width: 10,
                    }}
                  >
                    {ConvertToNepali(index + 1)}.
                  </Text>
                  <Text style={{ fontSize: 10, width: 70 }}>{floor.name}</Text>
                  <Text
                    style={{
                      width: 80,
                      fontSize: 10,
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                    }}
                  >
                    {ConvertToNepali(total.toFixed(2))} &nbsp;बर्गफुट
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View
          style={{
            width: "72%",
            flexDirection: "row",
          }}
        >
          <Text style={{ width: 80, paddingLeft: 30 }}>जम्मा: </Text>
          <Text
            style={{
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              fontSize: 10,
            }}
          >
            {ConvertToNepali(totalSqFt)}
            &nbsp;बर्गफुट
          </Text>
        </View>
        {/* </View> */}

        {/* <View
          style={{
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            paddingLeft: 60,
            paddingBottom: 3,
            marginTop: 6,
          }}
        >
          <Text>७ निर्माणको लागि इजाजत प्रदान गरिएको तल्ला (sq. ft.)</Text>
        </View>
        <View
          style={{
            paddingLeft: 70,
            height: "auto",
            flexWrap: "wrap",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {pdfData.floors.map((floor, index) => {
            const total =
              floor.ncT +
              floor.countable +
              floor.nCNT +
              floor.other +
              floor.prev;

            return (
              <View key={floor.id} style={{ width: 220, height: "14px" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 10,
                      width: 10,
                    }}
                  >
                    {ConvertToNepali(index + 1)}.
                  </Text>
                  <Text style={{ fontSize: 10, width: 70 }}>{floor.name}</Text>
                  <Text
                    style={{
                      width: 80,
                      fontSize: 10,
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                    }}
                  >
                    {ConvertToNepali(total.toFixed(2))} &nbsp;बर्गफुट
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View
          style={{
            width: "72%",
            flexDirection: "row",
          }}
        >
          <Text style={{ width: 80 }}>जम्मा: </Text>
          <Text
            style={{
              textDecoration: "underline",
              textDecorationStyle: "dotted",
            }}
          >
            {ConvertToNepali(
              pdfData.floors
                .reduce(
                  (a, b) => a + b.ncT + b.countable + b.nCNT + b.other + b.prev,
                  0
                )
                .toFixed(2)
            )}
          </Text>
        </View> */}

        <View
          style={{
            position: "absolute",
            paddingLeft: 70,
            paddingRight: 40,
            marginTop: 5,
            bottom: 150,
          }}
        >
          <Text>
            पाश भएको नक्शा विपरित कार्य गरेमा वा यसमा उल्लेखित शर्तहरुको
            बर्खिलाप अन्य कुनै कार्य गरेमा प्रचलित कानुन बमोजिम कारवाही भएमा
            मलाई मान्य हुनेछ भनी सहिछाप गर्ने ।
          </Text>
        </View>

        <NagarjunFooter />
      </Page>
    </Document>
  );
};

export default NagarjunSuperStDesign;

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
          flexDirection: "column",
          alignItems: "flex-end",
          width: "100%",
          paddingTop: 10,
          justifyContent: "flex-end",
          paddingRight: 80,
        }}
      >
        <Text>..........................................</Text>
        <Text>नक्शावाला/ निजको वारेस</Text>
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

export const charkillaMapFinal = (charkillas: CharKilla[], fontSize = 10) => {
  // const styleHeader = {
  //   width: 60,
  //   textDecoration: "underline",
  //   textDecorationStyle: "dotted",
  // };

  const filterByDirection = (
    direction: "East" | "West" | "North" | "South"
  ) => {
    return charkillas.filter((charkilla) =>
      charkilla.direction.includes(direction)
    )[0];
  };

  const CharkillaForDhulikhel = [
    {
      id: 1,
      direction: "पूर्वः",
      kitta: filterByDirection("East")?.kittaNo,
      name: filterByDirection("East")?.nameNep,
      landscape: filterByDirection("East")?.landscapeType,
    },
    {
      id: 2,
      direction: "पश्चिमः",
      kitta: filterByDirection("West")?.kittaNo,
      name: filterByDirection("West")?.nameNep,
      landscape: filterByDirection("West")?.landscapeType,
    },
    {
      id: 3,
      direction: "उत्तरः",
      kitta: filterByDirection("North")?.kittaNo,
      name: filterByDirection("North")?.nameNep,
      landscape: filterByDirection("North")?.landscapeType,
    },
    {
      id: 4,
      direction: "दक्षिणः",
      kitta: filterByDirection("South")?.kittaNo,
      name: filterByDirection("South")?.nameNep,
      landscape: filterByDirection("South")?.landscapeType,
    },
  ];

  return (
    <>
      <View
        style={{
          fontSize: fontSize,
          flexDirection: "row",
          marginLeft: -20,
          marginBottom: 0,
          marginTop: 0,
        }}
      >
        <Text
          style={{
            width: 50,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          दिशा
        </Text>
        <Text
          style={{
            width: 140,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          कित्ता
        </Text>
        <Text
          style={{
            width: 180,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          नाम
        </Text>
        <Text
          style={{
            width: 50,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
          }}
        ></Text>
      </View>
      {CharkillaForDhulikhel.map((charkill) => (
        <View
          key={charkill.id}
          style={{
            flexDirection: "row",
            marginLeft: -20,
            fontSize: fontSize,
            marginBottom: 2,
            borderBottom: "1px dotted grey",
          }}
        >
          <Text style={{ width: 50 }}>{charkill.direction}</Text>
          <Text style={{ width: 140 }}>
            {charkill.kitta ?? "-"} (
            {landscape.find((landsca) => landsca.value === charkill.landscape)
              ?.nepali ?? ""}
            )
          </Text>
          <Text style={{ width: 180 }}>{charkill.name}</Text>
          <Text style={{ width: 50 }}></Text>
        </View>
      ))}
    </>
  );
};
