import {teamGroupAPIEndpoint} from "../Endpoints/apiEndpoints";

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
}

export default new teamGroupActions()
