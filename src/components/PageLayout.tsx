import { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { SignInSignOutButton } from "./SignInSignOutButton";
//import { SignInButton } from './SignInButton';
import { loginRequest } from '../services/authConfig';
import { getSentinelRulesandTemplates } from '../services/sentinel';
import { RulesTable } from './RulesTable';
import { Button, makeStyles, tokens, Spinner } from "@fluentui/react-components";

const useStyles = makeStyles({
  headerContainer: {
    alignItems: "top",
    verticalAlign: "left",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: tokens.colorNeutralForeground2BrandPressed,
  },
  flexChild50Left: {
    alignSelf: "flex-start",
    flexBasis: "auto",
    justifyContent: "flex-start",
    width: "48%",
    height: "60px",
    alignContent: "center"
  },
  flexChild50Right: {
    display: "flex",
    alignSelf: "end",
    flexBasis: "auto",
    justifyContent: "flex-end",
    width: "48%",
  },
  loginButton: {
    paddingRight: "10px"
  },
  headerText: {
    paddingLeft: "10px",
    fontSize: "20px",
    color: tokens.colorNeutralForegroundInverted
  }
});

type AppProps = {
  pca: IPublicClientApplication;
};

export function PageLayout({ pca }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [sentinelData, setSentinelData] = useState();

    //Load all the rules 
    function GetRules() {
      //  acquires an access token which is then attached to a request for Sentinel REST API data
      setIsLoading(true);
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          getSentinelRulesandTemplates(response.accessToken).then((response) => setSentinelData(response));
        });
      setIsLoading(false);
    }

    return (
      <>
        {sentinelData ? (<RulesTable sentinelData={sentinelData} />) : (
          <Button appearance="secondary" onClick={GetRules}>
            Load Rule Templates
          </Button>
        )}

      </>
    );
  };

  return (
    <>
      <MsalProvider instance={pca}>
        <div className={styles.headerContainer}>
          <div className={styles.flexChild50Left}>
            <div className={styles.headerText}>
              Create multiple Microsoft Sentinel rules from rule templates
            </div>
          </div>
          <div className={styles.flexChild50Right}>
            <SignInSignOutButton />
          </div>
        </div>
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
              {isLoading ? <Spinner></Spinner> : <div></div>}
              <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
              <h5>
                <center>
                  Please sign-in to get your rules.
                </center>
                test: {process.env.REACT_APP_SUBSCRIPTION_ID}
              </h5>
            </UnauthenticatedTemplate>
          </div>
        </center>
      </MsalProvider>
    </>
  );
};