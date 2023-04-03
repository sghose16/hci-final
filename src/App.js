import "./index.css";

import {
  HashRouter,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Closet from "./pages/closet/Closet";
import Outfit from "./pages/outfit/Outfit";
import Settings from "./pages/Settings";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import React from "react";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ShowAll from "./pages/closet/ShowAll";
import ShowAllSelectable from "./pages/outfit/CreateOutfitItemSelector";
import Navbar from "./components/Navbar";
import CreateOutfit from "./pages/outfit/CreateOutfit";

function App() {
  return (
    <div className="App">
      <HashRouter>
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
          <Route path="/all-footwear" element={<ShowAll type={"footwear"} />} />
          <Route path="*" element={<Home />} />,
        </Routes>

        <Navbar />
      </HashRouter>
    </div>
  );
}

export default App;
