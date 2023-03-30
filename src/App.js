import "./index.css";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Closet from "./pages/Closet";
import Outfit from "./pages/Outfit";
import Settings from "./pages/Settings";

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

import React from "react";
import Profile from "./pages/Profile";
import ShowAll from "./pages/ShowAll";
import ShowAllSelectable from "./pages/ShowAllSelectable";
import Navbar from "./components/Navbar";
import CreateOutfit from "./pages/CreateOutfit";

function App() {
  // const BrowserRouter = createBrowserRouter(
  //   createRoutesFromElements([
  //     <Route path="/closet" element={<Closet />} />,
  //     <Route path="/outfit" element={<Outfit />} />,
  //     <Route path="/profile" element={<Profile />} />,
  //     <Route path="/settings" element={<Settings />} />,
  //     <Route path="/create-outfit" element={<CreateOutfit />} />,


  //     <Route path="/login" element={<Login />} />,
  //     <Route path="/signup" element={<Signup />} />,

  //     <Route path="/all-tops" element={<ShowAll type={"tops"} />} />,
  //     <Route path="/all-bottoms" element={<ShowAll type={"bottoms"} />} />,
  //     <Route path="/all-footwear" element={<ShowAll type={"footwear"} />} />,
  //     <Route
  //       path="/all-accessories"
  //       element={<ShowAll type={"accessories"} />}
  //     />,
  //     <Route path="/all-selectable-tops" element={<ShowAllSelectable type={"tops"} />} />,
  //     <Route path="/all-selectable-bottoms" element={<ShowAllSelectable type={"bottoms"} />} />,
  //     <Route path="/all-selectable-footwear" element={<ShowAllSelectable type={"footwear"} />} />,
  //     <Route
  //       path="/all-selectable-accessories"
  //       element={<ShowAllSelectable type={"accessories"} />}
  //     />,

  //     <Route path="*" element={<Home />} />,
  //   ])
  // );

  return (
    <div className="App">
      <Router >
        <Routes> 

            <Route path="/login" element={<Login />} />,
            <Route path="/signup" element={<Signup />} />,

            <Route path="/closet" element={<Closet />} />,
            <Route path="/outfit" element={<Outfit />} />,
            <Route path="/profile" element={<Profile />} />,
            <Route path="/settings" element={<Settings />} />,
            <Route path="/create-outfit" element={<CreateOutfit />} />,

            <Route path="/all-tops" element={<ShowAll type={"tops"} />} />,
            <Route path="/all-bottoms" element={<ShowAll type={"bottoms"} />} />,
            <Route path="/all-footwear" element={<ShowAll type={"footwear"} />} />,
            <Route
              path="/all-accessories"
              element={<ShowAll type={"accessories"} />}
            />,
            <Route path="/all-selectable-tops" element={<ShowAllSelectable type={"tops"} />} />,
            <Route path="/all-selectable-bottoms" element={<ShowAllSelectable type={"bottoms"} />} />,
            <Route path="/all-selectable-footwear" element={<ShowAllSelectable type={"footwear"} />} />,
            <Route
              path="/all-selectable-accessories"
              element={<ShowAllSelectable type={"accessories"} />}
            />,

            <Route path="*" element={<Home />} />,
        </Routes>

        <Navbar />
      </Router>

      {/* code for testing the item blocks */}
      {/* <DisplayItemsContainer title={"Tops"} items={[top1, top2]} />
      <ChooseItemsContainer title={"Tops"} selected={[top1, top2]} /> */}
    </div>
  );
}

export default App;
