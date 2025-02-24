import SignInActions from './signInActions';

class AuthActions {
    
    static signInAndSaveToken(username, password) {
        return SignInActions.signInAPI(username, password).then(response => {
            expect(response.status).to.eq(201);
            Cypress.env('token', response.body.idToken);
            return cy.wrap(response.body.idToken);
        });
    }
}

export default AuthActions;
