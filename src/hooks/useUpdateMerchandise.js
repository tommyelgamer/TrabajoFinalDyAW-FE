import { useCookies } from "react-cookie";
import MerchandiseService from "../services/MerchadiseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateMerchandise = () => {
  const [cookies] = useCookies(['jwt']);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, merch }) => {
      new MerchandiseService().updateMerchandise(cookies.jwt, id, merch);
    },
    // When mutate is called:
    onMutate: async ({ id, merch }) => {
      await queryClient.cancelQueries({ queryKey: ['merchandise'] })
      const previousMerch = queryClient.getQueryData(['merchandise'])
      queryClient.setQueryData(['merchandise'], previousMerch.map((item) => {
        const isUpdatedItem = item.id === id;
        if (!isUpdatedItem) return item;

        return { ...item, stock: merch.stock };
      }))
      return { previousMerch, merch }
    },
    // If the mutation fails, use the context we returned above
    onError: (err, newMerch, context) => {
      queryClient.setQueryData(
        ['merchandise', context.newMerch.id],
        context.previousMerch,
      )
    },
    // Always refetch after error or success:
    onSettled: (newMerch) => {
      queryClient.invalidateQueries({ queryKey: ['merchandise', newMerch.id] })
    },
  })

  return mutation;
};

export default useUpdateMerchandise;