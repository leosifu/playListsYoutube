import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import playListReducer from './playListReducer';

const createRootReducer = (history) => combineReducers({
  playList: playListReducer,
  router: connectRouter(history)
})

export default createRootReducer
