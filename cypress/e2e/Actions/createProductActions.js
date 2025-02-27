import { faker } from '@faker-js/faker';
import {productsAPIEndpoint} from "../Endpoints/apiEndpoints";

export const randomProductName = faker.commerce.productName().toLowerCase();

class CreateProduct {

    createProduct(productname, token) {
        return cy.request({
            method: 'POST',
            url: productsAPIEndpoint, 
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                "title": productname,
                "parentProduct": null,
                "owner": 1746,
                "teams": []
            }
        });
    }
}

export default new CreateProduct();
