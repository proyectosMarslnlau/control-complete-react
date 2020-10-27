//Imporatmos los TYPES
import {
  ENLISTAR_PLATAFORMAS,
  INSERTAR_PLATAFORMAS,
  BORRAR_PLATAFORMAS,
} from "../../types/index";
//
export default (state, action) => {
  switch (action.type) {
    case ENLISTAR_PLATAFORMAS:
      return {
        ...state,
        plataformas: action.payload,
      };
    case INSERTAR_PLATAFORMAS:
      return {
        ...state,
        plataformas: action.payload,
      };
    case BORRAR_PLATAFORMAS:
      return {
        ...state,
        plataformas: action.payload,
      };
    default:
      return state;
  }
};
