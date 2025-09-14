import styles from "./ListItem.module.css";

export default function ListItem({ text }) {
  return (
    <li className={styles.container}>
      <svg className={styles.iconMarker}>
        <use href="/sprite.svg#icon-check-circle"></use>
      </svg>
      <p className={styles.description}>{text}</p>
    </li>
  );
}
