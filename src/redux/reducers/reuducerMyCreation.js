import * as types from '../types';

const initialState = {
  toon: [],
};

export default function reducerMyCreation(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_MYCREATION}_PENDING`:
      console.log('=============');
      console.log(action.payload);
      console.log('=============');
      return {
        ...state,
      };
    case `${types.GET_MYCREATION}_FULFILLED`:
      return {
        ...state,
        toon: action.payload.data,
      };
    case `${types.GET_MYCREATION}_REJECTED`:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
}
