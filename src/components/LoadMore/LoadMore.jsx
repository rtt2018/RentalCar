import {
  getHasNextPage,
  getIsLoading,
  getPage,
} from "../../redux/cars/selectors";
import { setPaginationParams } from "../../redux/cars/slice";
import styles from "./LoadMore.module.css";
import { useSelector, useDispatch } from "react-redux";

export default function LoadMore() {
  const dispatch = useDispatch();

  const currentPage = useSelector(getPage);
  const hasNextPage = useSelector(getHasNextPage);
  const loading = useSelector(getIsLoading);

  const handleLoadMore = () => {
    const nextPage = (currentPage ?? 1) + 1;
    dispatch(setPaginationParams({ page: nextPage, limit: 12 }));
  };

  if (!hasNextPage) {
    return null;
  }

  return (
    <button
      className={styles.loadMoreBtn}
      onClick={handleLoadMore}
      type="button"
      disabled={loading}
    >
      {loading ? <div className={styles.spinner}></div> : "Load more"}
    </button>
  );
}
