import { useState } from "react";
import useCheckLoggedIn from "../hooks/useCheckLoggedIn";
import useGetMerchandise from "../hooks/useGetMerchandise";
import useUpdateMerchandise from "../hooks/useUpdateMerchandise";
import DeleteMerchandiseModal from "../components/modal/DeleteMechandiseModal";
import useRequirePermission from "../hooks/useRequirePermission";

const MerchandisePage = () => {
  useCheckLoggedIn();
  const { data, isError, isLoading, error, filter, setFilter } = useGetMerchandise();
  const updateMerchandise = useUpdateMerchandise();
  const [deleteItemId, setDeleteItemId] = useState();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const hasPermission = useRequirePermission('GET_MERCHANDISE');
  if (!hasPermission) return (<p>No tenes permisos para realizar esta accion</p>)

  if (isError) return (
    <p>Error: {JSON.stringify(error)}</p>
  )

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="container my-4">
      <div className="row g-3">
        <div className="col input-group mb-4 h-100">
          <span id="merch-filter-label" className="input-group-text">Filtro:</span>
          <input className="form-control" type="text" name="filter" id="merch-filter" aria-describedby="merch-filter-label" aria-label="Filtro" value={filter} onChange={e => setFilter(e.target.value)} />
        </div>
        <a className="col-auto btn btn-primary h-100" href="/merchandise/new">Nuevo producto</a>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Acciones</th>
            <th scope="col">Nombre</th>
            <th scope="col">Codigo de barras</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Stock</th>
          </tr>
        </thead>
        <tbody>  
          {data
            .filter(merch => merch.name.includes(filter) || merch.barcode.includes(filter))
            .map(merch => (
            <tr key={merch.id}>
              <td className="row g-2">
                <div className="col">
                  <a className="btn btn-secondary h-100" href={`/merchandise/edit/${merch.id}`}>Editar</a>
                </div>
                <div className="col">
                  <button className="btn btn-danger" onClick={() => {
                    setDeleteItemId(merch.id);
                    setDeleteModalIsOpen(true);
                  }}><i className="fa-solid fa-trash"></i></button>
                </div>
              </td>
              <td>{merch.name}</td>
              <td>{merch.barcode}</td>
              <td>{merch.description}</td>
              <td>
                <button className="btn" onClick={e => {
                  updateMerchandise.mutate({
                    id: merch.id,
                    merch: {
                      stock: merch.stock - 1
                    }
                  })
                }}>-</button>
                  {merch.stock}
                <button className="btn" onClick={e => {
                  updateMerchandise.mutate({
                    id: merch.id,
                    merch: {
                      stock: merch.stock + 1
                    }
                  })
                }}>+</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteMerchandiseModal isOpen={deleteModalIsOpen} setIsOpen={setDeleteModalIsOpen} deleteItemId={deleteItemId} />
    </div>
  )
}

export default MerchandisePage;