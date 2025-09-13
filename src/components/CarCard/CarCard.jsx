import { Link } from "react-router";
import styles from "./CarCard.module.css";

export default function CarCard({ car }) {
  return (
    <li className={styles.container} key={car.id}>
      <div className={styles.card}>
        <div className={styles.thumb}>
          <img className={styles.carImg} src={car.img} alt={car.alt} />
        </div>
        <div className={styles.description}>
          <div className={styles.descriptionHead}>
            <span className={styles.brandWrap}>
              {car.brand}
              <span className={styles.modelName}> {car.model}, </span>
              {car.year}
            </span>
            <span className={styles.brandWrap}>${car.rentalPrice}</span>
          </div>
          <div className={styles.descrWrap}>
            <div className={styles.descrAddr}>
              {car.address.split(",")[1].trim()}
              <div className={styles.vl}></div>
              {car.address.split(",")[2].trim()}
              <div className={styles.vl}></div>
              {car.rentalCompany}
              <div className={styles.vl}></div>
            </div>
            <div className={styles.descrAddr}>
              {car.type.charAt(0).toUpperCase() +
                car.type.slice(1).toLowerCase()}
              <div className={styles.vl}></div>
              {car.mileage.toLocaleString("uk-UA")} km
            </div>
          </div>
        </div>
        <Link to={`/catalog/${car.id}`} className={styles.detailButton}>
          Read more
        </Link>
      </div>
    </li>
  );
}
