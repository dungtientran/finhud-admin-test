import React from "react";
import styles from "./style.module.css";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { useRouter } from "next/router";

function Pagination({ page, total }) {
  const router = useRouter();
  const handlePage = (pageNumber) => {
    if (page <= total) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: `${pageNumber}` },
      })
    }
  }

  return (
    <div className={`${styles["pagination"]}`}>
      {page === 1 ? (
        <div
          className={`${styles["pagination-arrow-prev"]}`}
          style={{ cursor: 'not-allowed' }}
        >
          <IoChevronBackSharp />
        </div>
      ) : (
        <div
          className={`${styles["pagination-arrow-prev"]}`}
          onClick={() => handlePage(page - 1)}
        >
          <IoChevronBackSharp />
        </div>
      )}

      <p className={`${styles["current-page"]}`}>{page}</p>
      <p className="text-small">of</p>
      <p className={`${styles["max-page"]}`}>{total}</p>

      {page === total ? (
        <div
          className={`${styles["pagination-arrow-next"]}`}
          style={{ cursor: 'not-allowed' }}
        >
          <IoChevronForwardSharp />
        </div>
      ) : (
        <div
          className={`${styles["pagination-arrow-next"]}`}
          onClick={() => handlePage(page + 1)}
        >
          <IoChevronForwardSharp />
        </div>
      )}


    </div>
  );
}

export default Pagination;
