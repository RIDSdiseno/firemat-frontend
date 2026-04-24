// src/components/Header.jsx
import { useNavigate } from "react-router-dom";

function Header({ onLogout, currentUser }) {
  const navigate = useNavigate(); // ✅ DENTRO del componente

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="bg-red-800 text-white px-8 py-4 flex items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src="/img/logo_firemat.png" alt="Firemat" className="h-10 w-auto" />
        <div>
          <h1 className="text-xl font-semibold">Inventario Firemat</h1>
          <p className="text-xs text-red-100">
            Gestión de productos de protección pasiva contra incendios
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <div className="text-right">
          <p>Las Condes, Santiago</p>
          <p className="text-red-100">contacto@firemat.cl</p>

          {currentUser && (
            <p className="mt-1 text-[11px] text-red-50">
              Sesión:{" "}
              <span className="font-mono bg-red-900/60 px-2 py-0.5 rounded-md">
                {currentUser.email}
              </span>
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleLogoutClick}
          className="px-3 py-1.5 rounded-md bg-red-900 hover:bg-red-950 text-xs font-semibold"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;