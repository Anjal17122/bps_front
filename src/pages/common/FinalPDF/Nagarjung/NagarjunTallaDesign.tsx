import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import { imgFolders, IMG_GET_URL } from "../../../../Services/Api";
import { municipalityDetails } from "../../../../constants/constants";
import { PDFBodyType } from "../PDFtypes";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { CertificateFooterChandrapur } from "../CertificateFooterChandrapur";
import { landscape } from "../../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import { CharKilla } from "../../../../Services/PDFService";
import { underline } from "../helper";
import { RasidListType } from "../../../../Services/FloorService";

interface Props {
  pdfData: PDFBodyType;
  rasidList: RasidListType[];
}

const NagarjunTallaDesign = ({ pdfData, rasidList }: Props) => {
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
  const landOwners = underline(pdfData.landOwnersName);
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
            &nbsp; निर्माण नियमित/ तल्ला थप प्रमाण-पत्र
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingLeft: 50,
            marginTop: -5,
            fontSize: 12,
          }}
        >
          <Text>
            श्री/श्रीमती/सुश्री {name} ले मिति {} मा तपशिल बमोजिम {"भवन"}{" "}
            निर्माण कार्य सम्पन्न गर्नु भएकोले यी निर्माण नियमित/तल्ला थप
            प्रमाण-पत्र प्रदान गरिएको छ।
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
          <Text>१. जग्गाधनीको नाम, थर, वतन {landOwners} </Text>
          <Text>
            २. जग्गाको विवरण: नागार्जुन न. पा. वडा नं. {wardNo} साबिक {sabik}{" "}
            सिट नं. {mapSheetNo} कित्ता नं. {kittaNo} क्षेत्रफल {landArea}{" "}
            वर्गमिटर
          </Text>
          <Text>
            ३. निर्माणको किसिम: {} कभरेज {coverage} फार {far}
          </Text>

          <Text style={{ fontFamily: "NotoMedium" }}>
            ४. निर्माण भएको तल्ला:
          </Text>
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
                <View key={floor.id} style={{ width: "75%", height: "14px" }}>
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
                      {ConvertToNepali(total)} &nbsp;बर्गफुट
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
                    (a, b) =>
                      a + b.ncT + b.countable + b.nCNT + b.other + b.prev,
                    0
                  )
                  .toFixed(2)
              )}
            </Text>
          </View>

          <Text>
            ५. सडकबाट छाडेको दुरी {} बाटोको अवस्था {}
          </Text>

          <Text>
            ६. खहरे/ खोलाको नाम {} हटाएको दुरी {}
          </Text>

          <Text>
            ७. विथ्युत लाइन क्षमता {} छाडेको दुरी {}
          </Text>

          <View style={{ paddingLeft: 70, paddingRight: 40, marginTop: 10 }}>
            <Text style={{ fontFamily: "NotoMedium" }}>
              नागार्जुन न. पा. राजस्व शाखाबाट
            </Text>
            <Text>
              यसमा उल्लेखित निवेदक श्री/श्रीमती सुश्री {name} बाट नक्शा पास
              धरौटीवापत घरको {landArea} वर्ग फिटको रु {amount} र. नं. {rasidNo}{" "}
              मिति {} बाट स-धन्यवाद प्राप्त भयो
            </Text>
          </View>
        </View>

        {municipalityDetails.address1 === "चन्द्रनिगाहपुर – ६, रौतहट" ? (
          <CertificateFooterChandrapur />
        ) : (
          <CertificateFooter />
        )}
      </Page>
    </Document>
  );
};

export default NagarjunTallaDesign;

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
