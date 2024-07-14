import { useState } from "react";
import useGetUser from "../hooks/useGetUser";
import DeleteUserModal from "../components/modal/DeleteUserModal";
import useRequirePermission from "../hooks/useRequirePermission";
import useCheckLoggedIn from "../hooks/useCheckLoggedIn";

const UserPage = () => {
  useCheckLoggedIn();
  const { data, isError, isLoading, error, filter, setFilter } = useGetUser();
  const [deleteItemId, setDeleteItemId] = useState();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const hasPermission = useRequirePermission('GET_USER');
  if (!hasPermission) return (<p>No tenes permisos para realizar esta accion</p>)

  if (isError) return (
    <p>Error: {JSON.stringify(error)}</p>
  )

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="container my-4">
      <div className="row g-3">
        <div className="col input-group mb-4 h-100">
          <span id="user-filter-label" className="input-group-text">Filtro:</span>
          <input className="form-control" type="text" name="filter" id="user-filter" aria-describedby="user-filter-label" aria-label="Filtro" value={filter} onChange={e => setFilter(e.target.value)} />
        </div>
        <a className="col-auto btn btn-primary h-100" href="/user/new">Nuevo usuario</a>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Editar</th>
            {data.length > 1 && <th scope="col">Eliminar</th>}
            <th scope="col">Nombre</th>
            <th scope="col">Permisos</th>
          </tr>
        </thead>
        <tbody>  
          {data
            .filter(user => user.username.includes(filter))
            .map(user => (
            <tr key={user.id}>
              <td className="g-2">
                  <a className="btn btn-secondary h-100" href={`/user/edit/${user.id}`}>Editar</a>
              </td>
              {data.length > 1 && <td>    
                  <button className="btn btn-danger" onClick={() => {
                    setDeleteItemId(user.id);
                    setDeleteModalIsOpen(true);
                  }}><i className="fa-solid fa-trash"></i></button>
              </td>}
              <td>{user.username}</td>
              <td style={{whiteSpace: "pre-line"}}>{user.permissions.map(perm => `${perm}\n`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteUserModal isOpen={deleteModalIsOpen} setIsOpen={setDeleteModalIsOpen} deleteItemId={deleteItemId} />
    </div>
  )
}

export default UserPage;