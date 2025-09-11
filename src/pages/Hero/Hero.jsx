import { Link } from "react-router";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.container}>
      <div className={styles.sectionWrapper}>
        <div className={styles.wrapper}>
          <div>
            <h1 className={styles.heroHead}>Find your perfect rental car</h1>
            <p className={styles.heroSlogan}>
              Reliable and budget-friendly rentals for any journey
            </p>
          </div>
          <Link to="/catalog">
            <button type="button" className={styles.heroButton}>
              View Catalog
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
