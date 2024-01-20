"use client";

import { ArticleInterface } from "@/app/components/interfaces/article-list.interface";
import { httpClient } from "@/app/providers/http.provider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArticleDetail({
  params,
}: {
  params: { slug: string; username: string };
}) {
  const [article, setArticle] = useState<ArticleInterface | null>(null);

  const router = useRouter();

  const deleteArticle = async () => {
    try {
      await httpClient.delete(`/articles/${params.slug}`);
      router.push(`/profile/${params.username}`);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchArticle = async () => {
    const {
      data: { article },
    } = await httpClient.get(`/articles/${params.slug}`);
    setArticle(article);
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const toggleLike = async (article: ArticleInterface) => {
    try {
      const isFavorited = article.favorited;

      if (isFavorited) {
        await httpClient.delete(`/articles/${article.slug}/favorite`);
      } else {
        await httpClient.post(`/articles/${article.slug}/favorite`);
      }

      const updatedArticle = {
        ...article,
        favorited: !isFavorited,
        favoritesCount: isFavorited
          ? article.favoritesCount - 1
          : article.favoritesCount + 1,
      };
      setArticle(updatedArticle);
    } catch (err) {
      console.error(err);
    }
  };

  if (!article) {
    return <>Loading article...</>;
  }
  return (
    <>
      <div className="bg-backgroundArticle py-[2rem] mb-[2rem]">
        <div className="max-w-[1140px] mx-auto">
          <h1 className="text-[45px] font-semibold text-white">
            {article.title}
          </h1>
          <div className="flex mt-[1.5rem]">
            <div className="flex items-center">
              <img
                className="rounded-full h-[32px] mr-[5px]"
                src={article.author.image}
                alt={article.author.username}
              />
              <div className="flex flex-col">
                <a className="text-[14px] text-white font-medium" href="">
                  {article.author.username}
                </a>
                <span className="text-dataColor text-[0.7rem]">
                  {format(new Date(article.createdAt), "MMMM d, yyyy")}
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleLike(article)}
              className={`flex items-center h-[100%] px-[0.5rem] py-[0.25rem] text-[0.875rem] border-[1px] rounded-[0.2rem] ml-[5px] ${
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
                Favorite Article ({article.favoritesCount})
              </span>
            </button>

            <button
              onClick={() => deleteArticle()}
              className={`flex items-center h-[100%] px-[0.5rem] py-[0.25rem] text-[0.875rem] border-[1px] rounded-[0.2rem] ml-[5px] ${
                article.favorited
                  ? "bg-logoutButton text-white"
                  : "border-logoutButton text-logoutButton"
              } relative group hover:bg-logoutButton`}>
              <Icon
                icon="ion:heart"
                className={`text-${
                  article.favorited ? "white" : "logoutButton"
                } group-hover:text-white`}
              />
              <span
                className={`text-${
                  article.favorited ? "white" : "logoutButton"
                } group-hover:text-white`}>
                Delete Article
              </span>
            </button>
          </div>
        </div>
      </div>
      <p className="max-w-[1140px] mx-auto mb-[2rem] text-[18.6px]">
        {article.body}
      </p>
      <ul className="flex max-w-[1140px] mx-auto mb-[3rem]">
        {article.tagList.map((tag, index) => (
          <li
            className="flex font-light text-[0.8rem] border border-solid border-gray-300 text-dataColor rounded-[10rem] px-[0.6em] mb-[0.2rem] mr-[3px]"
            key={index}>
            {tag}
          </li>
        ))}
      </ul>
      <hr className="max-w-[1140px] mx-auto border-t border-solid border-gray-300" />
      <div className="flex justify-center mx-auto mt-[1.5rem] mb-[3rem]">
        <div className="flex items-center">
          <img
            className="rounded-full h-[32px] mr-[5px]"
            src={article.author.image}
            alt={article.author.username}
          />
          <div className="flex flex-col">
            <a className="text-[14px] text-primary font-medium" href="">
              {article.author.username}
            </a>
            <span className="text-dataColor text-[0.7rem]">
              {format(new Date(article.createdAt), "MMMM d, yyyy")}
            </span>
          </div>
        </div>
        <button
          onClick={() => toggleLike(article)}
          className={`flex items-center h-[100%] px-[0.5rem] py-[0.25rem] text-[0.875rem] border-[1px] rounded-[0.2rem] ml-[25px] ${
            article.favorited
              ? "bg-followButton text-followButton"
              : "border-followButton text-followButton"
          } relative group hover:bg-followButton`}>
          <Icon
            icon="ic:baseline-plus"
            className={`text-${
              article.favorited ? "white" : "followButton"
            } group-hover:text-white`}
          />
          <span
            className={`text-${
              article.favorited ? "white" : "followButton"
            } group-hover:text-white`}>
            Favorite Article ({article.favoritesCount})
          </span>
        </button>
        <button
          onClick={() => toggleLike(article)}
          className={`flex items-center h-[100%] px-[0.5rem] py-[0.25rem] text-[0.875rem] border-[1px] rounded-[0.2rem] ml-[5px] ${
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
            Favorite Article ({article.favoritesCount})
          </span>
        </button>
      </div>
    </>
  );
}
