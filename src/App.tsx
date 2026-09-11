// src/App.tsx
import Clima from "./Clima";
import Logon from "./auth/logon";
import Login from "./auth/login";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import type { JSX } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-white text-center mt-10">Carregando...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logon" element={<Logon />} />
          <Route path="/clima" element={<ProtectedRoute><Clima /></ProtectedRoute>} />
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}