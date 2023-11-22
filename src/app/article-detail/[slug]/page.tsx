"use client";

import { ArticleInterface } from "@/app/components/interfaces/article-list.interface";
import { httpClient } from "@/app/providers/http.provider";
import { useEffect, useState } from "react";

export default function ArticleDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [article, setArticle] = useState<ArticleInterface | null>(null);

  const fetchArticle = async () => {
    const {
      data: { article },
    } = await httpClient.get(`/articles/${params.slug}`);
    setArticle(article);
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  if (!article) {
    return <>Loading article...</>;
  }
  return (
    <>
      <h1>{article.title}</h1>
      <div>
        <img
          className="rounded-full h-[32px]"
          src={article.author.image}
          alt={article.author.username}
        />
        <div>
          <a href="">{article.author.username}</a>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        <button></button>
        <button>{article.favoritesCount}</button>
      </div>
      <p>{article.body}</p>
      <ul className="float-right flex">
        {article.tagList.map((tag, index) => (
          <li
            className="flex font-light text-[0.8rem] border border-solid border-gray-300 text-dataColor rounded-[10rem] px-[0.6em] mb-[0.2rem] mr-[3px]"
            key={index}>
            {tag}
          </li>
        ))}
      </ul>
      <div>
        <img
          className="rounded-full h-[32px]"
          src={article.author.image}
          alt={article.author.username}
        />
        <div>
          <a href="">{article.author.username}</a>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        <button></button>
        <button>{article.favoritesCount}</button>
      </div>
    </>
  );
}
