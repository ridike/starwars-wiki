import React from 'react'
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserHistory } from 'history'
import { CharctersList } from './charactersList'
import { CharactersPage } from './charactersPage'
import { CharactersService } from './charactersService'
import './App.css';

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
            path="/list"
            render={() => <CharctersList charactersService={charactersService}/>}
          />
          <Route
            path="/:id"
            render={(props: RouteComponentProps<any>) => <CharactersPage charactersService={charactersService} match={props.match} />}
          />
          <Route render={() => <div>Welcome</div>} />
        </Switch>
      </>
    </Router>
  )
}

export default App
