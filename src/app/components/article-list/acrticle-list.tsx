"use client";
import { httpClient } from "@/app/providers/http.provider";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function ArticleList() {
  const [list, setArticleList] = useState([]);

  const getList = async () => {
    try {
      const response = await httpClient.get("/articles");
      setArticleList(response.data.articles);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

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
                className="rounded-full"
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
            <button className="flex items-center h-[100%] px-[0.5rem] py-[0.25rem] text-[0.875rem] border-[1px] rounded-[0.2rem] border-primary hover:text-white relative group hover:bg-primary">
              <Icon
                icon="ion:heart"
                className="text-primary group-hover:text-white"
              />
              <span className="text-primary group-hover:text-white">
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
    </div>
  );
}
