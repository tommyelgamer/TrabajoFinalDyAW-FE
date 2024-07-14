import { Navigate } from "react-router-dom";
import useCheckLoggedIn from "../hooks/useCheckLoggedIn";
import useCreateMerchandiseForm from "../hooks/useCreateMerchandiseForm";
import useRequirePermission from "../hooks/useRequirePermission";

const CreateMerchandisePage = () => {
  useCheckLoggedIn();
  const { onSubmit } = useCreateMerchandiseForm();

  const hasPermission = useRequirePermission('CREATE_MERCHANDISE');
  if (!hasPermission) return (<p>No tenes permisos para realizar esta accion</p>)

  return (
    <div className="container my-4">
      <form noValidate onSubmit={onSubmit}>
        <div className="mb-2 form-floating">
          <input type="text" id="name" className="form-control" placeholder="Nombre" />
          <label htmlFor="name" className="form-label">Nombre</label>
          <div id="name-feedback" className="invalid-feedback"></div>
        </div>
        <div className="mb-2 form-floating">
          <textarea type="text" id="description" className="form-control" placeholder="Descripcion" />
          <label htmlFor="description" className="form-label">Descripcion</label>
          <div id="description-feedback" className="invalid-feedback"></div>
          </div>
        <div className="mb-2 form-floating">
          <input type="text" id="barcode" className="form-control" placeholder="Codigo de barras" />
          <label htmlFor="barcode" className="form-label">Codigo de barras</label>
          <div id="barcode-feedback" className="invalid-feedback"></div>
          </div>
        <div className="mb-2 form-floating">
          <input type="number" id="stock" className="form-control" placeholder="Stock" defaultValue={0} />
          <label htmlFor="stock" className="form-label">Stock</label>
          <div id="stock-feedback" className="invalid-feedback"></div>
        </div>
        <div id="form-error" className="custom-invalid-text hidden"></div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary w-100" type="submit">Crear producto</button>
          </div>
          <div className="col">
            <a className="btn btn-secondary w-100" href="/merchandise">Cancelar</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMerchandisePage;