import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./services/authConfig";

import { PageLayout } from './components/PageLayout';

// Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <FluentProvider theme={teamsLightTheme}>
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <PageLayout />
      </MsalProvider>
    </React.StrictMode>
  </FluentProvider>
);
