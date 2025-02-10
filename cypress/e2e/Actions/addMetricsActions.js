import faker from 'faker'; 
import { metricsAPIEndpoint } from '../Elements/metricsElements';

class AddMetrics {

  generateRandomMetricsName() {
    return faker.hacker.noun().toLowerCase();
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
        "formula": "",
        "level": 200,
        "name": metricName,
        "uom": "USD"
      }
    });
  }
}

export default new AddMetrics();

