import AuthnService from "../services/AuthnService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { InternalServerError } from "../services/exceptions/HTTPError";

const useLogin = () => {
  const navigate =  useNavigate();
  const [_, setCookie] = useCookies(['jwt', 'refresh']);

  const onSubmit = async (e) => {
    e.preventDefault();

    let invalidForm = false;
    const username_feedback = document.getElementById('username-feedback');
    const password_feedback = document.getElementById('password-feedback');

    const creds = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    if (creds.username === null || creds.username.length < 1) {
      invalidForm = true;
      e.target.username.classList.remove('is-valid');
      e.target.username.classList.add('is-invalid');
      username_feedback.classList.add('invalid-feedback');
      username_feedback.innerHTML = '<p>Ingrese un usuario</p>';
    } else {
      e.target.username.classList.remove('is-invalid');
      e.target.username.classList.add('is-valid');
      username_feedback.innerHTML = '';
    }

    if (creds.password === null || creds.password.length < 1) {
      invalidForm = true;
      e.target.password.classList.remove('is-valid');
      e.target.password.classList.add('is-invalid');
      password_feedback.classList.add('invalid-feedback');
      password_feedback.innerHTML = '<p>Ingrese una contraseña</p>';
    } else {
      e.target.password.classList.remove('is-invalid');
      e.target.password.classList.add('is-valid');
      password_feedback.innerHTML = '';
    }

    if (invalidForm) return;

    const authnService = new AuthnService();

    try {
      const tokens = await authnService.basicLogin(creds.username, creds.password);

      setCookie('jwt', tokens.jwtToken, {
        expires: new Date(jwtDecode(tokens.jwtToken).exp * 1000),
        // path: '/',
      });
      setCookie('refresh', tokens.refreshToken, {
        expires: new Date(jwtDecode(tokens.refreshToken).exp * 1000),
        // path: '/',
      });

      navigate('/merchandise')
    } catch (e) {
      const formError = document.getElementById('form-error');
      formError.classList.remove('hidden');
      if (e instanceof InternalServerError) {
        formError.innerHTML = '<p>Algo salio mal</p>'
      } else {
        formError.innerHTML = '<p>Usuario o contraseña no validos</p>'
      }
      console.error(e);
    }
  }

  return {
    onSubmit
  }
}

export default useLogin;