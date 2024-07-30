import { Text, View } from "@react-pdf/renderer";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { CharKilla } from "../../../../Services/PDFService";
import { StyleHeader } from "../PDFtypes";

export const charkillaAbhi = (charkillas: CharKilla[]) => {
  const styleHeader: StyleHeader = {
    width: 100,
    textDecoration: "underline",
    textDecorationStyle: "dotted",
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 4,
        }}
      >
        <Text style={styleHeader}>दिशा</Text>
        <Text style={styleHeader}>किसिम</Text>
        <Text style={styleHeader}>छाड्नु पर्ने दुरी:</Text>
        <Text style={styleHeader}>छाडेको दुरी:</Text>
      </View>
      {charkillas.map((charkill) => (
        <View
          key={charkill.id}
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              width: 100,
            }}
          >
            {charkill.direction}
          </Text>
          <Text
            style={{
              width: 100,
            }}
          >
            {charkill.landscapeType}
          </Text>
          <Text
            style={{
              width: 100,
            }}
          >
            {typeof charkill.standardSetBack === "string"
              ? ConvertToNepali(charkill.standardSetBack)
              : "-"}
          </Text>
          <Text
            style={{
              width: 100,
            }}
          >
            {typeof charkill.actualSetBack === "string"
              ? ConvertToNepali(charkill.actualSetBack)
              : "-"}
          </Text>
        </View>
      ))}
    </>
  );
};

export const delSlash = (mystr: string) => {
  return mystr.replaceAll("/", "-");
};

export const addSlash = (mystr: string) => {
  return mystr.replaceAll("-", "/");
};
