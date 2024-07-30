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
import Npage2 from "../../../../Assets/Images/nagarjun_plinth_page2.jpeg";
import { calculateNagarjunRevenue } from "../../../../constants/CommonFunctions";

interface Props {
  pdfData: PDFBodyType;
}

const NagarjunRegularDesign = ({ pdfData }: Props) => {
  Font.register({ family: "Noto", src: Noto });

  Font.register({ family: "NotoMedium", src: NotoMedium });

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

  const sabik = underline(pdfData.sabik);

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

  const eastOnly = underline(pdfData.eastOnly);
  const westOnly = underline(pdfData.westOnly);
  const northOnly = underline(pdfData.northOnly);
  const southOnly = underline(pdfData.southOnly);

  const coverage = underline(ConvertToNepali(pdfData.coverage));
  const far = underline(ConvertToNepali(pdfData.far));

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
        <View>
          <Text
            style={{
              fontSize: 15,
              marginTop: -35,

              fontFamily: "NotoMedium",
            }}
          >
            &nbsp;निर्माण नियमित/तल्ला थप प्रमाण-पत्र
          </Text>
        </View>

        <View
          style={{ paddingLeft: 50, paddingRight: 40, textAlign: "justify" }}
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
            </Text>{" "}
            ले मिति {ConvertToNepali(pdfData.date)} मा तपशिल बमोजिम{" "}
            {underline("भवन")} निर्माण कार्य सम्पन्न गर्नु भएकोले यो निर्माण
            नियमित/तल्ला थप प्रमाण-पत्र प्रदान गरिएको छ।
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
            १. &nbsp; जग्गाधनीको नाम, घर, बतन: {name}
            {/* साबिक {pdfData.sabik} &nbsp; सि.
            नं. {mapSheetNo} &nbsp; कि. नं. {kittaNo} &nbsp; क्षे.फ. {landArea}{" "}
            &nbsp; बर्गमिटर, हालको वडा नं. {wardNo} */}
          </Text>
          <Text>
            २. &nbsp; जग्गाको विवरण: नागार्जुन न.पा. वडा न. {wardNo} साबिक
            {sabik} सिट नं. {mapSheetNo} कि. नं. {kittaNo} क्षे.फ. {landArea}{" "}
            {/* सिमाना: पूर्व {eastOnly} &nbsp; पश्चिम {westOnly} &nbsp;
            उत्तर
            {northOnly} &nbsp; दक्षिण {southOnly} */}
            {/* {underline(ConvertToNepali(convertToFeet(landLength)))} ,
            &nbsp;&nbsp; चौडाई &nbsp;
            {underline(ConvertToNepali(convertToFeet(landWidth)))} ,
            &nbsp;&nbsp; कुल उचाई &nbsp;
            {underline(ConvertToNepali(convertToFeet(landHeight)))},
            &nbsp;&nbsp; तल्ला {underline(ConvertToNepali(myFloors()))} */}
          </Text>
          <Text>
            ३. &nbsp; कभरेज {coverage} फार {far}
            {/* {pdfData?.landHeight} चौडाई {pdfData?.landHeight} तल्ला कुल उचाई
            {pdfData?.landHeight} */}
          </Text>
          <Text>४. बाटोको सिमानाबाट नियमानुसार कम्तिमा छाड्नुपर्ने दुरी </Text>
          <Text style={{ paddingLeft: 15 }}>
            क{")"} हाल भइरहेको बाटो चौडाई &nbsp; {roadWidth} &nbsp; देखिन्छ
          </Text>
          <Text style={{ paddingLeft: 15 }}>
            ख{")"} छोडेको दुरी {roadActualSetback} फीट देखिन्छ
          </Text>
          <Text>
            ५. बाटोको सिमाना कम्पाउण्ड/वाल लगाउँदा जमिनको सतहभन्दा माथि
            कम्पाउण्ड/वाल लगाउँदा ५&apos;-० अनिवर्य छोड्नु पर्नेछ ।
          </Text>
          {/* <Text
            style={{ fontFamily: "NotoMedium", paddingTop: 3, fontSize: 13 }}
          >
            चारकिल्ला
          </Text>
          <Text>
            पूर्व कि.नं. {eastKittaNo} &nbsp; पश्चिम कि.नं. &nbsp;{westKittaNo}{" "}
            &nbsp; उत्तर कि.नं. &nbsp;
            {northKittaNo} &nbsp; दक्षिण कि.नं. &nbsp;{southKittaNo}
          </Text> */}
          <Text>६. अर्को तर्फ जग्गाको सिमानाबाट छोड्नु पर्ने दुरी</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            {/* <View style={{ marginRight: 40, marginLeft: 13 }}>
              <Text>साबिक टोल</Text>
              <Text>{underline(pdfData.sabik)}</Text>
            </View>
            <View style={{ marginRight: 40 }}>
              <Text>हालको टोल</Text>
              <Text>{underline(pdfData.currentTole)}</Text>
            </View> */}
            <View style={{ marginRight: 10 }}>
              <Text>
                क{")"} झ्याल राख्ने भए ५&apos;-० अनिवर्य छोड्नु पर्नेछ ।
              </Text>
              <Text>
                ख{")"} छोडेको दुरी {landActualSetback} देखिन्छ ।
                {/* {pdfData.pid === 1320 ? "५'" : landActualSetback} देखिन्छ । */}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            paddingLeft: 60,
            paddingBottom: 3,
            marginTop: 6,
          }}
        >
          <Text>७. &nbsp; निर्माणको भएको तल्ला </Text>
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
            {ConvertToNepali(totalSqFt)}
            &nbsp;बर्गफुट
          </Text>
        </View>

        <View style={{ paddingLeft: 70, paddingRight: 40, marginTop: 30 }}>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              fontFamily: "NotoMedium",
              textDecoration: "underline",
              marginTop: 5,
            }}
          >
            {municipalityDetails.letterheadTitle} कार्यालयबाट
          </Text>
          <Text>
            यसमा उल्लेखित निवेदक श्री/श्रीमती सुश्री {name} बाट नक्शा पास वापत
            घरको {underline(ConvertToNepali(totalSqFt))} वर्ग फिटको रु{" "}
            {underline(
              ConvertToNepali(
                (
                  calculateNagarjunRevenue(parseFloat(totalTaxable ?? "0")) * 3
                ).toFixed(2)
              )
            )}{" "}
            &nbsp; र. नं. ........... मिति ...................... बाट स-धन्यवाद
            प्राप्त भयो
          </Text>
        </View>

        <NagarjunFooter />
      </Page>
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
        <View>
          <Image
            src={Npage2}
            style={{
              width: "520px",
              height: "800px",
            }}
          />
        </View>
      </Page>
    </Document>
  );
};

export default NagarjunRegularDesign;

export function NagarjunFooter() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 25,
      }}
    >
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
          <Text style={{ width: 200 }}>फिल्ड निरिक्षण गरि पेश गर्ने</Text>
        </View>

        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>.....................</Text>
          {/* eslint-disable-next-line no-irregular-whitespace */}
          <Text style={{ width: 200 }}>सिफारिस गर्ने</Text>
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
