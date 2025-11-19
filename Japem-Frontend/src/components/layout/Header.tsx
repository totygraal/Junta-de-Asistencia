import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Settings } from "lucide-react";

export const Header: FC = () => {
  const location = useLocation();
  const linkClass = (path: string) =>
    `transition-colors ${
      location.pathname === path
        ? "text-green-700 font-semibold"
        : "text-black hover:text-green-600"
    }`;
  

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="w-full flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2 ml-0">
          <img src="/Logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <h1 className="text-gray-700 font-medium text-sm tracking-wide">
            Junta de Asistencia Privada
          </h1>
        </div>

        {/* Navegación */}
        <nav className="flex space-x-6 text-sm">
          <Link to="/" className={linkClass("/")}>Inicio</Link>
          <Link to="/donativos" className={linkClass("/donativos")}>Donativos</Link>
          <Link to="/archivo" className={linkClass("/archivo")}>Archivo</Link>
          <Link to="/contabilidad" className={linkClass("/contabilidad")}>Contabilidad</Link>
        </nav>
        

        {/* Iconos */}
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full bg-transparent hover:bg-blue-100 transition">
            <Bell className="w-5 h-5 text-black stroke-2" />
          </button>
          <button className="p-2 rounded-full bg-transparent hover:bg-pink-100 transition">
            <Settings className="w-5 h-5 text-black stroke-2" />
          </button>
        </div>
      </div>
    </header>
  );
};
