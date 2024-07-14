import { useCookies } from "react-cookie";
import UserService from "../services/UserService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteUser = (setIsOpen) => {
  const [cookies] = useCookies(['jwt']);
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (id) => new UserService().deleteUser(cookies.jwt, id),
    onSuccess: () => queryClient.invalidateQueries(['user']),
  })

  const deleteUser = (id) => {
    mutation.mutate(id, {
      onSuccess: () => {
        console.log("Success")
        setIsOpen(false);
      },
      onError: e => console.error(e)
    });
  };

  return {deleteUser};
};

export default useDeleteUser;