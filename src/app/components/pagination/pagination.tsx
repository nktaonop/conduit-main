"use client";

type PaginationProps = {
  articlesPerPage?: number;
  totalArticles: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

export default function Pagination({
  articlesPerPage = 5,
  totalArticles,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pages = [...new Array(Math.ceil(totalArticles / articlesPerPage))].map(
    (_, index) => ++index
  );

  const handleClick = (e: React.MouseEvent, pageNumber: number) => {
    e.preventDefault();
    onPageChange(pageNumber);
  };

  return (
    <div>
      <ul>
        {pages.map((number) => (
          <li className="inline-block my-[1rem]" key={number}>
            <a
              className={`ml-[-1px] px-[0.75rem] py-[0.5rem] border border-solid border-[paginationBorder] ${
                currentPage === number
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-primary hover:bg-paginationHover hover:underline"
              } ${
                number === 1
                  ? "rounded-tl rounded-bl"
                  : number === pages.length
                  ? "rounded-tr rounded-br"
                  : ""
              }`}
              href="#"
              onClick={(e) => handleClick(e, number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
