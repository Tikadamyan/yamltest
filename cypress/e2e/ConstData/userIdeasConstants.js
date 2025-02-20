import { faker } from '@faker-js/faker';

export const generateIdeaData = () => ({
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    description: faker.hacker.phrase(),
    priority: faker.helpers.arrayElement(["Low", "Medium", "High"])
});

export const generateUpdatedIdeaData = () => ({
    title: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
    description: faker.hacker.phrase(),
    priority: faker.helpers.arrayElement(["Low", "Medium", "High"])
});
