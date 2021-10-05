import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import "./app.css"

function App() {
  return (
    <Router>
      <div>
        <Nav />
        {/* use a switch so that the routes are rendered exclusively. Ex: if "/", or /books is hit, <Detail> won't get rendered too, just the components associated with the url that's hit */}
        <Switch>
          <Route exact path={["/", "/books"]}>
            <Books />
          </Route>
          <Route exact path="/books/:id">
            <Detail />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
