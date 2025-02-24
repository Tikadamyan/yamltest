import { faker } from '@faker-js/faker';
import { metricsAPIEndpoint } from '../Endpoints/apiEndpoints';

class AddMetrics {

  generateRandomMetricsName() {
    return faker.company.name();
  }

  addMetrics(metricName, token) {
    return cy.request({
      method: 'POST',
      url: metricsAPIEndpoint,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        "description": "",
        "type": "",
        "formula": "",
        "level": 0,
        "name": metricName,
        "uom": "USD"
      }
    });
  }
}

export default new AddMetrics();

