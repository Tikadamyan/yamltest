import AuthActions from '../Actions/authActions';
import AddMetrics from '../Actions/addMetricsActions';

describe('Metrics API Test', () => {
  let idToken;

  before(() => {
    return AuthActions.signInAndSaveToken().then((token) => {
      idToken = token;
    });
  });

  it('should add a metric successfully', () => {
    const randomMetric = AddMetrics.generateRandomMetricsName();  
    AddMetrics.addMetrics(randomMetric, idToken).then((response) => {
      expect(response.status).to.eq(200);  
      expect(response.body.name).to.eq(randomMetric); 
      expect(response.body).to.have.property('id');  
    });
  });
});
