import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ListarPersonagens from "./pages/listarPersonagens";
import AdicionarPersonagens from "./pages/AdicionarPersonagens";
import Home from "./pages/home";
import EditarPersonagem from "./pages/EditarPersonagem"; // Importando a página de edição

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listar" element={<ListarPersonagens />} />
        <Route path="/adicionar" element={<AdicionarPersonagens />} />
        <Route path="/editar/:id" element={<EditarPersonagem />} />{" "}
  
      </Routes>
    </div>
  );
}

export default App;
