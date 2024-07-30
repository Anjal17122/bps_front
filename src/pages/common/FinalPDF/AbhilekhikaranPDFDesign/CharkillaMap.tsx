import { Text, View } from "@react-pdf/renderer";
import { ConvertToNepali } from "../../../../constants/NumberConverter";
import { StyleHeader } from "../PDFtypes";
import { CharKilla } from "../../../../Services/PDFService";
import {
  direction,
  landscape,
} from "../../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";

export const CharkillaMap = (charkillas: CharKilla[]) => {
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
      {charkillas?.map((charkilla) => (
        <View
          key={charkilla.id}
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              width: 100,
              fontSize: 9,
            }}
          >
            {direction.find((direct) => direct.value === charkilla.direction)
              ?.nepaliFull ?? ""}
          </Text>
          <Text
            style={{
              width: 100,
              fontSize: 9,
            }}
          >
            {landscape.find(
              (landsca) => landsca.value === charkilla.landscapeType
            )?.nepali ?? ""}
          </Text>
          <Text
            style={{
              width: 100,
              fontSize: 9,
            }}
          >
            {typeof charkilla.standardSetBack === "string"
              ? ConvertToNepali(charkilla.standardSetBack)
              : "-"}
          </Text>
          <Text
            style={{
              width: 100,
              fontSize: 9,
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
