import { TConstructorIngredient } from '../../utils/types';
import reducer, {
  initialState,
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  clearBurger
} from '../burgerSlice';
import { v4 as uuidv4 } from 'uuid';

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: 'mock-ingridient-id-1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: 'mock-bun-id-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockBurgerConstructorStore = {
  bun: {
    ...mockBun,
    id: 'mock-bun-id-1'
  },
  ingredients: [
    {
      ...mockIngredient,
      id: 'mock-ingridient-id-1',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      ...mockIngredient,
      id: 'mock-ingridient-id-2',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      ...mockIngredient,
      id: 'mock-ingridient-id-3',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ],
  error: null
};

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

const mockedUUID = 'test-uuid';

describe('Слайс конструктора', () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue(mockedUUID);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Проверка initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Проверка добавления булки', () => {
    const bun: TConstructorIngredient = {
      ...mockBun,
      id: mockedUUID
    };
    const actual = reducer(initialState, addIngredient(bun));
    expect(actual.bun).toEqual(bun);
    expect(actual.ingredients).toEqual([]);
  });

  it('Проверка добавления ингредиента', () => {
    const ingredient: TConstructorIngredient = {
      ...mockIngredient,
      id: mockedUUID
    };
    const actual = reducer(initialState, addIngredient(ingredient));
    expect(actual.bun).toBeNull();
    expect(actual.ingredients).toEqual([ingredient]);
  });

  it('Проверка верхнего ингредиента', () => {
    const ingridient1 = {
      ...mockIngredient,
      id: '1'
    };

    const ingridient2 = {
      ...mockIngredient,
      id: '2'
    };

    const stateWithIngredients = {
      ...mockBurgerConstructorStore,
      bun: null,
      ingredients: [ingridient1, ingridient2]
    };

    const actual = reducer(stateWithIngredients, moveIngredientUp(1));
    expect(actual.ingredients).toEqual([ingridient2, ingridient1]);
  });

  it('Проверка нижнего ингредиента', () => {
    const ingridient1 = {
      ...mockIngredient,
      id: '1'
    };

    const ingridient2 = {
      ...mockIngredient,
      id: '2'
    };

    const stateWithIngredients = {
      ...mockBurgerConstructorStore,
      bun: null,
      ingredients: [ingridient1, ingridient2]
    };

    const actual = reducer(stateWithIngredients, moveIngredientDown(0));
    expect(actual.ingredients).toEqual([ingridient2, ingridient1]);
  });

  it('Удаление ингредиента', () => {
    const stateWithIngredients = {
      ...mockBurgerConstructorStore,
      bun: null,
      ingredients: [mockIngredient]
    };

    const actual = reducer(
      stateWithIngredients,
      removeIngredient(mockIngredient)
    );
    expect(actual.ingredients).toEqual([]);
  });

  it('Очистка конструктора', () => {
    const actual = reducer(mockBurgerConstructorStore, clearBurger());
    expect(actual.bun).toBeNull();
    expect(actual.ingredients).toEqual([]);
  });
});
