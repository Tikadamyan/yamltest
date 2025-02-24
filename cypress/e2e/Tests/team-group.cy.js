import teamGroupActions from "../Actions/team-groupActions";
import AuthActions from "../Actions/authActions";
import addTeamsActions from "../Actions/addTeamsActions";
import {admin} from "../ConstData/users";

describe('Team Group Actions', () => {
    let idToken, teamGroupId;
    const groupName = addTeamsActions.generateRandomTeamsName();

    before(() => {
        return AuthActions.signInAndSaveToken(admin.userName, admin.password).then((token) => {
            idToken = token;
        })
    })

    it('Should be create Team Group', () => {
        teamGroupActions.addTeamGroup(groupName, idToken).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq(groupName);
            expect(response.body).to.have.property('id');
            teamGroupId = response.body.id;
        })
    });

    it('Get created Team Group', () => {
        teamGroupActions.getTeamGroupList(idToken).then((response) => {
            const findInTeams = response.body.find(item => item.id === teamGroupId);
            expect(response.status).to.eq(200);
            expect(findInTeams.name).to.eq(groupName);
        })
    });
});
