import { Descriptions } from "antd";
import { CharKilla } from "../../Services/PDFService";

interface CharKillaBody {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana?: string;
  paisa?: string;
  daam?: string;
  remarks?: string;
  wardName: string;
  toleNep: string;
  toleEng: string;
  landImageName: string;
  traceNaksa: string;
  tiroRasid: string;
  owners: any[];
  charKillas: CharKilla[];
  charkillaLetter: string;
}

const Charkilla = () => {
  const data: CharKillaBody[] = [
    {
      id: 5183,
      mapSheetNo: "2",
      landParcelNo: "1231",
      ropani: "12",
      aana: null,
      paisa: null,
      daam: null,
      remarks: null,
      wardName: "Ward 1",
      toleNep: "test",
      toleEng: "test",
      landImageName: "1646814548230_photo-1453728013993-6d66e9c9123a.jpg",
      traceNaksa: "1646814550105_photo-1453728013993-6d66e9c9123a.jpg",
      tiroRasid: "1646814551713_photo-1453728013993-6d66e9c9123a.jpg",
      owners: [],
      charKillas: [
        {
          id: 5185,
          direction: "East",
          side: "Front",
          landscapeType: "Road",
          nameNep: "Test",
          nameEng: "Test Road",
          kittaNo: null,
          actualSetBack: "Test Setbakc",
          standardSetBack: "Standard Setback",
          width: "1200",
          landId: 5183,
        },
        {
          id: 5285,
          direction: "East",
          side: "Front",
          landscapeType: "Road",
          nameNep: "Test",
          nameEng: "Test Road",
          kittaNo: null,
          actualSetBack: "Test Setbakc",
          standardSetBack: "Standard Setback",
          width: "1200",
          landId: 5183,
        },
        {
          id: 515,
          direction: "East",
          side: "Front",
          landscapeType: "Road",
          nameNep: "Test",
          nameEng: "Test Road",
          kittaNo: null,
          actualSetBack: "Test Setbakc",
          standardSetBack: "Standard Setback",
          width: "1200",
          landId: 5183,
        },
      ],
      charkillaLetter: "1646814553767_photo-1453728013993-6d66e9c9123a.jpg",
    },
  ];

  return (
    <div style={{ height: "90vh", padding: "40px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Project Id: {1}</div>
      </div>
      <div>
        <h2>Charkilla Details:</h2>
        {data.map((item) => {
          return (
            <div key={item.id}>
              {item.charKillas.map((charkilla) => {
                return (
                  <Descriptions
                    size="small"
                    layout="horizontal"
                    bordered
                    style={{ marginBottom: 10 }}
                    key={charkilla.id}
                  >
                    <Descriptions.Item label="ID: " span={1}>
                      {charkilla.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Direction: " span={1}>
                      {charkilla.direction}
                    </Descriptions.Item>
                    <Descriptions.Item label="Landscape Type: " span={1}>
                      {charkilla.landscapeType}
                    </Descriptions.Item>
                    <Descriptions.Item label="Name (Nepali): " span={1}>
                      {charkilla.nameNep}
                    </Descriptions.Item>
                    <Descriptions.Item label="Kitta Number: " span={1}>
                      {charkilla.kittaNo}
                    </Descriptions.Item>
                    <Descriptions.Item label="Actual Setback: " span={1}>
                      {charkilla.actualSetBack}
                    </Descriptions.Item>
                    <Descriptions.Item label="Standard Setback: " span={1}>
                      {charkilla.standardSetBack}
                    </Descriptions.Item>
                    <Descriptions.Item label="Width: " span={1}>
                      {charkilla.width}
                    </Descriptions.Item>
                    <Descriptions.Item label="Land ID: " span={1}>
                      {charkilla.landId}
                    </Descriptions.Item>
                  </Descriptions>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Charkilla;
