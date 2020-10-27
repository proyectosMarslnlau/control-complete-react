import React, { Fragment, useContext, useEffect, useState } from "react";
import "../../../sheet_page/scss/parts/download.scss";
/* Importas el elemento */
import WOW from "wowjs";
//Importamos la libreria de M matereialize
import M from "materialize-css";
//Improtamos los CONTEXT
import downloadContext from "../../../context/download/downloadContext";
import loginContext from "../../../context/login/loginContext";
//Importamos el ALERT
import Swal from "sweetalert2";
//++++++++++++++++++++++++++++++++++++++++++++
const Download = (props) => {
  //Importamos loS context
  const {
    datos,
    docentes,
    funcionListarDocentes,
    funcionPeticionDatos,
    funcionResetarDatos,
    funcionRevisionDatos,
    funcionDescargarExcel,
    funcionDescargarPdf,
  } = useContext(downloadContext);
  const { funcionLogueoUsuario } = useContext(loginContext);
  //UseEffect inicio
  useEffect(() => {
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems, {});

    var elems2 = document.querySelectorAll(".datepicker");
    var instances2 = M.Datepicker.init(elems2, {});
    funcionListarDocentes();

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
  useEffect(() => {
    if (docentes.length !== 0) {
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems, {});
    }
  }, [docentes]);
  //

  const [paso1, guardarPaso1] = useState(false);
  const [paso2, guardarPaso2] = useState(false);
  const [paso3, guardarPaso3] = useState(false);
  const [pasospinner, guardarPasoSpinner] = useState(false);
  //-----------------------------------
  //Seleccion de variables de formulario
  const [seleccion, guardarSeleccion] = useState({
    selecciondocente: "",
  });
  //
  useEffect(() => {
    if (paso1 === true) {
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems, {});
    }
  }, [paso1]);
  //
  useEffect(() => {
    if (paso1 === true) {
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems, {});
    }
  }, [paso3]);
  //-----------------------------------------------------
  const onChangeSelect = (e) => {
    guardarSeleccion({
      ...seleccion,
      [e.target.name]: e.target.value,
    });
    guardarPaso1(false);
    guardarPaso2(false);
    guardarPaso3(false);
  };
  const { selecciondocente } = seleccion;
  const onClickBuscar = (e) => {
    e.preventDefault();
    if (selecciondocente.trim() === "") {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Entradas Vacias. Revise sus datos nuevamente",
      });
    } else {
      funcionResetarDatos();
      funcionPeticionDatos(selecciondocente).then((item) => {
        if (item === true) {
          guardarPaso1(true);
          guardarPaso3(true);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "No se tienen Registros Docente",
          });
          guardarPaso1(false);
        }
      });
    }
  };
  //----------------------------------------------
  const [fecha, guardarFecha] = useState({
    mes: "",
    anio: "",
  });
  const onChangeFecha = (e) => {
    guardarFecha({
      ...fecha,
      [e.target.name]: e.target.value,
    });
    guardarPaso2(false);
  };
  const { mes, anio } = fecha;
  const onClickInformacionFecha = (e) => {
    e.preventDefault();
    if (mes.trim() === "" || anio.trim() === "") {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Entradas Vacias. Revise sus datos nuevamente",
      });
    } else {
      fecha.carnet = selecciondocente;
      funcionRevisionDatos(fecha).then((item) => {
        if (item === true) {
          guardarPaso2(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Datos no encontrados, No Existe Registro de este MES",
          });
        }
      });
    }
  };

  const onClickPDF = (e) => {
    e.preventDefault();
    funcionDescargarPdf(fecha).then((item) => {
      if (item === true) {
        const url = `http://localhost:4000/state/files/informe-docente.pdf`;
        guardarPasoSpinner(true);
        setTimeout(() => {
          guardarPasoSpinner(false);
          window.open(url);
        }, 3000);
      }
    });
  };
  const onClickEXCEL = (e) => {
    e.preventDefault();
    fecha.carnet = selecciondocente;
    guardarPasoSpinner(true);
    setTimeout(() => {
      guardarPasoSpinner(false);
      funcionDescargarExcel(fecha);
    }, 3000);
  };
  return (
    <Fragment>
      <div className="container">
        <div className="contenedor-download wow fadeIn" data-wow-duration="2s">
          <div className="row">
            <div className="texto-download">Ver Informacion de DOCENTES</div>
          </div>
          <div className="row">
            <div className="col s12">
              <form className="col s12">
                <select name="selecciondocente" onChange={onChangeSelect}>
                  <option value="">Seleccionar Nombre de Usuario</option>
                  {docentes.map((item, key) => (
                    <option value={item.carnet} key={key}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
                <label>Materialize Select</label>
                <button
                  className="waves-effect waves-light btn boton-download-anadir"
                  onClick={onClickBuscar}
                >
                  <i className="material-icons left">cloud</i>Buscar
                </button>
              </form>
            </div>
          </div>
          {paso3 ? (
            <div className="row">
              <form className="col s12">
                <div className="col s6">
                  <div class="input-field">
                    <select onChange={onChangeFecha} name="mes">
                      <option value="" disabled selected>
                        Seleccione MES
                      </option>
                      <option value="1">Enero</option>
                      <option value="2">Febrero</option>
                      <option value="3">Marzo</option>
                      <option value="4">Abril</option>
                      <option value="5">Mayo</option>
                      <option value="6">Junio</option>
                      <option value="7">Julio</option>
                      <option value="8">Agosto</option>
                      <option value="9">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                    <label>Seleccionar Mes</label>
                  </div>
                </div>
                <div className="col s6">
                  <div class="input-field">
                    <select onChange={onChangeFecha} name="anio">
                      <option value="" disabled selected>
                        Seleccione Año
                      </option>
                      <option value="2019">Año - 2019</option>
                      <option value="2020">Año - 2020</option>
                      <option value="2021">Año - 2021</option>
                      <option value="2022">Año - 2022</option>
                      <option value="2023">Año - 2023</option>
                      <option value="2024">Año - 2024</option>
                    </select>
                    <label>Seleccionar Año</label>
                  </div>
                </div>
                <button
                  className="waves-effect waves-light btn boton-download-modificar"
                  onClick={onClickInformacionFecha}
                >
                  <i className="material-icons left">free_breakfast</i>Crear
                  Archivos
                </button>
              </form>
            </div>
          ) : null}
          {paso2 ? (
            <Fragment>
              <div className="row">
                <div className="col s6">
                  <button
                    className="waves-effect waves-light btn boton-download-pdf"
                    onClick={onClickPDF}
                  >
                    <i className="material-icons left">assignment_returned</i>
                    Descargar archivo PDF
                  </button>
                </div>
                <div className="col s6">
                  <button
                    className="waves-effect waves-light btn boton-download-excel"
                    onClick={onClickEXCEL}
                  >
                    <i className="material-icons left">assignment_returned</i>
                    Descargar archivo EXCEL
                  </button>
                </div>
                {pasospinner ? (
                  <div className="col s12 center-align spinner">
                    <div class="preloader-wrapper active">
                      <div class="spinner-layer spinner-red-only">
                        <div class="circle-clipper left">
                          <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                          <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                          <div class="circle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </Fragment>
          ) : null}
          {paso1 ? (
            <Fragment>
              {datos.map((item) => (
                <Fragment>
                  <div className="row">
                    <div className="col s12">
                      <h5 className="header">Presentacion</h5>
                      <div className="card horizontal">
                        <div className="card-image">
                          <img src={item.foto} />
                        </div>
                        <div className="card-stacked">
                          <div className="card-content">
                            <p>{item.titulo}</p>
                            <p>{item.cantidad}</p>
                            <p>{item.plataforma}</p>
                          </div>
                          <div className="card-action">
                            <a href="#">This is a link</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </Fragment>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Download;
