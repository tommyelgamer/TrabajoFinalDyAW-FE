import { useState } from "react";
import { useCookies } from "react-cookie";
import UserService from "../services/UserService";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () => {
  const [cookies] = useCookies(['jwt']);
  const [filter, setFilter] = useState("");
  
  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const userSvc = new UserService();
      return userSvc.getAllUser(cookies.jwt)
    }
  })

  return {
    filter,
    setFilter,
    ...getUserQuery,
  };
}

export default useGetUser;