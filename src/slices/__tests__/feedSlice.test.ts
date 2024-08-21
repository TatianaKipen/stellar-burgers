import reducer, {
  initialState,
  getFeedsThunk,
  getOrderThunk
} from '../feedSlice';

const mockFeedStore = {
  orders: [
    {
      _id: '66743957856777001bb1c5b3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-06-20T14:14:47.088Z',
      updatedAt: '2024-06-20T14:14:47.520Z',
      number: 43528
    },
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
  isFeedsLoading: false,
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
  total: 44597,
  totalToday: 60,
  error: null
};

describe('Слайс ленты', () => {
  it('initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Проверка extraReducers', () => {
    describe('getFeedsThunk', () => {
      it('pending', () => {
        const action = { type: getFeedsThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.isFeedsLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: getFeedsThunk.rejected.type,
          error: { message: 'Failed to fetch feeds' }
        };
        const state = reducer(initialState, action);
        expect(state.isFeedsLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch feeds');
      });

      it('fulfilled', () => {
        const mockResponse = {
          orders: mockFeedStore.orders,
          total: mockFeedStore.total,
          totalToday: mockFeedStore.totalToday
        };

        const action = {
          type: getFeedsThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.isFeedsLoading).toBe(false);
        expect(state.orders).toEqual(mockResponse.orders);
        expect(state.total).toBe(mockResponse.total);
        expect(state.totalToday).toBe(mockResponse.totalToday);
      });
    });

    describe('getOrderThunk', () => {
      it('pending', () => {
        const action = { type: getOrderThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: getOrderThunk.rejected.type,
          error: { message: 'Failed to fetch order' }
        };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch order');
      });

      it('fulfilled', () => {
        const mockResponse = {
          orders: mockFeedStore.orders
        };
        const action = {
          type: getOrderThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.order).toEqual(mockResponse.orders[0]);
      });
    });
  });
});
