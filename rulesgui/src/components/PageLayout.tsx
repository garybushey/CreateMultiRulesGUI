/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { useState, useEffect } from 'react';
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { loginRequest } from '../services/authConfig';
import { getSentinelRulesandTemplates } from '../services/sentinel';
import { RulesTable } from './RulesTable';
import Button from 'react-bootstrap/Button';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { fetchSettings } from '../services/Settings';


interface globalData {
  subscriptionID: string,
  workspaceName: string,
  resourceGroupName: string,
  appClientID: string
}
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [sentinelData, setSentinelData] = useState();

  //Load all the rules 
  function GetRules() {
    //  acquires an access token which is then attached to a request for Sentinel REST API data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        getSentinelRulesandTemplates(response.accessToken).then((response) => setSentinelData(response));
      });
  }

  return (
    <>

      
      {sentinelData ? (<RulesTable sentinelData={sentinelData} />) : (
        <Button variant="secondary" onClick={GetRules}>
          Load Rule Templates
        </Button>
      )}

    </>
  );
};

export const PageLayout = () => {
  const isAuthenticated = useIsAuthenticated();
  const [globalVariables, setGlobalVariables]: any = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetchSettings();

      setGlobalVariables(response);
    }
    fetchData();

  }, [setGlobalVariables])

  return (
    <>
      <Navbar bg="primary" variant="dark" className="navbarStyle">
        <a className="navbar-brand" href="/">
          Create multiple Microsoft Sentinel rules from rule templates
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </Navbar>
      <br />
      <br />
      <h5>
        <center>
          Select one or more rule templates and then click on the "Create" button to create new rules
        </center>
      </h5>
      <br />
      <br />
      <center>
        <div className="App">
          <AuthenticatedTemplate>
            <ProfileContent />
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <h5>
              <center>
                Please sign-in to get your rules.
              </center>
              test: {globalVariables.subscriptionID}
            </h5>
          </UnauthenticatedTemplate>
        </div>
      </center>
    </>
  );
};