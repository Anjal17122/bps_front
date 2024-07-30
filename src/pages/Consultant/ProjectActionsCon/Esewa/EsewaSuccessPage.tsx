import { Result } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

export function useSearchParams<ParamNames extends string[]>(
  ...parameterNames: ParamNames
): Record<ParamNames[number], string | null> {
  const { search } = useLocation();
  const Memoize = () => {
    // recalculate only when 'search' or arguments changed
    const searchParams = new URLSearchParams(search);
    return parameterNames.reduce(
      (accumulator, parameterName: ParamNames[number]) => {
        accumulator[parameterName] = searchParams.get(parameterName);
        return accumulator;
      },
      {} as Record<ParamNames[number], string | null>
    );
  };
  const memo = React.useMemo(Memoize, [
    search,
    parameterNames.join(","),
    parameterNames,
    Memoize,
  ]);
  return memo; // join for sake of reducing array of strings to simple, comparable string
}
const EsewaSuccessPage = () => {
  // const test = useSearchParams("oid", "amt", "refId", "q");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        status={"success"}
        title="Successfully Paid Rs. 100 through Esewa"
      />
    </div>
  );
};

export default EsewaSuccessPage;
