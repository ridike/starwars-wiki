import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './App.css'
import { CharactersService, Character } from './charactersService'

interface CharactersListProps {
  charactersService: CharactersService
}

export function CharctersList(props: CharactersListProps) {
  const [characters, setCharacters] = useState<Character[]|null>(null)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    async function getList() {
      const data = await props.charactersService.getCharacters()
      setCharacters(data.results)
    }
    getList()
  }, [])

  function generateId(ch: Character) {
    const array = ch.url.split('/')
    return array[array.length - 2]
  }

  return (
    <>
      <Form>
        <Form.Group as={Row} controlId="search">
          <Col md="2">
            <Form.Control
              placeholder="Search"
              value={search}
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </Col>
          <Col md="2">
            <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => setSearch('')}>Reset</Button>
          </Col>
        </Form.Group>
      </Form>
      {!!characters &&
        <div className="list-group list-group-flush">
          {characters.filter(char => char.name.toLowerCase().includes(search.toLowerCase())).map(ch => {
            return (
              <a
                href={`/${generateId(ch)}`}
                className="list-group-item list-group-item-action"
                key={ch.name}
              >
                {ch.name}
              </a>
            )
          })}
        </div>
      }
    </>
  )
}
