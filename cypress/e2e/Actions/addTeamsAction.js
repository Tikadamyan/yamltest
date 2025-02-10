import faker from 'faker';
import { teamsAPIEndpoint } from '../Elements/teamsElements';

class AddTeamsActions {
    generateRandomTeamsName() {
        return faker.company.companyName();
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


