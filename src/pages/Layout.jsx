import { Outlet } from "react-router-dom";
import useRequirePermission from "../hooks/useRequirePermission";
import { useCookies } from "react-cookie";

const Layout = () => {
  const [cookies] = useCookies(['jwt']);

  const hasGetUserPermission = useRequirePermission('GET_USER');
  const hasGetMerchPermission = useRequirePermission('GET_MERCHANDISE');

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/merchandise">TP Final DyAW</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {hasGetMerchPermission && 
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/merchandise">Mercaderia</a>
                </li>
              }
              {hasGetUserPermission &&
                <li className="nav-item">
                  <a className="nav-link" href="/user">Usuarios</a>
                </li>
              }
            </ul>
          </div>
          <div className="d-flex">
            {cookies.jwt
              ? <a className="btn btn-secondary" href="/logout">Logout</a>
              : <a className="btn btn-primary" href="/login">Login</a>
            }
            
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;