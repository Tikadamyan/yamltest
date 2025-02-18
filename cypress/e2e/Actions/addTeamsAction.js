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

    getAllTeams(token) {
        return cy.request({
            method: 'GET',
            url: teamsAPIEndpoint,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    getTheTeam(teamId, token) {
        return cy.request({
            method: 'GET',
            url: `${teamsAPIEndpoint}/${teamId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    updateTeamInfo(teamId, teamName, token) {
        return cy.request({
            method: 'PUT',
            url: `${teamsAPIEndpoint}/${teamId}`,
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
        })
    }

    deleteTeam(teamId, token) {
        return cy.request({
            method: 'DELETE',
            url: `${teamsAPIEndpoint}/${teamId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            failOnStatusCode: false // when fix this global issue need to some changes in the code
        })
    }
}

export default new AddTeamsActions();


