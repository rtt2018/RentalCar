import { useDispatch, useSelector } from "react-redux";
import styles from "./CarList.module.css";
import { getCars } from "../../redux/cars/selectors";
import {
  getLimit,
  getMaxMileage,
  getMinMileage,
  getPage,
  getRentalPrice,
} from "../../redux/filters/selectors";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCarsItems } from "../../redux/cars/operations";
import CarCard from "../CarCard/CarCard";
import { useLocation, useSearchParams } from "react-router";
import { setAllFilters } from "../../redux/filters/slice";
import { getBrand } from "../../redux/filters/selectors";

export default function CarList() {
  const dispatch = useDispatch();

  const [isFiltersInitialized, setIsFiltersInitialized] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const prevKeyRef = useRef(null);

  useEffect(() => {
    const brand = searchParams.get("brand") || "";
    const rentalPrice = searchParams.get("rentalPrice");
    const minMileage = searchParams.get("minMileage") || "";
    const maxMileage = searchParams.get("maxMileage") || "";
    let page = Number(searchParams.get("page")) || 1;
    let limit = Number(searchParams.get("limit")) || 12;

    if (prevKeyRef.current !== location.key) {
      page = 1;
      limit = 12;
    }
    dispatch(
      setAllFilters({
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
        page,
        limit,
      })
    );
    prevKeyRef.current = location.key;
    setIsFiltersInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  // --------------------
  const cars = useSelector(getCars);
  const brand = useSelector(getBrand);
  const rentalPrice = useSelector(getRentalPrice);
  const minMileage = useSelector(getMinMileage);
  const maxMileage = useSelector(getMaxMileage);
  const page = useSelector(getPage);
  const limit = useSelector(getLimit);

  // --------------------
  const query = useMemo(() => {
    const q = {};
    if (brand) q.brand = brand;
    if (rentalPrice) q.rentalPrice = rentalPrice;
    if (minMileage) q.minMileage = minMileage;
    if (maxMileage) q.maxMileage = maxMileage;
    if (page && page > 1) q.page = page;
    if (page > 1 && limit) q.limit = limit;

    return q;
  }, [brand, rentalPrice, minMileage, maxMileage, page, limit]);

  // --------------------

  useEffect(() => {
    if (!isFiltersInitialized) return;
    dispatch(getCarsItems(query));
  }, [dispatch, query, isFiltersInitialized]);

  // --------------------

  useEffect(() => {
    if (!isFiltersInitialized) return;

    const newParams = new URLSearchParams();
    if (brand) newParams.set("brand", brand);
    if (rentalPrice) newParams.set("rentalPrice", rentalPrice);
    if (minMileage) newParams.set("minMileage", minMileage);
    if (maxMileage) newParams.set("maxMileage", maxMileage);
    if (page && page > 1) newParams.set("page", page);
    if (page > 1 && limit) newParams.set("limit", limit);

    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, { replace: true });
    }
  }, [
    dispatch,
    brand,
    rentalPrice,
    minMileage,
    maxMileage,
    page,
    limit,
    isFiltersInitialized,
    searchParams,
    setSearchParams,
  ]);

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
