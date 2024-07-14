import useDeleteUser from "../../hooks/useDeleteUser";

const DeleteUserModal = ({deleteItemId, isOpen, setIsOpen, ...props}) => {
  const { deleteUser } = useDeleteUser(setIsOpen);

  if (isOpen) return (
    <dialog className="modal fade show" tabIndex="-1" id="delete_dialog" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar producto</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Estas seguro de que queres eliminar este producto?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsOpen(false)}>Cerrar</button>
            <button type="button" className="btn btn-danger" onClick={() => deleteUser(deleteItemId)}>Eliminar</button>
          </div>
        </div>
      </div>
    </dialog>
  )
};

export default DeleteUserModal;