import * as React from "react";
import AddAuthor from "./components/AddAuthor";
// import "./App.css";
import AddBook from "./components/AddBook";
import BookDetails from "./components/BookDetails";
import BookList from "./components/BookList";
import Hello from "./components/Hello";
const logo = require("./logo.svg");

function App() {
  return (
    <div className="App">
      <Hello name="TypeScript" />
      <BookList />
      <AddBook />
      <AddAuthor />
    </div>
  );
}

export default App;
