import { View, Text } from "@react-pdf/renderer";
import { border } from "./NirmanSampannaDhulikhel";
import { sN } from "../../../Services/ProjectService";
import { GetMapdandaBody } from "../../../Services/MapdandaService";

export type MapdandaType = {
  groundCoverage: sN;
  totalFloorArea: sN;
  myFloors: sN;
  row: string;
  stSetback: sN;
  actualSetback: sN;
  checkIfHighTension: sN;
  checkIfRiver: sN;
  groundCoverageStandard: string;
  floorAreaStandard: string;
  far: sN;
};

export default function DhulikhelMapdanda({
  mapdandaPid,
  pid,
}: {
  mapdandaPid: GetMapdandaBody | undefined;
  pid?: string;
}) {
  return (
    <>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={border}>घरको विवरण </Text>
        <Text style={border}>मापदण्ड</Text>
        <Text style={border}>नक्सा अनुसार </Text>
        <Text style={border}>कैफियत</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={border}>(क) ग्राउण्ड कभरेज </Text>
        <Text style={border}>{mapdandaPid?.groundCoverageStandard}</Text>
        <Text style={border}>{mapdandaPid?.groundCoverageActual}</Text>
        <Text style={border}>{mapdandaPid?.groundCoverageRemarks}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={border}>(ख) कुल फ्लोर एरिया</Text>
        <Text style={border}>{mapdandaPid?.totalFloorAreaStandard}</Text>
        <Text style={border}>{mapdandaPid?.totalFloorAreaActual}</Text>
        <Text style={border}>{mapdandaPid?.totalFloorAreaRemarks}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={border}>(ग) तल्ला</Text>
        <Text style={border}>{mapdandaPid?.tallaStandard}</Text>
        <Text style={border}>{mapdandaPid?.tallaActual}</Text>
        <Text style={border}>{mapdandaPid?.tallaRemarks}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={border}>(घ) R.O.W.</Text>
        <Text style={border}>{mapdandaPid?.rowStandard}</Text>
        <Text style={border}>{mapdandaPid?.rowActual}</Text>
        <Text style={border}>{mapdandaPid?.rowRemarks}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={border}>(ङ) Set Back</Text>
        <Text style={{ fontSize: 10, ...border }}>
          {mapdandaPid?.setBackStandard}
        </Text>
        <Text style={{ fontSize: 10, ...border }}>
          {mapdandaPid?.setBackActual}
        </Text>
        <Text style={border}>{mapdandaPid?.setBackRemarks}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={border}>(च) विधुत लाइन</Text>
        <Text style={border}>{mapdandaPid?.highTensionStandard}</Text>
        <Text style={border}>{mapdandaPid?.highTensionActual}</Text>
        <Text style={border}>{mapdandaPid?.highTensionRemarks}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={border}>(छ) नदि /खोल्सा / किनारा</Text>
        <Text style={border}>{mapdandaPid?.riverStandard}</Text>
        <Text style={border}>{mapdandaPid?.riverActual}</Text>
        <Text style={border}>{mapdandaPid?.riverRemarks}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ ...border, fontSize: 10.5 }}>
          (ज) भुईं क्षेत्रको अनुपात (FAR)
        </Text>
        <Text style={border}>{mapdandaPid?.farStandard}</Text>
        <Text style={border}>{mapdandaPid?.farActual}</Text>
        <Text style={border}>{mapdandaPid?.farRemarks}</Text>
      </View>
    </>
  );
}

{
  /* <>
<View style={{ display: "flex", flexDirection: "row" }}>
  <Text style={border}>घरको विवरण </Text>
  <Text style={border}>मापदण्ड</Text>
  <Text style={border}>नक्सा अनुसार </Text>
  <Text style={border}>कैफियत</Text>
</View>
<View style={{ display: "flex", flexDirection: "row" }}>
  <Text style={border}>(क) ग्राउण्ड कभरेज </Text>
  <Text style={border}>
    {ConvertToNepali(groundCoverageStandard)} (sq. ft.)
  </Text>
  <Text style={border}>{groundCoverage} (sq. ft.)</Text>
  <Text style={border}></Text>
</View>
<View style={{ display: "flex", flexDirection: "row" }}>
  <Text style={border}>(ख) कुल फ्लोर एरिया</Text>
  <Text style={border}>
    {ConvertToNepali(floorAreaStandard)} (sq. ft.)
  </Text>
  <Text style={border}>{totalFloorArea} (sq. ft.)</Text>
  <Text style={border}></Text>
</View>
<View style={{ display: "flex", flexDirection: "row" }}>
  <Text style={border}>(ग) तल्ला</Text>
  <Text style={border}>{}</Text>
  <Text style={border}>{ConvertToNepali(myFloors)}</Text>
  <Text style={border}></Text>
</View>
<View style={{ display: "flex", flexDirection: "row" }}>
  <Text style={border}>(घ) R.O.W.</Text>
  <Text style={border}>
    {pid === "68" || pid === "59"
      ? "१३'"
      : pid === "75"
      ? "६ मिटर"
      : "३.५ मिटर"}
    
  </Text>
  <Text style={border}>
    {pid === "68" || pid === "59"
      ? "६'६''"
      : ConvertToNepali(row?.replaceAll("m", ""))}
  </Text>
  <Text style={border}>
    {pid === "68" || pid === "59" ? "From center line" : null}
  </Text>
</View>
<View style={{ display: "flex", flexDirection: "row" }}>
  <Text style={border}>(ङ) Set Back</Text>
  <Text style={{ fontSize: 10, ...border }}>{stSetback}</Text>
  <Text style={{ fontSize: 10, ...border }}>{actualSetback}</Text>
  <Text style={border}></Text>
</View>
<View style={{ display: "flex", flexDirection: "row" }}>
  <Text style={border}>(च) विधुत लाइन</Text>
  <Text style={border}></Text>
  <Text style={border}>{checkIfHighTension}</Text>
  <Text style={border}></Text>
</View>
<View style={{ display: "flex", flexDirection: "row" }}>
  <Text style={border}>(छ) नदि /खोल्सा / किनारा</Text>
  <Text style={border}></Text>
  <Text style={border}>{checkIfRiver}</Text>
  <Text style={border}></Text>
</View>
<View style={{ display: "flex", flexDirection: "row" }}>
  <Text style={{ ...border, fontSize: 10.5 }}>
    (ज) भुईं क्षेत्रको अनुपात (FAR)
  </Text>
  <Text style={border}>४</Text>
  <Text style={border}>{ConvertToNepali(far)}</Text>
  <Text style={border}></Text>
</View>
</> */
}
