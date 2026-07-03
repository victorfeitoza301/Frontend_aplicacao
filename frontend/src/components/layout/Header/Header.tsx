import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import styles from "./Header.module.css";

function Header() {
  const { operator, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Zerion</h1>

      <div className={styles.status}>
        {operator ? (
          <>
            <span>{operator.name}</span>
            <button className={styles.logout} onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <span>Offline</span>
        )}
      </div>
    </header>
  );
}

export default Header;
