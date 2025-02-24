import { faker } from '@faker-js/faker';
import {createUserAPIEndpoint} from "../Endpoints/apiEndpoints";

class CreateUser {
    generateRandomEmail() {
        return faker.internet.email().toLowerCase();
    }

    createUser(userEmail, token) {
        return cy.request({
            method: 'POST',
            url: `${createUserAPIEndpoint}/create`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                "username": userEmail,
                "password": "Aram12345!!",
                "position": "ROLE_EDITOR",
            }
        });
    }
}

class EditUser {
    editUser(userId, token) {
        const updatedUserData = {
            fullName: faker.person.fullName(),
            jobTitle: null,
            role: "ROLE_EDITOR",
        };

        return cy.request({
            method: 'PUT',
            url: `${createUserAPIEndpoint}/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: updatedUserData
        });
    }
}

class GetUsers {
    getUsers(token) {  
        return cy.request({
            method: 'GET',
            url: createUserAPIEndpoint,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }
}

class DeactivateUser {
    deactivateUser(userId, token) {
        return cy.request({
            method: 'POST',
            url: `${createUserAPIEndpoint}/${userId}/deactivate`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }
}

class DeleteUser {
    deleteUser(userId, token) {
        return cy.request({
            method: 'DELETE',
            url: `${createUserAPIEndpoint}/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }
}

export { CreateUser, EditUser, GetUsers, DeactivateUser, DeleteUser};
