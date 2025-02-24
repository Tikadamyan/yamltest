import {signInAPIEndpoint} from "../Endpoints/apiEndpoints";

class SignInActions {
    
    signInAPI(username, password) {
        return cy.request({
            method: 'POST',
            url: signInAPIEndpoint,
            body: {
                userName: username,
                password: password
            }
        });
    }
}

export default new SignInActions();
