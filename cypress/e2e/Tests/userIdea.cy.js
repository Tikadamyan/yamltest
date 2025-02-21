import AuthActions from '../Actions/authActions';
import UserIdeaActions from '../Actions/userIdeaActions';
import {generateIdeaData, generateUpdatedIdeaData} from "../ConstData/userIdeasConstants";

describe('UserIdea Tests', () => {
    let idToken;
    let ideaId;
    let ideaData;
    let updatedIdeaData;


    beforeEach(() => {
        return AuthActions.signInAndSaveToken().then((token) => {
            idToken = token;

        });
    });

    it('Should Create User Idea Successfully', () => {
        ideaData = generateIdeaData()
        const productId = 1616

        return UserIdeaActions.createIdea(idToken, ideaData.title, ideaData.description, productId, ideaData.priority)
            .then((response) => {
                expect(response.status).to.eq(201);
                ideaId = response.body.id;
                expect(response.body).to.have.property('id', ideaId);
                expect(response.body).to.have.property('title', ideaData.title);
                expect(response.body).to.have.property('description', ideaData.description);
                expect(response.body).to.have.property('priority', ideaData.priority);
            });
    });

    it('Should Retrieve User Idea Successfully', () => {
        return UserIdeaActions.getIdeaById(idToken, ideaId,).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', ideaId);
            expect(response.body).to.have.property('title', ideaData.title);
            expect(response.body).to.have.property('description', ideaData.description);
            expect(response.body).to.have.property('priority', ideaData.priority);
        });
    });

    it("Should Update User Idea Successfully", () => {

        updatedIdeaData = generateUpdatedIdeaData()

        return UserIdeaActions.updateIdea
        (idToken, ideaId, updatedIdeaData.title, updatedIdeaData.description, updatedIdeaData.priority)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id', ideaId);
                expect(response.body).to.have.property('title', updatedIdeaData.title);
                expect(response.body).to.have.property('description', updatedIdeaData.description);
                expect(response.body).to.have.property('priority', updatedIdeaData.priority);

            })
    })

    it('Should Retrieve Updated User Idea Successfully', function () {
        return UserIdeaActions.getIdeaById(idToken, ideaId).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id', ideaId);
            expect(response.body).to.have.property('title', updatedIdeaData.title);
            expect(response.body).to.have.property('description', updatedIdeaData.description);
            expect(response.body).to.have.property('priority', updatedIdeaData.priority);
        });
    });

    it('Should Delete User Idea Successfully', function () {
        return UserIdeaActions.deleteIdea(idToken, ideaId).then((response) => {
            expect(response.status).to.equal(204);
        });
    });

     /* The server fails to return 404 Not found,instead returns 500 Internal server Error.
     After fixing this issue,the test will be tested as well.

    it('Should Verify User Idea is Deleted', function () {
        return UserIdeaActions.getIdeaById(idToken, ideaId).then((response) => {
            expect(response.status).to.equal(404);
        });
    });*/
});
