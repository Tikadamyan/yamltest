export const signInAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/users/signin`;

export const changePasswordEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/users/change-password`;

export const inviteUserAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/${Cypress.env('workspaceId')}/users/invite`;

export const createUserAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/${Cypress.env('workspaceId')}/users`;

export const teamsAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/${Cypress.env('workspaceId')}/teams`;

export const teamGroupAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/${Cypress.env('workspaceId')}/team-groups`;

export const metricsAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/${Cypress.env('workspaceId')}/metrics`;

export const productsAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/${Cypress.env('workspaceId')}/products`;

export const userIdeaApiEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/${Cypress.env('workspaceId')}/ideas`;

export const okrEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/${Cypress.env('workspaceId')}/okrs`;

