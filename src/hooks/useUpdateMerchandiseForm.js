import { useMutation, useQueryClient } from "@tanstack/react-query";
import MerchandiseService from "../services/MerchadiseService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useUpdateMerchandiseForm = (id) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['jwt']);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({id, merch}) => new MerchandiseService().updateMerchandise(cookies.jwt, id, merch),
    onSuccess: () => {
      queryClient.invalidateQueries(['merchandise'])
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    
    const merch = {
      name: e.target.name.value,
      description: e.target.description.value || null,
      barcode: e.target.barcode.value,
      stock: e.target.stock.value || 0
    }

    let formIsInValid = false;
    
    if (!merch.name) {
      formIsInValid = true;
      const input = document.getElementById('name');
      input.classList.remove('is-valid');
      input.classList.add('is-invalid')
      document.getElementById('name-feedback').innerHTML = 'Se debe especificar un nombre';
    } else {
      const input = document.getElementById('name');
      input.classList.remove('is-invalid');
      input.classList.add('is-valid')
      document.getElementById('name-feedback').innerHTML = '';
    }

    document.getElementById('description').classList.add('is-valid');

    if (!merch.barcode) {
      formIsInValid = true;
      const input = document.getElementById('barcode');
      input.classList.remove('is-valid');
      input.classList.add('is-invalid')
      document.getElementById('barcode-feedback').innerHTML = 'Se debe especificar un codigo de barras';
    } else {
      const input = document.getElementById('barcode');
      input.classList.remove('is-invalid');
      input.classList.add('is-valid')
      document.getElementById('barcode-feedback').innerHTML = '';
    }

    if (!merch.stock || Number.isInteger(merch.stock)) {
      formIsInValid = true;
      const input = document.getElementById('stock');
      input.classList.remove('is-valid');
      input.classList.add('is-invalid')
      document.getElementById('stock-feedback').innerHTML = 'El stock debe ser un numero';
    } else {
      const input = document.getElementById('stock');
      input.classList.remove('is-invalid');
      input.classList.add('is-valid')
      document.getElementById('stock-feedback').innerHTML = '';
    }
    
    if (formIsInValid) return;
    mutation.mutate(({id, merch}), {
      onSuccess: () => navigate('/merchandise'),
      onError: (e) => {
        const error_div = document.getElementById('form-error');

        error_div.classList.remove('hidden');
        error_div.innerHTML = '<p>Error inesperado. Intente denuevo.</p>'
      }
    });
  }

  return { onSubmit }
};

export default useUpdateMerchandiseForm;