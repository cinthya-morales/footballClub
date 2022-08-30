import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo'
    },
    teamAway: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Internacional'
    },
    teamAway: {
      teamName: 'Santos'
    }
  }
]

const postMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const matchMockResponse = {
	id: 1,
	homeTeam: 16,
	homeTeamGoals: 8,
	awayTeam: 2,
	awayTeamGoals: 2,
	inProgress: true,
}

describe('Matches método GET', () => {
  let chaiHttpResponse: Response;
  
    beforeEach(async () => {
        sinon
        .stub(Matches, 'findAll')
        .resolves( matchesMock as unknown as Matches[]);
    });

    afterEach(()=>{
        (Matches.findAll as sinon.SinonStub).restore();
    })

   it('É possível listar as partidas', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
        .send();

     expect(chaiHttpResponse.status).to.be.equal(200);
     expect(chaiHttpResponse).to.be.a('object');
   });
});

describe('Matches método POST', () => {
  let chaiHttpResponse: Response;
  
    beforeEach(async () => sinon
    .stub(Matches, 'create')
    .resolves(postMatch as Matches));

    afterEach(()=>{
        (Matches.create as sinon.SinonStub).restore();
    })

   it('Retorna erro ao realizar POST com homeTeam e awayTeam de mesmo valor', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeam: 8,
          awayTeam: 8,
        });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
   });
  });

  describe('Matches método POST', () => {
    let chaiHttpResponse: Response;
    
      beforeEach(async () => sinon
      .stub(Matches, 'create')
      .resolves(matchMockResponse as unknown as Matches));
  
      afterEach(()=>{
          (Matches.create as sinon.SinonStub).restore();
      })
  
      it('Possivel fazer um POST com sucesso', async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjYxMzA3NjYyLCJleHAiOjE2NjE5MTI0NjJ9.4Zy7qT0ebWY38klVfSPL8qyD8DOA09oS0V6ZAZyv-y8";
        chaiHttpResponse = await chai
           .request(app)
           .post('/matches')
           .send(postMatch)
           .set('authorization', token)
  
    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.have.property('id'); 
      })
});