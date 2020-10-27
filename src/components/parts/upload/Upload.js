import React, { Fragment, useContext, useState, useEffect } from "react";
import "../../../sheet_page/scss/parts/upload.scss";
//
/* Importas el elemento */
import WOW from "wowjs";
//Importamos los CONTEXT
import uploadContext from "../../../context/upload/uploadContext";
import loginContext from "../../../context/login/loginContext";
//Importamos el ALERT
import Swal from "sweetalert2";
//
import { url_plantilla_excel } from "../../../sheet_page/js/constants";
//++++++++++++++++++++++++++++++++++++++++++++
const Upload = (props) => {
  const { funcionSubirArchivo } = useContext(uploadContext);
  const { funcionLogueoUsuario } = useContext(loginContext);
  //
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
  //const datosIniciales = localStorage.getItem('datosIniciales');
  //Extraemos los valores de FILE
  const [archivo, guardarFile] = useState({
    file: null,
  });
  const onChangeFile = (e) => {
    guardarFile({
      file: e.target.files[0],
    });
  };
  //
  const onClickEnviarFile = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", archivo.file);
    if (archivo.file === null) {
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Datos Vacios Revise el Formulario",
      });
    } else {
      const tipoArchivo = archivo.file.name.split(".");
      if (tipoArchivo[1] === "xlsx") {
        funcionSubirArchivo(data).then((item) => {
          if (item === true) {
            Swal.fire("Correcto", "Archivo Subido y Leido", "success");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Datos Vacios Revise el Formulario",
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Archivo Excel Es Obligatorio",
        });
      }
    }
    /*
     */
  };
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
  return (
    <Fragment>
      <div
        className="container contenedor-upload wow fadeIn"
        data-wow-duration="2s"
      >
        <div className="contenedor-upload">
          <div className="row">
            <div className="texto-upload col s12">
              <p className="titulo-upload">
                Enviar EXCEL de informacion de DOCENTE
              </p>
            </div>
            <div className="formulario col s12">
              <form action="#">
                <div className="file-field input-field">
                  <div className="btn boton-envio">
                    <span>File</span>
                    <input type="file" onChange={onChangeFile} />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col s6 center-align">
                    <a
                      className="waves-effect waves-light btn boton-upload"
                      href={url_plantilla_excel}
                    >
                      <i className="material-icons left">cloud</i>DESCARGAR
                      PLANTILLA MASTER
                    </a>
                  </div>
                  <div className="col s6 center-align">
                    <button
                      className="waves-effect waves-light btn boton-upload"
                      onClick={onClickEnviarFile}
                    >
                      <i className="material-icons left">cloud</i>ENVIAR ARCHIVO
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Upload;
