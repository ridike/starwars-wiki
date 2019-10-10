import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import { FaVenus, FaMars, FaGenderless, FaStar } from 'react-icons/fa'
import { CharactersService, Character, Gender } from './charactersService'

interface CharactersListProps {
  charactersService: CharactersService
}

export function Loader() {
  return (
    <div style={{textAlign: "center"}} className="mt-5">
      <Spinner animation="grow" variant="dark" style={{width: "100px", height: "100px"}}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
}

export function getColor(gender: Gender) {
  let color: 'info'|'danger'|'secondary'
  switch(gender) {
    case 'male': color = 'info'; break
    case 'female': color = 'danger'; break
    default: color = 'secondary'; break
  }
  return color
}

export function getIcon(gender: Gender) {
  let icon: JSX.Element
  switch(gender) {
    case 'male': icon = <FaMars className='text-info' />; break
    case 'female': icon = <FaVenus className='text-danger' />; break
    default: icon = <FaGenderless className='text-secondary' />; break
  }
  return icon
}

export function getTextClass(gender: Gender) {
  let className: 'text-danger'|'text-info'|'text-secondary'
  switch(gender) {
    case 'male': className = 'text-info'; break
    case 'female': className = 'text-danger'; break
    default: className = 'text-secondary'; break
  }
  return className
}

export function CharactersList(props: CharactersListProps) {
  var storedFavoritesString = sessionStorage.getItem("favoritesList")
  const [characters, setCharacters] = useState<Character[]|null>(null)
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [favoritesList, setFavoritesList] = useState<string[]>(storedFavoritesString ? JSON.parse(storedFavoritesString) : [])
  const [count, setCount] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<string>("Server error. Please try again later.")
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    async function getList() {
      try {
        const data = await props.charactersService.getCharacters()
        const characters = data.results
        setCount(data.count)
        setCharacters(characters)
      } catch(e){
        setErrorMessage(e.message)
        setError(true)
      }
      setLoading(false)
    }
    getList()
  }, [])

  useEffect(() => {
    sessionStorage.setItem("favoritesList", JSON.stringify(favoritesList))
  }, [favoritesList])

  function generateId(ch: Character) {
    const array = ch.url.split('/')
    return array[array.length - 2]
  }

  function addToFavorites(id: string) {
    if (!favoritesList.includes(id)) {
      const newFavorites = [...favoritesList]
      newFavorites.push(id)
      setFavoritesList(newFavorites)
    }
  }

  function removeFromFavorites(id: string) {
    if (!favoritesList.includes(id)) { return }
    const newFavorites = [...favoritesList].filter((fav: string) => fav !== id)
    setFavoritesList(newFavorites)
  }

  return (
    <>
      {!!loading && <Loader/>}
      <Modal show={error} onHide={() => setError(false)}>
        <Modal.Header closeButton>
          <Modal.Title><p className="text-danger">{errorMessage}</p></Modal.Title>
        </Modal.Header>
      </Modal>
      {!loading && !error &&
        <>
          <h3>Here you can see the first part of the list of {count} characters</h3>
          <Form>
            <Form.Group as={Row} controlId="search">
              <Col xs="6" lg="3" className="pr-1">
                <Form.Control
                  placeholder="Search"
                  value={search}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                />
              </Col>
              <Col xs="6" lg="3" className="pl-0">
                <Button variant="secondary" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setSearch('')}>Reset</Button>
              </Col>
            </Form.Group>
          </Form>
          {!!characters &&
            <ListGroup>
              {characters.filter(char => char.name.toLowerCase().includes(search.toLowerCase())).map(ch => {
                const isFav = favoritesList.includes(generateId(ch))
                return (
                  <ListGroup.Item
                    key={ch.name}
                  >
                    <Row>
                      <Col xs={1}>{isFav && <FaStar className='text-warning'/>}</Col>
                      <Col>{getIcon(ch.gender)}<span className={getTextClass(ch.gender)}>{ch.name}</span></Col>
                      <Col xs={1}>
                        <Button href={`/characters/${generateId(ch)}`} size='sm' variant="light">View</Button>
                      </Col>
                      <Col xs={3}>
                        { isFav ?
                          <Button
                            variant="outline-secondary"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => removeFromFavorites(generateId(ch))}
                            size='sm'
                            block
                          >
                            remove
                          </Button>
                          : <Button
                              variant="light"
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => addToFavorites(generateId(ch))}
                              size='sm'
                              block
                            >
                              add <FaStar className='text-warning'/>
                            </Button>
                        }
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          }
        </>
      }
    </>
  )
}
