import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../services/authConfig";
import Button from "react-bootstrap/Button";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: string) => {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
  };
  return (
    <Button variant="warning" onClick={() => handleLogin("popup")}>
         Sign in 
    </Button>
  );
};