import { useCookies } from "react-cookie";
import MerchandiseService from "../services/MerchadiseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteMerchandise = (setIsOpen) => {
  const [cookies] = useCookies(['jwt']);
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (id) => new MerchandiseService().deleteMerchandise(cookies.jwt, id),
    onSuccess: () => queryClient.invalidateQueries(['merchadise']),
  })

  const deleteMerch = (id) => {
    mutation.mutate(id, {
      onSuccess: () => {
        console.log("Success")
        setIsOpen(false);
      },
      onError: e => console.error(e)
    });
  };

  return {deleteMerch};
};

export default useDeleteMerchandise;