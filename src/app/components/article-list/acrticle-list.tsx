"use client";
import { httpClient } from "@/app/providers/http.provider";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Pagination from "../pagination/pagination";

export default function ArticleList() {
  const [list, setArticleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesPerPage] = useState(10);
  const [totalArticles, setTotalArticles] = useState(10);
  const [offset, setOffset] = useState(0);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * articlesPerPage);
  };

  const toggleLike = async (article: any) => {
    try {
      const isFavorited = article.favorited;

      if (isFavorited) {
        await httpClient.delete(`/articles/${article.slug}/favorite`);
      } else {
        await httpClient.post(`/articles/${article.slug}/favorite`);
      }

      const updatedList = list.map((item: any) =>
        item.slug === article.slug
          ? {
              ...item,
              favorited: !isFavorited,
              favoritesCount: isFavorited
                ? item.favoritesCount - 1
                : item.favoritesCount + 1,
            }
          : item
      );
      setArticleList(updatedList);
    } catch (err) {
      console.error(err);
    }
  };

  const getList = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get(
        `/articles?limit=${articlesPerPage}&offset=${offset}`
      );
      setArticleList(response.data.articles);
      setTotalArticles(response.data.articlesCount);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getList();
  }, [currentPage, offset]);

  return (
    <div className="relative max-w-[75%] px-[15px]">
      {list.length === 0 && "Loading articles..."}
      {list.map((article, index) => (
        <div
          className="py-[1.5rem] border-t border-solid border-gray-300"
          key={index}>
          <div className="flex justify-between mb-[1rem]">
            <div className="flex">
              <img
                className="rounded-full h-[32px]"
                src={article.author.image}
                alt={article.author.username}
              />
              <div className="flex flex-col ml-[0.3rem] mr-[1.5rem]">
                <a className="text-primary font-medium" href="#">
                  {article.author.username}
                </a>
                <span className="text-dataColor text-[0.8rem]">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => toggleLike(article)}
              className={`flex items-center h-[100%] px-[0.5rem] py-[0.25rem] text-[0.875rem] border-[1px] rounded-[0.2rem] ${
                article.favorited
                  ? "bg-primary text-white"
                  : "border-primary text-primary"
              } relative group hover:bg-primary`}>
              <Icon
                icon="ion:heart"
                className={`text-${
                  article.favorited ? "white" : "primary"
                } group-hover:text-white`}
              />
              <span
                className={`text-${
                  article.favorited ? "white" : "primary"
                } group-hover:text-white`}>
                {article.favoritesCount}
              </span>
            </button>
          </div>
          <a>
            <h1 className="font-semibold text-[1.5rem] mb-[3px]">
              {article.title}
            </h1>
            <p className="font-light text-previewColor mb-[15px] text-[1rem] leading-[1.3rem]">
              {article.description}
            </p>
            <span className="text-dataColor text-[0.8rem] font-light">
              Read more...
            </span>
            <ul className="float-right flex">
              {article.tagList.map((tag, index) => (
                <li
                  className="flex font-light text-[0.8rem] border border-solid border-gray-300 text-dataColor rounded-[10rem] px-[0.6em] mb-[0.2rem] mr-[3px]"
                  key={index}>
                  {tag}
                </li>
              ))}
            </ul>
          </a>
        </div>
      ))}
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={totalArticles}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
