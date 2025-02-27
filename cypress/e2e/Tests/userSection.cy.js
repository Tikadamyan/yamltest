import AuthActions from '../Actions/authActions';
import { CreateUser, EditUser, GetUsers, DeactivateUser, DeleteUser } from '../Actions/userActions';
import {admin} from "../ConstData/users";

describe('User API Test', () => {
  let idToken, createUser, editUser, getUsers, createdUserId, deactivateUser, deleteUser;

  beforeEach(() => {
    createUser = new CreateUser();
    editUser = new EditUser();
    getUsers = new GetUsers();
    deactivateUser = new DeactivateUser();
    deleteUser = new DeleteUser();

    return AuthActions.signInAndSaveToken(admin.userName, admin.password).then(({token}) => {
      idToken = token;
    });
  });

  it('should create a user successfully', () => {
    const randomUserEmail = createUser.generateRandomEmail();
    
    createUser.createUser(randomUserEmail, idToken)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.email).to.eq(randomUserEmail);

        createdUserId = response.body.id;
      });
  });

  it('should update and verify new email', () => {
    const updatedEmail = createUser.generateRandomEmail();
    const randomUserEmail = createUser.generateRandomEmail();

    editUser.editUser(createdUserId, idToken, updatedEmail)
      .then((response) => {
        expect(response.status).to.eq(204);
        return getUsers.getUsers(idToken);
      })
      .then((response) => {
        const updatedUser = response.body.find(user => user.id === createdUserId);
        expect(updatedUser).to.exist;
        expect(updatedUser.email).to.not.eq(randomUserEmail);
      });
  });

  it('should get users successfully', () => {
    getUsers.getUsers(idToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should deactivate and verify user', () => {
    deactivateUser.deactivateUser(createdUserId, idToken)
      .then((deactivateResponse) => {
        expect(deactivateResponse.status).to.eq(204);
        return getUsers.getUsers(idToken);
      })
      .then((response) => {
        const updatedUser = response.body.find(user => user.id === createdUserId);
        expect(updatedUser).to.exist;
        expect(updatedUser.status).to.eq('DEACTIVATED');
      });
  });

  it('should delete and verify user', () => {
    deleteUser.deleteUser(createdUserId, idToken)
      .then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204);
        return getUsers.getUsers(idToken);
      })
      .then((response) => {
        const updatedUser = response.body.find(user => user.id === createdUserId);
        expect(updatedUser).to.be.undefined;
      });
  });
});
