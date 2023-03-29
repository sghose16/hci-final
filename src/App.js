import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Closet from "./pages/Closet";
import Outfit from "./pages/Outfit";
import React from "react";
import Profile from "./pages/Profile";
import ShowAll from "./pages/ShowAll";

function App() {
  const BrowserRouter = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/closet" element={<Closet />} />,
      <Route path="/outfit" element={<Outfit />} />,
      <Route path="/profile" element={<Profile />} />,

      <Route path="/all-tops" element={<ShowAll type={"tops"} />} />,
      <Route path="/all-bottoms" element={<ShowAll type={"bottoms"} />} />,
      <Route path="/all-footwear" element={<ShowAll type={"footwear"} />} />,
      <Route
        path="/all-accessories"
        element={<ShowAll type={"accessories"} />}
      />,

      <Route path="*" element={<Closet />} />,
    ])
  );

  return (
    <div className="App">
      <RouterProvider router={BrowserRouter} />
    </div>
  );
}

export default App;
