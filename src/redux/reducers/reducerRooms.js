import * as types from '../types';

const initialState = {
  rooms: [],
};

export default function reducerRooms(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_ROOMS}_PENDING`:
      return {
        ...state,
      };
    case `${types.GET_ROOMS}_FULFILLED`:
      return {
        ...state,
        rooms: action.payload.data,
      };
    case `${types.GET_ROOMS}_REJECTED`:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
}
