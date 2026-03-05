import react from "react"
import Clima from "./clima"
import Login from "./auth/login"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export default function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path="/Login" element={<Login/>}/>
  <Route path="/clima" element={<Clima/>}/>
  <Route path="*" element={<h1>Página não encontrada</h1>}/>
</Routes>
</BrowserRouter>
)
}