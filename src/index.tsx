import React from "react";
import ReactDOM from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
  Configuration
} from "@azure/msal-browser";

import { PageLayout } from './components/PageLayout';

//Setup the needed variables to login to Entra ID
const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID + "",
    authority: "https://login.microsoftonline.com/" + process.env.REACT_APP_TENANT_ID,
    redirectUri: "/",
    postLogoutRedirectUri: "/"
  },
  system: {
    allowNativeBroker: false // Disables WAM Broker
  }
};
const msalInstance = new PublicClientApplication(msalConfig);

//Initialize the needed information for MSAL to work correctly and the continue to show the pages.
//see https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react 
//for examples and code 

msalInstance.initialize().then(() => {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  //FluentProvider will allow you to switch themes if you want to.
  root.render(
    <>
      <FluentProvider theme={webLightTheme}>
        <React.StrictMode>
          <PageLayout pca={msalInstance} />
        </React.StrictMode>
      </FluentProvider>
    </>
  );
});

