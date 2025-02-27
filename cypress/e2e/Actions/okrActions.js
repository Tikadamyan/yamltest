import {okrEndpoint} from "../Endpoints/apiEndpoints";
import { faker } from '@faker-js/faker';

export const objective = faker.company.name();
export const startDate = Date.now();
export const endDate = faker.date.future(0.5, startDate).getTime();
export const updateObjective = faker.company.name();


class okrActions {
    addOkr(token, objective, id, startDate, endDate) {
        return cy.request({
            method: 'POST',
            url: okrEndpoint,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                "objective": objective,
                "owner": id,
                "startDate": startDate,
                "endDate": endDate
            }
        })
    }

    getAllOkrs(token) {
        return cy.request({
            method: 'GET',
            url: okrEndpoint,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    updateOkr(token, objective, id, startDate, endDate, okrId ,teamId) {
        return cy.request({
            method: 'PUT',
            url: `${okrEndpoint}/${okrId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                "owner": id,
                "startDate": startDate,
                "endDate": endDate,
                "objective": objective,
                "teams": [teamId]
            }
        })
    }

    getOkr(token, okrId) {
        return cy.request({
            method: 'GET',
            url: `${okrEndpoint}/${okrId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            failOnStatusCode: false
        })
    }

    addKeyResults(token, okrId, metricId) {
        return cy.request({
            method: 'POST',
            url: `${okrEndpoint}/${okrId}/key-results`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                "metric": metricId,
                "startValue": 0,
                "targetValue": 0
            }
        })
    }

    getKeyResult(token, okrId, keyResultId) {
        return cy.request({
            method: 'GET',
            url: `${okrEndpoint}/${okrId}/key-results/${keyResultId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            failOnStatusCode: false
        })
    }
/*
    updateOkrKeyResults(token, okrId, keyResultId, updatedMetricId) {
        return cy.request({
            method: 'PUT',
            url: `${okrEndpoint}/${okrId}/key-results/${keyResultId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                "metric": updatedMetricId,
                "startValue": 0,
                "targetValue": 0
            }
        })
    } */

    deleteOkrKeyResults(token, okrId, keyResultId) {
        return cy.request({
            method: 'DELETE',
            url: `${okrEndpoint}/${okrId}/key-results/${keyResultId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    deleteOkr(token, okrId) {
        return cy.request({
            method: 'DELETE',
            url: `${okrEndpoint}/${okrId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export default new okrActions();
