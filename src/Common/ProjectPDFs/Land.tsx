import { Descriptions } from "antd";

export interface MyLands {
  id: number;
  mapSheetNo: string;
  landParcelNo: string;
  ropani: string;
  aana?: string;
  paisa?: string;
  daam?: string;
  remarks: string | null;
  landImageName: string;
  traceNaksa: string;
  tiroRasid: string;
  charkillaLetter: string;
  address: Address;
}

interface Address {
  id: number;
  ward: Ward;
  toleNep: string;
  toleEng: string;
}

interface Ward {
  id: number;
  name: string;
}

const Download = () => {
  const data: MyLands[] = [
    {
      id: 5183,
      mapSheetNo: "1",
      landParcelNo: "1231",
      ropani: "12",
      aana: null,
      paisa: null,
      daam: null,
      remarks: null,
      landImageName: "1646814548230_photo-1453728013993-6d66e9c9123a.jpg",
      traceNaksa: "1646814550105_photo-1453728013993-6d66e9c9123a.jpg",
      tiroRasid: "1646814551713_photo-1453728013993-6d66e9c9123a.jpg",
      charkillaLetter: "1646814553767_photo-1453728013993-6d66e9c9123a.jpg",
      address: {
        id: 5184,
        ward: { id: 1, name: "Ward 1" },
        toleNep: "test",
        toleEng: "test",
      },
    },
  ];

  return (
    <div style={{ height: "90vh", padding: "40px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Project Id: {1}</div>
      </div>
      <div>
        {data.map((item) => {
          return (
            <Descriptions
              size="middle"
              title="Applicant Details"
              layout="horizontal"
              bordered
              key={item.id}
            >
              <Descriptions.Item label="ID: " span={2}>
                {item?.id}
              </Descriptions.Item>
              <Descriptions.Item label="Map Sheet No: " span={2}>
                {item?.mapSheetNo}
              </Descriptions.Item>
              <Descriptions.Item label="Land Parcel No: " span={2}>
                {item?.landParcelNo}
              </Descriptions.Item>
              <Descriptions.Item label="Area (Square Meter):" span={2}>
                {item?.ropani}
              </Descriptions.Item>
              <Descriptions.Item label="Address ID:" span={2}>
                {item?.address.id}
              </Descriptions.Item>
              <Descriptions.Item label="Address Ward ID:" span={2}>
                {item?.address.ward.id}
              </Descriptions.Item>
              <Descriptions.Item label="Address Ward Name:" span={2}>
                {item?.address.ward.name}
              </Descriptions.Item>
              <Descriptions.Item label="Address Tole Nep:" span={2}>
                {item?.address.toleNep}
              </Descriptions.Item>
              <Descriptions.Item label="Address Tole Eng:" span={2}>
                {item?.address.toleEng}
              </Descriptions.Item>
              <Descriptions.Item label="Remarks:" span={4}>
                {item?.remarks}
              </Descriptions.Item>
              <Descriptions.Item label="Land Image Filename:" span={4}>
                {item?.landImageName}
              </Descriptions.Item>
              <Descriptions.Item label="Trace Naksa Filename:" span={4}>
                {item?.traceNaksa}
              </Descriptions.Item>
              <Descriptions.Item label="Tiro Rasid Filename:" span={4}>
                {item?.tiroRasid}
              </Descriptions.Item>
              <Descriptions.Item label="Charkilla Letter Filename:" span={4}>
                {item?.charkillaLetter}
              </Descriptions.Item>
            </Descriptions>
          );
        })}
      </div>
    </div>
  );
};

export default Download;
