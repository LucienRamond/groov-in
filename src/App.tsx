import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/home/Home";
import Profiles from "./pages/profiles/Profiles";
import MyBands from "./pages/bands/MyBands";
import Bands from "./pages/bands/Bands";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Band from "./pages/bands/Band";
import Profile from "./pages/profiles/Profile";
import ProfileSettings from "./pages/profiles/settings/ProfileSettings";
import EditBand from "./pages/bands/EditBand";
import Navbar from "./pages/root/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profiles/:id" element={<Profile />} />
        <Route path="/my-bands" element={<MyBands />} />
        <Route path="/bands" element={<Bands />} />
        <Route path="/bands/:id" element={<Band />} />
        <Route path="/bands/edit/:id" element={<EditBand />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/settings" element={<ProfileSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
