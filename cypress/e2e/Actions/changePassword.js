import {changePasswordEndpoint} from "../Endpoints/apiEndpoints";
import {testUser} from "../ConstData/users";

class ChangePasswordActions {
    changePassword(password, newPassword, token) {
        return cy.request({
            method: 'POST',
            url: changePasswordEndpoint,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                currentPassword: password,
                newPassword: newPassword
            }
        })
    }

    generateRandomPassword() {
        let currentIndex = 0;
        const password = [testUser.password, testUser.changePassword];
        const selected = password[currentIndex % password.length];
        currentIndex++;
        return selected;
    }
}

export default new ChangePasswordActions();
