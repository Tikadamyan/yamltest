import SignInActions from './signInActions';

class AuthActions {

    static signInAndSaveToken(username, password) {
        return SignInActions.signInAPI(username, password).then(response => {
            expect(response.status).to.eq(201);
            const token = response.body.idToken;
            const userId = response.body.loggedInUser.user.id;
            Cypress.env('token', token);
            Cypress.env('userId', userId);
            return cy.wrap({token, userId});
        });
    }
}

export default AuthActions;
