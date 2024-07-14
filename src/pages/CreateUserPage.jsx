import useCheckLoggedIn from "../hooks/useCheckLoggedIn";
import useCreateUserForm from "../hooks/useCreateUserForm";
import useRequirePermission from '../hooks/useRequirePermission';

const CreateUserPage = () => {
  useCheckLoggedIn();
  const { onSubmit } = useCreateUserForm();

  const hasPermission = useRequirePermission('CREATE_USER');
  if (!hasPermission) return (<p>No tenes permisos para realizar esta accion</p>)

  return (
    <div className="container my-4">
      <form noValidate onSubmit={onSubmit}>
        <div className="mb-2 form-floating">
          <input type="text" id="name" className="form-control" placeholder="Nombre de usuario" />
          <label htmlFor="name" className="form-label">Nombre de usuario</label>
          <div id="name-feedback" className="invalid-feedback"></div>
        </div>
        <div className="mb-2 form-floating">
          <input type="password" id="password" className="form-control" placeholder="Contraseña" />
          <label htmlFor="password" className="form-label">Contraseña</label>
          <div id="password-feedback" className="invalid-feedback"></div>
          </div>
        <div className="mb-2 form-floating">
          <select className="form-select" id="permissions">
            <option value="user" selected>Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <label htmlFor="permissions" className="form-label">Permisos</label>
        </div>
        <div id="form-error" className="custom-invalid-text hidden"></div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary w-100" type="submit">Crear usuario</button>
          </div>
          <div className="col">
            <a className="btn btn-secondary w-100" href="/user">Cancelar</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;