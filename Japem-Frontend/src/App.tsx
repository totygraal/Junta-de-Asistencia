import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import Home from "./pages/Home";
import{Donativos} from "./pages/Donativos";

function App() {
  return (
    <Router>
      {/* Header fijo */}
      <Header />

      {/* Contenedor principal con padding-top para el header */}
      <div className="pt-20 min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donativos" element={<Donativos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
