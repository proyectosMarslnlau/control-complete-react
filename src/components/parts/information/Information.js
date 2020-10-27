import React, { Fragment, useContext, useEffect } from "react";
import "../../../sheet_page/scss/parts/information.scss";
/* Importas el elemento */
import WOW from "wowjs";
//Importamos las variables del Context
import informationContext from "../../../context/information/informationContext";
import loginContext from "../../../context/login/loginContext";
//Improtamos ALERT
import Swal from "sweetalert2";
//+++++++++++++++++++++++++++++++++++++++++++
const Information = (props) => {
  const {
    dates,
    funcionPeticionDatosDocentes,
    funcionBorrarDocente,
  } = useContext(informationContext);
  const { funcionLogueoUsuario } = useContext(loginContext);
  //Funciones iniciales
  useEffect(() => {
    funcionPeticionDatosDocentes();
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
  //
  return (
    <Fragment>
      <div className="container wow fadeInDown"
        data-wow-duration="2s">
        <div className="contenedor-information">
          <div className="row">
            <div className="col s6">
              <div className="texto-informacion">
                Docentes Actuales del Sistema
              </div>
            </div>
            <div className="col s6"></div>
            <button
              className="waves-effect waves-light btn boton-information-anadir"
              onClick={() => props.history.push(`/insert`)}
            >
              <i className="material-icons left">insert_chart</i>Insertar Nuevo
            </button>
          </div>
          <div className="row">
            <table>
              <thead className="texto-datos-table">
                <tr>
                  <th>Nro</th>
                  <th>Nombre</th>
                  <th>gmail</th>
                  <th>Modificar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody className="texto-datos-informacion">
                {dates.map((item, key) => (
                  <tr key={item.id}>
                    <td>{key + 1}</td>
                    <td>{item.nombre}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        className="waves-effect waves-light btn boton-information-modificar"
                        onClick={() =>
                          props.history.push(`/modify/${item.carnet}`)
                        }
                      >
                        <i className="material-icons left">import_contacts</i>
                        Modificar
                      </button>
                    </td>
                    <td>
                      <button
                        className="waves-effect waves-light btn boton-information-borrar"
                        onClick={() =>
                          funcionBorrarDocente(item.carnet).then((item) => {
                            if (item === true) {
                              Swal.fire(
                                "Correcto",
                                "Docente Eliminado",
                                "success"
                              );
                            }
                          })
                        }
                      >
                        <i className="material-icons left">close</i>Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Information;
