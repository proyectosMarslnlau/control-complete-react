import React, { Fragment, useContext, useState, useEffect } from "react";
import "../../../sheet_page/scss/parts/login.scss";
//Importmaos los context
import loginContext from "../../../context/login/loginContext";
//Importamos el ALERT
import Swal from "sweetalert2";
//++++++++++++++++++++++++++++++++++++++++++++
const Login = (props) => {
  //Importamos los CONTEXT
  const { funcionEnvioLogin, funcionLogueoUsuario } = useContext(loginContext);
  //UseEffect de usuario
  useEffect(() => {
    //
    if (localStorage.getItem("datosLogueo") === "true") {
      props.history.push(`/upload`);
      funcionLogueoUsuario(true);
    } else {
      funcionLogueoUsuario(false);
    }
  }, []);
  //State locales
  //Variables de LOCALES - FORMULARIO
  const [date, guardarDate] = useState({
    user: "",
    pass: "",
  });
  const funcionCargarFormulario = (e) => {
    guardarDate({
      ...date,
      [e.target.name]: e.target.value,
    });
  };
  const { user, pass } = date;
  //Funcion de CARGA DE SUBMIT
  const onSubmitFormulario = (e) => {
    e.preventDefault();
    //Saneamiento de variables de entrada
    const variableUser = user.toLowerCase();
    const variablePass = pass.toLowerCase();
    //Construimos el objeto para enviar
    const datos = {
      user: variableUser,
      pass: variablePass,
    };
    //Conprobacion de estados vacios
    if (variableUser.trim() === "" || variablePass.trim() === "") {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Entradas Vacias. Revise sus datos nuevamente",
      });
    } else {
      funcionEnvioLogin(datos).then((respuesta) => {
        if (respuesta === true) {
          Swal.fire(
            "CORRECTO",
            "Logueado Correctamente\n BIENVENIDO",
            "success"
          );
          setTimeout(() => {
            props.history.push(`/upload`);
            //Hace visible al FOOTER
            funcionLogueoUsuario(true);
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error de Credenciales",
            text: "Verifique sus Credenciales",
          });
        }
      });
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="contenedor-login center-align">
          <div className="row">
            <div className="texto-titulo col s12">
              <p className="titulo-login">
                INGRESE LAS CREDENCIALES DE ADMINISTRADOR{" "}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="formulario-login">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="user"
                      type="text"
                      className="validate"
                      name="user"
                      onChange={funcionCargarFormulario}
                    />
                    <label htmlFor="user">Usuario</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix">lock</i>
                    <input
                      id="pass"
                      type="password"
                      className="validate"
                      name="pass"
                      onChange={funcionCargarFormulario}
                    />
                    <label htmlFor="pass">Password</label>
                  </div>
                </div>
                <div className="row right-align">
                  <button
                    className="waves-effect waves-light btn-large left-align boton-login"
                    onClick={onSubmitFormulario}
                  >
                    <i className="material-icons left">cloud</i>Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
