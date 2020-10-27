import React, { useReducer } from "react";
//Importamos los STATE
import plataformContext from "./plataformContext";
import plataformReducer from "./plataformReducer";
//Importamos AXIOS
import axios from "axios";
//Importamos TYPES
import {
  ENLISTAR_PLATAFORMAS,
  INSERTAR_PLATAFORMAS,
  BORRAR_PLATAFORMAS,
} from "../../types/index";
//Importamos PLATAFORMS
import {
  url_listar_plataform,
  url_update_plataform,
  url_borrar_plataforma,
} from "../../sheet_page/js/constants";
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
const PlataformState = (props) => {
  const initialState = {
    plataformas: [],
  };
  const [state, dispatch] = useReducer(plataformReducer, initialState);
  //
  const funcionListarPlataforma = async () => {
    const urlListarPlataforma = url_listar_plataform;
    const peticion = await axios.post(urlListarPlataforma);
    const resultadoPeticionListar = peticion.data;
    if (resultadoPeticionListar.msg === "correcto") {
      dispatch({
        type: ENLISTAR_PLATAFORMAS,
        payload: resultadoPeticionListar.response,
      });
    }
  };
  //
  const funcionAnadirPlataforma = async (valor) => {
    const urlAnadirPlataforma = url_update_plataform;
    const nuevaPlataforma = {
      plataforma: valor,
    };
    const plataforma = [...state.plataformas, nuevaPlataforma];
    //
    const peticion = await axios.post(urlAnadirPlataforma, {
      plataforma: valor,
    });
    const resultadoPeticionAnadir = peticion.data;
    if (resultadoPeticionAnadir.msg === "correcto") {
      dispatch({
        type: INSERTAR_PLATAFORMAS,
        payload: plataforma,
      });
      return true;
    }
  };

  const funcionBorrarPlataforma = async (valor) => {
    const urlBorrarPlataforma = url_borrar_plataforma;
    const borrarPlataforma = state.plataformas.filter(
      (item) => item.plataforma !== valor
    );

    const peticion = await axios.post(urlBorrarPlataforma, {
      plataforma: valor,
    });
    const resultadoBorrarPlataforma = peticion.data;
    if (resultadoBorrarPlataforma.msg === "correcto") {
      dispatch({
        type: BORRAR_PLATAFORMAS,
        payload: borrarPlataforma,
      });
      return true;
    }
  };
  return (
    <plataformContext.Provider
      value={{
        plataformas: state.plataformas,
        funcionListarPlataforma,
        funcionAnadirPlataforma,
        funcionBorrarPlataforma,
      }}
    >
      {props.children}
    </plataformContext.Provider>
  );
};

export default PlataformState;
