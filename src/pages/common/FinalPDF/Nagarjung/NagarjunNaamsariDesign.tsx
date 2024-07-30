import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import { imgFolders, IMG_GET_URL } from "../../../../Services/Api";
import { municipalityDetails } from "../../../../constants/constants";
import { PDFBodyType } from "../PDFtypes";
import { ConvertToNepali as cn } from "../../../../constants/NumberConverter";
import { CertificateFooterChandrapur } from "../CertificateFooterChandrapur";
import { landscape } from "../../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import { CharKilla } from "../../../../Services/PDFService";
import { underline as und } from "../helper";
import { RasidListType } from "../../../../Services/FloorService";
import { GETPublishLogs } from "../../../Admin/OnDeskFinal/OnDeskService/ApprovedService/types";
import { CertType } from "../../../../Services/PublishService";
import { calArthikBarsa } from "../../../../constants/CommonFunctions";

interface Props {
  pdfData: PDFBodyType;
  rasidList: RasidListType[];
  publishedLogs: GETPublishLogs[];
}

const NagarjunNaamsariDesign = ({
  pdfData,
  rasidList,
  publishedLogs,
}: Props) => {
  Font.register({ family: "Noto", src: Noto });

  Font.register({ family: "NotoMedium", src: NotoMedium });

  const amount = cn(
    rasidList.map((rasid) => rasid.amount).reduce((a, b) => a + b, 0)
  );
  const rasidNo = rasidList.map((rasid) => rasid.rasidNo).join(", ");
  // const date = rasidList.map((rasid) => rasid.date).join(", ");

  const name = und(
    pdfData.houseOwnersName ? pdfData.houseOwnersName : pdfData.landOwnersName
  );
  const mapSheetNo = und(cn(pdfData.mapSheetNo));
  const landArea = und(cn(pdfData.landArea));
  const kittaNo = und(cn(pdfData.kittaNo));
  const wardNo = und(cn(pdfData.wardNo));
  const roadWidth = und(cn(pdfData.roadWidth));
  const roadActualSetback = und(cn(pdfData.roadActualSetback));
  const landActualSetback = und(cn(pdfData.landActualSetback));

  const eastKittaNo = und(cn(pdfData.eastKittaNo));
  const westKittaNo = und(cn(pdfData.westKittaNo));
  const northKittaNo = und(cn(pdfData.northKittaNo));
  const southKittaNo = und(cn(pdfData.southKittaNo));

  type NKey = keyof GETPublishLogs;

  const fpl = (type: CertType, nKey: NKey): string => {
    const fil = publishedLogs.filter(
      (publishedLog) => publishedLog.certificateType === type
    );

    return fil.length ? String(fil[0][nKey] ?? "") : "";
  };

  const patraNoPlinth = und(cn(fpl("PLINTH", "patraSankhya")));
  const patraNoSuperSt = und(cn(fpl("SUPERSTRUCTURE", "patraSankhya")));
  const patraNoNiramSam = und(cn(fpl("NIRMAN_SAMPANNA", "patraSankhya")));
  const patraNoNaamSari = und(cn(fpl("NAAMSARI", "patraSankhya")));

  const datePlinth = und(cn(fpl("PLINTH", "publishedDateNep")));
  const dateSuperSt = und(cn(fpl("SUPERSTRUCTURE", "publishedDateNep")));
  const dateNiramSam = und(cn(fpl("NIRMAN_SAMPANNA", "publishedDateNep")));
  const dateNaamSari = und(cn(fpl("NAAMSARI", "publishedDateNep")));

  const fyP = und(calArthikBarsa(fpl("PLINTH", "publishedDateNep")));
  const fyS = und(calArthikBarsa(fpl("SUPERSTRUCTURE", "publishedDateNep")));
  const fyN = und(calArthikBarsa(fpl("NIRMAN_SAMPANNA", "publishedDateNep")));
  const fyNs = und(calArthikBarsa(fpl("NAAMSARI", "publishedDateNep")));

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
          <Text> मिति : {cn(pdfData.date)}</Text>
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
            पत्र संख्या : {cn(pdfData.patraSankhya)}
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
            चलानी नं : {cn(pdfData.chalaniNo)}
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
            &nbsp;नामसारी प्रमाण-पत्र
          </Text>
        </View>
        <View
          style={{ paddingLeft: 50, paddingRight: 40, textAlign: "justify" }}
        >
          <Text>
            श्री/श्रीमती/सुश्री {name} ले मालपोत कार्यालय कलंकीको र.नं. {} मिति{" "}
            {} को दर्ताबाट {} पारित गरी साबिक ज.ध. {} बाट तपशिल बमोजिमको
            {} खरिद गर्नु भई नक्शा नामसारिका लागि निबेदन पेश गर्नु भएकोले न. पा.
            को नियमानुसार यो नामसारी प्रमाण-पत्र प्रदान गरिएको छ ।
          </Text>
          <Text style={{ marginTop: 8 }}>
            स्वीकृत नक्शा बमोजिम प्लीन्थ लेभल (डिपिसी) सम्म निर्माण कार्य गरी
            सकेपछि सो भन्दा माथिको भवन (Superstructure) को निर्माण कार्य गर्न
            पुनः &quot;भवन निर्माण स्थायी इजाजत पत्र&quot; अनिवार्य लिनु पर्नेछ
            ।
          </Text>
        </View>
        <View style={{ paddingTop: 3 }}>
          <Text
            style={{
              fontFamily: "NotoMedium",
              fontSize: 14,
              paddingTop: 8,
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
            १. जग्गाको विवरण:- साबिक {pdfData.sabik} सि. नं. {mapSheetNo} कि.
            नं. {kittaNo} क्षे.फ. {landArea} हालको वडा नं.
            {wardNo}
          </Text>
          <Text>१. नयाँ घर </Text>
          <Text>२. नक्शापासको किसिम:</Text>
          <Text>
            क{")"} निर्माण इजाजत प्रमाण-पत्र नं. :- {patraNoPlinth} मिति
            {datePlinth} आ.व. {fyP}
          </Text>
          <Text>
            ख{")"} निर्माण नियमित प्रमाण-पत्र नं. :- {patraNoSuperSt} मिति
            {dateSuperSt} आ.व. {fyS}
          </Text>
          <Text>
            ग{")"} निर्माण सम्पन्न प्रमाण-पत्र नं. :- {patraNoNiramSam} मिति
            {dateNiramSam} आ.व. {fyN}
          </Text>
          <Text>
            घ{")"} निर्माण इजाजत प्रमाण-पत्र नं. :- {patraNoNaamSari} मिति
            {dateNaamSari} आ.व. {fyNs}
          </Text>

          <Text>
            ३. निर्माणको किसिम : {"भवन"} कभरेज {} फार {}
          </Text>
          <Text>४. निर्माण भएको तल्ला: </Text>
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
                <View key={floor.id} style={{ height: "14px" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 10,
                        width: 10,
                      }}
                    >
                      {cn(index + 1)}.
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
                      {cn(total)} &nbsp;बर्गफुट
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <Text>
            यसमा उल्लेखित निबेदक श्री/श्रीमती/सुश्री
            {name} बाट नक्शा पास धरौटीवापत घरको {landArea} वर्ग फुटको रु {}
            र.नं. {} मिति {} वाट स-धन्यवाद प्राप्त भयो ।
          </Text>
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

export default NagarjunNaamsariDesign;

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
