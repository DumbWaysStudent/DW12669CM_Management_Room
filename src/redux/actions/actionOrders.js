import * as types from '../types';
import axios from 'axios';

export const handleGetCheckins = token => ({
  type: types.GET_CHECKINS,
  payload: axios({
    method: 'GET',
    url: 'https://backend-managementroom.herokuapp.com/api/v1/checkins',
    headers: {
      Authorization: `${token}`,
    },
  }),
});
