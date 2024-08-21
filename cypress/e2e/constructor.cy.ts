const testUrl = 'http://localhost:4000';

describe('Блок оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    // моковые данные ответов - запрос данных пользователя, запрос создания заказа
    cy.intercept('GET', '/api/auth/user', { fixture: 'login.json' }).as(
      'login'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('order');
    cy.visit(testUrl);
    // моковые токены
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
  });

  afterEach(() => {
    cy.clearAllCookies();
  });

  it('Оформляем заказ', () => {
    // добавление ингредиентов и булок
    cy.get('[data-cy=ingredient-1]').within(() => {
      cy.get('button').click();
    });
    cy.log('Добавили булки');

    cy.get('[data-cy=ingredient-2]').within(() => {
      cy.get('button').click();
    });
    cy.log('Добавили ингредиент');

    // оформление заказа
    cy.get('[data-cy="orderButton"]').click();
    cy.log('Нажали кнопку оформить заказ');

    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', { ingredients: ['1', '2', '1'] });
    cy.log('Запрос на сервер выполнен');

    cy.get('[data-cy="orderNumber"]').should('contain', '48627');

    // закрытие модального окна
    cy.get('[data-cy="closeModal"]').click();
    cy.get('[data-cy="Modal"]').should('not.exist');

    // очистка конструктора
    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('div').should('contain', 'Выберите булки');
      cy.get('ul').should('contain', 'Выберите начинку');
    });
  });
});

describe('Блок добавления ингредиентов в конструктор', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  it('Должна добавиться булка', function () {
    cy.get('[data-cy=ingredient-1]').within(() => {
      cy.get('button').click();
    });

    // Верхняя булка
    cy.get('[data-cy="bun-top"]')
      .should('exist')
      .within(() => {
        cy.get('.constructor-element__text').as('constructorElementText');
        cy.get('@constructorElementText').should(
          'contain',
          'Ингредиент 1 (верх)'
        );
      });

    // Нижняя булка
    cy.get('[data-cy="bun-bottom"]')
      .should('exist')
      .within(() => {
        cy.get('.constructor-element__text').as('constructorElementText');
        cy.get('@constructorElementText').should(
          'contain',
          'Ингредиент 1 (низ)'
        );
      });
  });

  it('Должны добавиться ингредиенты', () => {
    cy.get('[data-cy=ingredient-5]').as('ingredient-5');
    cy.get('@ingredient-5').within(() => {
      cy.get('button').click();
    });

    cy.get('[data-cy="bun-ingredient-5"]')
      .should('exist')
      .within(() => {
        cy.get('.constructor-element__text').as('constructorElementText');
        cy.get('@constructorElementText').should('contain', 'Ингредиент 5');
      });
  });

  it('Закрытие модального окна ингредиента по клику на крестик', () => {
    cy.get('[data-cy=ingredient-5]').as('ingredient-5');
    cy.get('@ingredient-5').click();
    cy.get('[data-cy="Modal"]')
      .should('exist')
      .within(() => {
        cy.get('h3').should('contain', 'Ингредиент 5');
      });

    cy.get('[data-cy="closeModal"]').click();
    cy.get('[data-cy="Modal"]').should('not.exist');
  });

  it('Закрытие модального окна ингредиента по клику на оверлей', () => {
    cy.get('[data-cy=ingredient-5]').as('ingredient-5');
    cy.get('@ingredient-5').click();
    cy.get('[data-cy="Modal"]').should('exist');

    cy.get('[data-cy="modalOverlay"]').click('top', { force: true });
    cy.get('[data-cy="Modal"]').should('not.exist');
  });
});
