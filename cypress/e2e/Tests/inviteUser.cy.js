import InviteUserActions from '../Actions/inviteUserActions';
import AuthActions from '../Actions/authActions';

describe('User Authentication and Invite', () => {
  let idToken;

  before(() => {
    return AuthActions.signInAndSaveToken().then((token) => {
      idToken = token;
    });
  });

  it('should invite a user successfully', () => {
    const randomEmail = InviteUserActions.generateRandomEmail();
    InviteUserActions.inviteUser(randomEmail, idToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0].email).to.eq(randomEmail);
    });
  });
});
