import { AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { SignInSignOutButton } from "./SignInSignOutButton";
import { makeStyles, tokens, typographyStyles } from "@fluentui/react-components";
import { ProfileContent } from './ProfileContent';

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
    width: "70%",
    height: "60px",
    alignContent: "center"
  },
  flexChild50Right: {
    display: "flex",
    alignSelf: "end",
    flexBasis: "auto",
    justifyContent: "flex-end",
    width: "30%",
  },
  loginButton: {
    paddingRight: "10px",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)"
  },
  headerText: {
    paddingLeft: "10px",
    fontSize: "20px",
    color: tokens.colorNeutralForegroundInverted,
    text: typographyStyles.title3
  },
  mainText: {
    paddingLeft: "10px",
    fontSize: "20px",
    text: typographyStyles.title2,
    textAlign: "center"
  },

});

//Set up the properties being passed into this component
type AppProps = {
  pca: IPublicClientApplication;
};

export function PageLayout({ pca }: AppProps) {
  const styles = useStyles();


  //The MsalProvider below allows for the msal to be used in all the subcomponents easily
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
            <div className={styles.loginButton}>
              <SignInSignOutButton />
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className={styles.mainText}>
          Select one or more rule templates and then click on the "Create" button to create new rules
        </div>
        <br />
        <br />
        <center>
          <div className="App">
            <AuthenticatedTemplate>
              <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
              <div className={styles.mainText}>
                Please sign-in to get your rules.
              </div>
            </UnauthenticatedTemplate>
          </div>
        </center>
      </MsalProvider>
    </>
  );
};