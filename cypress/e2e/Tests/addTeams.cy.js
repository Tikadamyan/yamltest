import AuthActions from '../Actions/authActions';
import AddTeamsActions from '../Actions/addTeamsActions';
import InviteUserActions from "../Actions/inviteUserActions";
import teamGroupActions from "../Actions/team-groupActions";
import {admin} from "../ConstData/users";


describe('Teams Management', () => {
  let idToken, createdTeamId, leadId, teamGroupId;
  const randomTeamName = AddTeamsActions.generateRandomTeamsName();
  const updateTeamName = AddTeamsActions.generateRandomTeamsName();
  const randomEmail = InviteUserActions.generateRandomEmail();
  const groupName = AddTeamsActions.generateRandomTeamsName();

  before(() => {
    return AuthActions.signInAndSaveToken(admin.userName, admin.password).then((token) => {
      idToken = token;
    }).then(() => {
      InviteUserActions.inviteUser(randomEmail, idToken).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body[0].email).to.eq(randomEmail);
        leadId = response.body[0].id;
      });
    }).then(() => {
        teamGroupActions.addTeamGroup(groupName, idToken).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq(groupName);
            expect(response.body).to.have.property('id');
            teamGroupId = response.body.id;
        })
    })
  })

  it('should add a team successfully', () => {
    AddTeamsActions.addTeam(randomTeamName, idToken, leadId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(randomTeamName);
      expect(response.body).to.have.property('id');
      createdTeamId = response.body.id;
    })
  });

  it('Get created team from all teams', () => {
    AddTeamsActions.getAllTeams(idToken).then((response) => {
      const findInTeams = response.body.find(item => item.id === createdTeamId);
      expect(response.status).to.eq(200);
      expect(findInTeams).to.be.exist;
      expect(findInTeams.id).to.eq(createdTeamId);
      expect(findInTeams.name).to.eq(randomTeamName);
      expect(findInTeams.lead.id).to.eq(leadId);
    })
  });

  it('Should Update team info', () => {
    AddTeamsActions.updateTeamInfo(createdTeamId, updateTeamName, idToken, leadId, teamGroupId).then((response) => {
      expect(response.status).to.eq(204);
      cy.log(updateTeamName);
    })
  });

  it('Get the updated team', () => {
    AddTeamsActions.getTheTeam(createdTeamId, idToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(createdTeamId);
      expect(response.body.name).to.eq(updateTeamName);
      expect(response.body.group.id).to.eq(teamGroupId);
      expect(response.body.group.name).to.eq(groupName);
    })
  });

  /* This part will be used after fixing team delete issue.
  it('Should delete the team', () => {
    AddTeamsActions.deleteTeam(createdTeamId, idToken).then((response) => {
      expect(response.status).to.eq(200);
    })
  });  */
});
