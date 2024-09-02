describe('form password', () => {
    beforeEach(() => {
      cy.visit('config-passoword')
    })

    it('Deve permitir voltar ao passo 2', () => {
        cy.get('.bg-transparent').click()
        cy.get('#name').type('Empresa Exemplo')
        cy.get('#cpfOrCnpj').type('12.345.678-0001-90')
        cy.get('#dataInit').type('1989-10-06')
        cy.get('#phone').type('(11) 99999-9999')
        cy.get('button[type="submit"]').click()
      })

      it('Deve permitir continuar para o passo 4 após preencher os campos', () => {
        cy.get('#password').type('123456')
        cy.get('.bg-orange-500').click()
        cy.url().should('include', '/review')
      })

      it('Deve renderizar os campos corretos', () => {
        cy.get('#password').should('be.visible')
      })

      it('Deve validar campos obrigatórios', () => {
        cy.get('.bg-orange-500').click()
        cy.get(':nth-child(1) > .mb-4 > .text-red-600').should('contain', 'A senha deve ter pelo menos 6 caracteres')
      })
})