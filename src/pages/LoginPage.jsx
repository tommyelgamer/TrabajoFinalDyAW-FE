import React, { useState } from "react";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { onSubmit } = useLogin();

  return (
    <main className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-dark w-50 h-75 border border-primary-subtle rounded d-flex justify-content-around align-items-center flex-column text-white">
        <h1 className="m-4">Iniciar sesion</h1>
        <form onSubmit={onSubmit} id="login-form" className="d-flex flex-column align-items-center justify-content-around w-75" noValidate>
          <div className="mb-3 w-100">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="username" placeholder="Usuario" />
            <div id="username-feedback"></div>
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Contraseña" />
            <div id="password-feedback"></div>
            <div className="my-1">
              <input className="form-check-input" type="checkbox" name="showPassword" id="showPassword" checked={showPassword} onChange={(_) => setShowPassword(!showPassword)} />
              <label className="form-check-label" htmlFor="showPassword">Mostrar contraseña</label>
            </div>
          </div>
          <div id="form-error" className="custom-invalid-text hidden"></div>
        </form>
        <button className="btn btn-primary w-75" type="submit" form="login-form">Inicar sesion</button>
      </div>
    </main>
  )
}

export default LoginPage;