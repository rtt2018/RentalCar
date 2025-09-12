import { Outlet } from "react-router";
import styles from "./Main.module.css";
import Header from "../Header/Header";

export default function Main() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <section className={styles.section}>
          <Outlet />
        </section>
      </main>
    </>
  );
}
