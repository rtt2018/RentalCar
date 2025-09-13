import { Link } from "react-router";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.sectionWrapper}>
        <div className={styles.wrapper}>
          <div>
            <h1 className={styles.heroHead}>Find your perfect rental car</h1>
            <p className={styles.heroSlogan}>
              Reliable and budget-friendly rentals for any journey
            </p>
          </div>
          <Link to="/catalog" className={styles.heroButton}>
            View Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
