//
import {
  PETICION_USUARIOS_LOGINS,
  PETICION_MATERIAS_DOCENTE,
  INSERTAR_MATERIA_OBJETO,
  BORRAR_MATERIA_OBJETO,
  BORRAR_DOCENTE_OBJETO,
  RESETEAR_VARIABLES_ESTADO,
  RESETEAR_VARIABLES_ESTADO_DATES,
} from "../../types/index";
//
export default (state, action) => {
  switch (action.type) {
    case PETICION_USUARIOS_LOGINS:
      return {
        ...state,
        dates: action.payload,
      };
    case PETICION_MATERIAS_DOCENTE:
      return {
        ...state,
        materia: action.payload,
      };
    case INSERTAR_MATERIA_OBJETO:
      return {
        ...state,
        materia: action.payload,
      };
    case BORRAR_MATERIA_OBJETO:
      return {
        ...state,
        materia: action.payload,
      };
    case BORRAR_DOCENTE_OBJETO:
      return {
        ...state,
        dates: action.payload,
      };
    case RESETEAR_VARIABLES_ESTADO:
      return {
        ...state,
        materia: [],
      };
    default:
      return state;
  }
};
