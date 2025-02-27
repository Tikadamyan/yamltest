import AuthActions from "../Actions/authActions";
import ChangePasswordActions from "../Actions/changePassword";
import SignInActions from "../Actions/signInActions";
import {testUser} from "../ConstData/users";

describe('Change Password Actions', () => {
    let idToken;
    const oldPassword = ChangePasswordActions.generateRandomPassword();
    const newPassword = ChangePasswordActions.generateRandomPassword();

    before(() => {
        return AuthActions.signInAndSaveToken(testUser.userName, oldPassword).then(({token}) => {
            idToken = token;
        })
    })

    it('Should be change password', () => {
        ChangePasswordActions.changePassword(oldPassword, newPassword, idToken).then(response => {
            expect(response.status).to.eq(204);
        });
    });

    it('Sign In with updated password', () => {
        SignInActions.signInAPI(testUser.userName, newPassword).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.loggedInUser.user.userName).to.eq(testUser.userName);
        })
    });
});
