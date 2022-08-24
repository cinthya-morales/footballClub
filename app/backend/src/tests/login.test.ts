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
  email: 'email@test.com.br',
  password: 'password test',
}

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
