import { configureStore } from '@reduxjs/toolkit';
import { discoverReducer } from './reducer';

const store = configureStore({ reducer: discoverReducer });

export default store;