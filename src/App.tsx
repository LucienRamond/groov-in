import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./pages/root/navbar/Navbar";
import Profiles from "./pages/profiles/Profiles";
import MyBands from "./pages/bands/MyBands";
import Bands from "./pages/bands/Bands";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Band from "./pages/bands/Band";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/bands/my-bands" element={<MyBands />} />
        <Route path="/bands" element={<Bands />} />
        <Route path="/bands/:id" element={<Band />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
