import React, { useState } from 'react';

import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callSentinelRulesApi } from './sentinel';
import { RulesTable } from './components/RulesTable';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import './App.css';

import Button from 'react-bootstrap/Button';

/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [sentinelData, setSentinelData] = useState(null);

    function GetRules() {
        //  acquires an access token which is then attached to a request for Sentinel REST API data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callSentinelRulesApi(response.accessToken).then((response) => setSentinelData(response));
            });
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            <br />
            {sentinelData ? (<RulesTable sentinelData={sentinelData} />) : (
                <Button variant="secondary" onClick={GetRules}>
                    Get Rules
                </Button>
            )}
        </>
    );
};

/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5>
                    <center>
                        Please sign-in to get your rules.
                    </center>
                </h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <center>
                <MainContent />
            </center>
        </PageLayout>
    );
}