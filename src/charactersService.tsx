export interface Character {
  name: string
  height: string
  mass: string
  hair_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export interface CharactersData {
  results: Character[]
}

export class CharactersService {
  constructor(private charactersEndpoint: string) {}

  async getCharacters(): Promise<CharactersData> {
    const response = await fetch(
      `${this.charactersEndpoint}/people/?format=json`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Unable to fetch characters')
    }
    const data = await response.json()
    return data
  }

  async getCharacterData(id: string): Promise<Character> {
    const response = await fetch(
      `${this.charactersEndpoint}/people/${id}/?format=json`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Unable to fetch characters')
    }
    const data = await response.json()
    return data
  }
}
