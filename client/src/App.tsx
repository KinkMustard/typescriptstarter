import * as React from "react";
import "./App.css";
import AddBook from "./components/AddBook";
import BookDetails from "./components/BookDetails";
import BookList from "./components/BookList";
import Hello from "./components/Hello";
const logo = require("./logo.svg");

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Hello name="TypeScript" />
      <AddBook />
      <BookDetails bookId={424} />
      <BookList />
    </div>
  );
}

export default App;
