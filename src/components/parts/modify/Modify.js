import React, { Fragment, useContext, useEffect, useState } from "react";
import "../../../sheet_page/scss/parts/modify.scss";
//Importamos los Context
import informationContext from "../../../context/information/informationContext";
import loginContext from "../../../context/login/loginContext";
//Importamos SWEET ALERT 2
import Swal from "sweetalert2";
//
//-++++++++++++++++++++++++++++++++++++++++++++++++++++++
const Modify = (props) => {
  //Invocamos los context
  //date : Lista de docentes con sus emails y permite la opcion de MODIFICAR Y BORRAR
  //materia : Lista de materias de doncente con el ID escogido
  const {
    dates,
    materia,
    funcionPeticionDatosMaterias,
    funcionAnadirMateria,
    funcionBorrarMateria,
    funcionModificarDocente,
  } = useContext(informationContext);
  const { funcionLogueoUsuario } = useContext(loginContext);
  //State Locales VARIABLE dedicada a LOGINS
  const [fichacambio, guardarFichaCambio] = useState({
    nombre: "",
    usuario: "",
    password: "",
    carnet: "",
    tipo: "",
    email: "",
  });
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
  const { nombre, usuario, password, carnet, tipo, email } = fichacambio;
  //--------------------------------------------------------------
  //Insertar nuevas materias
  const onClickMateriasNew = (e) => {
    e.preventDefault();
    if (siglanew.trim() === "" || materianew === "") {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Datos Vacios Formulario de Materias",
      });
    } else {
      //Insertamos la nueva materia del formulario de MODIFICAR materias
      funcionAnadirMateria(carnet, siglanew, materianew).then((item) => {
        if (item === true) {
          Swal.fire("Correcto", "Materia Registrada", "success");
        }
      });
    }
  };
  //----------------------------------------------------------------
  //Extraemos los calores del formulairo FINAL
  const onChangeDocente = (e) => {
    guardarFichaCambio({
      ...fichacambio,
      [e.target.name]: e.target.value,
    });
  };
  const onClickDocente = (e) => {
    e.preventDefault();
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
      funcionModificarDocente(fichacambio).then((item) => {
        if (item === true) {
          Swal.fire("Correcto", "Materia Registrada", "success");
        }
      });
    }
  };
  //---------------------------------------------------------------
  useEffect(() => {
    //Extre el ID o CARNET de identificacion de la URL
    let idCuenta = props.location.pathname;
    idCuenta = idCuenta.split("/");
    const idCuentaEnd = idCuenta[2];
    //Fucn
    const extraerFicha = (valor1, valor2) => {
      let ficha = valor1.filter((item) => valor2 == item.carnet);
      guardarFichaCambio(ficha[0]);
    };

    extraerFicha(dates, idCuentaEnd);

    //
    funcionPeticionDatosMaterias(idCuentaEnd);
    //
    if (localStorage.getItem("datosLogueo") === "false") {
      props.history.push(`/`);
      funcionLogueoUsuario(false);
    } else {
      funcionLogueoUsuario(true);
    }
  }, []);
  return (
    <Fragment>
      <div className="container">
        <div className="contenedor-modif">
          <div className="row">
            <h5 className="texto-titulo-modif">Modifique el Usuario</h5>
          </div>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12 opcion-insert">
                  <i className="material-icons prefix">assignment_ind</i>
                  <input
                    id="nombre"
                    type="text"
                    className="validate"
                    defaultValue={fichacambio.nombre}
                    name="nombre"
                    onChange={onChangeDocente}
                  />
                  <div>Nombre de Usuario</div>
                </div>
                <div className="input-field col s12 opcion-insert">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="usuario"
                    type="tel"
                    className="validate"
                    defaultValue={fichacambio.usuario}
                    name="usuario"
                    onChange={onChangeDocente}
                  />
                  <div>User de Entrada</div>
                </div>
                <div className="input-field col s12 opcion-insert">
                  <i className="material-icons prefix">lock</i>
                  <input
                    id="password"
                    type="tel"
                    className="validate"
                    defaultValue={fichacambio.password}
                    name="password"
                    onChange={onChangeDocente}
                  />
                  <div>Password</div>
                </div>
                <div className="input-field col s12 opcion-insert">
                  <i className="material-icons prefix">exposure</i>
                  <input
                    id="tipo"
                    type="tel"
                    className="validate"
                    defaultValue={fichacambio.tipo}
                    name="tipo"
                    onChange={onChangeDocente}
                  />
                  <div>Tipo Docente</div>
                </div>
                <div className="input-field col s12 opcion-insert">
                  <i className="material-icons prefix">email</i>
                  <input
                    id="email"
                    type="tel"
                    className="validate"
                    defaultValue={fichacambio.email}
                    name="email"
                    onChange={onChangeDocente}
                  />
                  <div>Email de Usuario</div>
                </div>
              </div>
            </form>
            <button
              className="waves-effect waves-light btn boton-registrar-datos"
              onClick={onClickDocente}
            >
              <i className="material-icons left">import_contacts</i>Modificar
            </button>
            <div className="row">
              <p className="texto-titulo-modif">Materias Actuales</p>
              <div className="col s6">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">event_note</i>
                      <input
                        id="icon_prefix"
                        type="text"
                        className="validate"
                        name="siglanew"
                        onChange={onChangeMaterias}
                      />
                      <label htmlFor="icon_prefix">Sigla</label>
                    </div>
                    <div className="input-field col s12">
                      <i className="material-icons prefix">font_download</i>
                      <input
                        id="icon_telephone"
                        type="tel"
                        className="validate"
                        name="materianew"
                        onChange={onChangeMaterias}
                      />
                      <label htmlFor="icon_telephone">Materia</label>
                    </div>
                  </div>
                  <button
                    className="waves-effect waves-light btn boton-insert-materia-anadir"
                    onClick={onClickMateriasNew}
                  >
                    <i className="material-icons left">add_circle</i>Añadir
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
                                carnet,
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modify;
