import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

const useRequirePermission = (permission) => {
  const [cookies] = useCookies(['jwt']);
  
  if (cookies.jwt) {
    const jwtData = jwtDecode(cookies.jwt);
  
    return jwtData.permission.find(perm => perm === permission) !== undefined;
  }

  return false;
};

export default useRequirePermission;