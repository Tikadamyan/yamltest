export const signInAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/users/signin`;

export const inviteUserAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/1440/users/invite`;

export const createUserAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/1440/users`;

export const teamsAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/1440/teams`;

export const teamGroupAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/1440/team-groups`;

export const metricsAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/1440/metrics`;

export const productsAPIEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/1440/products`;

export const userIdeaApiEndpoint = `${Cypress.env('apiBaseUrl')}/api/v1/workspaces/1440/ideas`;
