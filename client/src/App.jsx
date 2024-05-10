import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Events from "./Pages/Events";
import Media from "./Pages/Media";
import About from "./Pages/About";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Footers from "./Components/Footers";
import PrivetRoute from "./Components/PrivetRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/media" element={<Media />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PrivetRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footers />
    </BrowserRouter>
  );
}

export default App;
