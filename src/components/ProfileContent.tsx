import { useMsal } from "@azure/msal-react";
import { getSentinelRulesandTemplates } from "../services/sentinel";
import { loginRequest } from "../services/authConfig";
import { useState } from "react";
import { RulesTable } from "./RulesTable";
import { Button} from "@fluentui/react-components";

export function ProfileContent() {
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
        // make a call to load all the Sentinel rule templates and then save the data into an object.
        .then((response) => {
          getSentinelRulesandTemplates(response.accessToken).then((response) => setSentinelData(response));
        });
    }

    return (
      <>
      {/* If there is any data returned, show the grid with all the rules, otherwise 
          show the message that there are no rules
      */}
        {sentinelData ? (<RulesTable sentinelData={sentinelData} />) : (
          <Button appearance="primary" onClick={GetRules}>
            Load Rule Templates
          </Button>
        )}

      </>
    );
  };