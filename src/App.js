import "./index.css";

import { HashRouter, Route, Routes } from "react-router-dom";

import Closet from "./pages/closet/Closet";
import Outfit from "./pages/outfit/Outfit";
import Settings from "./pages/Settings";

import Navbar from "./components/Navbar";
import AltCloset from "./pages/closet/AltCloset";
import ClosetTestingContainer from "./pages/closet/ClosetTestingContainer";
import ShowAll from "./pages/closet/ShowAll";
import Login from "./pages/Login";
import CreateOutfit from "./pages/outfit/CreateOutfit";
import EditOutfit from "./pages/outfit/EditOutfit";
import Profile from "./pages/Profile";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import Signup from "./pages/Signup";

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
                <ClosetTestingContainer />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/orig-closet" // for debugging purposes
            element={
              <ProtectedRoute>
                <Closet />
              </ProtectedRoute>
            }
          />
          ,
          <Route
            path="/alt-closet" // for debugging purposes
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
            path="/all/:type"
            element={
              <ProtectedRoute>
                <ShowAll />
              </ProtectedRoute>
            }
          />
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
