import useRequirePermission from '../hooks/useRequirePermission';
import useUpdateUserForm from '../hooks/useUpdateUserForm';
import useGetUserById from '../hooks/useGetUserById';
import { useParams } from 'react-router-dom';
import useCheckLoggedIn from '../hooks/useCheckLoggedIn';

const UpdateUserPage = () => {
  useCheckLoggedIn();
  const params = useParams();
  const { onSubmit } = useUpdateUserForm(params.id);
  const { isLoading, isError, error, data } = useGetUserById(params.id);

  const hasPermission = useRequirePermission('UPDATE_USER');
  if (!hasPermission) return (<p>No tenes permisos para realizar esta accion</p>)

    if (isError) return (
      <p>Error: {JSON.stringify(error)}</p>
    )
  
    if (isLoading) return <p>Loading...</p>

  return (
    <div className="container my-4">
      <form noValidate onSubmit={onSubmit}>
        <div className="mb-2 form-floating">
          <input type="text" id="name" className="form-control" placeholder="Nombre de usuario" defaultValue={data.username} />
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
            <option value="user" selected={data.permissions.find(perm => perm === 'GET_USER') === undefined}>Usuario</option>
            <option value="admin" selected={data.permissions.find(perm => perm === 'GET_USER') !== undefined}>Administrador</option>
          </select>
          <label htmlFor="permissions" className="form-label">Permisos</label>
        </div>
        <div id="form-error" className="custom-invalid-text hidden"></div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary w-100" type="submit">Actualizar usuario</button>
          </div>
          <div className="col">
            <a className="btn btn-secondary w-100" href="/user">Cancelar</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserPage;