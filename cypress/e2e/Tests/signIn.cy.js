import SignInActions from '../Actions/signInActions';
import {admin} from "../ConstData/users";

describe('Sign In API', () => {
    it('should sign in successfully and get a token', () => {
        SignInActions.signInAPI(admin.userName, admin.password).then((response) => {
            const user = response.body.loggedInUser.user;

            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('idToken');
            expect(user).to.have.property('userName');
            expect(user).to.have.property('fullName');
            expect(user).to.have.property('email');
            expect(user).to.have.property('id');
        });
    });
});
