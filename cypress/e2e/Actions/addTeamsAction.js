import { faker } from '@faker-js/faker';
import { teamsAPIEndpoint } from '../Endpoints/teamsPageEndpoint';

class AddTeamsActions {
    generateRandomTeamsName() {
        return faker.company.name(); 
    }

    addTeam(teamName, token) {
        return cy.request({
            method: 'POST',
            url: teamsAPIEndpoint,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                lead: null,
                name: teamName,
                productIds: [],
                userIds: [],
                group: null
            }
        });
    }
}

export default new AddTeamsActions();


