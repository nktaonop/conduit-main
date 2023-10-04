"use client";

type PaginationProps = {
  articlesPerPage: number;
  totalArticles: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

export default function Pagination({
  articlesPerPage,
  totalArticles,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pages = [...new Array(Math.ceil(totalArticles / articlesPerPage))].map(
    (_, index) => ++index
  );

  return (
    <div>
      <ul>
        {pages.map((number) => (
          <li key={number}>
            <a href="#" onClick={() => onPageChange(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
