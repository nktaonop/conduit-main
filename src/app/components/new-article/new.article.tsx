"use client";

import { useForm } from "react-hook-form";
import { NewArticlesInterface } from "../interfaces/article-list.interface";
import { httpClient } from "@/app/providers/http.provider";
import { useRouter } from "next/navigation";

export default function NewArticle() {
  const { register, handleSubmit } = useForm<NewArticlesInterface>();

  const router = useRouter();

  const onSubmit = async (data: NewArticlesInterface) => {
    try {
      const {
        data: { article },
      } = await httpClient.post("/articles", { article: data });
      router.push(`/article-detail/${article.slug}/${article.author.username}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mt-[1.5rem]">
      <div className="max-w-[920px]">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="py-[1.5rem] px-[0.75rem] text-[1.25rem] text-inputColor border border-solid border-black border-opacity-20 rounded w-[920px] h-[38px] mb-[1rem]"
            type="text"
            placeholder="Article Title"
            {...register("title")}
          />
          <input
            className="py-[0.75rem] px-[0.5rem] text-inputColor text-[1rem] border border-solid border-black border-opacity-20 rounded w-[920px] h-[38px] mb-[1rem]"
            type="text"
            placeholder="What's this article about?"
            {...register("description")}
          />
          <textarea
            className="py-[0.75rem] px-[0.5rem] text-inputColor text-[1rem] border border-solid border-black border-opacity-20 rounded w-[920px] h-[178px] mb-[1rem]"
            placeholder="Write your article (in markdown)"
            {...register("body")}></textarea>
          <input
            className="py-[0.75rem] px-[0.5rem] text-inputColor text-[1rem] border border-solid border-black border-opacity-20 rounded w-[920px] h-[38px] mb-[1rem]"
            type="text"
            placeholder="Enter tags"
          />
          <button
            className="ml-auto py-[0.75rem] px-[1.5rem] bg-primary text-white rounded-[0.3rem] text-[20px] hover:bg-primaryHover"
            type="submit">
            Publich Article
          </button>
        </form>
      </div>
    </div>
  );
}
