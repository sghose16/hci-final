import logo from "./logo.svg";
import "./App.css";
import DisplayItemsContainer from "./components/DisplayItemsContainer";
import ChooseItemsContainer from "./components/ChooseItemsContainer";

// assets
import top1 from "./assets/top1.png";
import top2 from "./assets/top2.png";

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
      {/* code for testing the item blocks */}
      {/* <DisplayItemsContainer title={"Tops"} items={[top1, top2]} />
      <ChooseItemsContainer title={"Tops"} selected={[top1, top2]} /> */}
    </div>
  );
}

export default App;
