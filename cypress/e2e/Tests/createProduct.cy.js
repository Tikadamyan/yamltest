import AuthActions from '../Actions/authActions';
import CreateProduct from '../Actions/createProductActions';

describe('Product API Test', () => {
  let idToken;

  before(() => {
    return AuthActions.signInAndSaveToken().then((token) => {
      idToken = token;
    });
  });

  it('should create a product successfully', () => {
    const randomProductName = CreateProduct.generateRandomProductName();  
    CreateProduct.createProduct(randomProductName, idToken).then((response) => {
      expect(response.status).to.eq(200);  
      expect(response.body.title).to.eq(randomProductName);  
      expect(response.body).to.have.property('id');  
    });
  });
});
