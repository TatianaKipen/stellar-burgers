import { TConstructorIngredient, TIngredient } from '../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../services/store';

export interface BurgerState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  error: string | null;
}

export const initialState: BurgerState = {
  bun: null,
  ingredients: [],
  error: null
};

const burgerSliсe = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const array = state.ingredients;
      const index = action.payload;
      array.splice(index - 1, 0, array.splice(index, 1)[0]);
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const array = state.ingredients;
      const index = action.payload;
      array.splice(index + 1, 0, array.splice(index, 1)[0]);
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    clearBurger: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export default burgerSliсe.reducer;

export const {
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  clearBurger
} = burgerSliсe.actions;

// селекторы для получения данных из стора
export const getBurger = (state: RootState) => state.burgerConstructor;
