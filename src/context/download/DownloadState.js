import React, { useReducer } from "react";
//
import downloadContext from "./downloadContext";
import downloadReducer from "./downloadReducer";

//Importamos AXIOS
import axios from "axios";
//Improtamos los TYPES
import {
  DESCARGAR_LISTA_DOCENTE,
  LISTAR_DATOS_DOCENTE,
  RESETEAR_DATOS_DOCENTE,
} from "../../types/index";
import {
  url_download_listar,
  url_download_listar_datos,
  url_download_verificar_fecha,
  url_download_excel,
  url_download_pdf,
} from "../../sheet_page/js/constants";
//+++++++++++++++++++++++++++++++++++++++++++++++
const DonwloadState = (props) => {
  const initialState = {
    docentes: [],
    datos: [],
  };
  const [state, dispatch] = useReducer(downloadReducer, initialState);
  //
  const funcionListarDocentes = async () => {
    const urlListarDocente = url_download_listar;
    const peticion = await axios.post(urlListarDocente);
    const respuestaListarDocente = peticion.data;
    if (respuestaListarDocente.msg === "correcto") {
      dispatch({
        type: DESCARGAR_LISTA_DOCENTE,
        payload: respuestaListarDocente.response,
      });
      return true;
    }
    console.log(respuestaListarDocente);
  };
  //
  const funcionPeticionDatos = async (valor) => {
    const urlPeticionDatos = url_download_listar_datos;
    const peticion = await axios.post(urlPeticionDatos, {
      carnet: valor,
    });
    const respuestaPeticionDatos = peticion.data;
    if (respuestaPeticionDatos.msg === "correcto") {
      dispatch({
        type: LISTAR_DATOS_DOCENTE,
        payload: respuestaPeticionDatos.response,
      });
      return true;
    } else {
      return false;
    }
  };
  //
  const funcionRevisionDatos = async (valor) => {
    const urlPeticionRevisionDatos = url_download_verificar_fecha;
    const peticion = await axios.post(urlPeticionRevisionDatos, {
      datos: valor,
    });
    const respuestaRevisionDatos = peticion.data;

    if (respuestaRevisionDatos.msg === "correcto") {
      return true;
    } else {
      return false;
    }
  };
  //
  const funcionDescargarExcel = async (valor) => {
    const { carnet, mes, anio } = valor;
    const urlPeticionDescargarExcel = `${url_download_excel}?carnet=${carnet}&mes=${mes}&anio=${anio}`;
    /*console.log(urlPeticionDescargarExcel)
        const peticion = await axios.get(urlPeticionDescargarExcel);
        const respuestaDescargarExcel = peticion.data;
        console.log(respuestaDescargarExcel);*/
    window.open(urlPeticionDescargarExcel);
  };
  //
  const funcionDescargarPdf = async (valor) => {
    const { carnet, mes, anio } = valor;
    const urlPeticionDescargarPdf = `${url_download_pdf}?carnet=${carnet}&mes=${mes}&anio=${anio}`;
    const peticion = await axios.get(urlPeticionDescargarPdf);
    const respuestaDescargarPdf = peticion.data;
    console.log(respuestaDescargarPdf);
    if (respuestaDescargarPdf.msg === "correcto") {
      return true;
    } else {
      return false;
    }
  };
  //
  const funcionResetarDatos = async () => {
    dispatch({
      type: RESETEAR_DATOS_DOCENTE,
    });
  };
  return (
    <downloadContext.Provider
      value={{
        docentes: state.docentes,
        datos: state.datos,
        funcionListarDocentes,
        funcionPeticionDatos,
        funcionResetarDatos,
        funcionRevisionDatos,
        funcionDescargarExcel,
        funcionDescargarPdf,
      }}
    >
      {props.children}
    </downloadContext.Provider>
  );
};

export default DonwloadState;
