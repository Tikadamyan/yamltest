import AuthActions from '../Actions/authActions';
import AddTeamsActions from '../Actions/addTeamsAction';


describe('User Authentication and Invite', () => {
  let idToken;

  before(() => {
    return AuthActions.signInAndSaveToken().then((token) => {
      idToken = token;
    });
  });

  it('should add a team successfully', () => {
    const randomTeamName = AddTeamsActions.generateRandomTeamsName();
    AddTeamsActions.addTeam(randomTeamName, idToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(randomTeamName);
      expect(response.body).to.have.property('id');
      
    });
  });
});
