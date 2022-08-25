import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';

import { Response } from 'superagent';
// import ILogin from '../database/interfaces/ILogin';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc";

describe('Login', () => {
  let chaiHttpResponse: Response;

    beforeEach(async () => {
        sinon
        .stub(Users, 'findOne')
        .resolves( userMock as Users);
    });

    afterEach(()=>{
        (Users.findOne as sinon.SinonStub).restore();
    })

   it('É possível fazer login com sucesso', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(userMock);

     expect(chaiHttpResponse.status).to.be.equal(200);
     expect(chaiHttpResponse.body).to.have.property('token');
     expect(chaiHttpResponse).to.be.a('object');
   });

   it('Não é possível fazer login sem email ou senha', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({});

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });
});

describe('Login validate', () => {
  let chaiHttpResponse: Response;

    beforeEach(async () => {
        sinon
        .stub(Users, 'findOne')
        .resolves( userMock as Users);
    });

    afterEach(()=>{
        (Users.findOne as sinon.SinonStub).restore();
    })

   it('Validação do login', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', token)
        .send();

    //  expect(chaiHttpResponse.status).to.be.equal(200);
     expect(chaiHttpResponse.body).to.be.a('object');
   });
})
