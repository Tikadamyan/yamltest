import {teamGroupAPIEndpoint} from "../Endpoints/team-groupEndpoint";

class teamGroupActions {

    addTeamGroup(teamGroupName, token) {
        return cy.request({
            method: 'POST',
            url: teamGroupAPIEndpoint,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                name: teamGroupName
            }
        })
    }

    getTeamGroupList(token) {
        return cy.request({
            method: 'GET',
            url: teamGroupAPIEndpoint,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    updateTeamGroup(teamGroupName,teamGroupId, token) {
        return cy.request({
            method: 'PUT',
            url: `${teamGroupAPIEndpoint}/${teamGroupId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                name: teamGroupName,
            }
        })
    }

    getTeamGroup(teamGroupId, token) {
        return cy.request({
            method: 'GET',
            url: `${teamGroupAPIEndpoint}/${teamGroupId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export default new teamGroupActions();