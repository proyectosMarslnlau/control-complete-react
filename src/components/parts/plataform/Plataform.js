import React, { Fragment, useState, useContext, useEffect } from "react";
import "../../../sheet_page/scss/parts/plataform.scss";
/* Importas el elemento */
import WOW from "wowjs";
//Importamos el CONTEXT
import plataformContext from "../../../context/plataform/plataformContext";
import loginContext from "../../../context/login/loginContext";
//Importamos SWEET ALERT 2
import Swal from "sweetalert2";
//+++++++++++++++++++++++++++++++++++++
const Plataform = (props) => {
  const {
    plataformas,
    funcionListarPlataforma,
    funcionAnadirPlataforma,
    funcionBorrarPlataforma,
  } = useContext(plataformContext);
  const { funcionLogueoUsuario } = useContext(loginContext);
  //
  useEffect(() => {
    funcionListarPlataforma();
    if (localStorage.getItem("datosLogueo") === "false") {
      props.history.push(`/`);
      funcionLogueoUsuario(false);
    } else {
      funcionLogueoUsuario(true);
    }
    //
    new WOW.WOW({
      live: false,
    }).init();
  }, []);
  //---------------------------------------------------
  const [plataforme, guardarPlataform] = useState({
    plataform: "",
  });
  const onChangePlataform = (e) => {
    guardarPlataform({
      ...plataform,
      [e.target.name]: e.target.value,
    });
  };
  const { plataform } = plataforme;
  const onClickPlataform = (e) => {
    e.preventDefault();
    if (plataform.trim() === "") {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Datos Vacios Revise el Formulario",
      });
    } else {
      funcionAnadirPlataforma(plataform).then((item) => {
        if (item === true) {
          Swal.fire("Correcto", "Materia Registrada", "success");
          guardarPlataform({
            plataform: "",
          });
        }
      });
    }
  };
  //
  return (
    <Fragment>
      <div className="container">
        <div className="contenedor-plataform wow fadeIn" data-wow-duration="2s">
          <div className="row">
            <div className="col s6">
              <div className="texto-plataforma">
                Ingrese Una nueva plataforma
              </div>
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">add_circle</i>
                      <input
                        id="icon_prefix"
                        type="text"
                        className="validate"
                        name="plataform"
                        value={plataforme.plataform}
                        onChange={onChangePlataform}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <button
                      className="waves-effect waves-light btn boton-plataform-anadir"
                      onClick={onClickPlataform}
                    >
                      <i className="material-icons left">add_to_photos</i>Añadir
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col s6">
              <table>
                <thead>
                  <tr>
                    <th>Nro</th>
                    <th>Nombre</th>
                    <th>Borrar</th>
                  </tr>
                </thead>

                <tbody>
                  {plataformas.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.plataforma}</td>
                      <td>
                        <button
                          className="waves-effect waves-light btn boton-plataform-borrar"
                          onClick={() =>
                            funcionBorrarPlataforma(item.plataforma).then(
                              (item) => {
                                if (item === true) {
                                  Swal.fire(
                                    "Correcto",
                                    "Materia Registrada",
                                    "success"
                                  );
                                }
                              }
                            )
                          }
                        >
                          <i className="material-icons left">close</i>Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Plataform;
