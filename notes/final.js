// INSERT INTO `bps_ichhakamana_db`.`floor_list` (`id`, `name`, `is_deleted`) VALUES ('4', 'Floor 1', 0);
// INSERT INTO `bps_ichhakamana_db`.`floor_list` (`id`, `name`, `is_deleted`) VALUES ('5', 'Floor 2', 0);
// INSERT INTO `bps_ichhakamana_db`.`floor_list` (`id`, `name`, `is_deleted`) VALUES ('6', 'Floor 3', 0);
// INSERT INTO `bps_ichhakamana_db`.`floor_list` (`id`, `name`, `is_deleted`) VALUES ('7', 'Floor 4', 0);
// INSERT INTO `bps_ichhakamana_db`.`floor_list` (`id`, `name`, `is_deleted`) VALUES ('8', 'Floor 5', 0);
// INSERT INTO `bps_ichhakamana_db`.`floor_list` (`id`, `name`, `is_deleted`) VALUES ('9', 'Floor 6', 0);
// INSERT INTO `bps_ichhakamana_db`.`floor_list` (`id`, `name`, `is_deleted`) VALUES ('10', 'Floor 7', 0);
// INSERT INTO `bps_ichhakamana_db`.`floor_list` (`id`, `name`, `is_deleted`) VALUES ('11', 'Floor 8', 0);
// INSERT INTO `bps_ichhakamana_db`.`floor_list` (`id`, `name`, `is_deleted`) VALUES ('12', 'Floor 9', 0);
// INSERT INTO `bps_ichhakamana_db`.`floor_list` (`id`, `name`, `is_deleted`) VALUES ('13', 'Floor 10', 0);

<Text style={{ paddingTop: 10 }}>तपसिल :..</Text>
          <Text>१. जग्गाको विवरण : </Text>
          <Text>
            वार्ड न :{" "}
            <Text
              style={{
                fontFamily: "Noto",
                fontSize: 12,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {" "}
              {backendData?.lands[0].wardName}{" "}
            </Text>{" "}
            , स्थान :{" "}
            <Text
              style={{
                fontFamily: "Noto",
                fontSize: 12,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {" "}
              {backendData?.lands[0].toleNep}{" "}
            </Text>{" "}
            , किता न्, :{" "}
            <Text
              style={{
                fontFamily: "Noto",
                fontSize: 12,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {" "}
              {backendData?.lands[0].landParcelNo}{" "}
            </Text>{" "}
          </Text>
          <Text>
            क्षेत्रफल : {landData ? landData.actualSqm : ""}(व, मी ), छेत्र (जोन)
            : {data.buildingPurpose}
            {/* , उप छेत्र : वाकालो मिशृत बसोबस उपक्षेत */}
          </Text>
          <Text style={{ paddingTop: 6 }}>
            २. जग्गा धनीको नाम , थर , बाटो :{" "}
            <Text
              style={{
                fontFamily: "Noto",
                fontSize: 12,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {" "}
              {backendData?.lands[0]?.owner?.nameNep}{" "}
            </Text>{" "}
          </Text>
          <Text style={{ paddingTop: 6 }}>३. निर्माणको किसीम :</Text>
          <Text>४. (क) नक्सा पास प्रमाण पत्र न : मिति: ....</Text>
          <Text style={{ paddingTop: 5, paddingLeft: 12 }}>
            (ख) नक्सा पास नगरि बनाएको भए नीयमीत गरीएको मीती :
          </Text>
          <Text>
            ५. भवनको प्रायोजन :{" "}
            <Text
              style={{
                fontFamily: "Noto",
                fontSize: 10,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {data?.buildingPurpose}
            </Text>{" "}
          </Text>
          <Text>
            ६. भवनको लएमबिए{" "}
            <Text
              style={{
                fontFamily: "Noto",
                fontSize: 11,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {landData ? landData.lengthM : ""}
            </Text>{" "}
            (मी) , चोडाई{" "}
            <Text
              style={{
                fontFamily: "Noto",
                fontSize: 11,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {landData ? landData.widthM : ""}
            </Text>{" "}
            (मी) , उचाइ{" "}
            <Text
              style={{
                fontFamily: "Noto",
                fontSize: 11,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {landData ? landData.buildingH : ""}
            </Text>{" "}
            (मी)