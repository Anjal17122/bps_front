import { Text, View } from "@react-pdf/renderer";
import { PDFBodyType, StyleHeader } from "./PDFtypes";
import { ConvertToNepali } from "../../../constants/NumberConverter";

export const CharkillaMap = (data: PDFBodyType) => {
  const styleHeader: StyleHeader = {
    width: 90,
    textDecoration: "underline",
    textDecorationStyle: "dotted",
    fontSize: 9,
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 0,
          paddingLeft: 20,
        }}
      >
        <Text style={styleHeader}>दिशा</Text>
        <Text style={styleHeader}>किसिम</Text>
        <Text style={styleHeader}>कित्ता नं:</Text>
        <Text style={styleHeader}>छाड्नु पर्ने दुरी:</Text>
        <Text style={styleHeader}>छाडेको दुरी:</Text>
      </View>
      {data.charkillas.map((charkilla) => (
        <View
          key={charkilla.id}
          style={{
            flexDirection: "row",
            paddingLeft: 20,
          }}
        >
          <Text
            style={{
              width: 90,
              fontSize: 9,
            }}
          >
            {charkilla.direction}
          </Text>
          <Text
            style={{
              width: 90,
              fontSize: 9,
            }}
          >
            {charkilla.landscapeType}
          </Text>
          <Text
            style={{
              width: 90,
            }}
          >
            {typeof charkilla.actualSetBack === "string"
              ? ConvertToNepali(charkilla.kittaNo ?? "-")
              : "-"}
          </Text>
          <Text
            style={{
              width: 90,
            }}
          >
            {typeof charkilla.standardSetBack === "string"
              ? ConvertToNepali(charkilla.standardSetBack)
              : "-"}
          </Text>
          <Text
            style={{
              width: 90,
            }}
          >
            {typeof charkilla.actualSetBack === "string"
              ? ConvertToNepali(charkilla.actualSetBack)
              : "-"}
          </Text>
        </View>
      ))}
    </>
  );
};
