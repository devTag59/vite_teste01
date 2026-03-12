import Clima from "./Clima";
import Logon from "./auth/logon";
import Login from "./auth/login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz redireciona para login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/logon" element={<Logon />} />
        <Route path="/clima" element={<Clima />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}