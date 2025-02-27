import { faker } from '@faker-js/faker';
import { metricsAPIEndpoint } from "../Endpoints/apiEndpoints";

class AddMetric {
  generateRandomMetricsName() {
    return faker.company.name(); 
  }

  addMetrics(metricName, token) {
    return cy.request({
      method: 'POST',
      url: metricsAPIEndpoint,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: {
        description: "",
        type: "",
        formula: "",
        level: 0,
        name: metricName,
        uom: "USD",
      },
    });
  }
}

class EditMetric {
  editMetrics(metricId, token, metricName) {
    return cy.request({
      method: 'PUT',
      url: `${metricsAPIEndpoint}/${metricId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: {
        name: metricName,
        type: "string",
        description: "string",
        formula: "string",
        uom: "string",
        level: 0,
      },
    });
  }
}
 
class GetMetrics {
  getMetrics( token ) {
    return cy.request({
      method: 'GET',
      url: metricsAPIEndpoint,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      
    });
  }
}

class DeleteMetrics {
  deleteMetric(metricId, token) {
    return cy.request({
      method: 'DELETE',
      url: `${metricsAPIEndpoint}/${metricId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}


export { AddMetric, EditMetric, GetMetrics, DeleteMetrics};
