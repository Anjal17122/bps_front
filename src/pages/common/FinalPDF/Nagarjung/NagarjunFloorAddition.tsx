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
import Npage2 from "../../../../Assets/Images/nagarjun_plinth_page2.jpeg";
import {
  calculateNagarjunRevenue,
  convertToFeet,
} from "../../../../constants/CommonFunctions";

interface Props {
  pdfData: PDFBodyType;
  rasidList: RasidListType[];
}

const NagarjunFloorAddition = ({ pdfData, rasidList }: Props) => {
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
          <Text style={{ paddingBottom: 1, marginTop: 0 }}>प्र.प.नं :-</Text>
          <Text>
            आ.ब :-
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
          {(pdfData.homeOwners.length
            ? pdfData.homeOwners
            : pdfData.landOwners
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
              fontSize: 18,
              marginTop: -35,
              fontFamily: "NotoMedium",
            }}
          >
            &nbsp;निर्माण नियमित/तल्ला थप प्रमाण-पत्र
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingLeft: 50,
            marginTop: -15,
            paddingBottom: 5,
          }}
        ></View>

        <View
          style={{ paddingLeft: 50, paddingRight: 40, textAlign: "justify" }}
        >
          <Text>
            श्री / श्रीमती / शुश्री। ...........ले मिति..... मा तपसिल
            बमोजिम.......निर्माण कार्य सम्पन्न गर्नु भएकोले यो निर्माण नियमित /
            तल्ला थप प्रमाण-पत्र प्रधान गरिएको छ ।
          </Text>
        </View>
        <View style={{ paddingTop: 3 }}>
          <Text
            style={{
              fontFamily: "NotoMedium",
              fontSize: 14,
              paddingTop: 5,
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
          <Text>१. जग्गाधनीको नाम,थर, वतन..................... </Text>
          <Text>
            २. जग्गाको विवरण: नागार्जुन न.पा. वडा नं ...... साविक
            .........ग.वि.स वडा नं.......सिट नं .................. कित्ता
            नं.................क्षेत्रफल...........बर्गमीटर
          </Text>
          <Text>
            ३.निर्माणको किसिम
            ..........................कभरेज.....................फार
            .............
          </Text>
          <Text>४.निर्माण भएको तल्ला :</Text>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 40px 0 20px",
            }}
          >
            <Text>क) जमिन मुनिको पहिलो तल्ला</Text>
            <Text>=..........................बर्गफूट</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 40px 0 20px",
            }}
          >
            <Text>ख) जमिन मुनिको तल्ला</Text>
            <Text>=..........................बर्गफूट</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 40px 0 20px",
            }}
          >
            <Text>ग) जमिन तल्ला</Text>
            <Text>=..........................बर्गफूट</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 40px 0 20px",
            }}
          >
            <Text>घ) पहिलो तल्ला</Text>
            <Text>=..........................बर्गफूट</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 40px 0 20px",
            }}
          >
            <Text>ङ) दोस्रो तल्ला</Text>
            <Text>=..........................बर्गफूट</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 40px 0 20px",
            }}
          >
            <Text>च) तेस्रो तल्ला</Text>
            <Text>=..........................बर्गफूट</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 40px 0 20px",
            }}
          >
            <Text>छ) चौथो तल्ला</Text>
            <Text>=..........................बर्गफूट</Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 40px 0 20px",
            }}
          >
            <Text>ज) पाँचौ तल्ला</Text>
            <Text>=..........................बर्गफूट</Text>
          </View>
          <View
            style={{
              margin: "5px 0",
              borderTop: "2px solid black",
              borderBottom: "2px solid black",
              padding: "0 40px 0 25px",
            }}
          >
            <Text>जम्मा क्षेत्रफल= ..........................बर्गफूट</Text>
          </View>
          <View>
            <Text>५. सडकबाट छोडेको दुरी.........बाटोको अवस्था.........</Text>
            <Text>६. खहरे/खोलाको नामः........ .हटाएको दुरी.........</Text>
            <Text>
              ७. विद्युत लाईन क्षमता..........छोडेको दुरी..............
            </Text>
          </View>
          {/* <View style={{ paddingLeft: 70, paddingRight: 40, marginTop: 5 }}>
            <Text style={{ textAlign: "center" }}>
              नागार्जुन न.पा. कार्यालय राजस्व शाखाबाट
            </Text>
            <Text>
              यसमा उल्लेखित निवेदक श्री/श्रीमती सुश्री {name} बाट नक्शा पास
              धरौटी बाफत घरको {underline(ConvertToNepali(totalSqFt))} वर्ग फिटको
              रु{" "}
              {underline(
                ConvertToNepali(
                  calculateNagarjunRevenue(
                    parseFloat(totalTaxable ?? "0")
                  ).toFixed(2)
                )
              )}{" "}
              &nbsp; र. नं. ........... मिति ...................... बाट
              स-धन्यवाद प्राप्त भयो ।
            </Text>
          </View> */}
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
              width: "520",
              height: "800",
            }}
          />
        </View>
      </Page>
    </Document>
  );
};

export default NagarjunFloorAddition;

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
          marginTop: -5,
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
          <Text style={{ width: 200 }}>फिल्ड निरिक्षण गरी पेश गर्ने</Text>
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
