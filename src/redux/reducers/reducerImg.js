import * as types from './../types';

const initialState = {
  img: [],
};

export default function reducerImg(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_IMG}_PENDING`:
      return {
        ...state,
      };
    case `${types.GET_IMG}_FULFILLED`:
      return {
        ...state,
        img: action.payload.data,
      };
    case `${types.GET_IMG}_REJECTED`:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
}
