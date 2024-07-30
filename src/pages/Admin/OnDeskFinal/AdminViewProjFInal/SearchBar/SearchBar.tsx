import React from "react";
import { DatePicker } from "antd";
import ResetButton from "./ResetButton";
import SearchBtn from "./SearchBtn";
import dayjs from "dayjs";
import { dispatchPage } from "../../../../../Store/StorePagination/StorePagination";
import { AcP } from "../../../../../Store/StorePagination/types";
import { dispatchUrl } from "../../../../../Store/StoreUrls/StoreUrls";
import { AcUrl } from "../../../../../Store/StoreUrls/types";
import { UrlsOnDesk, AcGetUrls } from "../../../../../constants/MyUrls/MyUrls";
import { TabTy } from "../types/typesAdminViewProj";

interface Props {
  type: TabTy;
  children?: React.ReactNode;
}

const SearchBar = ({ type, children }: Props) => {
  return (
    <div className="tabWrapper">
      <div className="TableHead">
        <ResetButton type={type} />
        {children}
        <SearchBtn
          typ="id"
          onSearch={(id) => {
            dispatchPage({
              type: ("set" + type + "Page") as AcP,
              payload: 0,
            });
            dispatchUrl({
              type: ("set" + type + "Url") as AcUrl,
              payload: UrlsOnDesk((type + "SearchById") as AcGetUrls, id),
            });
          }}
        />
        <SearchBtn
          typ="name"
          onSearch={(name) => {
            dispatchPage({
              type: ("set" + type + "Page") as AcP,
              payload: 0,
            });
            dispatchUrl({
              type: ("set" + type + "Url") as AcUrl,
              payload: UrlsOnDesk((type + "SearchByName") as AcGetUrls, name),
            });
          }}
        />
        <SearchBtn
          typ="kitta"
          onSearch={(kitta) => {
            dispatchPage({
              type: ("set" + type + "Page") as AcP,
              payload: 0,
            });
            dispatchUrl({
              type: ("set" + type + "Url") as AcUrl,
              payload: UrlsOnDesk(
                (type + "SearchByKittaNo") as AcGetUrls,
                kitta
              ),
            });
          }}
        />
        <div>
          <DatePicker.RangePicker
            onChange={(values) => {
              dispatchPage({
                type: ("set" + type + "Page") as AcP,
                payload: 0,
              });
              const startDate = dayjs(
                values ? values[0]?.toString() : new Date()
              ).format("YYYY-MM-DD");
              const endDate = dayjs(
                values ? values[1]?.toString() : new Date()
              ).format("YYYY-MM-DD");
              dispatchUrl({
                type: ("set" + type + "Url") as AcUrl,
                payload: UrlsOnDesk(
                  (type + "SearchByDate") as AcGetUrls,
                  startDate,
                  endDate
                ),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
