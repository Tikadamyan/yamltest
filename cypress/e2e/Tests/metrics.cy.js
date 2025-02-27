import AuthActions from '../Actions/authActions';
import { AddMetric, EditMetric, GetMetrics, DeleteMetrics } from '../Actions/metricsActions';
import { admin } from "../ConstData/users";

describe('Metrics API Test', () => {
  let idToken, addMetricsInstance, editMetricsInstance, getMetricsInstance, metricId;

  before(() => {
    return AuthActions.signInAndSaveToken(admin.userName, admin.password).then((token) => {
      idToken = token;
      addMetricsInstance = new AddMetric();
      editMetricsInstance = new EditMetric();
      getMetricsInstance = new GetMetrics();
    });
  });

  it('should add a metric successfully', () => {
    const randomMetric = addMetricsInstance.generateRandomMetricsName();
    addMetricsInstance.addMetrics(randomMetric, idToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(randomMetric);
      metricId = response.body.id;
    });
  });

  it('should edit a metric successfully', () => {
    const newMetricName = addMetricsInstance.generateRandomMetricsName();
    expect(metricId).to.not.be.undefined;
    return editMetricsInstance.editMetrics(metricId, idToken, newMetricName).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('should get metrics successfully', () => {
    expect(metricId).to.not.be.undefined;
    return getMetricsInstance.getMetrics(idToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);

      const metric = response.body.find(m => m.id === metricId);
      expect(metric).to.exist;
      expect(metric).to.have.all.keys(
        'createdDate', 'lastModifiedDate', 'id', 'name', 'type', 
        'description', 'formula', 'uom', 'level', 'currentValue', 'creator'
      );
      expect(metric.creator).to.have.all.keys('userName', 'fullName', 'id');
    });
  });

  it('should delete a metric successfully', () => {
    const deleteMetricsInstance = new DeleteMetrics();
    return deleteMetricsInstance.deleteMetric(metricId, idToken).then((response) => {
      expect(response.status).to.eq(204);
      return getMetricsInstance.getMetrics(idToken).then((getResponse) => {
        const metric = getResponse.body.find(m => m.id === metricId);
        expect(metric).to.be.undefined; 
      });
    });
  });
  
});
