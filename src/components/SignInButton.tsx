import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../services/authConfig";
import { Button, makeStyles, tokens, } from "@fluentui/react-components";

const useStyles = makeStyles({
  loginButton: {
    backgroundColor: tokens.colorPaletteRedBackground3
  }
})

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {
    //Use the pop-up to login rather than the redirect.
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  const styles = useStyles();

  return (
    <Button appearance="primary" shape="circular" className={styles.loginButton} onClick={() => handleLogin("popup")}>
      Sign in
    </Button>
  );
};