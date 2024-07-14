import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import AuthnService from "../services/AuthnService";
import { useNavigate } from "react-router-dom";

const useCheckLoggedIn = async () => {
  const navigate = useNavigate();  
  const [cookies, setCookie] = useCookies(['jwt', 'refresh']);
  
  if (cookies.jwt) return;
  if (cookies.refresh) {
    console.log("Refreshing token...");

    const authnService = new AuthnService();

    const tokens = await authnService.refreshToken(cookies.refresh);

    setCookie('jwt', tokens.jwtToken, {
      expires: new Date(jwtDecode(tokens.jwtToken).exp * 1000),
      path: '/',
    });
    setCookie('refresh', tokens.refreshToken, {
      expires: new Date(jwtDecode(tokens.refreshToken).exp * 1000),
      path: '/',
    });

  } else {
    navigate("/login");
  }
}

export default useCheckLoggedIn;