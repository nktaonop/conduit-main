"use client";
import { ArticleInterface } from "@/app/components/interfaces/article-list.interface";
import Pagination from "@/app/components/pagination/pagination";
import { httpClient } from "@/app/providers/http.provider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";

export default function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  const [activeButton, setActiveButton] = useState(1);
  const [authorProfile, setAuthorProfile] = useState();
  const [authorArticle, setAuthorArticle] = useState<ArticleInterface[]>([]);
  const [favoritedArticles, setFavoritedArticles] = useState<
    ArticleInterface[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageFavorited, setCurrentPageFavorited] = useState<number>(1);
  const [articlesPerPage] = useState(5);
  const [totalArticles, setTotalArticles] = useState(5);
  const [totalArticlesFavorited, setTotalArticlesFavorited] = useState(5);
  const [offset, setOffset] = useState(0);

  const handelButtonClick = (event: number) => {
    setActiveButton(event);
  };

  const getAuthorProfiles = async () => {
    try {
      const { data: response } = await httpClient.get(
        `/profiles/${params.username}`
      );
      setAuthorProfile(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAuthorProfiles();
  }, []);

  const getAuthorArticles = async () => {
    try {
      const { data: response } = await httpClient.get(
        `/articles?author=${params.username}&limit=${articlesPerPage}&offset=${offset}`
      );
      setAuthorArticle(response.articles);
      setTotalArticles(response.articlesCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAuthorArticles();
  }, [currentPage, offset]);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * articlesPerPage);
  };

  const onPageChangeFavorited = (pageNumber: number) => {
    setCurrentPageFavorited(pageNumber);
    setOffset((pageNumber - 1) * articlesPerPage);
  };

  const toggleLike = async (article: ArticleInterface) => {
    try {
      const isFavorited = article.favorited;

      if (isFavorited) {
        await httpClient.delete(`/articles/${article.slug}/favorite`);
      } else {
        await httpClient.post(`/articles/${article.slug}/favorite`);
      }

      const updatedList = authorArticle.map((item: ArticleInterface) =>
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
      setAuthorArticle(updatedList);
    } catch (err) {
      console.error(err);
    }
  };

  const getFavoritedArticles = async () => {
    try {
      const { data: response } = await httpClient.get(
        `/articles?favorited=${params.username}&limit=${articlesPerPage}&offset=${offset}`
      );
      setFavoritedArticles(response.articles);
      setTotalArticlesFavorited(response.articlesCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFavoritedArticles();
  }, [activeButton]);

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center w-[895px] pt-[2rem] m-auto">
          <img
            className="rounded-[50%] w-[100px] h-[100px] mb-[1rem]"
            src="https://api.realworld.io/images/smiley-cyrus.jpeg"
            alt=""
          />
          <h4 className="text-[24px] font-bold">{params.username}</h4>
          <a
            className="ml-auto text-previewColor border border-solid border-previewColor rounded-[0.2rem] text-[14px] py-[0.25rem] px-[0.5rem] hover:bg-gray-300"
            href="/settings">
            Edit profile settings
          </a>
        </div>
        <div className="flex max-w-[920px] m-auto">
          <button
            onClick={() => handelButtonClick(1)}
            className={`py-[8px] px-[16px] ${
              activeButton === 1 ? "text-primary border-b-2 border-primary" : ""
            }`}>
            My Articles
          </button>
          <button
            onClick={() => handelButtonClick(2)}
            className={`py-[8px] px-[16px] ${
              activeButton === 2 ? "text-primary border-b-2 border-primary" : ""
            }`}>
            Favorited Articles
          </button>
        </div>
      </div>
      <div className="relative max-w-[920px] px-[15px] m-auto">
        {activeButton === 1
          ? authorArticle.map((article, index) => (
              <div
                className="py-[1.5rem] border-t border-solid border-gray-300"
                key={index}>
                <div className="flex justify-between mb-[1rem]">
                  <div className="flex">
                    <img
                      className="h-[32px] w-[32px] rounded-full"
                      src={article.author.image}
                      alt={article.author.username}
                    />
                    <div className="flex flex-col ml-[0.3rem] mr-[1.5rem]">
                      <a className="text-primary font-medium">
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
                <a href={`/article/${article.slug}`}>
                  <h1 className="font-semibold text-[1.5rem] mb-[3px]">
                    {article.title}
                  </h1>
                  <p className="font-light text-previewColor mb-[15px] text-[1rem] leading-[1.3rem]">
                    {article.description}
                  </p>
                  <span className="text-dataColor text-[0.8rem] font-light">
                    Read mode...
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
            ))
          : favoritedArticles.map((article, index) => (
              <div
                className="py-[1.5rem] border-t border-solid border-gray-300"
                key={index}>
                <div className="flex justify-between mb-[1rem]">
                  <div className="flex">
                    <img
                      className="h-[32px] w-[32px] rounded-full"
                      src={article.author.image}
                      alt={article.author.username}
                    />
                    <div className="flex flex-col ml-[0.3rem] mr-[1.5rem]">
                      <a className="text-primary font-medium">
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
                <a href={`/article/${article.slug}`}>
                  <h1 className="font-semibold text-[1.5rem] mb-[3px]">
                    {article.title}
                  </h1>
                  <p className="font-light text-previewColor mb-[15px] text-[1rem] leading-[1.3rem]">
                    {article.description}
                  </p>
                  <span className="text-dataColor text-[0.8rem] font-light">
                    Read mode...
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
        {totalArticles >= 6 && (
          <Pagination
            articlesPerPage={articlesPerPage}
            totalArticles={totalArticles}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
        {totalArticlesFavorited >= 6 && (
          <Pagination
            articlesPerPage={articlesPerPage}
            totalArticles={totalArticlesFavorited}
            currentPage={currentPageFavorited}
            onPageChange={onPageChangeFavorited}
          />
        )}
      </div>
    </>
  );
}
