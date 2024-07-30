import { useEffect, useState } from "react";
import { GETplinthPDF } from "../../../Services/PDFService";
import { ResGetOneCertificate } from "../../../Services/PlinthService";
import { GetPDFData } from "../../../constants/CommonFunctions";
import { FormInstance, Modal, message } from "antd";
import { PDFBodyType } from "../../common/FinalPDF/PDFtypes";
import {
  direction,
  landscape,
} from "../../Consultant/ProjectCreate/Project/Charkilla/AddCharkilla";
import { ConvertToNepali } from "../../../constants/NumberConverter";
import MapdandaForm from "./MapdandaForm";
import { findHiAndLow } from "../../common/FinalPDF/helper";
import { MapdandaValues } from "./types";
import { convertToPostMapdandaBody } from "./utils";
import { postMapdanda } from "../../../Services/MapdandaService";

type Props = { pid: number; onClose: () => void };

const AddMapdandaModal = ({ pid, onClose }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [pdfData, setPdfData] = useState<PDFBodyType>();

  useEffect(() => {
    GETplinthPDF(pid ?? "0", messageApi).then((res) => {
      let cert: ResGetOneCertificate = {
        data: {
          chalaniNum: "",
          certificateType: "",
          id: 0,
          createdById: 0,
          patraSankhya: "",
          projectPermaId: 0,
          publishedDateEng: "",
          publishedDateNep: "",
          creationDate: "",
          tala: "",
        },
        message: "",
      };
      const PDFdata = GetPDFData(res, cert);
      setPdfData(PDFdata);
    });
  }, []);

  if (!pdfData) return <>Loading...</>;

  const setback = (): string => {
    const regex = /[1-9]/;
    const data = pdfData?.charkillas
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
    return data ?? "";
  };

  const stSetback = (): string => {
    const regex = /[1-9]/;
    const data = pdfData?.charkillas
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
    return data ?? "";
  };

  const totalFloorArea = ConvertToNepali(
    pdfData?.floors
      .reduce((a, b) => a + b.ncT + b.countable + b.nCNT + b.other + b.prev, 0)
      .toFixed(2)
  );

  const groundCoverage = (): string => {
    const myFloor = pdfData?.floors.find(
      (floor) => floor.name === "जमिन तल्ला"
    );
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
      return ConvertToNepali(myTotal) ?? "-";
    }
  };

  function checkIfHighTension() {
    if (
      pdfData?.charkillas
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
      pdfData?.charkillas
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

  const initialValues = {
    groundCoverageStandard:
      ConvertToNepali(pdfData?.groundCoverageStandard) + " (sq.ft.)",
    groundCoverageActual: groundCoverage() + " (sq.ft.)",
    totalFloorAreaStandard:
      ConvertToNepali(pdfData?.floorAreaStandard) + " (sq.ft.)",
    totalFloorAreaActual: totalFloorArea + " (sq.ft.)",
    rowActual: ConvertToNepali(pdfData?.row) + " मिटर",
    setBackActual: setback(),
    highTensionActual: checkIfHighTension(),
    riverActual: checkIfRiver(),
    setBackStandard: stSetback(),
    farActual: ConvertToNepali(pdfData?.far),
    tallaActual: ConvertToNepali(myFloors()),
    farStandard: "४",
  };

  console.log({ initialValues });

  const handleFinish = (values: MapdandaValues, form: FormInstance<any>) => {
    const data = convertToPostMapdandaBody(values, pid);

    postMapdanda(data, messageApi).then((res) => {
      messageApi.success("Mapdanda Added Successfully!");
      form.resetFields();
    });
  };

  return (
    <Modal
      open={true}
      width={600}
      footer={null}
      onCancel={onClose}
      title={false}
      centered={true}
      destroyOnClose={true}
    >
      {contextHolder}
      <h2>मापदण्ड Add</h2>
      <MapdandaForm initialValues={initialValues} handleFinish={handleFinish} />
    </Modal>
  );
};

export default AddMapdandaModal;
