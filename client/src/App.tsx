import * as React from "react";
import AddAuthor from "./components/AddAuthor";
// import "./App.css";
import AddBook from "./components/AddBook";
import BookDetails from "./components/BookDetails";
import BookList from "./components/BookList";
import Hello from "./containers/Hello";
const logo = require("./logo.svg");

function App() {
  return (
    <div className="App">
      <Hello />
      <BookList />
      <div id="form-container">
        <AddBook />
        <AddAuthor />
      </div>
    </div>
  );
}

export default App;
