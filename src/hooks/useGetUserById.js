import UserService from "../services/UserService";
import { useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"

const useGetUserById = (id) => {
  const [cookies] = useCookies(['jwt'])

  const query = useQuery({
    queryFn: () => new UserService().getUserById(cookies.jwt, id),
    queryKey: ['user', id]
  })

  return query;
};

export default useGetUserById;