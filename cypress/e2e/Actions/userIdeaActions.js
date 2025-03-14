import {userIdeaApiEndpoint} from "../Endpoints/apiEndpoints";
import { faker } from '@faker-js/faker';

export const generateIdeaData = () => ({
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    description: faker.hacker.phrase(),
    priority: faker.helpers.arrayElement(["Low", "Medium", "High"])
});

export const generateUpdatedIdeaData = () => ({
    title: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
    description: faker.hacker.phrase(),
    priority: faker.helpers.arrayElement(["Low", "Medium", "High"])
});

class UserIdeaActions {
    createIdea(token, title, description, productId, priority) {

        return cy.request({
            method: 'POST',
            url: userIdeaApiEndpoint,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                "title": title,
                "description": description,
                "productId": productId,
                "priority": priority
            }
        });
    }

    getIdeaById(token, ideaId) {
        return cy.request({
            method: 'GET',
            url: `${userIdeaApiEndpoint}/${ideaId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    }

    updateIdea(token, ideaId, title, description, priority) {
        return cy.request({
            method: 'PUT',
            url: `${userIdeaApiEndpoint}/${ideaId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                "title": title,
                "description": description,
                "priority": priority
            }
        });
    }

    deleteIdea(token, ideaId) {
        return cy.request({
            method: 'DELETE',
            url: `${userIdeaApiEndpoint}/${ideaId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

export default new UserIdeaActions();
