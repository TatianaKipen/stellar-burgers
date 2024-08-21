import reducer, {
  initialState,
  postOrderBurgerThunk,
  orderSlice
} from '../orderSlice';
import { configureStore } from '@reduxjs/toolkit';

const mockOrderStore = {
  order: {
    ingredients: ['test1', 'test2'],
    _id: 'test1',
    status: 'done',
    name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
    createdAt: '2024-07-04T08:36:36.334Z',
    updatedAt: '2024-07-04T08:36:36.710Z',
    number: 44913
  },
  isOrderLoading: false,
  error: null
};

describe('Слайс order', () => {
  it('Проверка initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Тест extraReducers', () => {
    describe('postOrderBurgerThunk', () => {
      it('pending', () => {
        const action = { type: postOrderBurgerThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: postOrderBurgerThunk.rejected.type,
          error: { message: 'Failed to fetch feeds' }
        };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch feeds');
      });

      it('fulfilled', () => {
        const mockResponse = mockOrderStore.order;

        const action = {
          type: postOrderBurgerThunk.fulfilled.type,
          payload: {
            order: mockResponse
          }
        };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.order).toEqual(mockResponse);
      });
    });
  });

  describe('Тест clearOrder', () => {
    let store: any;
    beforeEach(() => {
      store = configureStore({ reducer });
    });
    it('Очистка заказа, перевод состояния загрузки в false', () => {
      store.dispatch(orderSlice.actions.clearOrder());
      const newState = store.getState();
      expect(newState.order).toBeNull();
      expect(newState.isOrderLoading).toBeFalsy();
    });
  });
});
