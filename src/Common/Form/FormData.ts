import { CommonType } from "../../Services/AddressService";
import * as getA from "../../Services/AddressService";
import { MessageInstance } from "antd/es/message/interface";
import { sN } from "../../Services/ProjectService";
import { isUnicode } from "../../constants/constants";

export const RequiredRule = (name: string) => [
  {
    required: true,
    message: `Please input your ${name}!`,
  },
];

interface SubmitFailedType {
  values: Values;
  errorFields: ErrorField[];
  outOfDate: boolean;
}

interface ErrorField {
  name: string[];
  errors: string[];
  warnings: any[];
}

interface Values {}
declare type InternalNamePath = (string | number)[];
export const Colheight = (h: number) => ({
  xs: 24,
  sm: 24,
  md: 24,
  lg: h,
  xl: h,
  xxl: h,
});
export interface ValidateErrorEntity<Values = any> {
  values: Values;
  errorFields: {
    name: InternalNamePath;
    errors: string[];
  }[];
  outOfDate: boolean;
}

export const submitFailedFinal = (
  val: ValidateErrorEntity<Values>,
  myMessageApi: MessageInstance
) => {
  myMessageApi.error(val.errorFields[0].errors[0]);
};

export const submitFailed = (e: ValidateErrorEntity<any>) =>
  alert(e.errorFields[0].errors[0]);

export const FormProps = (name: string, label: string) => {
  return {
    label: label,
    required: false,
    name: name,
    rules: RequiredRule(label),
  };
};
export const FormNReq = (name: string, label: string) => {
  return {
    label: label,
    required: false,
    name: name,
    rules: [
      {
        required: false,
        message: `Please input your ${name}!`,
      },
    ],
  };
};
export const FormNotReq = (name: string, label: string) => {
  return {
    label: label,
    required: false,
    name: name,
  };
};

export const NoLabelReq = (name: string, label: string) => {
  return {
    name,
    required: false,
    rules: [
      {
        required: true,
        message: `Please input your ${label}!`,
      },
    ],
    // rules: RequiredRule(label),
  };
};

export const FormNoLabel = (name: string, label: string) => {
  return {
    required: false,
    name: name,
    rules: RequiredRule(label),
  };
};

export const InputDateValid = (name: string | sN[], label: string) => {
  return {
    required: false,
    name: name,
    label: label,
    rules: [
      () => ({
        validator(_: any, value: any) {
          const regEx = /^\d{4}-\d{2}-\d{2}$/;
          if (!value) return Promise.reject(`Please input your ${label}!`);
          if (!value.match(regEx))
            return Promise.reject("Please input correct date format!");
          return Promise.resolve();
        },
      }),
    ],
  };
};

export const UnicodeValid = (name: string | sN[], label: string) => {
  return {
    label: label,
    required: false,
    name: name,
    rules: [
      () => ({
        validator(_: any, value: any) {
          if (!value) return Promise.reject(`Please input your ${label}!`);
          if (!isUnicode(value))
            return Promise.reject("Only unicode is allowed!");
          return Promise.resolve();
        },
      }),
    ],
  };
};

export const isFeet = (str: string) => {
  // regex should only be numbers
  let unicodeRegex = /^[0-9 "']+$/;
  return unicodeRegex.test(str);
};

export const ValidSetback = (name: string | sN[], label: string) => {
  return {
    label: label,
    required: false,
    name: name,
    rules: [
      () => ({
        validator(_: any, value: any) {
          if (!value) return Promise.reject(`Please input your ${label}!`);
          if (!isFeet(value))
            return Promise.reject(`Only 5'2" format allowed!`);
          return Promise.resolve();
        },
      }),
    ],
  };
};

export const InputDateNolblValid = (name: string) => {
  return {
    required: false,
    name: name,
    rules: [
      () => ({
        validator(_: any, value: any) {
          const regEx = /^\d{4}-\d{2}-\d{2}$/;
          if (!value) return Promise.reject(`Please input date!`);
          if (!value.match(regEx))
            return Promise.reject("Please input correct date format!");
          return Promise.resolve();
        },
      }),
    ],
  };
};
export const NoLblNoReq = (name: string, label: string) => {
  return {
    required: false,
    name: name,
    // rules: [
    //   {
    //     required: false,
    //     message: `*`,
    //   },
    // ],
  };
};

export const FormReq = (name: string, label: string) => {
  return {
    required: false,
    // label: label,
    name: name,
    rules: [
      {
        required: true,
        message: `*`,
      },
    ],
  };
};

export const FormWini = (name: string) => {
  return {
    initialValue: "",
    required: false,
    name: name,
    // rules: [
    //   {
    //     required: false,
    //     message: `*`,
    //   },
    // ],
  };
};

export const toList = (
  data: CommonType[]
): { label: string; value: string }[] =>
  data.map((x) => ({ label: x.name, value: x.id.toString() }));

export function getWard(selected: {
  state: string;
  district: string;
  muni: string;
  ward: string;
}) {
  return (
    val: sN,
    set: React.Dispatch<React.SetStateAction<getA.CommonType[]>>
  ) => {
    console.log({ val });

    getA
      .getWards({
        provinceid: selected.state,
        districtid: selected.district,
        municipalityid: val,
      })
      .then((wards) => set(wards.data));
  };
}

export const ColHeight = (h: number) => ({
  xs: 24,
  sm: 24,
  md: 24,
  lg: h,
  xl: h,
  xxl: h,
});
const flexCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const flexColAstart = {
  display: "flex",
  flexFlow: "column",
  alignItems: "flex-start",
  justifyContent: "center",
};
const flexColAend = {
  display: "flex",
  flexFlow: "column",
  alignItems: "flex-end",
  justifyContent: "center",
};

export { flexCenter, flexColAstart, flexColAend };
