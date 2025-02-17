import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex gap-4">
      <Link to="/dashboard">Insumos</Link>
      <Link to="/reports">Análises Progresso</Link>
      <button onClick={handleLogout} className="text-white">
        Sair
      </button>
    </nav>
  );
};

export default Navbar;
