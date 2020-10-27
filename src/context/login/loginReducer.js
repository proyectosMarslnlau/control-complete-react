//Importamos los TYPES
import { LOGUEO_DE_USUARIO, ESTADO_LOGUEO, INSERTAR_MATERIA_OBJETO} from "../../types/index";
//use Reducer
export default (state, action) => {
  switch (action.type) {
    case LOGUEO_DE_USUARIO:
      localStorage.setItem('datosLogueo', action.payload);
      return {
        ...state,
        logueo: action.payload,
      };
    case ESTADO_LOGUEO:
      localStorage.setItem('datosIniciales',JSON.stringify( action.payload));
      return {
        ...state,
        logindate : action.payload
      }
    case INSERTAR_MATERIA_OBJETO:
      return {
        ...state,
        materia : action.payload
      }
    default:
      return state;
  }
};
