import React, { useReducer } from "react";
//Importamos el REDUCER Y EL STATE
import loginContext from "./loginContext";
import loginReducer from "./loginReducer";
//Importamos los TYPES
import { LOGUEO_DE_USUARIO, ESTADO_LOGUEO } from "../../types/index";
//Importamos la libreria de axios
import axios from 'axios';
//URL constantes
import {url_login_usuario} from '../../sheet_page/js/constants'
//++++++++++++++++++++++++++++++++++++++++++++
const LoginState = (props) => {
  //Variables de inicio
  const initialState = {
    logueo: false,
    logindate : []
  };
  const [state, dispatch] = useReducer(loginReducer, initialState);
  //------------------------------------------------------------------------------
  //Funcion de CONTROL
  //Funcion que controla la variable de LOGUEO que muestra el NAVBAR del sistema
  const funcionLogueoUsuario = (valor) => {
    dispatch({
      type : LOGUEO_DE_USUARIO,
      payload : valor
    })
  };
  //Funcion que envia la peticion al servidor o la direccion designada
  const funcionEnvioLogin = async(valor) => {
    //Destrucion del valor de USER PASS
    const { user, pass } = valor;
    //Ingresamos al la URL de usuario
    const urlLogin = url_login_usuario;
    const peticion = await axios.post(urlLogin,{
      user : user,
      pass : pass
    });
    const respuestaLogin = peticion.data;
    
    if(respuestaLogin.msg === 'correcto'){
      dispatch({
        type : ESTADO_LOGUEO,
        payload : valor
      })
      return true;
    }else{
      return false
    }
  }
  return (
    <loginContext.Provider
      value={{
        logueo: state.logueo,
        logindate : state.logindate,
        funcionLogueoUsuario,
        funcionEnvioLogin
      }}
    >
      {props.children}
    </loginContext.Provider>
  );
};

export default LoginState;
