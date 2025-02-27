import okrActions from "../Actions/okrActions";
import AuthActions from "../Actions/authActions";
import {admin} from "../ConstData/users";
import {objective, startDate, endDate, updateObjective} from "../Actions/okrActions";
import {randomTeamName} from "../Actions/addTeamsActions";
import AddTeamsActions from "../Actions/addTeamsActions";
import AddMetrics from "../Actions/addMetricsActions";

describe('OKR Management', () => {
    let idToken, usersId, okrId, teamId, metricId, keyResultsId;
    const randomMetric = AddMetrics.generateRandomMetricsName();

    before(() => {
        return AuthActions.signInAndSaveToken(admin.userName, admin.password).then(({token, userId}) => {
            idToken = token;
            usersId = userId;
        }).then(() => {
            AddTeamsActions.addTeam(randomTeamName, idToken, usersId).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.name).to.eq(randomTeamName);
                expect(response.body).to.have.property('id');
                teamId = response.body.id;
            })
        }).then(() => {
            AddMetrics.addMetrics(randomMetric, idToken).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.name).to.eq(randomMetric);
                expect(response.body).to.have.property('id');
                metricId = response.body.id;
            });
        });
    })
    it('Should add OKR', () => {
        okrActions.addOkr(idToken, objective, usersId, startDate, endDate).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.objective).to.eq(objective);
            expect(response.body.owner.id).to.eq(usersId);
            expect(response.body.startDate).to.eq(startDate);
            expect(response.body.endDate).to.eq(endDate);
            okrId = response.body.id;
        });
    });

    it('Should Get Okr from Okrs list', () => {
        okrActions.getAllOkrs(idToken).then(response => {
            const findInOkr = response.body.find(item => item.id === okrId);
            expect(response.status).to.eq(200);
            expect(findInOkr).to.be.exist;
            expect(findInOkr.objective).to.eq(objective);
            expect(findInOkr.id).to.eq(okrId);
            expect(findInOkr.owner.id).to.eq(usersId);
        })
    });

    it('Should update Okr', () => {
        okrActions.updateOkr(idToken, updateObjective, usersId, startDate, endDate, okrId ,teamId).then((response) => {
            expect(response.status).to.eq(204);
        })
    });

    it('Should Get updated Okr', () => {
        okrActions.getOkr(idToken, okrId).then((response) => {
            const findInTeams = response.body.teams.find(item => item.id === teamId);
            expect(response.status).to.eq(200);
            expect(response.body.objective).to.eq(updateObjective);
            expect(findInTeams.id).to.eq(teamId);
            expect(findInTeams.name).to.eq(randomTeamName);
        })
    });

    it('Should add Okr key results', () => {
        okrActions.addKeyResults(idToken, okrId, metricId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.metric.id).to.eq(metricId);
            expect(response.body.metric.name).to.eq(randomMetric);
            keyResultsId = response.body.id;
        })
    });

    it('Should Get Okr Key Results ', () => {
        okrActions.getKeyResult(idToken, okrId,keyResultsId).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.id).to.eq(keyResultsId);
            expect(response.body.metric.id).to.eq(metricId);
            expect(response.body.metric.name).to.eq(randomMetric);
            expect(response.body.metric.creator.id).to.eq(usersId);
        })
    });

    it('Should Delete Okr Key Results', () => {
        okrActions.deleteOkrKeyResults(idToken, okrId, keyResultsId).then((response) => {
            expect(response.status).to.eq(200);
        }).then(() => {
            okrActions.getKeyResult(idToken, okrId, keyResultsId).then((response) => {
                expect(response.status).to.eq(403);
            })
        })
    });

    it('Should Delete Okr', () => {
        okrActions.deleteOkr(idToken, okrId).then((response) => {
            expect(response.status).to.eq(204);
        }).then(() => {
            okrActions.getOkr(idToken, okrId).then((response) => {
                expect(response.status).to.eq(403);
            })
        })
    });
});
