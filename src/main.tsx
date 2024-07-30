import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./Store/ContextApi";
import { Buffer as BufferPolyfill } from "buffer";
import ProcessPolyfill from "process";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryUI from "./Components/Common/ErrorBoundaryUI/ErrorBoundaryUI";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

declare let process: typeof ProcessPolyfill;
globalThis.process = ProcessPolyfill;
declare let Buffer: typeof BufferPolyfill;
globalThis.Buffer = BufferPolyfill;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, retry: 1, refetchOnWindowFocus: false },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <React.StrictMode>
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 3,
              fontFamily: "'Nunito', sans-serif",
            },
          }}
        >
          <ErrorBoundary
            fallbackRender={ErrorBoundaryUI}
            onReset={(details) => {
              console.log({ details });
              // Reset the state of your app so the error doesn't happen again
            }}
          >
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
          </ErrorBoundary>
        </ConfigProvider>
      </React.StrictMode>
    </StoreProvider>
  </QueryClientProvider>
);
