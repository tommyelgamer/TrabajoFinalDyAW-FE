import MerchandiseService from "../services/MerchadiseService";
import { useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"

const useGetMerchandiseById = (id) => {
  const [cookies] = useCookies(['jwt'])

  const query = useQuery({
    queryFn: () => new MerchandiseService().getMerchandiseById(cookies.jwt, id),
    queryKey: ['merchandise', id]
  })

  return query;
};

export default useGetMerchandiseById;