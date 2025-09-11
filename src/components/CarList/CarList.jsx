import { useDispatch, useSelector } from "react-redux";
import styles from "./CarList.module.css";
import { getCars } from "../../redux/cars/selectors";
import { useEffect } from "react";
import { getCarsItems } from "../../redux/cars/operations";
import CarCard from "../CarCard/CarCard";

export default function CarList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarsItems());
  }, [dispatch]);
  const cars = useSelector(getCars);
  console.log("🚀 ~ CarList ~ cars:", cars);

  return (
    <div className={styles.container}>
      <ul className={styles.carsList}>
        {cars.map((carItem) => (
          <CarCard key={carItem.id} car={carItem} />
        ))}
      </ul>
    </div>
  );
}
