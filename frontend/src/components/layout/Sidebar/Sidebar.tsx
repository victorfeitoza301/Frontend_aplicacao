import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

// Itens já implementados (com rota) e os que ainda virão (sem rota).
const links = [
  { to: "/dashboard", label: "🤖 Meu Zerion", ready: true },
  { to: "/chat", label: "💬 Chat", ready: true },
  { to: "/missoes", label: "🎯 Missões", ready: false },
  { to: "/arena", label: "⚔️ Arena", ready: false },
  { to: "/inventario", label: "🎒 Inventário", ready: true },
  { to: "/perfil", label: "👤 Perfil", ready: false },
];

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.menu}>
          {links.map((link) =>
            link.ready ? (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              </li>
            ) : (
              <li key={link.to} className={styles.disabled}>
                {link.label}
              </li>
            )
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
