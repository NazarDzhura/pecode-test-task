import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Header from './Components/Header'
import Footer from './Components/Footer'
import Characters from "./Views/Characters";
import Episodes from "./Views/Episodes";
import Locations from "./Views/Locations";
import {CHARACTERS_ROUTE, EPISODES_ROUTE, LOCATIONS_ROUTE, WATCHLIST_ROUTE} from "./Utils/consts";
import WatchList from "./Views/WatchList";

function App() {
  return (
    <div className="relative pb-10 min-h-screen">
      <Router>
        <Header />
        <div className="p-3">
        <Switch>
          <Route path={CHARACTERS_ROUTE}>
            <Characters />
          </Route>
          <Route path={EPISODES_ROUTE}>
            <Episodes />
          </Route>
          <Route path={LOCATIONS_ROUTE}>
            <Locations />
          </Route>
          <Route path={WATCHLIST_ROUTE}>
            <WatchList />
          </Route>
        </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
