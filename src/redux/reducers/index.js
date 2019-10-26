import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';

import reducerTodos from './../reducers/reducerTodos';
import reducerImg from './../reducers/reducerImg';
import reducerCreation from './../reducers/reuducerMyCreation';
import reducerEps from './../reducers/reducerEps';
import reducerRooms from './reducerRooms';
import reducerLogin from './reducerLogin';
import reducerCust from './reducerCust';
import MainNav from './../../navigation/MainNav';

const reducerRouter = createNavigationReducer(MainNav);

const appReducer = combineReducers({
  router: reducerRouter,
  rooms: reducerRooms,
  todos: reducerTodos,
  cust: reducerCust,
  login: reducerLogin,
  eps: reducerEps,
  img: reducerImg,
  toon: reducerCreation,
});

export default appReducer;
