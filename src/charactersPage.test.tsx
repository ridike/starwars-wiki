import React from 'react';
import { shallow } from 'enzyme';
import { CharactersPage } from './charactersPage';
import { CharactersService } from './charactersService'

const charactersEndpoint = 'https://swapi.co/api'
const charactersService = new CharactersService(charactersEndpoint)
const match = {
  params: {
    id: '123'
  },
  isExact: true,
  path: '/',
  url: ''
}

describe('Character\'s page test', () => {
   it('renders without crashing', () => {
      shallow(<CharactersPage charactersService={charactersService} match={match} />);
    });
});
