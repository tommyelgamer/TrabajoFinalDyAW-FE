import { useState } from "react";
import { useCookies } from "react-cookie";
import MerchandiseService from "../services/MerchadiseService";
import { useQuery } from "@tanstack/react-query";

const useGetMerchandise = () => {
  const [cookies] = useCookies(['jwt']);
  const [filter, setFilter] = useState("");
  
  const getMerchandiseQuery = useQuery({
    queryKey: ['merchandise'],
    queryFn: () => {
      const merchSvc = new MerchandiseService();
      return merchSvc.getAllMerchandise(cookies.jwt)
    }
  })

  return {
    filter,
    setFilter,
    ...getMerchandiseQuery,
  };
}

export default useGetMerchandise;