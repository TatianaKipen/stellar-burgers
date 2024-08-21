import { rootReducer } from './store';
import burgerReducer from '../slices/burgerSlice';
import feedReducer from '../slices/feedSlice';
import ingredientsReducer from '../slices/ingredientsSlice';
import orderReducer from '../slices/orderSlice';
import userReducer from '../slices/userSlice';

describe('rootReducer', () => {
  it('Тестирование работы rootReducer', () => {
    const testAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, testAction);

    expect(state).toEqual({
      burgerConstructor: burgerReducer(undefined, testAction),
      feed: feedReducer(undefined, testAction),
      ingredients: ingredientsReducer(undefined, testAction),
      order: orderReducer(undefined, testAction),
      user: userReducer(undefined, testAction)
    });
  });
});
