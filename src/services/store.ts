import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import burgerReducer from '../slices/burgerSlice';
import feedReducer from '../slices/feedSlice';
import ingredientsReducer from '../slices/ingredientsSlice';
import orderReducer from '../slices/orderSlice';
import userReducer from '../slices/userSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
