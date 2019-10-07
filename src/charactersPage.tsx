import React, { useState, useEffect } from 'react'
import { match as RouteMatch } from 'react-router'
import { CharactersService, Character } from './charactersService'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaStar } from 'react-icons/fa'
import { getColor, Loader, getTextClass, getIcon } from './charactersList'

interface CharactersPageParams {
  id: string
}

interface CharactersPageProps {
  charactersService: CharactersService
  match: RouteMatch<CharactersPageParams>
}

export function CharactersPage(props: CharactersPageProps) {
  const id = props.match.params.id
  var storedFavoritesString = sessionStorage.getItem("favoritesList")
  const [character, setCharacter] = useState<Character|null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [favoritesList, setFavoritesList] = useState<string[]>(storedFavoritesString ? JSON.parse(storedFavoritesString) : [])


  useEffect(() => {
    async function getCharacterData() {
      const data = await props.charactersService.getCharacterData(id)
      setCharacter(data)
      setLoading(false)
    }
    getCharacterData()
  }, [])

  useEffect(() => {
    sessionStorage.setItem("favoritesList", JSON.stringify(favoritesList))
  }, [favoritesList])

  function addToFavorites() {
    if (!favoritesList.includes(id)) {
      const newFavorites = [...favoritesList]
      newFavorites.push(id)
      setFavoritesList(newFavorites)
    }
  }

  function removeFromFavorites() {
    if (!favoritesList.includes(id)) { return }
    const newFavorites = [...favoritesList].filter((fav: string) => fav !== id)
    setFavoritesList(newFavorites)
  }

  return (
    <>
      <div className="mb-3" style={{ width: '28rem' }}>
        <a href="/list" className="text-secondary">{`<`} Back to the list</a>
      </div>
      {!!loading && <Loader/>}
      {!loading &&
        <>
          {!!character ?
            <Card border={getColor(character.gender)}>
              <Card.Body>
                <Card.Title as={Row}>
                  <Col
                    className={getTextClass(character.gender)}
                    style={{display: "flex", alignItems: "center"}}
                  >
                    <h2>{getIcon(character.gender)} {character.name}</h2>
                  </Col>
                  <Col
                    style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", fontSize: '1.5em'}}
                  >
                    {favoritesList.includes(id) &&
                      <FaStar className='text-warning'/>
                    }
                  </Col>
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Height: {character.height}</ListGroupItem>
                <ListGroupItem>Mass: {character.mass}</ListGroupItem>
                <ListGroupItem>Hair color: {character.hair_color}</ListGroupItem>
                <ListGroupItem>Skin color: {character.skin_color}</ListGroupItem>
                <ListGroupItem>Eye color: {character.eye_color}</ListGroupItem>
                <ListGroupItem>Birth year: {character.birth_year}</ListGroupItem>
                <ListGroupItem>Gender: {character.gender}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                {favoritesList.includes(id) ?
                  <Button variant="outline-secondary" onClick={(e: React.MouseEvent<HTMLButtonElement>) => removeFromFavorites()}>
                    Remove from favorites
                  </Button>
                  : <Button variant="light" onClick={(e: React.MouseEvent<HTMLButtonElement>) => addToFavorites()}>
                      <FaStar className='text-warning'/>Add to favorites
                    </Button>
                }
              </Card.Body>
            </Card> : <div>Character is not found</div>
          }
        </>
      }
    </>
  )
}
