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
import { underline } from "../helper";
import { RasidListType } from "../../../../Services/FloorService";
import { NagarjunFooter } from "./NagarjunPlinthDesign";
import { border } from "../NirmanSampannaDhulikhel";
import { convertToFeetAndInches } from "../../../../Common/Functions/CommonFunctions";

interface Props {
  pdfData: PDFBodyType;
  rasidList: RasidListType[];
  type: string;
}

const NagarjunNirmanSampannaDesign = ({ pdfData, rasidList, type }: Props) => {
  Font.register({ family: "Noto", src: Noto });

  Font.register({ family: "NotoMedium", src: NotoMedium });

  const amount = ConvertToNepali(
    rasidList.map((rasid) => rasid.amount).reduce((a, b) => a + b, 0)
  );
  const rasidNo = rasidList.map((rasid) => rasid.rasidNo).join(", ");
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

  const sabik = underline(pdfData.sabik);

  const coverage = pdfData.coverage;
  const far = pdfData.far;

  const getCertTypeInNep = () => {
    if (type.includes("Regular")) {
      return "निर्माण नियमित प्रमाण-पत्र";
    } else {
      return "निर्माण गर्ने इजाजत-पत्र";

      // / नामसारी प्रमाण-पत्र";
    }
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
            marginTop: -40,
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: -40,
            paddingRight: 30,
            paddingBottom: 10,
          }}
        >
          {pdfData.landOwners.map((landowne) => (
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
                width: 50,
                height: 55,
                marginRight: 10,
                border: "1.5px solid black",
              }}
            />
          ))}
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              marginTop: -5,

              fontFamily: "NotoMedium",
            }}
          >
            &nbsp;भवन निर्माण सम्पन्न प्रमाण पत्र
          </Text>
        </View>
        <View style={{ width: "100%", paddingLeft: 50, marginTop: 5 }}>
          <Text>
            {pdfData.district} {"नागार्जुन"} न.पा. वडा नं.{" "}
            {underline(ConvertToNepali(pdfData.wardNo))} बस्ने
            श्री/श्रीमती/सुश्री {name} ले मिति{" "}
            {underline(ConvertToNepali(pdfData.plinthDate))} मा{" "}
            {getCertTypeInNep()} प्राप्त गरी मिति{" "}
            {underline(ConvertToNepali(pdfData.date))} मा {"भवन"} निर्माण कार्य
            सम्पन्न गर्नु भएकोमा सो {"भवन"} को निर्माण सम्पन्न प्रमाण-पत्र
            प्रदान गरिएको छ।
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
          <Text>१. जग्गाधनीको नाम, थर, वतन: {name} </Text>
          <Text>
            २. जग्गाको विवरण: नागार्जुन न. पा. वडा नं. {wardNo} साबिक {sabik}{" "}
            सिट नं. {mapSheetNo} कित्ता नं. {kittaNo} क्षेत्रफल {landArea}{" "}
            वर्गमिटर
          </Text>
          <Text>
            ३. निर्माणको किसिम:{" "}
            {underline(
              pdfData.buildingStructureType.includes("Frame")
                ? "RCC Frame Structure"
                : pdfData.buildingStructureType
            )}{" "}
            कभरेज {underline(ConvertToNepali(coverage))} फार{" "}
            {underline(ConvertToNepali(far))}
          </Text>
          <Text>
            ४. निर्माणको प्रयोजन: {type.substring(type.lastIndexOf("/") + 1)}
          </Text>
          <Text>५. तपशिल </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={border}>सी. न.</Text>
            <Text
              style={{
                width: 250,
                border: "1px solid black",
                padding: "5px 4px 3px 3px",
                marginTop: -1,
                marginRight: -1,
              }}
            >
              साबिक गा.बि.स.
            </Text>
            <Text style={border}>न. पा.</Text>
            <Text style={border}>वार्ड न.</Text>
            <Text
              style={{
                width: 250,
                border: "1px solid black",
                padding: "5px 4px 3px 3px",
                marginTop: -1,
                marginRight: -1,
              }}
            >
              सीट न.
            </Text>
            <Text style={border}>कित्ता न.</Text>
            <Text style={border}>क्षे.फ.</Text>
            <Text style={border}>लम्बाई</Text>
            <Text style={border}>चौडाई </Text>
            <Text style={border}>तल्ला</Text>
            <Text style={border}>कुल उचाई</Text>
            {/* सी न साबिक गा बि स न पा वार्ड न सीट न कित्ता न. क्षे.फ. लम्बाई चौडाई
            तल्ला कुल उचाई */}
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={border}>(क) </Text>
            <Text
              style={{
                width: 250,
                border: "1px solid black",
                padding: "5px 4px 3px 3px",
                marginTop: -1,
                marginRight: -1,
              }}
            >
              {pdfData.sabik}
            </Text>
            <Text style={border}>{"नागार्जुन"}</Text>
            <Text style={border}>{ConvertToNepali(pdfData.wardNo)}</Text>
            <Text
              style={{
                width: 250,
                border: "1px solid black",
                padding: "5px 4px 3px 3px",
                marginTop: -1,
                marginRight: -1,
              }}
            >
              {mapSheetNo}
            </Text>
            <Text style={border}>
              {ConvertToNepali(pdfData.kittaNo.replace(/,/g, ", "))}
            </Text>
            <Text style={border}>{ConvertToNepali(pdfData.landArea)}</Text>
            <Text style={border}>
              {ConvertToNepali(convertToFeetAndInches(pdfData.landLength))}
            </Text>
            <Text style={border}>
              {ConvertToNepali(convertToFeetAndInches(pdfData.landWidth))}
            </Text>
            <Text style={border}>{ConvertToNepali(pdfData.tala)}</Text>
            <Text style={border}>
              {ConvertToNepali(convertToFeetAndInches(pdfData.landHeight))}
            </Text>
          </View>
          <Text>६. </Text>
          <View
            style={{
              paddingLeft: 150,
              height: "auto",
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text>पास नक्सा अनुसार पाउने</Text>
            <Text style={{ paddingLeft: "20px" }}>निर्माण भएको स्थिति </Text>
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
            {/* <Text>{pdfData.floors[0].name}</Text> */}
            {pdfData.floors.map((floor, index) => {
              const total =
                floor.ncT +
                floor.countable +
                floor.nCNT +
                floor.other +
                floor.prev;

              return (
                <View key={floor.id}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 10,
                        width: 10,
                      }}
                    >
                      {ConvertToNepali(index + 1)}.
                    </Text>
                    <Text style={{ fontSize: 10, width: 70 }}>
                      {floor.name}
                    </Text>
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
                    <Text style={{ paddingLeft: "40px" }}>
                      .....................
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
            <Text style={{ width: 80, paddingLeft: "80" }}>जम्मा: </Text>
            <Text
              style={{
                paddingLeft: "70",
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {ConvertToNepali(
                pdfData.floors
                  .reduce(
                    (a, b) =>
                      a + b.ncT + b.countable + b.nCNT + b.other + b.prev,
                    0
                  )
                  .toFixed(2)
              )}
            </Text>
          </View>
          <Text>
            ७. हाईटेन्सन लाइन नजिक भएमा छोड्नु पर्ने दुरी {"......."} छाडेको
            दुरी {underline(ConvertToNepali(pdfData.highTensionSetBack))}
          </Text>
          <Text>
            ८. नदी किनारमा भए त्यसको लागि छोड्नु पर्ने दुरी {"......"} छाडेको
            दुरी {/* {underline(ConvertToNepali(pdfData.riverSetBack))} */}
            {underline(ConvertToNepali("0"))}
          </Text>
          <Text>नदीको नाम {}</Text>
          <Text>
            ९. सडकबाट छोड्नु पर्ने दुरी {underline(ConvertToNepali("5'"))}{" "}
            छाडेको दुरी {roadActualSetback}
          </Text>
          <View style={{ paddingRight: 40, marginTop: 5 }}>
            <Text>
              पुनश्च: माथि उल्लेखित जग्गामा नक्शावालाको हक कच्चा ठहरीएमा यो
              प्रमाणपत्र स्वत: निष्क्रिय हुनेछ ।
            </Text>
            <Text>
              यसमा उल्लेखित निवेदक श्री/श्रीमती सुश्री {name} बाट नक्शा पास
              धरौटीवापत घरको {landArea} वर्ग फिटको रु {amount} र. नं. {rasidNo}{" "}
              मिति {pdfData.plinthDate} बाट स-धन्यवाद प्राप्त भयो
            </Text>
          </View>
        </View>

        <NagarjunFooter />
      </Page>
    </Document>
  );
};

export default NagarjunNirmanSampannaDesign;

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
