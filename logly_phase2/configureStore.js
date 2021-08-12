/* eslint-disable prettier/prettier */
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import allReducers from './src/reducers';



const logger = createLogger();

let middleware = [];
middleware = [...middleware, thunk, logger];


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};


const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(
    persistedReducer,
    compose(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store);
