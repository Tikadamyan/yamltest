import { signInAPIEndpoint } from "../Elements/signInElements";

class SignInActions {
    
    signInAPI() {
        return cy.request({
            method: 'POST',
            url: signInAPIEndpoint,
            body: {
                userName: "ashsargsyann5@gmail.com",
                password: "Testdevelopment1!"
            }
        });
    }
}

export default new SignInActions();
