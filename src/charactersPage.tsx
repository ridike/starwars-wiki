import React, { useState, useEffect } from 'react'
import { match as RouteMatch } from 'react-router'
import './App.css'
import { CharactersService, Character } from './charactersService'

interface CharactersPageParams {
  id: string
}

interface CharactersPageProps {
  charactersService: CharactersService
  match: RouteMatch<CharactersPageParams>
}

export function CharactersPage(props: CharactersPageProps) {
  const [character, setCharacter] = useState<Character|null>(null)
  const id = props.match.params.id

  useEffect(() => {
    async function getCharacterData() {
      const data = await props.charactersService.getCharacterData(id)
      console.log(data)
      setCharacter(data)
    }
    getCharacterData()
  }, [])

  // function generateLink(ch: Character) {
  //   const array = ch.url.split('/')
  //   const id = array[array.length - 2]
  //   return `/${id}`
  // }

  return (
    <>
    {!!character && character.name}
    </>
  )
}
