//Improtmaos los TYPES
import {
  DESCARGAR_LISTA_DOCENTE,
  LISTAR_DATOS_DOCENTE,
  RESETEAR_DATOS_DOCENTE,
} from "../../types/index";
//
export default (state, action) => {
  switch (action.type) {
    case DESCARGAR_LISTA_DOCENTE:
      return {
        ...state,
        docentes: action.payload,
      };
    case LISTAR_DATOS_DOCENTE:
      return {
        ...state,
        datos: action.payload,
      };
    case RESETEAR_DATOS_DOCENTE:
      return {
        ...state,
        datos: [],
      };
    default:
      return state;
  }
};
