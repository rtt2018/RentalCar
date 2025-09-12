import { Link, NavLink } from "react-router";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <Link to={"/"}>
            <svg className={styles.logoImg}>
              <use href="/sprite.svg#icon-Logo"></use>
            </svg>
          </Link>
        </div>
        <nav className={styles.navElement}>
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
