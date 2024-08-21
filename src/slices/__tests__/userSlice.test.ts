import reducer, {
  initialState,
  clearErrors,
  loginUserThunk,
  logoutUserThunk,
  getUserThunk,
  registerUserThunk,
  updateUserThunk,
  getOrdersThunk
} from '../userSlice';

const mockUserStore = {
  isAuthentificated: false,
  loginUserRequest: false,
  user: {
    name: 'testUser',
    email: 'test@mail.com'
  },
  orders: [
    {
      _id: '66865ee9856777001bb1fbf9',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-07-04T08:35:53.795Z',
      updatedAt: '2024-07-04T08:35:54.316Z',
      number: 44912
    },
    {
      _id: '66865f14856777001bb1fbfa',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
      createdAt: '2024-07-04T08:36:36.334Z',
      updatedAt: '2024-07-04T08:36:36.710Z',
      number: 44913
    }
  ],
  ordersRequest: false,
  error: null
};

describe('Слайс user', () => {
  it('Проверка initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Проверка редьюсеров', () => {
    it('clearErrors', () => {
      const actual = reducer(
        {
          ...mockUserStore,
          error: 'test error'
        },
        clearErrors()
      );
      expect(actual.error).toEqual(null);
    });
  });

  describe('Проверка extraReducers', () => {
    describe('loginUserThunk', () => {
      it('pending', () => {
        const action = { type: loginUserThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.loginUserRequest).toBe(true);
        expect(state.error).toBe(null);
      });

      it('rejected', () => {
        const action = {
          type: loginUserThunk.rejected.type,
          error: { message: 'Failed to login user' }
        };
        const state = reducer(initialState, action);
        expect(state.loginUserRequest).toBe(false);
        expect(state.error).toBe('Failed to login user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStore.user;

        const action = {
          type: loginUserThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.user).toEqual(mockResponse);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthentificated).toEqual(true);
      });
    });

    describe('logoutUserThunk', () => {
      it('pending', () => {
        const action = { type: logoutUserThunk.pending.type };
        const state = reducer(mockUserStore, action);
        expect(state.user).toBe(null);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthentificated).toBe(false);
      });
    });

    describe('getUserThunk', () => {
      it('pending', () => {
        const action = { type: getUserThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.loginUserRequest).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: getUserThunk.rejected.type,
          error: { message: 'Failed to get user' }
        };
        const state = reducer(initialState, action);
        expect(state.user).toEqual(null);
        expect(state.loginUserRequest).toBe(false);
        expect(state.error).toBe('Failed to get user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStore;

        const action = {
          type: getUserThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.user).toEqual(mockResponse.user);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthentificated).toEqual(true);
      });
    });

    describe('registerUserThunk', () => {
      it('pending', () => {
        const action = { type: registerUserThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.isAuthentificated).toBe(false);
        expect(state.loginUserRequest).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: registerUserThunk.rejected.type,
          error: { message: 'Failed to register user' }
        };
        const state = reducer(initialState, action);
        expect(state.isAuthentificated).toBe(false);
        expect(state.loginUserRequest).toBe(false);
        expect(state.error).toBe('Failed to register user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStore.user;

        const action = {
          type: registerUserThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.user).toEqual(mockResponse);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthentificated).toEqual(true);
      });
    });

    describe('updateUserThunk', () => {
      it('pending', () => {
        const action = { type: updateUserThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.loginUserRequest).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: updateUserThunk.rejected.type,
          error: { message: 'Failed to update user' }
        };
        const state = reducer(initialState, action);
        expect(state.loginUserRequest).toBe(false);
        expect(state.error).toBe('Failed to update user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStore;

        const action = {
          type: updateUserThunk.fulfilled.type,
          payload: {
            user: mockResponse.user
          }
        };
        const state = reducer(initialState, action);
        expect(state.user).toEqual(mockResponse.user);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthentificated).toEqual(true);
      });
    });

    describe('getOrdersThunk', () => {
      it('pending', () => {
        const action = { type: getOrdersThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.ordersRequest).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: getOrdersThunk.rejected.type,
          error: { message: 'Failed to get orders' }
        };
        const state = reducer(initialState, action);
        expect(state.error).toBe('Failed to get orders');
        expect(state.ordersRequest).toBe(false);
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStore;

        const action = {
          type: getOrdersThunk.fulfilled.type,
          payload: mockResponse.orders
        };
        const state = reducer(initialState, action);
        expect(state.orders).toEqual(mockResponse.orders);
        expect(state.ordersRequest).toBe(false);
      });
    });
  });
});
