import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import "./app.css"

function App() {
  return (
      <div className="App">
        <Nav />
        <Routes>
          <Route exact path="/" element={<Books />} />
          <Route exact path="/books/:id" element={<Detail />} />
          <Route element={<NoMatch />} />
        </Routes>
      </div>
  );
}

export default App;
