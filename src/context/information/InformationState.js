import React, { useReducer } from "react";
import informationContext from "./informationContext";
import informationReducer from "./informationReducer";
//Importamos la libreria de AXIOS
import axios from "axios";
//Importamos los TYPES
import {
  PETICION_USUARIOS_LOGINS,
  PETICION_MATERIAS_DOCENTE,
  INSERTAR_MATERIA_OBJETO,
  BORRAR_MATERIA_OBJETO,
  BORRAR_DOCENTE_OBJETO,
  RESETEAR_VARIABLES_ESTADO,
} from "../../types/index";
//Importmaos las direcciones de USUARIO
import {
  url_listar_docente,
  url_listar_materia,
  url_anadir_materia,
  url_borrar_materia,
  url_modificar_docente,
  url_nuevo_docente,
  url_borrar_docente,
} from "../../sheet_page/js/constants";
//++++++++++++++++++++++++++++++++++++
const InformationState = (props) => {
  const initialState = {
    dates: [],
    materia: [],
  };
  const [state, dispatch] = useReducer(informationReducer, initialState);
  //
  const funcionPeticionDatosDocentes = async () => {
    const urlDatosDocentes = url_listar_docente;
    const peticion = await axios.post(urlDatosDocentes);
    const respuestaInformacion = peticion.data;
    //
    if (respuestaInformacion.msg === "correcto") {
      dispatch({
        type: PETICION_USUARIOS_LOGINS,
        payload: respuestaInformacion.response,
      });
    }
  };
  //
  const funcionPeticionDatosMaterias = async (valor) => {
    const urlDatosMaterias = url_listar_materia;
    const peticion = await axios.post(urlDatosMaterias, {
      carnet: valor,
    });
    const respuestaInformacion = peticion.data;
    //

    if (respuestaInformacion.msg === "correcto") {
      console.log(respuestaInformacion);

      dispatch({
        type: PETICION_MATERIAS_DOCENTE,
        payload: respuestaInformacion.response,
      });
      return true;
    }
  };
  //
  const funcionAnadirMateria = async (
    valorcarnet,
    valorsigla,
    valormateria
  ) => {
    const materianew = { sigla: valorsigla, materia: valormateria };
    const anadirmateria = [...state.materia, materianew];
    //
    const urlAnadirMateria = url_anadir_materia;
    const peticion = await axios.post(urlAnadirMateria, {
      carnet: valorcarnet,
      sigla: valorsigla,
      materia: valormateria,
    });
    const respuestaNuevaMateria = peticion.data;
    //
    if (respuestaNuevaMateria.msg === "correcto") {
      dispatch({
        type: INSERTAR_MATERIA_OBJETO,
        payload: anadirmateria,
      });
      return true;
    }
  };
  //
  const funcionBorrarMateria = async (
    valorcarnet,
    valorsigla,
    valormateria
  ) => {
    //valorcarnet, valorsigla, valormateria
    const borrarmateria = state.materia.filter(
      (item) => item.sigla !== valorsigla
    );
    //
    const urlBorrarMateria = url_borrar_materia;
    const peticion = await axios.post(urlBorrarMateria, {
      carnet: valorcarnet,
      sigla: valorsigla,
      materia: valormateria,
    });
    const respuestaBorrarMateria = peticion.data;
    if (respuestaBorrarMateria.msg === "correcto") {
      dispatch({
        type: BORRAR_MATERIA_OBJETO,
        payload: borrarmateria,
      });
      return true;
    }
  };
  //
  const funcionModificarDocente = async (valor) => {
    const urlModificarDocente = url_modificar_docente;
    const peticion = await axios.post(urlModificarDocente, {
      datos: valor,
    });
    const respuestaModificarDocente = peticion.data;
    if (respuestaModificarDocente.msg === "correcto") {
      return true;
    }
  };
  //
  const funcionCrearDocente = async (valor) => {
    const urlNuevoDocente = url_nuevo_docente;
    const peticion = await axios.post(urlNuevoDocente, {
      datos: valor,
    });
    const respuestaNuevoDocente = peticion.data;
    if (respuestaNuevoDocente.msg === "correcto") {
      return true;
    }
  };
  //
  const funcionBorrarDocente = async (valor) => {
    //
    const borrardocente = state.dates.filter((item) => item.carnet !== valor);
    //
    const urlBorrarDocente = url_borrar_docente;
    const peticion = await axios.post(urlBorrarDocente, {
      carnet: valor,
    });
    const respuestaBorrarDocente = peticion.data;
    if (respuestaBorrarDocente.msg === "correcto") {
      dispatch({
        type: BORRAR_DOCENTE_OBJETO,
        payload: borrardocente,
      });
      return true;
    }
  };
  //
  const funcionResetearVariables = () => {
    dispatch({
      type: RESETEAR_VARIABLES_ESTADO,
    });
  };

  return (
    <informationContext.Provider
      value={{
        dates: state.dates,
        materia: state.materia,
        funcionPeticionDatosDocentes,
        funcionPeticionDatosMaterias,
        funcionAnadirMateria,
        funcionBorrarMateria,
        funcionModificarDocente,
        funcionCrearDocente,
        funcionBorrarDocente,
        funcionResetearVariables,
      }}
    >
      {props.children}
    </informationContext.Provider>
  );
};

export default InformationState;
