"use client";
import { httpClient } from "@/app/providers/http.provider";
import { useState, useEffect } from "react";

export default function PopularTags() {
  const [tags, setPopularTags] = useState<string[]>([]);

  const getTags = async () => {
    try {
      const response = await httpClient.get("/tags");
      setPopularTags(response.data.tags);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="relative h-auto max-w-[25%] mt-[1.5rem] bg-backgroundPopularTags rounded-[4px] pt-[5px] pb-[10px] px-[10px]">
      <p className="mb-[0.2rem]">Popular Tags</p>
      <div className="flex flex-wrap">
        {tags.length === 0 && "Popular tags is loading..."}
        {tags.map((tag, index) => {
          return (
            <a
              key={index}
              href="#"
              className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
              {tag}
            </a>
          );
        })}
      </div>
    </div>
  );
}
