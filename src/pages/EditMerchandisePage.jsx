import { useParams } from "react-router-dom";
import useUpdateMerchandiseForm from "../hooks/useUpdateMerchandiseForm";
import useGetMerchandiseById from "../hooks/useGetMerchandiseById";
import useRequirePermission from "../hooks/useRequirePermission";
import useCheckLoggedIn from "../hooks/useCheckLoggedIn";

const EditMerchadisePage = () => {
  useCheckLoggedIn();
  const params = useParams();
  const merchQuery = useGetMerchandiseById(params.id);
  const { onSubmit } = useUpdateMerchandiseForm(params.id);

  const hasPermission = useRequirePermission('UPDATE_MERCHANDISE');
  if (!hasPermission) return (<p>No tenes permisos para realizar esta accion</p>)

  if (!merchQuery.isLoading) return (
    <div className="container my-4">
      <form noValidate onSubmit={(onSubmit)}>
        <div className="mb-2 form-floating">
          <input type="text" id="name" className="form-control" placeholder="Nombre" defaultValue={merchQuery.data?.name} />
          <label htmlFor="name" className="form-label">Nombre</label>
          <div id="name-feedback" className="invalid-feedback"></div>
        </div>
        <div className="mb-2 form-floating">
          <textarea type="text" id="description" className="form-control" placeholder="Descripcion" defaultValue={merchQuery.data?.description} />
          <label htmlFor="description" className="form-label">Descripcion</label>
          <div id="description-feedback" className="invalid-feedback"></div>
          </div>
        <div className="mb-2 form-floating">
          <input type="text" id="barcode" className="form-control" placeholder="Codigo de barras" defaultValue={merchQuery.data?.barcode} />
          <label htmlFor="barcode" className="form-label">Codigo de barras</label>
          <div id="barcode-feedback" className="invalid-feedback"></div>
          </div>
        <div className="mb-2 form-floating">
          <input type="number" id="stock" className="form-control" placeholder="Stock" defaultValue={merchQuery.data?.stock} />
          <label htmlFor="stock" className="form-label">Stock</label>
          <div id="stock-feedback" className="invalid-feedback"></div>
        </div>
        <div id="form-error" className="custom-invalid-text hidden"></div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary w-100" type="submit">Actualizar</button>
          </div>
          <div className="col">
            <a className="btn btn-secondary w-100" href="/merchandise">Cancelar</a>
          </div>
        </div>
      </form>
    </div>
  )
};

export default EditMerchadisePage;