import logo from "./logo.svg";
import "./App.css";
import DisplayItemsContainer from "./components/DisplayItemsContainer";
import ChooseItemsContainer from "./components/ChooseItemsContainer";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Closet from "./pages/Closet";
import Outfit from "./pages/Outfit";
import React from 'react';
import Profile from './pages/Profile'; 
import Navbar from "./components/Navbar";

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
       <RouterProvider router={BrowserRouter} />
        <Navbar/>
       {/* code for testing the item blocks */}
       {/* <DisplayItemsContainer title={"Tops"} items={[top1, top2]} />
      <ChooseItemsContainer title={"Tops"} selected={[top1, top2]} /> */}
     </div>
  );
}

export default App;
