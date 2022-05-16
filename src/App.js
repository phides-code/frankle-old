import logo from "./logo.svg";
import "./App.css";

// front-end:
// login with auth0
// on-screen list of keys - disabled style, green style, yellow style
//

// back-end:
// back-end: user stats in db
// list of words

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
