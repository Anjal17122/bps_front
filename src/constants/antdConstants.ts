import { DefaultOptionType } from "antd/es/cascader";

export const filter = (inputValue: string, path: DefaultOptionType[]) =>
  path.some(
    (option) =>
      (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) >
      -1
  );
export const normFile = (e: { fileList: string }) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
