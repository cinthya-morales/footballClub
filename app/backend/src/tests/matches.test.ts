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

describe('Matches', () => {
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
