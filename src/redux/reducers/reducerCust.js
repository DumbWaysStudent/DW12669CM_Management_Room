import * as types from '../types';

const initialState = {
  cust: [],
};

export default function reducerCustomers(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_CUST}_PENDING`:
      console.log('=============');
      console.log(action.payload);
      console.log('=============');
      return {
        ...state,
      };
    case `${types.GET_CUST}_FULFILLED`:
      return {
        ...state,
        cust: action.payload.data,
      };
    case `${types.GET_CUST}_REJECTED`:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
}
