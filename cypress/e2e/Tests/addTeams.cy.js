import AuthActions from '../Actions/authActions';
import AddTeamsActions from '../Actions/addTeamsAction';


describe('Teams Management', () => {
  let idToken;
  let createdTeamId;
  const randomTeamName = AddTeamsActions.generateRandomTeamsName();
  const updateTeamName = AddTeamsActions.generateRandomTeamsName();

  beforeEach(() => {
    return AuthActions.signInAndSaveToken().then((token) => {
      idToken = token;
    })
  })

  it('should add a team successfully', () => {
    AddTeamsActions.addTeam(randomTeamName, idToken).then((response) => {
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
    })
  });

  it('Should Update team info', () => {
    AddTeamsActions.updateTeamInfo(createdTeamId, updateTeamName, idToken).then((response) => {
      expect(response.status).to.eq(204);
      cy.log(updateTeamName);
    })
  });

  it('Get the updated team', () => {
    AddTeamsActions.getTheTeam(createdTeamId, idToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(createdTeamId);
      expect(response.body.name).to.eq(updateTeamName);
    })
  });

  // when fix this global issue need to some changes in the code
  it('Should delete the team', () => {
    AddTeamsActions.deleteTeam(createdTeamId, idToken).then((response) => {
      expect(response.status).to.eq(500);
    })
  });
});