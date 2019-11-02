import * as types from '../types';

const initialState = {
  checkins: [],
  response: [],
};

export default function reducerCheckins(state = initialState, action) {
  switch (action.type) {
    //
    // =================== GET CHECKINS =================================
    case `${types.GET_CHECKINS}_PENDING`:
      return {
        ...state,
      };
    case `${types.GET_CHECKINS}_FULFILLED`:
      return {
        ...state,
        checkins: action.payload.data,
      };
    case `${types.GET_CHECKINS}_REJECTED`:
      return {
        ...state,
        isError: true,
      };
    //
    // =================== ADD CHECKINS ================================
    case `${types.ADD_CHECKINS}_PENDING`:
      return {
        ...state,
      };
    case `${types.ADD_CHECKINS}_FULFILLED`:
      return {
        ...state,
        response: action.payload.data,
      };
    case `${types.ADD_CHECKINS}_REJECTED`:
      return {
        ...state,
        isError: true,
      };
    //
    // =================== EDIT CHECKINS ================================
    case `${types.UPDATE_CHECKINS}_PENDING`:
      return {
        ...state,
      };
    case `${types.UPDATE_CHECKINS}_FULFILLED`:
      return {
        ...state,
        response: action.payload.data,
      };
    case `${types.UPDATE_CHECKINS}_REJECTED`:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
}
