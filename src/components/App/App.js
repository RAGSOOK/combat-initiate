import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';

import './App.css';
import CampaignSpecs from '../CampaignSpecs/CampaignSpecs';
import CharacterSpecs from '../CharacterSpecs/CharacterSpecs.js';
import SessionPC from '../UserPage/MyCampaigns/PCCampaigns/SessionPC/SessionPC.js';
import SessionPage from '../SessionPage/SessionPage';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* When Create Campaign button is clicked */}
            <ProtectedRoute
              exact
              path="/add-campaign"
              component={CampaignSpecs}
            />
            {/* When Edit campaign button is clicked */}
            <ProtectedRoute
              exact
              path="/edit-campaign"
              component={CampaignSpecs}
            />
            {/* When Create Character button is clicked */}
            <ProtectedRoute
              exact
              path="/add-character"
              component={CharacterSpecs}
            />
            {/* When Edit Character button is clicked */}
            <ProtectedRoute
              exact
              path="/edit-character"
              component={CharacterSpecs}
            />
            {/* When A Player joins a session */}
            <ProtectedRoute
              exact
              path="/select-character"
              component={SessionPC}
            />
            {/* When add encounter is clicked */}
            {/* <ProtectedRoute
              exact
              path="/add-encounter"
              component={EncounterSpecs}
            /> */}
            {/* When Edit Encounter button is clicked */}
            {/* <ProtectedRoute
              exact
              path="/edit-encounter"
              component={EncounterSpecs}
            /> */}

            
            <ProtectedRoute
              exact path="/session"
              component={SessionPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
