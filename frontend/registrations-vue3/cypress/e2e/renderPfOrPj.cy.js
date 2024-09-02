describe('Formulário de Cadastro', () => {
    beforeEach(() => {
      cy.visit('/person')
    })

    it('Deve permitir voltar ao passo 1', () => {
      cy.get('.bg-transparent').click()
      cy.get('#email').type('user@example.com')
      cy.get('#personType-person').click()
      cy.get('button[type="submit"]').click()
    })
  
    it('Deve permitir continuar para o passo 3 após preencher os campos', () => {
      cy.get('.bg-transparent').click()
      cy.get('#email').type('user@example.com')
      cy.get('#personType-company').click()
      cy.get('button[type="submit"]').click()
  
      cy.get('#name').type('Empresa Exemplo')
      cy.get('#cpfOrCnpj').type('12.345.678-0001-90')
      cy.get('#dataInit').type('1989-10-06')
      cy.get('#phone').type('(11) 99999-9999')
  
      cy.get('.bg-orange-500').click()
  
      cy.url().should('include', '/config-passoword')
    })
  
    it('Deve renderizar os campos corretos para Pessoa Física ou Pessoa Juridica', () => {
      cy.get('.bg-transparent').click()
      cy.get('#email').type('user@example.com')
      cy.get('#personType-person').click()
      cy.get('button[type="submit"]').click()
  
      cy.get('#name').should('be.visible')
      cy.get('#cpfOrCnpj').should('be.visible')
      cy.get('#dataInit').should('be.visible')
      cy.get('#phone').should('be.visible')
  
    })

    it('Deve validar campos obrigatórios para Pessoa Física ou Pessoa Juridica', () => {
  
        cy.get('.bg-orange-500').click()
    
        cy.get(':nth-child(1) > .mb-4 > .text-red-600').should('contain', 'Nome é obrigatório')
      //   cy.get(':nth-child(2) > .mb-4 > .text-red-600').should('contain', 'CPF ou CNPJ é obrigatório')
        cy.get(':nth-child(3) > .mb-4 > .text-red-600').should('contain', 'Data inválida. Por favor, insira uma data válida')
        cy.get(':nth-child(4) > .mb-4 > .text-red-600').should('contain', 'Telefone é obrigatório')
      })
  
  })
  