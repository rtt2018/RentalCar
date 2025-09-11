import styles from "./LoadMore.module.css";
import {
  useSelector,
  // useDispatch
} from "react-redux";

export default function LoadMore() {
  // const dispatch = useDispatch();

  // const currentPage = useSelector();
  // const totalPages = useSelector();
  // const loading = useSelector();

  const handleLoadMore = () => {
    // const nextPage = (currentPage ?? 1) + 1;
    // dispatch(setNextPage(nextPage));
  };

  if (!totalPages || currentPage >= totalPages) {
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
