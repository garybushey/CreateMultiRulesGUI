/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

type Variables = {
  subscriptionID: string;
  workspaceName: string;
  resourceGroupName: string;
  appClientID: string;
}

function getVariables(): Promise<Variables> {
  return fetch('/api/settings')
    .then(res => res.json()
      .then(res => { return res as Variables }))
}


 
export const msalConfig = {
  auth: {
    //clientId: "5ee546a5-ff26-474f-a8eb-70d4f8e14fe9",
    clientId: String(process.env.REACT_APP_CLIENT_ID),
    authority:
      "https://login.microsoftonline.com/ae0818a0-ede8-4da6-9786-2d9d5fd5295f",
    redirectUri: "http://localhost:3000",
  },
  // auth: {
  //   clientId: "5d936ca8-c7d8-41de-9efa-797b281a3907",
  //   authority:
  //     "https://login.microsoftonline.com/4b2462a4-bbee-495a-a0e1-f23ae524cc9c",
  //   redirectUri: "http://localhost:3000",
  // },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ["https://management.azure.com/.default"],
};
