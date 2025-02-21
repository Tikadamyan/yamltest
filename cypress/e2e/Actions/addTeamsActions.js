import { faker } from '@faker-js/faker';
import { teamsAPIEndpoint } from '../Endpoints/teamsPageEndpoint';

class AddTeamsActions {
    generateRandomTeamsName() {
        return faker.company.name(); 
    }

    addTeam(teamName, token, userId) {
        return cy.request({
            method: 'POST',
            url: teamsAPIEndpoint,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                lead: userId,
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

    updateTeamInfo(teamId, teamName, token, userId, groupId) {
        return cy.request({
            method: 'PUT',
            url: `${teamsAPIEndpoint}/${teamId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                lead: userId,
                name: teamName,
                productIds: [],
                userIds: [],
                group: groupId
            }
        })
    }
    /* This part will be used after fixing team delete issue.
   deleteTeam(teamId, token) {
        return cy.request({
            method: 'DELETE',
            url: `${teamsAPIEndpoint}/${teamId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }  */
}

export default new AddTeamsActions();
