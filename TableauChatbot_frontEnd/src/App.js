import "./App.css";
import Home from "./pages/HomePage/Home";
import LandingPage from "./pages/HomePage/LandingPage";
import Login from "./pages/Login/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SeeMore from "./pages/SeeMore";
import SearchResult from "./pages/SearchResults";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/seeMore",
      element: <SeeMore />,
    },
    {
      path: "/dashboard/:id",
      element: <LandingPage />,
    },
    {
      path: "/searchResults",
      element: <SearchResult />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
