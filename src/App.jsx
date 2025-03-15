import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Home_fin from "./pages/Home_fin";
import Login_fin from './pages/Users/Login_fin';
import Register_fin from './pages/Users/Register_fin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home_fin />} />
        <Route exact path="/login" element={<Login_fin />} />
        <Route exact path="/register" element={<Register_fin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;