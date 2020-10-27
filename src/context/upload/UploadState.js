import React, { useReducer } from "react";
//Importamos los CONTEXT
import uploadContext from "./uploadContext";
import uploadReducer from "./uploadReducer";
//Importamos le TYPE
import { SUBIR_ARCHIVO } from "../../types/index";
//Importams AXIOS
import axios from "axios";
//
import {url_upload_file} from '../../sheet_page/js/constants'
//++++++++++++++++++++++++++++++++++
const UploadState = (props) => {
  const initialState = {
    file: "",
  };

  const [state, dispatch] = useReducer(uploadReducer, initialState);
  //
  const funcionSubirArchivo = async (valor) => {
    const urlUploadFile = url_upload_file;
    const peticion = await axios.post(urlUploadFile, valor);
    const respuestaPeticion = peticion.data;
    if (respuestaPeticion.msg === "correcto") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <uploadContext.Provider
      value={{
        file: state.file,
        funcionSubirArchivo,
      }}
    >
      {props.children}
    </uploadContext.Provider>
  );
};

export default UploadState;
