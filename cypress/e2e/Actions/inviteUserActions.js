import { faker } from '@faker-js/faker';
import { inviteUserAPIEndpoint } from '../Endpoints/userPageEndpoint';

class InviteUserActions {
    
    generateRandomEmail() {
        return faker.internet.email();
    }

    generateRandomRole() {
        const roles = ['ROLE_ADMIN', 'ROLE_EDITOR', 'ROLE_VIEWER'];
        const randomIndex = Math.floor(Math.random() * roles.length);
        return roles[randomIndex];
    }

    inviteUser(email) {
        const token = Cypress.env('token');

        const randomRole = this.generateRandomRole();

        return cy.request({
            method: 'POST',
            url: inviteUserAPIEndpoint,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: [
                {
                    email: email,
                    role: randomRole
                }
            ]
        });
    }
}

export default new InviteUserActions();
