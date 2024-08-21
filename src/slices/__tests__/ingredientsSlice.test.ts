import reducer, {
  initialState,
  getIngredientsThunk
} from '../ingredientsSlice';

const mockIngredientsStore = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093f',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0940',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      __v: 0
    }
  ],
  isIngredientsLoading: false,
  error: null
};

describe('Слайс ingridients', () => {
  it('Проверка initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Тест extraReducers', () => {
    describe('getIngredientsThunk', () => {
      it('pending', () => {
        const action = { type: getIngredientsThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.isIngredientsLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: getIngredientsThunk.rejected.type,
          error: { message: 'Failed to fetch feeds' }
        };
        const state = reducer(initialState, action);
        expect(state.isIngredientsLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch feeds');
      });

      it('fulfilled', () => {
        const mockResponse = mockIngredientsStore.ingredients;

        const action = {
          type: getIngredientsThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.isIngredientsLoading).toBe(false);
        expect(state.ingredients).toEqual(mockResponse);
      });
    });
  });
});
