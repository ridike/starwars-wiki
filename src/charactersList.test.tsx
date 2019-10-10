import React from 'react';
import { shallow } from 'enzyme';
import { CharactersList } from './charactersList';
import { CharactersService } from './charactersService'

const charactersEndpoint = 'https://swapi.co/api'
const charactersService = new CharactersService(charactersEndpoint)

const response = {
  headers: [],
  ok: true,
  json: function() {
    return {
      count: 87,
      results: function() {
        return [
          {  name: 'Luke Skywalker',
             height: '172',
             mass: '77',
             hair_color: 'blond',
             skin_color: 'fair',
             eye_color: 'blue',
             birth_year: '19BBY',
             gender: 'male',
             homeworld: 'https://swapi.co/api/planets/1/',
             films: [Array],
             species: [Array],
             vehicles: [Array],
             starships: [Array],
             created: '2014-12-09T13:50:51.644000Z',
             edited: '2014-12-20T21:17:56.891000Z',
             url: 'https://swapi.co/api/people/1/'
           }
        ]
      }
    }
  }
}
beforeEach(function() {
  window.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve(response);
      });
      return p;
  });
});

describe('CharactersService', () => {
  it("returns a list of characters from a remote server", async function() {
    const response = await charactersService.getCharacters();
    expect(response.count).toBe(87);
  })
});

describe('CharactersList', () => {
  it('renders without crashing', () => {
    shallow(<CharactersList charactersService={charactersService} />);
  })

  it('renders loader at first', () => {
    const component =  shallow(<CharactersList charactersService={charactersService} />);
    const loader = component.find('Loader');
    expect(loader).toHaveLength(1);
  })

});
