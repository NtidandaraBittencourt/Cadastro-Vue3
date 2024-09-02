describe('Formulario inicial', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('deve validar os campos email, personType e navegar para a próxima etapa', () => {
       
      cy.get('button[type="submit"]').click()
  
      cy.get(':nth-child(1) > .mb-4 > .text-red-600').should('contain', 'E-mail é obrigatório')
      cy.get(':nth-child(2) > .mb-4 > .text-red-600').should('contain', 'Selecione um tipo de cadastro')
  
      cy.get('#email').type('invalid-email')
      cy.get('button[type="submit"]').click()
  
      cy.get(':nth-child(1) > .mb-4 > .text-red-600').should('contain', 'E-mail inválido')
  
      cy.get('#email').clear()
      cy.get('#email').type('user@example.com')
  
      cy.get('#personType-person').click()
  
      cy.get('button[type="submit"]').click()
  

      cy.url().should('include', '/person')
    })
  
    it('não deve navegar para a próxima etapa se o formulário for inválido', () => {
      cy.get('#email').clear()
  
      cy.get('button[type="submit"]').click()
  
      cy.url().should('not.include', '/person')
    })
  })
  