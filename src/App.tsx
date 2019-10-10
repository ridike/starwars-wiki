import React from 'react'
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserHistory } from 'history'
import { CharactersList } from './charactersList'
import { CharactersPage } from './charactersPage'
import { CharactersService } from './charactersService'
import { IconContext } from 'react-icons'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import starwarsImage from './starwars.jpg';

export function WelcomePage () {
  return (
    <div style={{textAlign: "center"}}>
      <h1>Welcome to the Star Wars People's wiki</h1>
      <img src={starwarsImage} width="300" alt="StarWars image"/>
      <div className="mt-1"><Button block size="lg" variant="dark" href="/characters/list">Go to the characters' list</Button></div>
    </div>
  )
}

function withinLayout (component: JSX.Element) {
  return (
    <IconContext.Provider value={{className: "react-icons"}}>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Star Wars WIKI</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Made by Igne Degutyte - 2019
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
      <Container>
        <Row className="justify-content-md-center mt-8">
          <Col xl="8" className="mt-3">{component}</Col>
        </Row>
      </Container>
    </IconContext.Provider>
  )
}


const App: React.FC = () => {
  const history = createBrowserHistory()
  const charactersEndpoint = 'https://swapi.co/api'
  const charactersService = new CharactersService(charactersEndpoint)
  return (
    <Router history={history}>
      <>
        <Switch>
          <Route
            exact
            path="/characters/list"
            render={() => withinLayout(<CharactersList charactersService={charactersService} />)}
          />
          <Route
            path="/characters/:id"
            render={(props: RouteComponentProps<any>) =>
              withinLayout(<CharactersPage charactersService={charactersService} match={props.match} history={history} />)}
          />
          <Route render={() => withinLayout(<WelcomePage/>)} />
        </Switch>
      </>
    </Router>
  )
}

export default App
