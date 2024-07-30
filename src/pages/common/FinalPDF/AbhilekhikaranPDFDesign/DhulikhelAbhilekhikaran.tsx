import GovLogo from "../../../../Assets/Images/resizednepgov.png";
import Noto from "../../../../Assets/Fonts/NotoSansDevanagari-Regular.ttf";
import { NoticePDFdata } from "../../../../Services/PDFService";
import { municipalityDetails } from "../../../../constants/constants";
import { Document, Font, Image, Page, Text, View } from "@react-pdf/renderer";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { imgFolders, IMG_GET_URL } from "../../../../Services/Api";
import { addSlash } from "./AbhilekhikaranHelper";
import { FloorRow, PDFBodyType } from "../PDFtypes";
import {
  getAddress,
  getHouseOwnerName,
  getLandOwnerName,
} from "./mandandeupurHelper";
import { findHiAndLow, underline } from "../helper";
import {
  direction,
  landscape,
} from "../../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import DhulikhelLogo from "../../../../Assets/Images/dhulikhel_logo_png.png";
import NotoMedium from "../../../../Assets/Fonts/NotoSansDevanagari-Medium.ttf";
import { CertificateFooter } from "../PlinthDhulikhel";
import DhulikhelMapdanda, { MapdandaType } from "../DhulikhelMapdanda";
import { GetMapdandaBody } from "../../../../Services/MapdandaService";

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
  pdfData: PDFBodyType;
  mapdandaPid: GetMapdandaBody | undefined;
}

export const Underline: {
  textDecoration: "underline";
  textDecorationStyle: "dotted";
} = {
  textDecoration: "underline",
  textDecorationStyle: "dotted",
};

