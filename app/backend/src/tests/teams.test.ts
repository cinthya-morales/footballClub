import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  }]

describe('Teams', () => {
  let chaiHttpResponse: Response;
  
    beforeEach(async () => {
        sinon
        .stub(Teams, 'findAll')
        .resolves( teamMock as Teams[]);
    });

    afterEach(()=>{
        (Teams.findAll as sinon.SinonStub).restore();
    })

   it('É possível listar os times', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
        .send();

     expect(chaiHttpResponse.status).to.be.equal(200);
   });
});

describe('Procurando Teams por Id', () => {
  let chaiHttpResponse: Response;
  
    beforeEach(async () => {
        sinon
        .stub(Teams, 'findByPk')
        .resolves( teamMock[0] as Teams);
    });

    afterEach(()=>{
        (Teams.findByPk as sinon.SinonStub).restore();
    })

   it('É possível buscar os times por Id', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .get('/teams/:id')
        .send();

     expect(chaiHttpResponse.body.id).to.be.equal(1);
     expect(chaiHttpResponse.body).to.have.property('teamName');
   });
});
