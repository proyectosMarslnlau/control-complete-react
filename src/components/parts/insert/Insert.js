import React, { Fragment, useContext, useEffect, useState } from "react";
import "../../../sheet_page/scss/parts/insert.scss";
//Importamos los Context
import informationContext from "../../../context/information/informationContext";
import loginContext from "../../../context/login/loginContext";
//Importamos SWEET ALERT 2
import Swal from "sweetalert2";
/* Importas el elemento */
import WOW from "wowjs";
//-++++++++++++++++++++++++++++++++++++++++++++++++++++++
const Insert = (props) => {
  //Invocamos los context
  //date : Lista de docentes con sus emails y permite la opcion de MODIFICAR Y BORRAR
  //materia : Lista de materias de doncente con el ID escogido
  const {
    materia,
    funcionAnadirMateria,
    funcionBorrarMateria,
    funcionCrearDocente,
    funcionResetearVariables,
  } = useContext(informationContext);
  const { funcionLogueoUsuario } = useContext(loginContext);
  //State Locales VARIABLE dedicada a LOGINS
  const [fichacambio, guardarFichaCambio] = useState({
    nombre: "",
    usuario: "",
    password: "",
    tipo: "",
    email: "",
  });

  const [paso, guardarPaso] = useState(false);
  //---------------------------------------------------------------
  //Extraemos los valor del formlario de ampliar materias.
  const [modificarmaterias, guardarModificarMaterias] = useState({
    siglanew: "",
    materianew: "",
  });
  const onChangeMaterias = (e) => {
    guardarModificarMaterias({
      ...modificarmaterias,
      [e.target.name]: e.target.value,
    });
  };
  const { siglanew, materianew } = modificarmaterias;
  const { nombre, usuario, password, tipo, email } = fichacambio;
  //-----------------------------------------------------------------
  const onClickMateriasNew = (e) => {
    e.preventDefault();
    if (siglanew.trim() === "" || materianew === "") {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Datos Vacios Revise el Formulario",
      });
    } else {
      //Insertamos la nueva materia del formulario de MODIFICAR materias
      funcionAnadirMateria(password, siglanew, materianew).then((item) => {
        if (item === true) {
          Swal.fire("Correcto", "Materia Registrada", "success");
        }
      });
    }
  };
  //----------------------------------------------------------------
  //Extraemos los valores del formulario FINAL
  const onChangeDocente = (e) => {
    guardarFichaCambio({
      ...fichacambio,
      [e.target.name]: e.target.value,
    });
  };
  const onClickDocente = (e) => {
    e.preventDefault();
    //Saneamiento
    if (
      nombre.trim() === "" ||
      usuario.trim() === "" ||
      password.trim() === "" ||
      tipo.trim() === "" ||
      email.trim() === ""
    ) {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Datos Vacios Revise el Formulario",
      });
    } else {
      funcionCrearDocente(fichacambio).then((item) => {
        if (item === true) {
          Swal.fire("Correcto", "Materia Registrada", "success");
          guardarPaso(true);
        }
      });
    }
  };
  //---------------------------------------------------------------
  //Vacia la variable de materias que se que da guardada
  const onClickRedireccionar = () => {
    funcionResetearVariables();
    props.history.push(`/information`);
  };
  //------------------------------------------------------------
  useEffect(() => {
    //
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
      <div className="container wow fadeInUp"
        data-wow-duration="2s">
        <div className="contenedor-insert">
          <div className="row">
            <p className="texto-titulo-insert">
              Inserte los Datos del Nuevo Usuario
            </p>
          </div>
          {paso ? null : (
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12 opcion-insert">
                    <i className="material-icons prefix">assignment_ind</i>
                    <input
                      id="nombre"
                      type="text"
                      className="validate"
                      name="nombre"
                      onChange={onChangeDocente}
                    />
                    <div className="titulo-insert-normal">
                      Nombre de Usuario
                    </div>
                  </div>
                  <div className="input-field col s12 opcion-insert">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="usuario"
                      type="tel"
                      className="validate"
                      name="usuario"
                      onChange={onChangeDocente}
                    />
                    <div className="titulo-insert-normal">User de Ingreso</div>
                  </div>
                  <div className="input-field col s12 opcion-insert">
                    <i className="material-icons prefix">lock</i>
                    <input
                      id="password"
                      type="tel"
                      className="validate"
                      name="password"
                      onChange={onChangeDocente}
                    />
                    <div className="titulo-insert-normal">
                      Password (CARNET)
                    </div>
                  </div>
                  <div className="input-field col s12 opcion-insert">
                    <i className="material-icons prefix">exposure</i>
                    <input
                      id="tipo"
                      type="tel"
                      className="validate"
                      name="tipo"
                      onChange={onChangeDocente}
                    />
                    <div className="titulo-insert-normal">Tipo Docente</div>
                  </div>
                  <div className="input-field col s12 opcion-insert">
                    <i className="material-icons prefix">email</i>
                    <input
                      id="email"
                      type="tel"
                      className="validate"
                      name="email"
                      onChange={onChangeDocente}
                    />
                    <div className="titulo-insert-normal">Email de Usuario</div>
                  </div>
                </div>
              </form>
              <div className="row center-align ">
                <button
                  className="waves-effect waves-light btn-large boton-registrar-datos"
                  onClick={onClickDocente}
                >
                  <i className="material-icons left">add_to_photos</i>Registrar
                  Datos
                </button>
              </div>
            </div>
          )}

          {paso ? (
            <div className="row">
              <p className="titulo-materias-actuales">Materias Actuales</p>
              <div className="col s6">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">assignment_ind</i>
                      <input
                        id="icon_prefix"
                        type="text"
                        className="validate"
                        name="siglanew"
                        onChange={onChangeMaterias}
                      />
                      <label htmlFor="icon_prefix">SIGLA</label>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">art_track</i>
                      <input
                        id="icon_telephone"
                        type="tel"
                        className="validate"
                        name="materianew"
                        onChange={onChangeMaterias}
                      />
                      <label htmlFor="icon_telephone">Nombre Materia</label>
                    </div>
                  </div>
                  <button
                    className="waves-effect waves-light btn boton-insert-materia-anadir"
                    onClick={onClickMateriasNew}
                  >
                    <i className="material-icons left">add_to_photos</i>Añadir
                  </button>
                </form>
              </div>
              <div className="col s6">
                <table>
                  <thead>
                    <tr>
                      <th>Sigla</th>
                      <th>Materia</th>
                      <th>Borrar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materia.map((item, key) => (
                      <tr key={key}>
                        <td>{item.sigla}</td>
                        <td>{item.materia}</td>
                        <td>
                          <button
                            className="waves-effect waves-light btn boton-insert-materia-borrar"
                            onClick={() =>
                              funcionBorrarMateria(
                                password,
                                item.sigla,
                                item.materia
                              ).then((item) => {
                                if (item === true) {
                                  Swal.fire(
                                    "Correcto",
                                    "Materia Registrada",
                                    "success"
                                  );
                                }
                              })
                            }
                          >
                            <i className="material-icons left">close</i>
                            Borrar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col s12 right-align">
                <button
                  className="waves-effect waves-light btn boton-salir"
                  onClick={onClickRedireccionar}
                >
                  <i className="material-icons left">arrow_back</i>Salir
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Insert;
