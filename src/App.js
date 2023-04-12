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

import Signup from "./pages/Signup";
import React from "react";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ShowAll from "./pages/closet/ShowAll";
import Navbar from "./components/Navbar";
import CreateOutfit from "./pages/outfit/CreateOutfit";
import EditOutfit from "./pages/outfit/EditOutfit";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import AltCloset from "./pages/closet/AltCloset";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          ,
          {/* only login and signup pages can be accessed without logging in */}
          <Route path="/login" element={<Login />} />,
          <Route path="/signup" element={<Signup />} />,
          <Route
            path="/closet"
            element={
              <ProtectedRoute>
                <Closet />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/alt-closet" /* TODO: change url for this page! */
            element={
              <ProtectedRoute>
                <AltCloset />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/outfit"
            element={
              <ProtectedRoute>
                <Outfit />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/create-outfit"
            element={
              <ProtectedRoute>
                <CreateOutfit />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/edit-outfit/:id"
            element={
              <ProtectedRoute>
                <EditOutfit />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/all-tops"
            element={
              <ProtectedRoute>
                <ShowAll type={"tops"} />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/all-bottoms"
            element={
              <ProtectedRoute>
                <ShowAll type={"bottoms"} />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/all-footwear"
            element={
              <ProtectedRoute>
                <ShowAll type={"footwear"} />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/all-accessories"
            element={
              <ProtectedRoute>
                <ShowAll type={"accessories"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          ,
        </Routes>

        <Navbar />
      </HashRouter>
    </div>
  );
}

export default App;