const DhulikhelAbhilekhikaran = ({
  data,
  backendData,
  mapdandaPid,
  pdfData,
}: Props) => {
  // Register font
  Font.register({
    family: "Noto",
    src: Noto,
  });
  Font.register({
    family: "NotoMedium",
    src: NotoMedium,
  });

  const applicantName = backendData?.applicant?.nameNep ?? "";
  const houseOwnerName = getHouseOwnerName(backendData);
  const landOwnerName = getLandOwnerName(backendData);

  const permaAdd = getAddress(backendData, "PERMANENT");

  const structuralGeneral = JSON.parse(backendData.structural?.general ?? "{}");
  // const floorDetail = JSON.parse(backendData.floor?.floorDetail ?? "[]");
  let buildingHeight = "";

  const buildingData = JSON.parse(backendData.byLaws?.landData ?? "{}");
  buildingHeight = buildingData?.buildingH ?? "";
  const buildingWidth = buildingData?.widthM ?? "";
  const buildingLength = buildingData?.lengthM ?? "";

  // console.log({ structuralGeneral, floorDetail });

  const address =
    permaAdd.municipality +
    ` ${ConvertToNepali(permaAdd.ward)}, ${permaAdd.tole}`;

  const sabikLand =
    backendData?.lands?.length > 0 ? backendData?.lands[0]?.sabik : null;
  console.log({ sabikLand: backendData.lands[0].sabik });

  const chalaniNo = ConvertToNepali(addSlash(data.chalanino));
  const patraSankhya = ConvertToNepali(addSlash(data.patrasankhya));

  const pubDate = ConvertToNepali(data.date);
  const houseOwners = backendData?.lands
    .map((lannnddd) => lannnddd.houseOwner)
    .flat();

  // const wardNo = ConvertToNepali(extractNum(backendData.lands[0].wardName));
  const kittaNo = ConvertToNepali(
    backendData.lands
      .map((land) => land.landParcelNo)
      ?.toString()
      .replace(/[\]"]+/g, "")
  );

  const buildingType = underline(
    structuralGeneral?.bstype?.includes("Frame")
      ? "RCC Frame Structure"
      : structuralGeneral.bstype
  );

  const area = ConvertToNepali(
    backendData.lands
      .map((land) => land.ropani)
      ?.toString()
      .replace(/[\]"]+/g, "")
  );

  const charkillas = backendData?.lands
    ?.map((landddd) => landddd.charKillas)
    .flat();

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
      return ConvertToNepali(myTotal);
    }
  };

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
  const totalFloorArea = ConvertToNepali(
    pdfData.floors
      .reduce((a, b) => a + b.ncT + b.countable + b.nCNT + b.other + b.prev, 0)
      .toFixed(2)
  );

  const mapdanda: MapdandaType = {
    row: pdfData.row,
    groundCoverage: groundCoverage(),
    actualSetback: setback(),
    checkIfHighTension: checkIfHighTension(),
    checkIfRiver: checkIfRiver(),
    myFloors: myFloors(),
    stSetback: stSetback(),
    totalFloorArea,
    groundCoverageStandard: pdfData.groundCoverageStandard,
    floorAreaStandard: pdfData.floorAreaStandard,
    far: pdfData.farCalculated,
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
          <Text> मिति : {pubDate}</Text>
          <Text style={{}}></Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: -35,
            paddingLeft: 50,
          }}
        >
          <Text style={{ paddingBottom: 4, marginTop: 10 }}>
            पत्र संख्या : {patraSankhya}
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
            चलानी नं : {chalaniNo}
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
              marginTop: 0,
              fontSize: 16,
              fontFamily: "NotoMedium",
              paddingTop: -5,
              marginBottom: 8,
            }}
          >
            {/* eslint-disable-next-line no-irregular-whitespace */}
            भवन अभिलेखिकरण तथा नक्सा प्रमाणीकरण प्रमाणपत्र
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: -15,
            paddingRight: 30,
            paddingBottom: 0,
          }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            {(houseOwners ?? houseOwners).map((owner) => (
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
                  width: 52,
                  height: 60,
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
            paddingTop: 10,
            paddingRight: 40,
            textAlign: "justify",
          }}
        >
          <Text style={{ paddingBottom: 4 }}>
            श्री/श्रीमती/सुश्री {underline(applicantName)}ले{" "}
            {underline(address)} टोलमा निम्न बमोजिम {underline("घर")} निर्माण
            कार्य पुरा भएको प्रमाणित गरिएको छ ।
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            १ साबिक {underline(sabikLand ?? "")} (साबिक), हालको वडा{" "}
            {underline(ConvertToNepali(permaAdd.ward))} कित्ता नं.{" "}
            {underline(kittaNo)} क्षेत्रफल {underline(area)}
          </Text>
          <Text style={{}}>२ चार किल्ला : </Text>
          <Text style={{ paddingLeft: 20, paddingBottom: 4 }}>
            {charkillas.map((charkilla) => (
              <Text key={charkilla.id}>
                {
                  direction.find(
                    (direct) => direct.value === charkilla.direction
                  )?.nepaliFull
                }{" "}
                {underline(charkilla.nameNep)}{" "}
                {underline(ConvertToNepali(charkilla?.actualSetBack ?? ""))}
                {", "}
              </Text>
            ))}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ३ जग्गा धनीको नाम: {underline(landOwnerName)}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ४ घर धनीको नाम: {underline(houseOwnerName)}{" "}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ५ निर्माणको किसिम {buildingType}
          </Text>
          <Text style={{ paddingBottom: 4 }}>
            ६ (क) नक्सा पास प्रमाण पत्र नं{" "}
            {underline(ConvertToNepali(patraSankhya))} मिति{" "}
            {underline(ConvertToNepali(data.date))}
          </Text>
          <Text style={{}}>७ भवनको प्रयोजन: {underline("आवाशिय")}</Text>
        </View>
        {/* <View style={{ flexDirection: "row" }}>
          <Text style={borderNoPadding}></Text>

          <Text style={borderNoPadding}>क्षेत्रफल </Text>
        </View>
        {floorDetail.map((data) => (
          <View style={{ flexDirection: "row" }} key={data.id}>
            <Text style={borderNoPadding}>{data.name}</Text>
            <Text style={borderNoPadding}>
              {ConvertToNepali((data?.ncT ?? 0) + (data?.nCNT ?? 0))}
            </Text>
          </View>
        ))} */}

        <View style={{ width: "100%", paddingLeft: 50, paddingTop: 4 }}>
          <Text style={{ paddingBottom: 7 }}>
            ८ पुरानो भइराखेको घरले चर्चेको क्षेत्रफल
          </Text>
          <DhulikhelMapdanda mapdandaPid={mapdandaPid} />
          <Text style={{ paddingBottom: 4, paddingTop: 10 }}>
            ९ स्वीकृत लम्बाइ {underline(ConvertToNepali(buildingLength))} मिटर,
            चौडाइ {underline(ConvertToNepali(buildingWidth))} मिटर, स्वीकृत उचाई{" "}
            {underline(ConvertToNepali(buildingHeight))} मिटर
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}></View>
        <CertificateFooter />
      </Page>
    </Document>
  );
};

export default DhulikhelAbhilekhikaran;
