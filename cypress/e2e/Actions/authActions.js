import SignInActions from './signInActions';

class AuthActions {
    
    static signInAndSaveToken() {
        return SignInActions.signInAPI().then(response => {
            expect(response.status).to.eq(201);
            Cypress.env('token', response.body.idToken);
            return cy.wrap(response.body.idToken);
        });
    }
}

export default AuthActions;
