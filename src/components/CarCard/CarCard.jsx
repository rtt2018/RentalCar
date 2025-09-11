import styles from "./CarCard.module.css";

export default function CarCard({ car }) {
  return (
    <li className={styles.container} key={car.id}>
      <div className={styles.card}></div>
    </li>
  );
}
