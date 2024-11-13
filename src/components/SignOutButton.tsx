import { useMsal } from "@azure/msal-react";
import { Button, makeStyles, tokens, } from "@fluentui/react-components";

const useStyles = makeStyles({
  loginButton: {
    backgroundColor: tokens.colorPaletteGreenBackground3
  }
})


export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType: string) => {
    //Use the pop-up to logout rather than the redirect.
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  const styles = useStyles();

  return (
    <Button  appearance="primary" shape="circular" className={styles.loginButton} onClick={() => handleLogout("popup")}>
      Sign out
    </Button>
  );
};