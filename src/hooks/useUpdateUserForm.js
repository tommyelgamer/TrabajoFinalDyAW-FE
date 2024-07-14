import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "../services/UserService";

const useUpdateUserForm = (id) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['jwt']);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({id, user}) => new UserService().updateUser(cookies.jwt, id, user),
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    
    const user = {
      username: e.target.name.value,
      password: e.target.password.value,
      permissions: [
        'GET_MERCHANDISE',
        'CREATE_MERCHANDISE',
        'UPDATE_MERCHANDISE',
        'DELETE_MERCHANDISE',
      ]
    }

    if (e.target.permissions.value === 'admin') {
      user.permissions.push('GET_USER');
      user.permissions.push('CREATE_USER');
      user.permissions.push('UPDATE_USER');
      user.permissions.push('DELETE_USER');
    }

    let formIsInValid = false;
    
    if (!user.username) {
      formIsInValid = true;
      const input = document.getElementById('name');
      input.classList.remove('is-valid');
      input.classList.add('is-invalid')
      document.getElementById('name-feedback').innerHTML = 'Se debe especificar un nombre de usuario';
    } else {
      const input = document.getElementById('name');
      input.classList.remove('is-invalid');
      input.classList.add('is-valid')
      document.getElementById('name-feedback').innerHTML = '';
    }

    if (user.password) {
      if (user.password.length < 8) {
        formIsInValid = true;
        const input = document.getElementById('password');
        input.classList.remove('is-valid');
        input.classList.add('is-invalid')
        document.getElementById('password-feedback').innerHTML = 'Se debe especificar una contraseña de al menos 8 caracteres';
      } else {
        const input = document.getElementById('password');
        input.classList.remove('is-invalid');
        input.classList.add('is-valid')
        document.getElementById('password-feedback').innerHTML = '';
      }
    } else {
      const input = document.getElementById('password');
      input.classList.remove('is-invalid');
      input.classList.add('is-valid')
      document.getElementById('password-feedback').innerHTML = '';
    }
    
    if (formIsInValid) return;

    mutation.mutate({id, user}, {
      onSuccess: () => navigate('/user'),
      onError: (e) => {
        const error_div = document.getElementById('form-error');

        error_div.classList.remove('hidden');
        error_div.innerHTML = '<p>Error inesperado. Intente denuevo.</p>'
      }
    });
  };

  return {
    onSubmit
  };
};

export default useUpdateUserForm;