import {applyMiddleware, createStore} from 'redux';
import { rootReducer } from './reducer';


const STORE_INITIAL_STATE = {
  posts: [],
};

export const store = createStore(rootReducer, STORE_INITIAL_STATE);