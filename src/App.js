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
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ShowAll from "./pages/closet/ShowAll";
import Navbar from "./components/Navbar";
import CreateOutfit from "./pages/outfit/CreateOutfit";
import EditOutfit from "./pages/outfit/EditOutfit";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "./firebase";

function App() {
  // list of categories that user can navigate to "/all/category"
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const dbRef = ref(
      getDatabase(),
      `users/${auth.currentUser?.uid}/categories/`
    );
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategories(Object.values(data).map((category) => category.name));
      }
    });
  }, []);

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
          {/* all show all pages */}
          {categories.map((category) => (
            <Route
              key={category}
              path={`/all/${category}`}
              element={
                <ProtectedRoute>
                  <ShowAll type={category} />
                </ProtectedRoute>
              }
            />
          ))}
          ,
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
