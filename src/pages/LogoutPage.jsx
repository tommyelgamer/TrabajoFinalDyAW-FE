import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const LogoutPage = () => {
  const [cookies, setCookies, removeCookie] = useCookies(['jwt', 'refresh']);

  removeCookie('jwt');
  removeCookie('refresh');

  return <Navigate replace to="/" />
}

export default LogoutPage;