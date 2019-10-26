import * as types from './../types';

const initialState = {
  eps: [],
};

export default function reducerEps(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_EPS}_PENDING`:
      return {
        ...state,
      };
    case `${types.GET_EPS}_FULFILLED`:
      console.log('=============');
      console.log(action.payload);
      console.log('=============');
      return {
        ...state,
        eps: action.payload.data,
      };
    case `${types.GET_EPS}_REJECTED`:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
}
