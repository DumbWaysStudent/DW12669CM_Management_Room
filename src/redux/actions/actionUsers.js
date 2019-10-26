import * as types from './../types';
import axios from 'axios';

export const handleLogin = (email, password) => ({
  type: types.LOGIN,
  payload: axios({
    method: 'POST',
    url: 'http://192.168.0.44:5000/api/v1/login',
    data: {email, password},
  }),
});
