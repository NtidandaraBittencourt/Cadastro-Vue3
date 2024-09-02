describe('Formulario inicial', () => {
    beforeEach(() => {
      cy.visit('review')
    })

    it('Deve permitir voltar ao passo 3', () => {
      cy.get('.bg-transparent').click()
      cy.url().should('include', '/config-passoword')
    })

    it('Verifica se todos os campos de revisão são exibidos', () => {
      cy.get('#email').should('be.visible');
      cy.get('#name').should('be.visible');
      cy.get('#cpfOrCnpj').should('be.visible');
      cy.get('#dataInit').should('be.visible');
      cy.get('#phone').should('be.visible');
      cy.get('#password').should('be.visible');
    })

    it('Simula o clique no submit sem preencher os campos', () => {
      cy.get('button[type="submit"]').click()
  
      cy.get(':nth-child(1) > .mb-4 > .text-red-600').should('exist');
      cy.get(':nth-child(2) > .mb-4 > .text-red-600').should('exist');
      cy.get(':nth-child(3) > .mb-4 > .text-red-600').should('exist');
      cy.get(':nth-child(4) > .mb-4 > .text-red-600').should('exist');
      cy.get(':nth-child(5) > .mb-4 > .text-red-600').should('exist');
      cy.get(':nth-child(6) > .mb-4 > .text-red-600').should('exist');
    })

    // it('Verifica a abertura do modal de confirmação', () => {
    //   cy.get('#email').type('usuario@teste.com')
    //   cy.get('#name').type('Usuário Teste')
    //   cy.get('#cpfOrCnpj').type('123.456.789-09')
    //   cy.get('#dataInit').type('2000-01-01')
    //   cy.get('#phone').type('(11) 91234-5678')
    //   cy.get('#password').type('Senha@123')

    //   cy.get('button[type="submit"]').click();

    //   cy.get('#modal').should('be.visible');
    //   cy.get('#modal').contains('Confirmar Cadastro').should('be.visible');
    // })

    // it('Verifica o carregamento e envio do form com retorno de sucesso', () => {
    //   cy.intercept('POST', '/registration', {
    //     statusCode: 200,
    //     body: { message: 'Cadastro realizado com sucesso!' },
    //   }).as('submitRegistration')

    //   cy.get('button[type="submit"]').click();

    //   cy.get('#modal').contains('Confirmar').click();

    //   cy.get('#loader').should('be.visible');
      
    //   cy.wait('@submitRegistration').then(() => {
    //       cy.get('#loader').should('not.exist');
    //       cy.url().should('eq', 'http://localhost:4173/');
    //       cy.contains('Cadastro realizado com sucesso!').should('be.visible');
    //   });
    // });


})