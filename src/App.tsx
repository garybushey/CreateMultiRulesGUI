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

    //Load all the rules 
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
           
                    {/* If the "sentinelData" variable has data shows the RulesTable component}
                     otherwise load the button to load the rules */}
                    {sentinelData ? (<RulesTable sentinelData={sentinelData} />) : (
                        <Button variant="secondary" onClick={GetRules}>
                            Get Rules
                        </Button>
                    )}
                
        </>
    );
};

// Show the login infomation if not already logged in, otherwise show the logged in page.
export default function App() {
    return (
        <PageLayout>
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
                        </h5>
                    </UnauthenticatedTemplate>
                </div>
            </center>
        </PageLayout>
    );
}

