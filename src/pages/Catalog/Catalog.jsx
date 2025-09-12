import styles from "./Catalog.module.css";
import CarList from "../../components/CarList/CarList";
import LoadMore from "../../components/LoadMore/LoadMore";
import Filters from "../../components/Filters/Filters";

export default function Catalog() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Filters />
        <CarList />
        <LoadMore />
      </div>
    </div>
  );
}
