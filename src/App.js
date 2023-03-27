import logo from "./logo.svg";
import "./App.css";
import DisplayItemsContainer from "./components/DisplayItemsContainer";
import ChooseItemsContainer from "./components/ChooseItemsContainer";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Closet from "./pages/Closet";
import Outfit from "./pages/Outfit";
import Profile from "./pages/Profile";


import React from 'react';
import Profile from './pages/Profile';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
 


import React from 'react';
import Profile from './pages/Profile';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
 

// assets
import top1 from "./assets/top1.png";
import top2 from "./assets/top2.png";

function App() {

  const BrowserRouter = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<Closet />} />,
      <Route path="/closet" element={<Closet />} />,
      <Route path="/outfit" element={<Outfit />} />,
      <Route path="/profile" element={<Profile />} />,
    ])
  );

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









    // Profile page routing stuff
    // <Router>
    // <div>
    //   <section>                              
    //       <Routes> 
    //           <Route path="/profile" element={<Profile/>}/>
    //       </Routes>                    
    //   </section>
    // </div>
    // </Router>
  );
}

export default App;
